import { StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.lightGraay
    },headerView:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        padding:10,
        paddingVertical:10,
        borderRadius:5,
        marginBottom:3,
        backgroundColor:colors.whiteColor,
        // marginTop:10,
        marginHorizontal:20,
    },headerView1:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        padding:10,
        paddingVertical:12,
        marginHorizontal:20,
        borderRadius:5,
        marginBottom:3,
        backgroundColor:colors.whiteColor,
        marginTop:10
    },
    headerText:{
        fontSize:17,
        color:colors.greyColor,
        fontWeight:'500'
    },
    headerText4:{
        fontSize:16,
        color:colors.greyColor,
        fontWeight:'500',
        textTransform:'uppercase',
        marginHorizontal:20,
        marginVertical:10
    },
    headerText3:{
        fontSize:17,
        color:colors.redTextColor,
        fontWeight:'500',
        lineHeight: 30
    },
    headerText1:{
        fontSize:17,
        color:colors.primaryColor,
        fontWeight:'400'
    },
    line:{
        height:0.8,
        backgroundColor:colors.greyColor
    },sub:{
        fontSize:10,
        lineHeight: 24,
        color:colors.redTextColor,
        fontWeight:'500',
    },area:{
        height:50,
        borderBottomColor:colors.greyColor,
        borderBottomWidth:1.2
    },
    titleText:{
        fontSize:15,
        fontWeight:'500',
        padding:10
    },
    subTitleText:{
        fontSize:15,
        fontWeight:'500',
        padding:10,
        color:colors.primaryColor,
        borderWidth:1,
        width:"40%",
        textAlign:'right',
        borderRadius: 10,
        marginVertical:10
    }
})