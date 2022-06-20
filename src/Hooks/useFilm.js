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

  const getApi = async () => {
    //firestore().collection('Films').doc(info.uid)
  }




  return [loading, errors, registerApi]
}