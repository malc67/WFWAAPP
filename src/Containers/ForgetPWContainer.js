import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  TextInput,
  Alert
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAuth, useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty, isUndefined } from 'lodash'
import { Header, Avatar, Loader } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import auth from '@react-native-firebase/auth';


const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const ForgetPWContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Forgot Password'}
              type={'normal'}
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>Login</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation])
  )

  const validEmail = () => {
    if (isUndefined(email) || isEmpty(email)) {
      setErrors({ email: 'Email is required' })
      return false
    }
    if (!regexEmail.test(email)) {
      setErrors({ email: 'Email is invalid' })
      return false
    }
    setErrors({})
    return true
  }

  const onSentForgotPW = async () => {
    if (validEmail()) {
      setLoading(true)
      auth().sendPasswordResetEmail(email)
        .then(function (user) {
          setLoading(false)
          Alert.alert('A password reset message was sent to yuor email address. Please click the link in that message to reset your password.')
        }).catch(function (e) {
          setLoading(false)
          Alert.alert('An error occurred, please try again later')
        })
    }
  }


  return (
    <ImageBackground source={Images.bg_auth_footer} style={[Layout.fill]}>
      <SafeAreaView style={[Layout.fill, styles.container]}>
        <ScrollView style={styles.scrollview} contentContainerStyle={{ flexGrow: 1 }}>

          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                placeholder={'Email'}
                keyboardType={'email-address'}
                onChangeText={text => setEmail(text)}
                onBlur={e => validEmail()}
                placeholderTextColor={'#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
            <Text style={styles.textError}>{errors['email']}</Text>
          </View>


          <View style={[Layout.rowHCenter, styles.actionWrapper]}>

            <TouchableOpacity
              onPress={onSentForgotPW}
              style={[Layout.fill, Layout.center, styles.buttonLogin]}>
              <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Sent</Text>
            </TouchableOpacity>

          </View>


        </ScrollView>
        <Loader visible={loading} />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default ForgetPWContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  textBack: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#B2C249'
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
  forgotPWContainer: {
    alignSelf: 'flex-end',
    marginTop: Responsive.height(5)
  },
  textForgotPW: {
    color: '#485973',
    fontFamily: 'NewJune',
    fontSize: Responsive.font(15),
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

});
