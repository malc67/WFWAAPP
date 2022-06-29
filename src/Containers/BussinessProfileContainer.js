import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAuth, useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Header, CustomSelectCountry, Loader } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import { launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment'

const ImageOptions = {
  width: 500,
  height: 500,
  quality: 0.6,
  mediaType: 'photo',
};


Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const BussinessProfileContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const { profile } = useAuth().Data

  const [loading, errors, validation, bussinessProfileApi] = useAuth().BussinessProfile

  const [isEditProfile, setIsEditProfile] = useState(route?.params?.isEditProfile)

  const [bussiness, setBussiness] = useState(profile ? profile['bussiness'] : '')
  const [contactPerson, setContactPerson] = useState(profile ? profile['contactPerson'] : '')
  const [callingCode, setCallingCode] = useState(profile ? profile['callingCode'] : '')
  const [phoneNumber, setPhoneNumber] = useState(profile ? profile['phoneNumber'] : '')
  const [ABN, setABN] = useState(profile ? profile['ABN'] : '')
  const [instalationAddress, setInstalationAddress] = useState(profile ? profile['instalationAddress'] : '')
  const [city, setCity] = useState(profile ? profile['city'] : '')
  const [state, setState] = useState(profile ? profile['state'] : '')
  const [member, setMember] = useState(profile ? profile['member'] : '');
  const [WFAANZ, setWFAANZ] = useState(profile ? profile['WFAANZ'] : '')
  const [installer, setInstaller] = useState(profile ? profile['installer'] : '');
  const [companyLogo, setCompanyLogo] = useState('');


  useEffect(() => {
    if (route?.params) {
      const { isEditProfile } = route?.params
      setIsEditProfile(isEditProfile)
    }
  }, [route])


  const imagePicker = () => {
    launchImageLibrary(ImageOptions, async response => {
      console.log('image response', response);
      if (response.didCancel) {
        console.log('Image Picker Canceled');
      } else if (response.error) {
        console.log('image picker error', response.error);
      } else {
        const source = {
          name: moment().format('x') + ".jpeg",
          uri: response.assets[0].uri,
          type: "image/jpeg",
        };
        setCompanyLogo(source)
      }
    });
  }



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={isEditProfile ? "Edit Profile" : 'Bussiness Profile'}
              type={'normal'}
              leftOption={
                isEditProfile ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}
                    style={Layout.rowHCenter}>
                    <Image source={Images.ic_back} />
                    <Text style={styles.textBack}>Settings</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={Layout.rowHCenter}>
                    <Image source={Images.ic_back} style={{ opacity: 0 }} />
                  </TouchableOpacity>
                )
              }
            />
          );
        },
      })
    }, [navigation])
  )



  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={[Layout.fill, styles.scrollview]}
            contentContainerStyle={{ flexGrow: 1 }}>


            <View style={[Layout.fullWidth, styles.inputContainer]}>
              <Text style={styles.inputLabel}>Business Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[Layout.fill, styles.input]}
                  placeholder={'Business Name'}
                  value={bussiness}
                  placeholderTextColor={'#80606A70'}
                  onChangeText={(text) => setBussiness(text)} />
              </View>
              <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
              <Text style={styles.textError}>{errors['bussiness']}</Text>
            </View>

            <View style={[Layout.fullWidth, styles.inputContainer, { marginTop: Responsive.height(20) }]}>
              <Text style={styles.inputLabel}>Contact Person</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[Layout.fill, styles.input]}
                  placeholder={'Contact Person'}
                  placeholderTextColor={'#80606A70'}
                  onChangeText={(text) => setContactPerson(text)}
                  value={contactPerson} />
              </View>
              <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
              <Text style={styles.textError}>{errors['contactPerson']}</Text>
            </View>

            <View style={[Layout.fullWidth, styles.inputContainer, { marginTop: Responsive.height(20) }]}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <CustomSelectCountry
                  flexValue={0.4}
                  value={callingCode}
                  onValueChange={text => {
                    setCallingCode(text)
                  }} />
                <TextInput
                  style={[Layout.fill, styles.input]}
                  placeholder={'Phone Number'}
                  keyboardType={'phone-pad'}
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  placeholderTextColor={'#80606A70'} />
              </View>
              <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
              <Text style={styles.textError}>{errors['phoneNumber']}</Text>
            </View>

            <View style={[Layout.fullWidth, styles.inputContainer, { marginTop: Responsive.height(20) }]}>
              <Text style={styles.inputLabel}>ABN Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[Layout.fill, styles.input]}
                  placeholder={'ABN Number'}
                  placeholderTextColor={'#80606A70'}
                  value={ABN}
                  onChangeText={(text) => setABN(text)} />
              </View>
              <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
              <Text style={styles.textError}>{errors['ABN']}</Text>
            </View>

            <View style={[Layout.fullWidth, styles.inputContainer, { marginTop: Responsive.height(20) }]}>
              <Text style={styles.inputLabel}>Business Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[Layout.fill, styles.input]}
                  placeholder={'Business Address'}
                  placeholderTextColor={'#80606A70'}
                  value={instalationAddress}
                  onChangeText={(text) => setInstalationAddress(text)} />
              </View>
              <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
              <Text style={styles.textError}>{errors['instalationAddress']}</Text>
            </View>
            <View style={[Layout.fullWidth, styles.inputContainer, { marginTop: Responsive.height(20) }]}>
              <Text style={styles.inputLabel}>City/Suburb</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[Layout.fill, styles.input]}
                  placeholder={'City/Suburb'}
                  placeholderTextColor={'#80606A70'}
                  value={city}
                  onChangeText={(text) => setCity(text)} />
              </View>
              <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
              <Text style={styles.textError}>{errors['city']}</Text>
            </View>
            <View style={[Layout.fullWidth, styles.inputContainer, { marginTop: Responsive.height(20) }]}>
              <Text style={styles.inputLabel}>State</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[Layout.fill, styles.input]}
                  placeholder={'State'}
                  placeholderTextColor={'#80606A70'}
                  value={state}
                  onChangeText={(text) => setState(text)} />
              </View>
              <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
              <Text style={styles.textError}>{errors['state']}</Text>
            </View>
            <View style={[Layout.fill, Layout.row, { marginRight: Responsive.width(10), marginTop: Responsive.height(30) }]}>

              <CheckBox
                disabled={false}
                value={member}
                style={styles.checkBox}
                boxType={'square'}
                tintColor={'#B2C249'}
                onCheckColor={'#FFFFFF'}
                onTintColor={'#B2C249'}
                onFillColor={'#B2C249'}
                onValueChange={(newValue) => setMember(newValue)}
              />
              <Text style={styles.textCheckBox}>Are you a member of Window Film Association Ausdtralia New Zealand ? If so WFAANZ logo will appear on your sales quotes to customers with your membership number</Text>
            </View>

            <View style={[Layout.fullWidth, styles.inputContainer]}>
              <Text style={styles.inputLabel}>WFAANZ Menber Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[Layout.fill, styles.input]}
                  placeholder={'WFAANZ Menber Number'}
                  placeholderTextColor={'#80606A70'}
                  value={WFAANZ}
                  onChangeText={(text) => setWFAANZ(text)} />
              </View>
              <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
            </View>

            <View style={[Layout.fill, Layout.row, { marginRight: Responsive.width(10), marginTop: Responsive.height(30) }]}>

              <CheckBox
                disabled={false}
                value={installer}
                style={styles.checkBox}
                boxType={'square'}
                tintColor={'#B2C249'}
                onCheckColor={'#FFFFFF'}
                onTintColor={'#B2C249'}
                onFillColor={'#B2C249'}
                onValueChange={(newValue) => setInstaller(newValue)}
              />
              <View style={Layout.column}>
                <Text style={styles.textCheckBox}>Are you an accredited WERS for film for Film installer ?</Text>
                <Text style={styles.textSubCheckBox}>by checking this box and adding your WERS for film membership number,the WERS for film logo will also appear on your sales quotes and you will have the option to to issue WERS certificates and establishes you as a window film energy expert.</Text>
              </View>
            </View>

            <View style={[Layout.fullWidth, styles.inputContainer]}>
              <Text style={styles.inputLabel}>Upload Company Logo</Text>
              <TouchableOpacity
                onPress={imagePicker}
                style={[Layout.fill, styles.uploadContainer]} >
                {
                  companyLogo ? (
                    <Image source={companyLogo} style={styles.imageCompany} resizeMode={'contain'} />
                  ) : (
                    <View style={Layout.colCenter}>
                      <AntDesign name='clouduploado' color={'#606A70'} size={25} />
                      <Text style={styles.textUploadCompanyLogo}>Upload Company Logo</Text>
                    </View>
                  )
                }
              </TouchableOpacity>
            </View>

            <View style={{ height: Responsive.height(80), width: '100%' }} />

          </ScrollView>
        </KeyboardAvoidingView>
        <View style={[Layout.rowHCenter, styles.actionWrapper]}>

          <TouchableOpacity
            onPress={() => {
              bussinessProfileApi(bussiness, contactPerson, callingCode, phoneNumber, ABN, instalationAddress, city, state, member, WFAANZ, installer, companyLogo)
            }}
            style={[Layout.fill, Layout.center, styles.buttonDone]}>
            <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Done</Text>
          </TouchableOpacity>

        </View>

      </View>
      <Loader visible={loading} />
    </SafeAreaView>
  )
}

