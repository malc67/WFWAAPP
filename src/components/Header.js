import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";
import { colors } from "../themes/colors"
import { Icon } from "@rneui/base";

const Header = (props) => {
    return (
        <View style={styles.Head}> 
        <TouchableOpacity onPress={props.leftOnPress}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        {
            props.backArrow?
            <Icon
               name='left' 
               type="antdesign" 
               color={colors.primaryColor} 
               size={22}
              />
               :null
            }
            <Text style={{...styles.textHead,color:colors.primaryColor}}>
                {props.left}
            </Text>
        </View>
        </TouchableOpacity>
        <Text style={{...styles.textHead,fontSize:17,fontWeight:'700',marginRight:props.backArrow?15:0}}>
                {props.center}
            </Text>
        <TouchableOpacity onPress={props.rightOnPress}>
           {
            props.rightIcon?
            <Icon
               name='home' type="font-awesome" color={props.rightIconColor ? props.rightIconColor : colors.whiteColor} size={25}/>
               :props.right2Icon?
               <View style={{flexDirection:'row'}}>
               <Icon
               name='search' type="feather" color={colors.whiteColor} size={18}/>
               <Icon
               name='pencil-circle'
               type="material-community" 
               color={colors.whiteColor} 
               style={{paddingHorizontal:5}}
               size={18}/>
               </View>:
               props.dellIcon?
                <Icon
                name='delete' type="material-community-icons" color={colors.primaryColor} size={25}/>
               :
            <Text style={{...styles.textHead,color:props.right=='Save'?colors.primaryColor:colors.greyColor}}>
                {props.right}
            </Text>
            }
        </TouchableOpacity>
        </View>
    )

}
export default Header;
const styles = StyleSheet.create(
    {
        Head: {
            backgroundColor: colors.whiteColor,
            alignItems: 'center',
            justifyContent: 'space-between',flexDirection:'row',
            padding:15,
        },textHead:{
            fontSize:17,
            fontWeight:'500',
            color:colors.darkGray
        }
    }
)