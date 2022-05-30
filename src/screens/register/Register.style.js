import { StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.lightGraay,
        alignItems: "center",
        // justifyContent:"center",
    },
    primaryTextStyle: {
        color: colors.primaryColor,
        fontSize: 20,
        fontWeight: "700"
    },
    blackTextStyle: {
        color: colors.blackTextColor,
        fontSize: 20,
        fontWeight: "700"
    },image:{
        width:220,
        height:65,
        position:'absolute',
        marginTop:50
    },  
    parent : {
        height : '20%',
        width : '100%',
        transform : [ { scaleX : 2 } ],
        borderBottomStartRadius : 200,
        borderBottomEndRadius : 200,
        overflow : 'hidden',
    },
    child : {
        flex : 1,
        transform : [ { scaleX : 0.5 } ],
        backgroundColor : colors.lightBlue,
        alignItems : 'center',
        justifyContent : 'center'
    },
    headerText:{
        textAlign:'left',
        paddingLeft:25,
        color:colors.greyColor,
        fontSize:30,
        fontWeight:'bold'
    },
    forgetText:{
        textAlign:'right',
        paddingRight:30,
    },
    footerText:{
        textAlign:'center'
    },
    signUpBtntyle:{
        backgroundColor:colors.whiteColor,
        width: "85%",
        borderColor:colors.greyColor,
        borderWidth:1
    },
    typeText:{
        marginTop:10,
        fontSize:18,
        fontWeight:'500',
        color:colors.blackTextColor
    },textUpload:{
        marginTop:20,
        marginBottom:10,
        fontSize:15,
        fontWeight:'500'
    },uploadBox:{
        height:150,
        width:'100%',
        backgroundColor:colors.whiteColor,
        borderColor:colors.greyColor,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    }
})