export default BussinessProfileContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  scrollview: {
    paddingHorizontal: Responsive.width(20),
  },
  textBack: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#B2C249'
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
  checkBox: {
    height: Responsive.height(20),
    width: Responsive.height(20)
  },
  textCheckBox: {
    color: '#606A70',
    fontFamily: 'NewJune',
    fontSize: Responsive.font(15),
    marginLeft: Responsive.width(15),
    marginRight: Responsive.width(5)
  },
  textSubCheckBox: {
    color: '#606A70',
    fontFamily: 'NewJune',
    fontSize: Responsive.font(12),
    marginLeft: Responsive.width(15),
    marginTop: Responsive.height(10),
    marginRight: Responsive.width(5)
  },
  uploadContainer: {
    height: Responsive.height(80),
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    marginTop: Responsive.height(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#A7B0B5',
    borderWidth: 1,
    borderRadius: Responsive.height(5),
    marginTop: Responsive.height(10)
  },
  imageCompany: {
    width: '100%',
    height: '100%',
    borderRadius: Responsive.height(5)
  },
  textUploadCompanyLogo: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(13),
    color: '#606A70',
    marginTop: Responsive.height(5)
  },
  actionWrapper: {
    paddingHorizontal: Responsive.width(20),
    paddingBottom: Responsive.height(10),
    position: 'absolute',
    bottom: 0
  },
  buttonDone: {
    height: Responsive.height(50),
    backgroundColor: '#B2C249',
    borderRadius: Responsive.height(10)
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(17)
  }

});
