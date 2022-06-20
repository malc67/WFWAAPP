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

  const updateWindow = async (quoteId, roomId, windowId, data) => {
    setLoading(true)
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



  return [loading, errors, windows, getWindowsApi, createWindow, deleteWindow, updateWindow]
}