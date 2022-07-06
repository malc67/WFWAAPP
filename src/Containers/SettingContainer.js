import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
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
import { Header, Units, Colour, CustomDropdown, Loader } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import { updateSettingPref as saveUpdateSettingPref } from '@/Store/Auth'



Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const SettingContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [loading, setLoading] = useState(false)

  const { profile: { settings } } = useAuth().Data
  const [, , , , updateSettingPref, getSetting] = useAuth().BussinessProfile

  const [cutListsTo, setCutListsTo] = useState('')
  const [bccQuotesTo, setBccQuotesTo] = useState('')
  const [powerCost, setPowerCost] = useState(0)

  const [unit, setUnit] = useState('mm')
  const [followUp, setFollowUp] = useState(true)

  const [signature, setSignature] = useState('')

  const [companyLogo, setCompanyLogo] = useState(settings ? { uri: settings['companyLogo'] } : '');


  useEffect(() => {
    getSetting().then(data => {
      setCutListsTo(data['cutListsTo'])
      setBccQuotesTo(data['bccQuotesTo'])
      setUnit(data['unit'])
      setFollowUp(data['followUp'])
      setPowerCost(data['powerCost'])
      setCompanyLogo(data['companyLogo'])
      setSignature(data['signature'])
      dispatch(saveUpdateSettingPref({ setting: data }))
    }).catch(error => {
      console.log('error', error)
    })
  }, [route])

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Settings'}
              type={'normal'}
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    updateSettingPref(cutListsTo, bccQuotesTo, unit, followUp, powerCost, companyLogo, signature)
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>Settings</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation, cutListsTo, bccQuotesTo, unit, followUp, powerCost, companyLogo, signature])
  )


  const getTextDisplaySignature = () => {
    if (signature && signature.length > 15) return `${signature.substring(0, 15)}...`
    return signature
  }

  const onUpdateNotes = (notes) => {
    setSignature(notes)
  }

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
            style={Layout.fill}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ height: Responsive.height(20), width: '100%' }} />

            <View style={styles.item}>
              <Text style={[styles.title]}>Cut lists to</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'Email'}
                  value={cutListsTo}
                  keyboardType={'email-address'}
                  onChangeText={(text) => {
                    setCutListsTo(text)
                  }}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title]}>Bcc quotes to</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'Email'}
                  value={bccQuotesTo}
                  keyboardType={'email-address'}
                  onChangeText={(text) => {
                    setBccQuotesTo(text)
                  }}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => { }}
              style={styles.item}>
              <Text style={styles.title}>Units</Text>
              <Units
                value={unit}
                onValueChange={value => setUnit(value)} />
              <View style={{ width: Responsive.width(15) }} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => { }}
              style={styles.item}>
              <Text style={styles.title}>Follow-up Reminder</Text>
              <Switch
                ios_backgroundColor={"#E0E0E0"}
                thumbColor={'#FFFFFF'}
                trackColor={{ true: '#B2C249', false: '#E0E0E0' }}
                onValueChange={(value) => {
                  setFollowUp(value)
                }}
                value={followUp} />
              <View style={{ width: Responsive.width(15) }} />
            </TouchableOpacity>
            <View style={styles.separator} />
            <View style={styles.item}>
              <Text style={[styles.title]}>Power Cost ($)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={''}
                  value={powerCost}
                  keyboardType={'decimal-pad'}
                  onChangeText={(text) => {
                    setPowerCost(text)
                  }}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            <TouchableOpacity
              onPress={() => {}}
              style={styles.item}>
              <Text style={styles.title}>Set a new company logo</Text>
              <Text style={styles.subValue}>{''}</Text>
              <Image style={styles.imgPreview} source={companyLogo} resizeMode={'contain'} />
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>
            <View style={{ height: Responsive.height(20), width: '100%' }} />
            <Text style={styles.header}>FRANCHISE CONTACT DETAILS</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notes', { notes: signature, title: 'Signature', from: 'Settings', onUpdateNotes })}
              style={[styles.item]}>
              <Text style={styles.title}>Signature</Text>
              <Text style={styles.subValue}>{getTextDisplaySignature()}</Text>
              <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
            </TouchableOpacity>
            <Text style={[styles.header, { textTransform: 'none' }]}>Displayed on quotes. Should contain the franchise name, address and contacts.</Text>
            <View style={{ height: Responsive.height(20), width: '100%' }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Loader visible={loading} />
    </SafeAreaView>
  )
}

export default SettingContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  textBack: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  textSave: {
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  item: {
    backgroundColor: "#ffffff",
    height: Responsive.height(48),
    marginHorizontal: Responsive.width(20),
    borderRadius: Responsive.height(5),
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  header: {
    fontSize: 14,
    fontFamily: 'NewJune',
    textTransform: 'uppercase',
    color: '#A7B0B5',
    paddingHorizontal: Responsive.width(20),
    paddingTop: Responsive.width(15),
    paddingBottom: Responsive.height(10)
  },
  value: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  subValue: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  separator: {
    height: Responsive.height(2)
  },
  imgArrow: {
    marginRight: Responsive.width(10),
    width: Responsive.height(22),
    height: Responsive.height(22),
    tintColor: '#B2C249'
  },
  imgPreview: {
    marginRight: Responsive.width(10),
    height: Responsive.height(35),
    width: Responsive.height(45),
  },
  inputContainer: {
    borderColor: 'rgb(224, 224, 224)',
    height: Responsive.height(32),
    flex: 1,
    borderWidth: Responsive.height(1),
    borderRadius: Responsive.height(5)
  },
  input: {
    flex: 1,
    textAlign: 'right',
    color: '#B2C249',
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: Responsive.width(10)
  },
  pickerStyle: {
    backgroundColor: 'white',
    width: '100%',
    height: Responsive.height(220)
  }


});
