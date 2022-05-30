import { Icon } from "@rneui/base";
import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";
import { colors } from "../themes/colors"
const Footer = (props) => {
    return (
        <View style={styles.Head}> 
        <TouchableOpacity onPress={props.leftOnPress}>
            <Text style={styles.textHead}>
                {props.left}
            </Text>
        </TouchableOpacity>
        <Text style={{...styles.textHead,fontSize:17}}>
                {props.center}
            </Text>
        <TouchableOpacity onPress={props.rightOnPress}>
            {
            props.rightIcon?
            <Icon
               name='delete' type="material-community-icons" color={colors.whiteColor} size={25}/>
               :
        <Text style={styles.textHead}>
                {props.right}
            </Text>}
        </TouchableOpacity>
        </View>
    )

}
export default Footer;
const styles = StyleSheet.create(
    {
        Head: {
            backgroundColor: colors.darkGray,
            alignItems: 'center',
            justifyContent: 'space-between',flexDirection:'row',
            padding:15,
        },textHead:{
            fontSize:16,
            fontWeight:'400',
            color:colors.whiteColor
        }
    }
)