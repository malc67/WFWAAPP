import { StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.secondaryColor,
    },map: {
        ...StyleSheet.absoluteFillObject,
    },text1:{
        fontSize:17,
        color:colors.blackTextColor,
        fontWeight:'500',marginRight:10,marginLeft:3
    },text2:{
        fontSize:14,
        color:colors.greyColor,
        fontWeight:'400'
    },
    QouteText1:{
        fontSize:16,
        paddingVertical:15,
        fontWeight:'500',
        marginHorizontal:20
    }
})