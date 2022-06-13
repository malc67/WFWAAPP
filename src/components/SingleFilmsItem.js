import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet, Alert } from "react-native";
import { colors } from "../themes/colors"
import { Icon } from "@rneui/base";

const SingleFilmsItem = (props) => {
    const OnPress=()=>{
        // 
        Alert.alert(props.title, props.textAlert)
    }
    return (
        <View>
            <View style={styles.Head}> 
            <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            {props.iconVisible? 
              <Icon
               name={props.name} 
               type={props.type} 
               color={props.color ? props.color : props.name=="controller-stop"?colors.greanColor:colors.darkred} 
               size={props.name=="controller-stop"?22:16}
               style={{paddingRight:5}}
               />:null}
            <Text style={styles.title1}>
                {props.title}
            </Text>
                </View>
            <View>
            {props.iconVisible? 
              <Icon
               name="exclamationcircleo"
               type="antdesign"
               color={colors.greyColor}
               size={20}
               onPress={OnPress}
               />
               :props.circleIcon?
               <Icon
               name="exclamationcircleo"
               type="antdesign"
               color={colors.greyColor}
               size={20}
               />:
              <Text style={styles.subtitle1}>
                {props.subtitle}
              </Text>
            }
            </View>
            </View>
        </View>
        </View>
    )

}
export default SingleFilmsItem;
const styles = StyleSheet.create(
    {
        Head: {
            padding:12,
        },title1:{
            fontSize:16,
            fontWeight:'500',
            color:colors.blackTextColor
        },subtitle1:{
            fontSize:15,
            fontWeight:'500',
            color:colors.greyColor
        },line:{
            height:0.2,
            backgroundColor:colors.greyColor
        }
    }
)