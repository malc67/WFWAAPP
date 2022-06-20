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


const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function () {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validation = (email, password) => {
    if (isUndefined(email) || isEmpty(email)) {
      setErrors({ email: 'Email is required' })
      return false
    }
    if (!regexEmail.test(email)) {
      setErrors({ email: 'Email is invalid' })
      return false
    }
    if (isUndefined(password) || isEmpty(password)) {
      setErrors({ password: 'Password is required' })
      return false
    }
    if (size(password) < 8) {
      setErrors({ password: 'Password must be 8 characters' })
      return false
    }
    setErrors({})
    return true
  }

  const onUpdateInfo = (info) => {
    dispatch(updateInfo({ info }))
  }

  const registerApi = async (email, password) => {
    if (!validation(email, password)) return
    setLoading(true)
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        if (response && response.user) {
          onUpdateInfo(response.user)
          firestore()
            .collection('Users')
            .doc(response.user.uid)
            .get()
            .then(documentSnapshot => {
              if (documentSnapshot.exists) {
                navigateAndSimpleReset('Main')
              } else {
                navigation.navigate('BussinessProfile', { isEditProfile: false })
              }
            }).then(error => {

            })
        }
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        if (error.code === 'auth/email-already-in-use') {
          setErrors({ email: 'That email address is already in use!' })
        }
        if (error.code === 'auth/invalid-email') {
          setErrors({ email: 'That email address is invalid!' })
        }
      })
  }




  return [loading, errors, validation, registerApi]
}