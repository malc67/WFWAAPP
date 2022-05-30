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
        paddingHorizontal:10,
        marginHorizontal:20,borderRadius:5,marginBottom:2,backgroundColor:colors.whiteColor
    },
    headerText:{
        fontSize:20,
        color:colors.primaryColor,
        fontWeight:'400'
    },
    line:{
        height:0.8,
        backgroundColor:colors.greyColor
    },
    line1:{
        height:0.2,
        backgroundColor:colors.greyColor
    },
    line3:{
        height:1.3,
        backgroundColor:colors.greyColor
    },
    QouteText:{
        fontSize:23,
        paddingTop:10,
        paddingLeft:20,
        paddingBottom:5,
        fontWeight:'500',
    },
    QouteText1:{
        fontSize:16,
        padding:15,
        fontWeight:'500'
    },NewTextView:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
    },title1:{
        fontSize:17,
        fontWeight:'500',
        color:colors.blackTextColor
    },area:{
        height:50,
        borderBottomColor:colors.greyColor,
        borderBottomWidth:1.2
    },selectedbtn: { color: colors.whiteColor, backgroundColor: colors.primaryColor },
})