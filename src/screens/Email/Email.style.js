import { StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.lightGraay,
    },
    headerView:{
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        padding:15,
        backgroundColor:colors.lightGreyColor
    },
    headerView1:{
        paddingLeft:15,
        backgroundColor:colors.whiteColor,
        flexDirection:'row',
        borderBottomColor:colors.greyColor,
        borderBottomWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    textView:{
        padding:15,
        backgroundColor:colors.whiteColor,
        flexDirection:'row',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
    headerText:{
        fontSize:22,
        textAlign:"center",
        fontWeight:'700'
    },
    headerText1:{
        fontSize:15,
        fontWeight:'600'
    }
})