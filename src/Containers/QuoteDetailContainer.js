import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useQuote, useRoom, useTheme } from '@/Hooks'
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
const QuoteDetailContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [, , , , , updateQuote, deleteQuote] = useQuote()

  const [loading, errors, rooms, getRoomsApi, createRoom, , ] = useRoom()

  const [data, setData] = useState(route?.params.item)

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={data['job_name']}
              type={'normal'}
              rightOption={
                <TouchableOpacity onPress={() => {
                  Alert.alert(
                    "Are your sure?",
                    "Are you sure you want to remove this quote?",
                    [
                      {
                        text: "Yes",
                        onPress: () => {
                          onDeleteQuote()
                          navigation.goBack()
                        },
                      },
                      {
                        text: "No",
                      },
                    ]
                  );
                }}>
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
                  <Text style={styles.textBack}>Map</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation, route])
  )


  useEffect(() => {
    const { item } = route?.params
    setData(item)
    getRoomsApi(item['id'])
  }, [route])


  const onAddNewRoom = (item) => {
    createRoom(data['id'], item)
    route?.params?.onUpdateListQuote()
  }

  const onUpdateTintFilm = (film) => {
    updateQuote(data['id'], { tint_film: film['name'] })
    setData({ ...data, tint_film: film['name'] })
    route?.params?.onUpdateListQuote()
  }

  const onUpdateNotes = (notes) => {
    updateQuote(data['id'], { notes: notes })
    setData({ ...data, notes: notes })
    route?.params?.onUpdateListQuote()
  }

  const onUpdateRooms = () => {
    getRoomsApi(data['id'])
  }

  const onDeleteQuote = () => {
    deleteQuote(data['id'])
    route?.params?.onUpdateListQuote()
  }


  const getTextDisplayNotes = () => {
    if(data['notes'] && data['notes'].length > 15) return `${data['notes'].substring(0, 15)}...`
    return data['notes']
  }

  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{ height: Responsive.height(20), width: '100%' }} />

          <Text style={styles.header}>Browse Tint Films</Text>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Client</Text>
            <Text style={styles.subValue}>{data['customer_name']}</Text>
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


          <Text style={styles.header}>Rooms</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewRoom', { onAddNewRoom })}
            style={styles.item}>
            <Image style={[styles.imgArrow, { marginLeft: Responsive.height(20) }]} source={Images.ic_plus} />
            <Text style={[styles.title, { paddingHorizontal: Responsive.height(5) }]}>Add a New Room</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          {
            rooms?.map(item => {
              return (
                <View key={item['id']} style={Layout.column}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('RoomDetail', { onUpdateRooms, item, quote: data })}
                    style={styles.item}>
                    <Text style={styles.title}>{item['title']}</Text>
                    <Text style={styles.subValue}>1 window</Text>
                    <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </View>
              )
            })
          }



          <View style={{ height: Responsive.height(20), width: '100%' }} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Duplication Job</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>

          <View style={{ height: Responsive.height(80), width: '100%' }} />

        </ScrollView>

        <View style={[Layout.rowHCenter, styles.actionWrapper]}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateQuote')
            }}
            style={[Layout.fill, Layout.center, styles.buttonCreate]}>
            <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Create Quote</Text>
          </TouchableOpacity>
          <View style={{ width: Responsive.width(20) }} />
          <TouchableOpacity
            style={[Layout.fill, Layout.center, styles.buttonSend]}>
            <Text style={[styles.textButton, { color: '#434A4F' }]}>Send Cut List</Text>
          </TouchableOpacity>

        </View>

      </View>
      <Loader visible={loading} />
    </SafeAreaView>
  )
}

export default QuoteDetailContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  textBack: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  textSave: {
    fontFamily: 'Ubuntu-Bold',
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
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  header: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    textTransform: 'uppercase',
    color: '#A7B0B5',
    paddingHorizontal: Responsive.width(20),
    paddingTop: Responsive.width(15),
    paddingBottom: Responsive.height(10)
  },
  value: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  subValue: {
    fontFamily: 'Ubuntu-Regular',
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
    fontFamily: 'Ubuntu-Bold',
    fontSize: Responsive.font(17)
  }


});
