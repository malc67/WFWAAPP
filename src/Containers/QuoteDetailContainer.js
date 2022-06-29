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
import email from 'react-native-email'
import Mailer from 'react-native-mail';
import moment from 'moment'




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const QuoteDetailContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [, , , , , updateQuote, deleteQuote] = useQuote()

  const [loading, errors, rooms, getRoomsApi, createRoom, ,] = useRoom()

  const [data, setData] = useState(route?.params?.item)

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
    console.log('XXX->', item)
    getRoomsApi(item['id'], true)
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
    getRoomsApi(data['id'], true)
  }

  const onDeleteQuote = () => {
    deleteQuote(data['id'])
    route?.params?.onUpdateListQuote()
  }

  const onUpdateListQuote = () => {
    route?.params?.onUpdateListQuote()
  }

  const onUpdateQuote = (data) => {
    setData(data)
    route?.params?.onUpdateListQuote()
  }


  const getTextDisplayNotes = () => {
    if (data['notes'] && data['notes'].length > 15) return `${data['notes'].substring(0, 15)}...`
    return data['notes']
  }

  const getTotalArea = () => {
    let result = 0
    if (rooms) {
      for (let room of rooms) {
        let glassArea = 0
        if (room['windows']) {
          room['windows'].forEach(item => {
            glassArea += item['width'] / 1000 * item['height'] / 1000 * item['quantity']
          })
        }
        result += glassArea
      }
    }
    return result
  }

  const getTotalFilmRemoval = () => {
    let result = 0
    if (rooms) {
      for (let room of rooms) {
        let filmRemovalArea = 0
        if (room['windows']) {
          room['windows'].forEach(item => {
            if (item['filmRemovalRequired']) {
              filmRemovalArea += item['width'] / 1000 * item['height'] / 1000 * item['quantity']
            }
          })
        }
        result += filmRemovalArea
      }
    }
    return result
  }

  const getAreaRoom = () => {
    let result = ''
    if (rooms) {
      for (let room of rooms) {
        let glassArea = 0
        if (room['windows']) {
          room['windows'].forEach(item => {
            glassArea += item['width'] / 1000 * item['height'] / 1000 * item['quantity']
          })
        }
        result += `
        <tr>
            <td>${room['title']}</td>
            <td>${glassArea}</td>
            <td>${room['notes'] ?? ''}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>`
      }
    }
    return result
  }

  const getWindowRoom = () => {
    let result = ''
    if (rooms) {
      let index = 1
      for (let room of rooms) {
        for (let window of room['windows']) {
          result += `
              <tr>
                  <td>${index}</td>
                  <td>${room['title']}</td>
                  <td>${window['tintFilm']}</td>
                  <td>${window['quantity']}</td>
                  <td>${window['width']} (mm)</td>
                  <td>${window['height']} (mm)</td>
                  <td>${window['width'] / 1000 * window['height'] / 1000 * window['quantity']} (m²)</td>
                  <td>${window['frameType']}</td>
                  <td>${window['glassType']}</td>
                  <td>${window['includeCorking']}</td>
                  <td>${window['filmRemovalRequired']}</td>
                  <td>${window['ladderType']}</td>
                  <td>${window['notes']}</td>
              </tr>`
          index++
        }
      }
    }
    return result
  }


  const getHtmlCutList = () => {
    return `
    <table>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Job</td>
        <td>${data['job_name']}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Quote</td>
        <td>${data['quote_number']}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Client</td>
        <td>${data['customer_name']}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Address</td>
        <td>${data['site_address']}, ${data['site_state']}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Billing Address</td>
        <td>${data['billing_address']}, ${data['billing_state']}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Collection /dispatch Date </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Room</td>
        <td>Area (m²)</td>
        <td>Notes</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    ${getAreaRoom()}
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Windows</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>Room</td>
        <td>Film</td>
        <td>Qty</td>
        <td>W (mm)</td>
        <td>H (mm)</td>
        <td>Area (m²)</td>
        <td>Frame</td>
        <td>Glass</td>
        <td>Corking</td>
        <td>Removal</td>
        <td>Ladder</td>
        <td>Notes</td>
    </tr>
    ${getWindowRoom()}
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td>Total area: ${getTotalArea()}m²</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Total corking: 0.00m</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Total film removal: ${getTotalFilmRemoval()}m²</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>`
  }


  const handleEmail = () => {
    const to = [data['contact_email']]
    const cc = ['malc@windowfilmswa.com.au']
    const subject = `Window Film WA Quote ${data['quote_number']}`
    Mailer.mail({
      subject: subject,
      recipients: to,
      ccRecipients: cc,
      bccRecipients: [],
      body: getHtmlCutList(),
      customChooserTitle: 'Send Mail',
      isHTML: true,
      attachments: []
    }, (error, event) => {
      if (event != 'cancelled') {
        email(to, {
          cc: cc,
          bcc: [],
          subject: subject,
          body: getHtmlCutList(),
          checkCanOpen: true
        }).catch(console.error)
      }
    });
  }

  console.log('rooms', rooms)

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
            onPress={() => navigation.navigate('RequestQuote', { item: data, onUpdateListQuote, onUpdateQuote })}
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
                    onPress={() => navigation.navigate('RoomDetail', { item, quote: data, onUpdateListQuote, onUpdateRooms })}
                    style={styles.item}>
                    <Text style={styles.title}>{item['title']}</Text>
                    <Text style={styles.subValue}>{`${item['window_count'] ?? 0} window`}</Text>
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
              navigation.navigate('CreateQuote', { item: { ...data, rooms }, onUpdateListQuote })
            }}
            style={[Layout.fill, Layout.center, styles.buttonCreate]}>
            <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Create Quote</Text>
          </TouchableOpacity>
          <View style={{ width: Responsive.width(20) }} />
          <TouchableOpacity
            onPress={handleEmail}
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
