import { useState } from "react";
import { reg } from "../../utils/ValidationConstants";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { registerData } from "../../Store/ActionsCreator";
import { useDispatch, useSelector } from "react-redux";

export default MapClientFunction = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { registerReducer } = useSelector(state => state)

  const getQuotes = async (data) => {
    setLoading(true)
    firestore().collection('create_quote')
      .add(data).then((res) => {
        alert("Quote created successfullys")
        setLoading(false)
        navigation.navigate('MapClient', { title: 'Quotes',quotesData:data })
      }).catch((e) => {
        setLoading(false)
        console.log('erroorr==>>', e)
      })
  }

  //  const setDocId = (collection , id) => {
  //   firestore().doc('create_quote')
  //  }


  return [loading, getQuotes];
};