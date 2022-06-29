import { useState } from "react"
import { isUndefined, isEmpty, size } from "lodash"
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from "@react-navigation/native";
import { navigateAndSimpleReset } from "@/Navigators/utils";

import { useDispatch, useSelector } from 'react-redux'
import { updateInfo, clearAuth } from '@/Store/Auth'
import geocoder from "@timwangdev/react-native-geocoder";

export default function () {

  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [quotesList, setQuoteList] = useState([])


  const info = useSelector(state => state.auth.info || {})

  const getQuotesApi = async () => {
    setLoading(true)

    firestore()
      .collection('create_quote')
      .where('created_by', '==', info['uid'])
      .orderBy('create_date', 'desc')
      .get()
      .then((querySnapshot) => {
        let tempData = [];
        querySnapshot.forEach(doc => {
          tempData.push({ ...doc.data(), id: doc.id });
        })
        setLoading(false)
        setQuoteList(tempData)
      })
  }


  const validation = (data) => {
    if (isUndefined(data['quote_number']) || isEmpty(data['quote_number'])) {
      setErrors({ quoteNumber: 'Quote number is required' })
      return false
    }
    if (isUndefined(data['customer_name']) || isEmpty(data['customer_name'])) {
      setErrors({ customerName: 'Customer name is required' })
      return false
    }
    if (isUndefined(data['job_name']) || isEmpty(data['job_name'])) {
      setErrors({ jobName: 'Job name is required' })
      return false
    }
    if (isUndefined(data['site_address']) || isEmpty(data['site_address'])) {
      setErrors({ siteAddress: 'Site address is required' })
      return false
    }
    if (isUndefined(data['site_state']) || isEmpty(data['site_state'])) {
      setErrors({ siteState: 'Site state is required' })
      return false
    }
    if (isUndefined(data['contact_name']) || isEmpty(data['contact_name'])) {
      setErrors({ name: 'Name is required' })
      return false
    }
    if (isUndefined(data['contact_email']) || isEmpty(data['contact_email'])) {
      setErrors({ email: 'Email is required' })
      return false
    }
    if (isUndefined(data['contact_phone']) || isEmpty(data['contact_phone'])) {
      setErrors({ phone: 'Phone is required' })
      return false
    }
    // if (isUndefined(data['mobile']) || isEmpty(data['mobile'])) {
    //   setErrors({ mobile: 'Mobile is required' })
    //   return false
    // }
    if (isUndefined(data['billing_address']) || isEmpty(data['billing_address'])) {
      setErrors({ billingAddress: 'Billing address is required' })
      return false
    }
    if (isUndefined(data['billing_state']) || isEmpty(data['billing_state'])) {
      setErrors({ billingState: 'Billing state is required' })
      return false
    }
    setErrors({})
    return true
  }


  const createQuote = async (data, callback = undefined) => {
    if (!validation(data)) return
    setLoading(true)
    geocoder.geocodeAddress(`${data['site_address']}, ${data['site_state']}`, {
      locale: 'en',
      maxResults: 2,
      apiKey: 'AIzaSyBq_is64XiZTL9byV7Ibvvnl7Bnza6P8TE'
    }).then(geos => {
      data['created_by'] = info['uid']
      if (geos && geos[0]['position']) {
        let location = geos[0]['position']
        data['location'] = { lat: location['lat'], lng: location['lng'] }
      }
      firestore().collection('create_quote')
        .add(data).then((doc) => {
          setLoading(false)
          if (callback) {
            callback({ ...data, id: doc.id })
          }
        }).catch((error) => {
          setLoading(false)
          console.log('createQuote', error)
        })
    }).catch(error => {
      console.log('geocoder', error)
      data['created_by'] = info['uid']
      firestore().collection('create_quote')
        .add(data).then((doc) => {
          setLoading(false)
          if (callback) {
            callback({ ...data, id: doc.id })
          }
        }).catch((error) => {
          setLoading(false)
          console.log('createQuote', error)
        })
    })
  }

  const updateQuote = async (quoteId, data) => {
    setLoading(true)
    geocoder.geocodeAddress(`${data['site_address']}, ${data['site_state']}`, {
      locale: 'en',
      maxResults: 2,
      apiKey: 'AIzaSyBq_is64XiZTL9byV7Ibvvnl7Bnza6P8TE'
    }).then(geos => {
      if (geos && geos[0]['position']) {
        let location = geos[0]['position']
        data['location'] = { lat: location['lat'], lng: location['lng'] }
      }
      firestore()
        .collection('create_quote')
        .doc(quoteId)
        .update(data)
        .then(async () => {
          setLoading(false)
        }).catch((error) => {
          setLoading(false)
          console.log('updateQuote', error)
        })
    }).catch(error => {
      firestore()
        .collection('create_quote')
        .doc(quoteId)
        .update(data)
        .then(async () => {
          setLoading(false)
        }).catch((error) => {
          setLoading(false)
          console.log('updateQuote', error)
        })
    })
  }

  const deleteQuote = async (quoteId) => {
    setLoading(true)
    firestore()
      .collection('create_quote')
      .doc(quoteId)
      .delete()
      .then(async () => {
        await getQuotesApi()
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        console.log('updateQuote', error)
      })
  }




  return [loading, errors, quotesList, getQuotesApi, createQuote, updateQuote, deleteQuote]
}