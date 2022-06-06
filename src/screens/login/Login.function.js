import { useState } from "react";
import { reg } from "../../utils/ValidationConstants";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";
import { StackActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { registerData, signIn } from "../../Store/ActionsCreator";
import firestore from '@react-native-firebase/firestore';

export default LoginFunction = (props) => {
  const mainApp = StackActions.replace("OnBoarding")
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const loginValidation = (email, password) => {
    if (email === "") {
      alert("Email is required")
      // AlertComponent({ msg: "Email/Mobile Number is required", title: "Error", type: "error" })
    }
    else if (reg.test(email) == false) {
      alert("Email is invalid")
      // AlertComponent({ msg: "Email is invalid", title: "Error", type: "error" })
    }
    else if (password == "") {
      alert("Password is required")
      // AlertComponent({ msg: "Password is required", type: "error", title: "Error" })
    }
    else if (password.length <= 7) {
      alert("Password must be 8 characters")
      // AlertComponent({ msg: "Password must be 8 characters", type: "error", title: "Error" })
    }
    else {
      loginApiCall(email, password)
      // Login_Auth();
    }

  }
  const loginApiCall = async (email, password) => {
    setLoading(true)
    console.log(email)
      auth()
      .signInWithEmailAndPassword(email, password).then((response)=>{
        if (response && response.user) {
          console.log(response.user.uid)
        // Alert.alert("Success ✅", "Authenticated successfully")
        firestore()
          .collection('Users')
          .doc(response.user.uid)
          .get()
          .then(documentSnapshot => {            
            if (documentSnapshot.exists) {
              console.log('User data: ', documentSnapshot.data());
            }else  {
              console.log("nothing *********************************************");
            }
            dispatch(registerData({register:documentSnapshot.data()}))
          });
          setLoading(false)
          dispatch(signIn({userData:response?.user,isLogin:'true'}))
          props.navigation.dispatch(mainApp)
        }
      })
      .catch(error => {
      if (error.code === 'auth/user-not-found') {
        Alert.alert("Error", 'Email address is invalid')
      }

      if (error.code === 'auth/wrong-password') {
        Alert.alert("Error", 'Password is invalid')
      }
      setLoading(false)
    })
  }
  return [loading, loginValidation];
};