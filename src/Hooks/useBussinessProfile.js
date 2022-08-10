import { useState } from "react"
import { isUndefined, isEmpty } from "lodash"
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from "@react-navigation/native";
import { navigateAndSimpleReset } from "@/Navigators/utils";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { updateInfo, updateBussinessProfile } from '@/Store/Auth'


const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function () {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const info = useSelector(state => state.auth.info || {})
  const profile = useSelector(state => state.auth.profile || {})

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})


  const validation = (bussiness, contactPerson, phoneNumber, ABN, instalationAddress, city, state, member, WFAANZ, installer, companyLogo) => {
    if (isUndefined(bussiness) || isEmpty(bussiness)) {
      setErrors({ bussiness: 'Bussiness name is required' })
      return false
    }
    if (isUndefined(contactPerson) || isEmpty(contactPerson)) {
      setErrors({ contactPerson: 'Contact Person name is required' })
      return false
    }
    if (isUndefined(phoneNumber) || isEmpty(phoneNumber)) {
      setErrors({ phoneNumber: 'Phone number is required' })
      return false
    }
    if (isUndefined(ABN) || isEmpty(ABN)) {
      setErrors({ ABN: 'ABN Number is required' })
      return false
    }
    if (isUndefined(instalationAddress) || isEmpty(instalationAddress)) {
      setErrors({ instalationAddress: 'Bussiness Address is required' })
      return false
    }
    if (isUndefined(city) || isEmpty(city)) {
      setErrors({ city: 'City name is required' })
      return false
    }
    if (isUndefined(state) || isEmpty(state)) {
      setErrors({ state: 'State name is required' })
      return false
    }
    setErrors({})
    return true
  }



  const uploadImageToFirebase = async (path, callback) => {
    return new Promise((resolve, reject) => {
      const extenstion = path.split('.').pop()
      const fileName = `${moment().format('x')}.${extenstion}`
      const task = storage().ref(`images/${fileName}`).putFile(path)
      task.on('state_changed', snapshot => {
        if (snapshot.state == 'success') {
          snapshot.ref.getDownloadURL().then((response) => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        } else {
          if (callback != undefined) {
            callback(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
          }
        }
      })
      task.catch(error => {
        reject(error)
      })
    });
  }

  const checkUriFromInternet = (uri) => {
    if (isUndefined(uri) || isEmpty(uri)) return false
    if (uri.toLowerCase().startsWith('https://') || uri.toLowerCase().startsWith('http://')) return true
    return false
  }

  const onUpdateProfile = (profile) => {
    dispatch(updateBussinessProfile({ profile }))
  }

  const bussinessProfileApi = async (bussiness, contactPerson, callingCode, phoneNumber, ABN, instalationAddress, city, state, member, WFAANZ, installer, companyLogo) => {
    if (!validation(bussiness, contactPerson, phoneNumber, ABN, instalationAddress, city, state, member, WFAANZ, installer, companyLogo)) return
    setLoading(true)
    let data = { bussiness, contactPerson, callingCode, phoneNumber, ABN, instalationAddress, city, state, member, WFAANZ, installer }
    if (!isUndefined(companyLogo) && !isEmpty(companyLogo) && !isUndefined(companyLogo?.uri) && !isEmpty(companyLogo?.uri) && !checkUriFromInternet(companyLogo?.uri)) {
      let companyLogoUri = await uploadImageToFirebase(companyLogo?.uri)
      data = { ...profile, ...data, companyLogo: companyLogoUri }
    } else {
      if (checkUriFromInternet(companyLogo?.uri)) {
        data = { ...profile, ...data }
      } else {
        data = { ...profile, ...data, companyLogo: '' }
      }
    }
    if (!isUndefined(info) && !isEmpty(info)) {
      firestore().collection('Users').doc(info.uid)
        .set(data)
        .then((res) => {
          onUpdateProfile(data)
          setLoading(false)
          navigation.navigate("Main")
        }).catch((error) => {
          setLoading(false)
          console.log('bussinessProfileApi', error)
        })
    }
  }

  const updateSettingPref = async (cutListsTo, bccQuotesTo, unit, followUp, powerCost, companyLogo, includeWastage, signature, customRooms = [], callback = undefined) => {
    callback(true)
    console.log('companyLogo', companyLogo)
    let data = { cutListsTo, bccQuotesTo, unit, followUp, powerCost, signature, customRooms, includeWastage }
    if (!isUndefined(companyLogo) && !isEmpty(companyLogo) && !isUndefined(companyLogo?.uri) && !isEmpty(companyLogo?.uri) && !checkUriFromInternet(companyLogo?.uri)) {
      let companyLogoUri = await uploadImageToFirebase(companyLogo?.uri)
      data = { ...data, companyLogo: companyLogoUri }
    } else {
      if (checkUriFromInternet(companyLogo?.uri)) {
        data = { ...data, companyLogo: companyLogo?.uri }
      } else {
        data = { ...data, companyLogo: '' }
      }
    }
    firestore()
      .collection('Settings')
      .doc(info.uid)
      .set(data)
      .then((res) => {
        callback(false)
      }).catch((error) => {
        callback(false)
        console.log('updateSettingPref', error)
      })
  }


  const getSetting = async () => {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('Settings')
        .doc(info.uid)
        .get()
        .then(async (doc) => {
          resolve(doc.data())
        })
        .catch((error) => {
          reject(error)
        })
    });
  }




  return [loading, errors, validation, bussinessProfileApi, updateSettingPref, getSetting]
}