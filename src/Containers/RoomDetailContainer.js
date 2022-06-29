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
  Switch,
  Alert
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useRoom, useTheme, useWindow } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Header, Avatar, Loader } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const RoomDetailContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [, , , , , deleteRoom, updateRoom] = useRoom()

  const [loading, errors, windows, getWindowsApi, createWindow, deleteWindow, updateWindow] = useWindow()


  const [quote, setQuote] = useState(route?.params?.quote)
  const [data, setData] = useState(route?.params?.item)

  useEffect(() => {
    const { item } = route?.params
    setData(item)
    const { quote } = route?.params
    setQuote(quote)

    getWindowsApi(quote['id'], item['id'])
  }, [route])

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={data['title']}
              type={'normal'}
              rightOption={
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Are your sure?",
                      "Are you sure you want to remove this room?",
                      [
                        {
                          text: "Yes",
                          onPress: () => {
                            onDeleteRoom(route?.params?.item)
                            navigation.goBack()
                          },
                        },
                        {
                          text: "No",
                        },
                      ]
                    );
                  }}
                >
                  <MaterialCommunityIcons name='delete' size={24} color={'#B2C249'} />
                </TouchableOpacity>
              }
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>Job</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation, route])
  )

  const onDeleteRoom = (item) => {
    console.log('Delete', item)
    deleteRoom(quote['id'], item['id'])
    route?.params?.onUpdateRooms()
  }

  const onUpdateTintFilm = (film) => {
    updateRoom(quote['id'], data['id'], { tint_film: film['name'] })
    setData({ ...data, tint_film: film['name'] })
    route?.params?.onUpdateRooms()
  }

  const onUpdateNotes = (notes) => {
    updateRoom(quote['id'], data['id'], { notes: notes })
    setData({ ...data, notes: notes })
    route?.params?.onUpdateRooms()
  }

  const onUpdateListQuote = () => {
    route?.params?.onUpdateListQuote()
  }

  const getTextDisplayNotes = () => {
    if (data['notes'] && data['notes'].length > 15) return `${data['notes'].substring(0, 15)}...`
    return data['notes']
  }


  const onAddNewOrUpdateWindow = (windowId, item) => {
    if (windowId) {
      updateWindow(quote['id'], data['id'], windowId, item)
    } else {
      createWindow(quote['id'], data['id'], item)
      updateRoom(quote['id'], data['id'], {
        window_count: (windows.length + 1)
      })
      route?.params?.onUpdateRooms()
    }
  }

  const onDeleteWindow = (item) => {
    deleteWindow(quote['id'], data['id'], item['id'])
    updateRoom(quote['id'], data['id'], {
      window_count: (windows.length - 1)
    })
    route?.params?.onUpdateRooms()
  }

 
  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{ height: Responsive.height(20), width: '100%' }} />

          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.subValue}>{data['title']}</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectFilm', { onUpdateTintFilm })}
            style={styles.item}>
            <Text style={styles.title}>Tint Film</Text>
            <Text style={styles.subValue}>{data['tint_film']}</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Notes', { notes: data['notes'], onUpdateNotes })}
            style={styles.item}>
            <Text style={styles.title}>Notes</Text>
            <Text style={styles.subValue}>{getTextDisplayNotes()}</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>


          <Text style={styles.header}>Window</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Window', { onAddNewOrUpdateWindow })}
            style={styles.item}>
            <Image style={[styles.imgArrow, { marginLeft: Responsive.height(20) }]} source={Images.ic_plus} />
            <Text style={[styles.title, { paddingHorizontal: Responsive.height(5) }]}>Add a New Window</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          {
            windows.map(item => {
              return (
                <View key={item['id']} style={Layout.column}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Window', { item, onAddNewOrUpdateWindow, onDeleteWindow })}
                    style={styles.item}>
                    <Text style={styles.title}>{item['name'] ? item['name'] : `${item['width']}mm x ${item['height']}mm x ${item['quantity']}`}</Text>
                    <Text style={styles.subValue}>{''}</Text>
                    <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </View>
              )
            })
          }

          <View style={{ height: Responsive.height(20), width: '100%' }} />
          <View
            style={styles.item}>
            <Text style={styles.title}>Include in Quote and Cut list</Text>
            <Switch
              ios_backgroundColor={"#E0E0E0"}
              thumbColor={'#FFFFFF'}
              trackColor={{ true: '#B2C249', false: '#E0E0E0' }}
              onValueChange={(value) => { }}
              value={false} />
            <View style={{ width: Responsive.width(15) }} />
          </View>

          <View style={{ height: Responsive.height(80), width: '100%' }} />

        </ScrollView>

        <View style={[Layout.rowHCenter, styles.actionWrapper]}>

          <TouchableOpacity
            onPress={() => {

              navigation.navigate('CreateQuote', { item: quote, room: { ...data, windows }, onUpdateListQuote })
            }}
            style={[Layout.fill, Layout.center, styles.buttonCreate]}>
            <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Create Room Quote</Text>
          </TouchableOpacity>

        </View>

      </View>
      <Loader visible={loading} />
    </SafeAreaView>
  )
}

export default RoomDetailContainer


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
  imgArrow: {
    marginRight: Responsive.width(10),
    width: Responsive.height(22),
    height: Responsive.height(22),
    tintColor: '#B2C249'
  },
  actionWrapper: {
    paddingHorizontal: Responsive.width(20),
    paddingBottom: Responsive.height(10),
    position: 'absolute',
    bottom: 0
  },
  buttonCreate: {
    height: Responsive.height(50),
    backgroundColor: '#B2C249',
    borderRadius: Responsive.height(10)
  },
  buttonSend: {
    height: Responsive.height(50),
    backgroundColor: '#FFFFFF',
    borderRadius: Responsive.height(10),
    borderColor: '#B2C249',
    borderWidth: 1
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(17)
  }


});
