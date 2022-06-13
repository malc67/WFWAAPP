import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
import { styles } from "./Settings.style";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import commonStyles from "../../themes/commonStyles";
import { colors } from "../../themes/colors";
import { StackActions, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import QuoteItem from "../../components/QuoteItem";
import InputField from "../../components/InputField";
import { Icon } from "@rneui/base";
import Button from "../../components/Button";
import Header1 from "../../components/MainHeader";
import LinearGradient from "react-native-linear-gradient";
import auth from '@react-native-firebase/auth';
import { useDispatch } from "react-redux";
import { signOut } from "../../Store/ActionsCreator";
import { userDetails } from "../../Store/ActionsCreator";

const Setting = (props) => {

  const isFocused = useIsFocused()
  useEffect(() => {
    getUserDetails()
  }, [isFocused])

  const { registerReducer } = useSelector(state => state)
  const data = [
    { Title: 'Edit Profile', id: 1 },
    { Title: 'Settings', id: 2 },
    { Title: 'About', id: 3 },
    { Title: 'Help', id: 4 },
  ]
  const [userData, setUserData] = useState('')
  const mainApp = StackActions.replace("SignInScreens")
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const Logout = () => {
    auth().signOut()
    dispatch(signOut())
    props.navigation.dispatch(mainApp)
  }

  const getUserDetails = async (userId) => {

    try {
      const userData = await firestore().collection("Users").where("id", "==", registerReducer.data.id).get()
      console.log('getUserDetails====>>', userData?.docs[0]?._data);
      setUserData(userData?.docs[0]?._data)
      // dispatch(userDetails({ data: userData?.docs[0]?._data }))

    } catch (error) {
      console.log(error)
    }
  }

  const getFirstCharacters=(userName)=> {
    if(!userName) return "*"
    return userName.split(" ").shift().charAt(0) + userName.split(" ").pop().charAt(0).toUpperCase()
  } 

  return (
    <>
      <Header1 left={'Settings'} />
      <LinearGradient colors={[colors.whiteColor, colors.lightBlue]} style={{ flex: 0.9, width: '100%' }}>
        <View style={{ marginLeft: 20 }}>
          <View style={styles.nameView}>
            <Text style={styles.nameText}>
              { getFirstCharacters(userData.Bussiness) }
            </Text>
          </View>
          <Text style={styles.headerText}>
             { userData.Bussiness }
          </Text>
          <Text style={styles.subTitleText}>
             { userData.city }
          </Text>
          <Text style={styles.subTitleText}>
             { userData.phoneNumber }
          </Text>
          <Text style={styles.subTitleText}>
             { auth().currentUser.email }
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.mainView}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <View style={{ height: 20 }} />
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            style={{ width: "100%" }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.headerView}>
                  <TouchableOpacity onPress={() => { index == 0 && navigation.navigate('EditProfile', { data: userData }) }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.titleText}>
                        {item.Title}
                      </Text>
                      <Icon
                        name='right' type="antdesign" color={colors.primaryColor} size={17} />
                    </View>
                  </TouchableOpacity>
                </View>
              )
            }} />
          <TouchableOpacity onPress={Logout}>
            <View style={styles.headerView}>
              <Text style={styles.titleText}>
                Sign out
              </Text>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
      <View style={{ backgroundColor: colors.lightGraay, marginBottom: 10, marginHorizontal: 20 }}>
        <Text >Version 1.02-2022</Text>
      </View>
    </>
  )
}
export default Setting;