import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./BrowseFilmsStyle";
import Header from "../../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
const DateSheet = (props) => {
  const route=useRoute()
  const navigation =useNavigation()

    return (
        <>
          <Header 
          right2Icon={true}
          backArrow={true} 
          leftOnPress={()=>navigation.goBack()} 
          left={"Details"} center={route.params.title}/>
          <View style={styles.mainView}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
            <View>
              <Image source={require('../../assets/images/datesheet.png')} style={{width:400,height:600}}/>
            </View>
          </KeyboardAwareScrollView>
          </View>
        </>
    )
}
export default DateSheet;