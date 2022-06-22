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

  const getRoomsApi = async (quoteId) => {
    setLoading(true)
    firestore().collection('create_quote').doc(quoteId).collection('rooms').get().then((querySnapshot) => {
      let tempData = [];
      querySnapshot.forEach( async doc => {
        tempData.push({ ...doc.data(), id: doc.id });
      })
      setLoading(false)
      setRooms(tempData)
    })
  }


  const createRoom = async (quoteId, data) => {
    setLoading(true)
    firestore().collection('create_quote')
      .doc(quoteId)
      .collection('rooms')
      .add(data)
      .then(async (res) => {
        getRoomsApi(quoteId)
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
        getRoomsApi(quoteId)
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
        getRoomsApi(quoteId)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        console.log('updateRoom', error)
      })
  }



  return [loading, errors, rooms, getRoomsApi, createRoom, deleteRoom, updateRoom]
}