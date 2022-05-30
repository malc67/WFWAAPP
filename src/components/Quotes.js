import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";
import { colors } from "../themes/colors"
import { Icon } from "@rneui/base";

const Quote = (props) => {
    return (
        <View style={styles.Head}> 
        <TouchableOpacity onPress={props.onPress}>
            <View>
            <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>   
            <Text style={styles.title1}>
                {props.title}
            </Text>
            <Icon
               name='right' type="antdesign" color={colors.primaryColor} size={17}/>
            </View>
            <Text style={styles.subtitle2}>
                {props.place}
            </Text>
            <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>   
            <Text style={styles.subtitle1}>
                {`Quote: `}
                <Text style={{color:colors.blackTextColor,fontWeight:'700'}}>
                {props.subtitle}
                </Text>
            </Text>
            <Text style={styles.subtitle1}>
                {props.date}
            </Text>
            </View>
            </View>
        </TouchableOpacity>
        </View>
    )

}
export default Quote;
const styles = StyleSheet.create(
    {
        Head: {
            padding:18,
        },title1:{
            fontSize:16,
            fontWeight:'700'
        },subtitle1:{
            fontSize:13,
            fontWeight:'500',
        },subtitle2:{
            fontSize:13,
            fontWeight:'500',
            marginVertical:8
        }
    }
)