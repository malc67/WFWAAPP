import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { styles } from "./Windows.style";
import Header from "../../components/Header";
import commonStyles from "../../themes/commonStyles";
import Footer from "../../components/Footer";
import { Icon } from "@rneui/base";
import { colors } from "../../themes/colors";
import { useNavigation, useRoute } from "@react-navigation/native";

const Picture = (props) => {
  const navigation =useNavigation()
    return (
        <>
          <Header rightIcon backArrow leftOnPress={()=>navigation.goBack()} left={'Room'} center={"Add Picture"}/>
          <View style={styles.mainView}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
            <Text style={styles.textUpload}>
              Upload Picture
            </Text>
            <View style={{alignItems:'center'}}>
            <View style={styles.uploadBox}>
               <Icon type="antdesign" name="clouduploado"/>
               <Text>
                 Upload Company Logo
               </Text>
            </View>
            </View>
          </KeyboardAwareScrollView>
          </View>
         {/* <Footer rightIcon/> */}
        </>
    )
}
export default Picture;