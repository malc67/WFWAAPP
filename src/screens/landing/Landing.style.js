import { StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.lightGraay,
    },headerView:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        padding:10,
        paddingVertical:20
    },
    headerText:{
        fontSize:17,
        color:colors.primaryColor,
        fontWeight:'400'
    },
    line:{
        height:0.2,
        backgroundColor:colors.greyColor
    },
    line1:{
        height:0.2,
        backgroundColor:colors.greyColor
    },
    line3:{
        height:15
    },
    QouteText:{
        fontSize:23,
        padding:20,
        fontWeight:'400',
        marginTop:15
    },selectedbtn: { color: colors.whiteColor, backgroundColor: colors.primaryColor,width:'90%' },
})