import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAuth, useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import Responsive from 'react-native-lightweight-responsive'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'
import { Loader } from '@/Components'

Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const SignUpContainer = () => {
  const { Layout, Images, Gutters, Fonts } = useTheme()
  const navigation = useNavigation()
  const { t } = useTranslation()

  const [loading, errors, validation, registerApi] = useAuth().Register

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <ImageBackground source={Images.bg_auth_footer} style={[Layout.fill]}>


      <Image style={styles.imageBackgroundHeader} source={Images.bg_auth_header} resizeMode={'stretch'} />
      <SafeAreaView style={[Layout.fill, styles.container]}>
        <ScrollView style={styles.scrollview} contentContainerStyle={{ flexGrow: 1 }}>

          <Image style={styles.logo} source={Images.splash_icon} resizeMode={'contain'} />

          <Text style={styles.header}>Sign Up</Text>

          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                placeholder={'Email'}
                keyboardType={'email-address'}
                onChangeText={text => setEmail(text)}
                onBlur={e => validation(email, password)}
                placeholderTextColor={'#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
            <Text style={styles.textError}>{errors['email']}</Text>
          </View>
          <View style={[Layout.fullWidth, styles.inputContainer, { marginTop: Responsive.height(20) }]}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                secureTextEntry={!isShowPassword}
                placeholder={'Password'}
                onChangeText={text => setPassword(text)}
                onBlur={e => validation(email, password)}
                placeholderTextColor={'#80606A70'} />
              <MaterialCommunityIcons
                onPress={() => {
                  setIsShowPassword(!isShowPassword)
                }}
                name={isShowPassword ? 'eye-off-outline' : 'eye-outline'}
                size={Responsive.height(23)}
                style={styles.iconEye}
                color={isShowPassword ? '#606A70' : '#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
            <Text style={styles.textError}>{errors['password']}</Text>
          </View>
          <View style={[Layout.rowHCenter, styles.actionWrapper]}>

            <TouchableOpacity
              onPress={() => {
                registerApi(email, password)
              }}
              style={[Layout.fill, Layout.center, styles.buttonLogin]}>
              <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.policyContainer}>
            <TouchableOpacity disabled>
              <Text style={styles.textPolicy}>By signing up, you agree to our{'\n'}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Help', { from: 'Sign Up', item: 'terms_and_conditions' })}
                >
                  <Text style={[styles.textPolicy, styles.textUnderline]}>Terms</Text>
                </TouchableOpacity>
                <TouchableOpacity><Text style={[styles.textPolicy]}> & </Text></TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Help', { from: 'Sign Up', item: 'privacy_policy' })}
                >
                  <Text style={[styles.textPolicy, styles.textUnderline]}>Privacy Policy.</Text>
                </TouchableOpacity></Text>
            </TouchableOpacity>
          </View>
          <View style={Layout.fill} />
          <View style={styles.dontHaveAccountContainer}>
            <Text style={styles.textdontHaveAccount}>Already have an Account</Text>
          </View>
          <View style={[Layout.rowHCenter, styles.actionWrapper]}>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login')
              }}
              style={[Layout.fill, Layout.center, styles.buttonSignUp]}>
              <Text style={[styles.textButton, { color: '#434A4F' }]}>Login</Text>
            </TouchableOpacity>

          </View>
          <View style={{ height: Responsive.height(30), width: '100%' }} />
        </ScrollView>
        <Loader visible={loading} />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default SignUpContainer


const styles = StyleSheet.create({
  container: {
  },
  scrollview: {
    paddingHorizontal: Responsive.width(30),
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center"
  },
  imageBackgroundHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%'
  },
  logo: {
    width: Responsive.width(200),
    height: Responsive.height(60),
    marginTop: Responsive.height(20)
  },
  header: {
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(34),
    color: '#606A70',
    marginTop: Responsive.height(90)
  },
  inputContainer: {
    flexDirection: 'column',
    marginTop: Responsive.height(35)
  },
  inputLabel: {
    color: '#606A70',
    fontFamily: 'NewJune',
    fontSize: Responsive.font(13)
  },
  inputWrapper: {
    height: Responsive.height(44),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginTop: Responsive.height(5),
    alignItems: 'center'
  },
  iconEye: {
    marginRight: Responsive.width(10)
  },
  input: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#606A70',
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: Responsive.width(10)
  },
  textError: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(12),
    color: '#F55549',
    marginTop: Responsive.height(5)
  },
  actionWrapper: {
    marginTop: Responsive.height(30),
  },
  buttonLogin: {
    height: Responsive.height(50),
    backgroundColor: '#B2C249',
    borderRadius: Responsive.height(10)
  },
  textButton: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(17)
  },
  buttonSignUp: {
    height: Responsive.height(50),
    backgroundColor: '#FFFFFF',
    borderColor: '#B2C249',
    borderWidth: Responsive.height(1),
    borderRadius: Responsive.height(10)
  },
  dontHaveAccountContainer: {
    alignSelf: 'center',
    marginTop: Responsive.height(20)
  },
  textdontHaveAccount: {
    color: '#485973',
    fontFamily: 'NewJune',
    fontSize: Responsive.font(15),
  },
  policyContainer: {
    alignSelf: 'center',
    marginTop: Responsive.height(10)
  },
  textPolicy: {
    color: '#485973',
    fontFamily: 'NewJune',
    fontSize: Responsive.font(12),
    textAlign: 'center'
  },
  textUnderline: {
    textDecorationLine: 'underline'
  }
});
