import React, { useState } from "react";
import { View, Text, TouchableOpacity,Image , Alert } from "react-native";
import { styles } from "./Login.style";
import InputField from "../../components/InputField";
import { colors } from "../../themes/colors";
import commonStyles from "../../themes/commonStyles";
import CustomCheckBox from "../../components/CustomCheckBox";
import Button from "../../components/Button";
import LoginFunction from "./Login.function";
import Loader from "../../utils/Loader";
import LinearGradient from 'react-native-linear-gradient';
import Svg, {ClipPath, Defs, G, Path} from "react-native-svg";
import { SvgXml } from 'react-native-svg';
import constants from "../../utils/ApiConstants";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, loginValidation] = LoginFunction(props)

    return (
        <View style={styles.mainView}>
            <LinearGradient colors={[colors.whiteColor, colors.lightBlue]} style={{flex: 1,width:'100%'}}>
            <SvgXml xml={constants.xml} width="100%" height="25%" />
            <Image source={require('../../assets/images/splash1.png')} style={styles.image}/>
            <KeyboardAwareScrollView  contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
                <View style={{flex:1,justifyContent:'center'}} >
                    <View style={{flex:2,justifyContent:'flex-end'}}>
                    <Text style={styles.headerText}>Login</Text>
                    <View style={[commonStyles.innerViewStyle,{paddingBottom:20}]}>
                    <InputField
                        placeholder={"Email"}
                        placeholderTextColor={colors.placeholderColor}
                        containerStyle={commonStyles.inputContainerStyle}
                        inputStyle={commonStyles.inputInnerStyle}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType={"email-address"}
                        autoComplete={"email"}
                        value={email}
                        onEndEditing={() => setEmail(email.trim())}
                    />
                    <InputField
                        placeholder={"Password"}
                        autoComplete={"password"}
                        placeholderTextColor={colors.placeholderColor}
                        containerStyle={[commonStyles.inputContainerStyle, { marginTop: 18 }]}
                        inputStyle={commonStyles.passwordInputinnerStyle}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        />

                        </View>
                    <Text
                       style={styles.forgetText}>
                     {"Forget Password?"}
                    {/* //  onPress={() => props.navigation.navigate("Register")} */}
                  </Text>
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Button
                            buttonStyle={[commonStyles.buttonStyle, { backgroundColor: colors.primaryColor, width: "85%" }]}
                            textStyle={[commonStyles.textStyle,{fontWeight:'bold'}]}
                            text={"LOGIN"}
                            onPress={() => {
                                loginValidation(email, password)
                            }}
                            />
                </View>
                </View>
                <View style={{justifyContent:'flex-end',flex:1}}>
                    <Text
                       style={styles.footerText}>
                           {"Don't have an Account"}
                  </Text>
                  <View style={{justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                        <Button
                            buttonStyle={[commonStyles.buttonStyle,styles.signUpBtntyle ]}
                            textStyle={[commonStyles.buttonTextStyle,{fontWeight:'bold'}]}
                            text={"SIGN UP"}
                            onPress={() => props.navigation.navigate("Register")}
                            />
                </View>
              </View>
             </View>
             </KeyboardAwareScrollView>
            <Loader visible={loading} />
            </LinearGradient>
        </View>
    )

}
export default Login;