import React, { useEffect } from "react";
import { View, Text,Image } from "react-native";
import { styles } from "./Splash.style";
import { useSelector } from "react-redux";
import { StackActions } from "@react-navigation/native";
const Splash = (props) => {
    const mainApp = StackActions.replace("OnBoarding")
    const {authenticationReducer} = useSelector(state=>state)
    useEffect(() => {
        if (authenticationReducer?.isLogin) {
            setTimeout(() => {
                props.navigation.dispatch(mainApp)
            }, 3000)
        }
        else{
            setTimeout(() => {
                props.navigation.navigate("Login")
            }, 3000)
        }
    }, [])
    return (
        <View style={styles.mainView}>
            <Image source={require('../../assets/images/splash.jpeg')} style={styles.image}/>
        </View>
    )
}
export default Splash;