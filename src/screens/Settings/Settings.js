import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./Settings.style";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import commonStyles from "../../themes/commonStyles";
import { colors } from "../../themes/colors";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import QuoteItem from "../../components/QuoteItem";
import InputField from "../../components/InputField";
import { Icon } from "@rneui/base";
import Button from "../../components/Button";
import Header1 from "../../components/MainHeader";
import LinearGradient from "react-native-linear-gradient";
import auth from '@react-native-firebase/auth';
import { useDispatch } from "react-redux";
import { signOut } from "../../Store/ActionsCreator";

const Setting = (props) => {
  const data=[
    {Title:'Edit Profile',id:1},
    {Title:'Settings',id:2},
    {Title:'About',id:3},
    {Title:'Help',id:4},
  ]

  const mainApp = StackActions.replace("SignInScreens")
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const Logout=()=>{
    auth().signOut()
    dispatch(signOut())
    props.navigation.dispatch(mainApp)
  }

    return (
        <>
        <Header1 left={'Settings'}/>
        <LinearGradient colors={[colors.whiteColor, colors.lightBlue]} style={{flex: 0.9,width:'100%'}}>
          <View style={{marginLeft:20}}>
            <View style={styles.nameView}>
              <Text style={styles.nameText}>
                JA
              </Text>
            </View>
            <Text style={styles.headerText}>
              John Adams
            </Text>
            <Text style={styles.subTitleText}>
              New York
            </Text>
            <Text style={styles.subTitleText}>
              +187 254487 245 88
            </Text>
            <Text style={styles.subTitleText}>
              johny@gmail.com
            </Text>
          </View>
        </LinearGradient>
          <View style={styles.mainView}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
            <View style={{height:20}}/>
               <FlatList
                data={data}
                keyExtractor={item =>item.id}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                style={{ width: "100%" }}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.headerView}>
                     <TouchableOpacity>
                       <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
                         <Text style={styles.titleText}>
                           {item.Title}
                           </Text>
                           <Icon
                           name='right' type="antdesign" color={colors.primaryColor} size={17}/>
                        </View>
                      </TouchableOpacity>
                    </View>
                    )
                  }}/>
                  <TouchableOpacity onPress={Logout}>
                    <View style={styles.headerView}>
                    <Text style={styles.titleText}>
                    Sign out
                    </Text>
                  </View>
                  </TouchableOpacity>
          </KeyboardAwareScrollView>
          </View>
          <View style={{backgroundColor:colors.lightGraay,marginBottom:10,marginHorizontal:20}}>
            <Text >Version 1.02-2022</Text>
             </View>
        </>
    )
}
export default Setting;