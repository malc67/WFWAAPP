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
  const [rooms, setRooms] = useState([])

  const getRoomsApi = async (quoteId, hasIncludeWindows = false) => {
    setLoading(true)
    firestore().collection('create_quote').doc(quoteId).collection('rooms').get().then(async (querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach(doc => {
        tempData.push({ ...doc.data(), id: doc.id });
      })
      if (hasIncludeWindows) {
        for (item of tempData) {
          let windows = await getWindows(quoteId, item)
          item['windows'] = windows
        }
      }

      setLoading(false)
      setRooms(tempData)
    })
  }

  const getWindows = (quoteId, doc) => {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('create_quote')
        .doc(quoteId)
        .collection('rooms')
        .doc(doc.id)
        .collection('windows')
        .get()
        .then(snapshot => {
          let tempData = [];
          snapshot.forEach(doc => {
            tempData.push({ ...doc.data(), id: doc.id });
          })
          resolve(tempData)
        })
        .catch(error => {
          reject()
        })
    });
  }


  const createRoom = async (quoteId, data) => {
    setLoading(true)
    firestore().collection('create_quote')
      .doc(quoteId)
      .collection('rooms')
      .add(data)
      .then(async (res) => {
        getRoomsApi(quoteId, true)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        console.log('createRoom', error)
      })
  }

  const deleteRoom = async (quoteId, roomId) => {
    setLoading(true)
    firestore().collection('create_quote')
      .doc(quoteId)
      .collection('rooms')
      .doc(roomId)
      .delete()
      .then(async (res) => {
        getRoomsApi(quoteId, true)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        console.log('deleteRoom', error)
      })
  }

  const updateRoom = async (quoteId, roomId, data) => {
    setLoading(true)
    firestore().collection('create_quote')
      .doc(quoteId)
      .collection('rooms')
      .doc(roomId)
      .update(data)
      .then(async () => {
        getRoomsApi(quoteId, true)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        console.log('updateRoom', error)
      })
  }



  return [loading, errors, rooms, getRoomsApi, createRoom, deleteRoom, updateRoom]
}