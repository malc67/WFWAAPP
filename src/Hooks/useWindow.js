import { useState } from "react"
import { isUndefined, isEmpty, size } from "lodash"
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useNavigation } from "@react-navigation/native";
import { navigateAndSimpleReset } from "@/Navigators/utils";

import { useDispatch } from 'react-redux'
import { updateInfo, clearAuth } from '@/Store/Auth'
import moment from "moment";

export default function () {

  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [windows, setWindows] = useState([])

  const getWindowsApi = async (quoteId, roomId) => {
    setLoading(true)
    firestore().collection('create_quote').doc(quoteId).collection('rooms').doc(roomId).collection('windows').get().then((querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach(doc => {
        tempData.push({ ...doc.data(), id: doc.id });
      })
      setLoading(false)
      setWindows(tempData)
    })
  }


  const createWindow = async (quoteId, roomId, data) => {
    setLoading(true)
    let picture = data['picture']
    if (!isUndefined(picture) && !isEmpty(picture) && !isUndefined(picture?.uri) && !isEmpty(picture?.uri) && !checkUriFromInternet(picture?.uri)) {
      picture = await uploadImageToFirebase(picture?.uri)
      data = { ...data, picture }
    } else {
      if (checkUriFromInternet(picture?.uri)) {
        data = { ...data }
      } else {
        data = { ...data, picture: '' }
      }
    }
    firestore().collection('create_quote')
      .doc(quoteId)
      .collection('rooms')
      .doc(roomId)
      .collection('windows')
      .add(data)
      .then(async (res) => {
        getWindowsApi(quoteId, roomId)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        console.log('createWindow', error)
      })
  }

  const deleteWindow = async (quoteId, roomId, windowId) => {
    setLoading(true)
    firestore().collection('create_quote')
      .doc(quoteId)
      .collection('rooms')
      .doc(roomId)
      .collection('windows')
      .doc(windowId)
      .delete()
      .then(async (res) => {
        getWindowsApi(quoteId, roomId)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        console.log('deleteWindow', error)
      })
  }

  const checkUriFromInternet = (uri) => {
    if (isUndefined(uri) || isEmpty(uri)) return false
    if (uri.toLowerCase().startsWith('https://') || uri.toLowerCase().startsWith('http://')) return true
    return false
  }

  const updateWindow = async (quoteId, roomId, windowId, data) => {
    setLoading(true)
    let picture = data['picture']
    if (!isUndefined(picture) && !isEmpty(picture) && !isUndefined(picture?.uri) && !isEmpty(picture?.uri) && !checkUriFromInternet(picture?.uri)) {
      picture = await uploadImageToFirebase(picture?.uri)
      data = { ...data, picture }
    } else {
      if (checkUriFromInternet(picture?.uri)) {
        data = { ...data, picture: picture?.uri }
      } else {
        data = { ...data, picture: '' }
      }
    }
    firestore().collection('create_quote')
      .doc(quoteId)
      .collection('rooms')
      .doc(roomId)
      .collection('windows')
      .doc(windowId)
      .update(data)
      .then(async () => {
        getWindowsApi(quoteId, roomId)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        console.log('updateWindow', error)
      })
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



  return [loading, errors, windows, getWindowsApi, createWindow, deleteWindow, updateWindow]
}