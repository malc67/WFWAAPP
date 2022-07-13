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
import _, { isEmpty } from 'lodash'
import { Header, Avatar, Loader } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateSettingPref as saveUpdateSettingPref } from '@/Store/Auth'

const DATA = [
  {
    id: '1',
    title: 'Bathrom',
  },
  {
    id: '2',
    title: 'Bedroom',
  },
  {
    id: '3',
    title: 'Bedroom 2 & 3',
  },
  {
    id: '4',
    title: 'Bobby office',
  },
  {
    id: '5',
    title: 'Celestial',
  },
  {
    id: '6',
    title: 'control Tower',
  },
  {
    id: '7',
    title: 'Dinning Room',
  },
  {
    id: '8',
    title: 'Door',
  },
  {
    id: '9',
    title: 'Ensuit',
  },
];



Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const NewRoomContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [, , , , updateSettingPref, getSetting] = useAuth().BussinessProfile
  const { profile, setting } = useAuth().Data


  const [loading, setLoading] = useState(false)
  const [customName, setCustomName] = useState('')


  const [cutListsTo, setCutListsTo] = useState('')
  const [bccQuotesTo, setBccQuotesTo] = useState('')
  const [powerCost, setPowerCost] = useState(0.27)

  const [unit, setUnit] = useState('mm')
  const [followUp, setFollowUp] = useState(true)

  const [signature, setSignature] = useState('')

  const [companyLogo, setCompanyLogo] = useState('');

  useEffect(() => {
    getNewSetting()
  }, [route])

  const getNewSetting = (callback = undefined) => {
    setLoading(true)
    getSetting().then(data => {
      console.log('data', data)
      if (data) {
        setCutListsTo(data['cutListsTo'])
        setBccQuotesTo(data['bccQuotesTo'])
        setUnit(data['unit'])
        setFollowUp(data['followUp'])
        setPowerCost(data['powerCost'])
        setCompanyLogo({ uri: data['companyLogo'] })
        setSignature(data['signature'])
        dispatch(saveUpdateSettingPref({ setting: data }))
      }
      setLoading(false)
      if (callback) {
        callback()
      }
    }).catch(error => {
      setLoading(false)
      console.log('error', error)
    })
  }


  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'New Room'}
              type={'normal'}
              rightOption={
                <TouchableOpacity
                  onPress={() => {
                    let customRooms = (setting && setting['customRooms']) ? setting['customRooms'] : []
                    customRooms = [...customRooms, {
                      id: 'c',
                      title: customName,
                    }]
                    updateSettingPref(cutListsTo, bccQuotesTo, unit, followUp, powerCost, companyLogo, signature, customRooms, (isLoading) => {
                      setLoading(isLoading)
                      if (!isLoading) {
                        getNewSetting()
                        onRoomSelected({
                          id: 'c',
                          title: customName,
                        })
                      }
                    })
                  }}
                >
                  <Text style={styles.textSave}>Save</Text>
                </TouchableOpacity>
              }
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>Map</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation, route, customName])
  )


  const onRoomSelected = (room) => {
    route?.params?.onAddNewRoom(room)
    navigation.goBack()
  }

  const onRemoveCustomRoom = (val) => {
    let customRooms = (setting && setting['customRooms']) ? [...setting['customRooms']] : []
    _.remove(customRooms, item => item === val);
    updateSettingPref(cutListsTo, bccQuotesTo, unit, followUp, powerCost, companyLogo, signature, customRooms, (isLoading) => {
      setLoading(isLoading)
      if (!isLoading) {
        getNewSetting()
      }
    })
  }



  let customRooms = (setting && setting['customRooms']) ? setting['customRooms'] : []
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

            <Text style={styles.header}>Room Name</Text>
            <View style={styles.item}>
              <Text style={[styles.title]}>Custom Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'Required'}
                  value={customName}
                  onChangeText={(text) => setCustomName(text)}
                  placeholderTextColor={'#606A70'} />
              </View>
              <View style={{ width: Responsive.width(15) }} />
            </View>
            <View style={styles.separator} />
            {
              [...DATA, ...customRooms].map((item, idx) => {
                return (
                  <View key={idx} style={Layout.column}>
                    <TouchableOpacity
                      onPress={() => onRoomSelected(item)}
                      style={styles.item}>
                      <Text style={styles.title}>{item['title']}</Text>
                      {
                        item['id'] === 'c' && (
                          <TouchableOpacity
                            onPress={() => onRemoveCustomRoom(item)}
                            style={{ marginRight: Responsive.width(10) }}>
                            <MaterialCommunityIcons name='delete' size={24} color={'#B2C249'} />
                          </TouchableOpacity>
                        )
                      }
                    </TouchableOpacity>
                    <View style={styles.separator} />
                  </View>
                )
              })
            }

          </ScrollView>

        </KeyboardAvoidingView>

      </View>
      <Loader visible={loading} />
    </SafeAreaView>
  )
}

export default NewRoomContainer


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
    color: '#A7B0B5',
    paddingHorizontal: Responsive.width(20)
  },
  separator: {
    height: Responsive.height(2)
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
    color: '#434A4F',
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: Responsive.width(10)
  },


});
