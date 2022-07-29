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
  Platform,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAuth, useQuote, useRoom, useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import _, { isEmpty, isUndefined } from 'lodash'
import { Header, Avatar, Loader } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import email from 'react-native-email'
import Mailer from 'react-native-mail';
import moment from 'moment'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import SheetMenu from 'react-native-sheetmenu'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';



Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const QuoteDetailContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const { profile, setting } = useAuth().Data

  const [loadingQuote, , , , , updateQuote, deleteQuote, duplicationQuote] = useQuote()

  const [loadingRoom, errors, rooms, getRoomsApi, createRoom, ,] = useRoom()

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
                  <Text style={styles.textBack}>{route?.params?.from}</Text>
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
    getRoomsApi(item['id'], true)
  }, [route])


  const onAddNewRoom = (item) => {
    createRoom(data['id'], item)
    route?.params?.onUpdateListQuote()
    getRoomsApi(data['id'], true)
  }

  const onUpdateTintFilm = (film) => {
    updateQuote(data['id'], { tint_film: film['name'] })
    setData({ ...data, tint_film: film['name'] })
    route?.params?.onUpdateListQuote()
    getRoomsApi(data['id'], true)
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
    deleteQuote(data['id'], () => {
      route?.params?.onUpdateListQuote()
      navigation.goBack()
    })
  }

  const onUpdateListQuote = () => {
    route?.params?.onUpdateListQuote()
    getRoomsApi(data['id'], true)
  }

  const onUpdateQuote = (data) => {
    setData(data)
    route?.params?.onUpdateListQuote()
    getRoomsApi(data['id'], true)
  }

  const onUpdateConfirm = (confirm) => {
    updateQuote(data['id'], { confirm })
    setData({ ...data, confirm })
    route?.params?.onUpdateListQuote()
  }


  const getTextDisplayNotes = () => {
    if (data['notes'] && data['notes'].length > 15) return `${data['notes'].substring(0, 15)}...`
    return data['notes']
  }

  const getSignature = () => {
    if (setting && setting['signature']) {
      return setting['signature'].replace(new RegExp('\r?\n', 'g'), '\n');
    } else {
      return `Window Films WA\n
      77 Boulder Road\n
      MALAGA 6090`
    }
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
    return Math.round(result * 100) / 100
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
    return Math.round(result * 100) / 100
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
              <tr style="border: 1px solid #6d6d6d;border-collapse: collapse;">
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${room['title']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${Math.round(glassArea * 100) / 100}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${room['notes'] ?? ''}</td>
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
        for (let window of room['windows'] ?? []) {
          let area = Math.round(window['width'] / 1000 * window['height'] / 1000 * window['quantity'] * 100) / 100
          result += `
              <tr style="border: 1px solid #6d6d6d;border-collapse: collapse;">
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${index}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${room['title']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${window['tintFilm']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${window['quantity']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${window['width']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${window['height']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${area}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${window['frameType']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${window['glassType']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${window['includeCorking']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${window['filmRemovalRequired']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${window['ladderType']}</td>
                  <td style="border: 1px solid #6d6d6d;border-collapse: collapse;padding: 0.5em;">${window['notes']}</td>
              </tr>`
          index++
        }
      }
    }
    return result
  }


  const getHtmlCutList = () => {
    return `<table style="width:100%!important">
            <tr>
                <td><strong>Job</strong></td>
                <td><span style="padding-left:2em">${data['job_name']}</span></td>
            </tr>
            <tr>
                <td><strong>Quote</strong></td>
                <td><span style="padding-left:2em">${data['quote_number']}</span></td>
            </tr>
            <tr>
                <td><strong>Client</strong></td>
                <td><span style="padding-left:2em">${data['customer_name']}</span></td>
            </tr>
            <tr>
                <td><strong>Address</strong></td>
                <td><span style="padding-left:2em">${data['site_address']}, ${data['site_state']}</span></td>
            </tr>
            <tr>
                <td><strong>Dispatch/Collection Date</strong></td>
                <td><span style="padding-left:2em">${moment().format('DD MMM YYYY')}</span></td>
            </tr>
        </table>
        <br/>
        <p><strong>Rooms</strong></p>
        <table style="border: 1px solid #6d6d6d;border-collapse: collapse;">
            <tr style="border: 1px solid #6d6d6d;border-collapse: collapse;">
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Room</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Area (m²)</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Notes</th>
            </tr>
            ${getAreaRoom()}
        </table>

        <p><strong>Windows</strong></p>
        <table style="border: 1px solid #6d6d6d;border-collapse: collapse;">
            <tr style="border: 1px solid #6d6d6d;border-collapse: collapse;">
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;"></th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Room</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Film</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Qty</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">W (mm)</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">H (mm)</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Area (m²)</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Frame</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Glass</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Corking</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Removal</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Ladder</th>
                <th style="border: 1px solid #6d6d6d;border-collapse: collapse;">Notes</th>
            </tr>
            ${getWindowRoom()}
        </table>
        <p><strong>Total area:</strong> <span>${getTotalArea()}m²</span></p>
        <p><strong>Total corking:</strong> <span>${getTotalFilmRemoval()}m²</span></p>`
  }

  const getInfoLabel = (window) => {
    let roomName = ''
    let tintFilm = ''
    let position = ''
    let wh = ''
    if (window && !isUndefined(window['tintFilm']) && !isEmpty(window['tintFilm'])) {
      tintFilm = window['tintFilm']
    } else {
      if (window && window['room'] && !isUndefined(window['room']['tint_film']) && !isEmpty(window['room']['tint_film'])) {
        tintFilm = window['room']['tint_film']
      } else {
        if (window && window['quote'] && !isUndefined(window['quote']['tint_film']) && !isEmpty(window['quote']['tint_film'])) {
          tintFilm = window['quote']['tint_film']
        }
      }
    }
    if (window && window['room']) {
      roomName = window['room']['title']
      position = window['position']
    }
    if (window) {
      wh = `${window['width']} x ${window['height']}`
    }
    return Platform.OS === 'ios' ? `</br>${roomName}</br>${tintFilm}</br>${position}</br>${wh}</br>` : `${roomName}</br>${tintFilm}</br>${position}</br>${wh}</br></br>`
  }

  const getPrintedFilmLabels = () => {
    let result = `<style type="text/css">
      @font-face {
        font-family: 'New June';
        src: ${Platform.OS === 'ios' ? `url('NewJune-Medium.otf')` : `url('file:///android_asset/fonts/NewJune-Medium.otf')`}  format('truetype')
    }
    </style>
    <table style="width: 100%;border-collapse: collapse;">
                  <tr style="border-collapse: collapse;">
                      <th style="width: 33%;border-collapse: collapse;"></th>
                      <th style="width: 33%;border-collapse: collapse;"></th>
                      <th style="width: 33%;border-collapse: collapse;"></th>
                  </tr>`
    let styleText = Platform.OS === 'ios' ? "font-family:'New June';text-align: center;border-collapse: collapse;padding: 0.5em;font-size: 14px" : "font-family:'New June';text-align: center;border-collapse: collapse;padding: 0.5em;font-size: 15.6px"
    if (rooms) {
      let windows = []
      let printedFilmLabels = []
      for (let room of rooms) {
        if (room['windows']) {
          room['windows'].forEach(item => {
            windows.push({ ...item, room })
            for (let i = 0; i < item['quantity']; i++) {
              printedFilmLabels.push({ ...item, room, quote: data, position: `${i + 1} of ${item['quantity']}` })
            }
          })
        }
      }
      for (let i = 0; i < printedFilmLabels.length; i++) {
        if (i % 3 == 0) {
          let item1 = printedFilmLabels[i]
          let item2 = printedFilmLabels[i + 1]
          let item3 = printedFilmLabels[i + 2]
          result += `
            <tr style="border-collapse: collapse;">
                <td style="${styleText}" >${getInfoLabel(item1)}</td>
                <td style="${styleText}" >${getInfoLabel(item2)}</td>
                <td style="${styleText}" >${getInfoLabel(item3)}</td>
            </tr>`
        }
        if (i != 0 && i % 26 == 0) {
          result += `</table>`
          result += `<p style="page-break-before: always;" align=center></p>`
          result += `<table style="width: 100%;border-collapse: collapse;">
                <tr style="border-collapse: collapse;">
                    <th style="width: 33%;border-collapse: collapse;"></th>
                    <th style="width: 33%;border-collapse: collapse;"></th>
                    <th style="width: 33%;border-collapse: collapse;"></th>
                </tr>`
        }
      }
    }
    result += `</table>`
    return result
  }

  const createPrintedFilmLabels = async () => {
    let options = {
      html: `${getPrintedFilmLabels()}`,
      fileName: `${data['job_name']} Cut list Printed Film Labels`,
      directory: 'Documents',
      fonts: [resolveAssetSource(require('../../fonts/NewJune-Regular.otf')).uri],
      paddingLeft: 20,
      paddingRight: 20,
      bgColor: '#ffffff'
    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file.filePath);
    return file.filePath
  }

  const createPdfCutListAndroid = async () => {
    let options = {
      html: `${getHtmlCutList()}`,
      fileName: `Cutting List for ${data['job_name']}  (${data['quote_number']})`,
      directory: 'Documents',
      fonts: [resolveAssetSource(require('../../fonts/NewJune-Regular.otf')).uri],
      paddingLeft: 20,
      paddingRight: 20,
      bgColor: '#ffffff'
    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file.filePath);
    return file.filePath
  }

  const handleEmail = async () => {
    const to = [(setting && setting['cutListsTo']) ? setting['cutListsTo'] : data['contact_email']]
    const cc = [(setting && setting['bccQuotesTo']) ? setting['bccQuotesTo'] : 'malc@windowfilmswa.com.au']
    const bcc = [(setting && setting['bccQuotesTo']) ? setting['bccQuotesTo'] : 'malc@windowfilmswa.com.au']
    const subject = `Cutting List for ${data['job_name']}  (${data['quote_number']})`

    let path = await createPrintedFilmLabels()

    let body = ''
    let attachments = []
    if (Platform.OS === 'ios') {
      body = getHtmlCutList()
      attachments = [{
        path: path,
        type: 'pdf',
        name: `${data['job_name']} Cut list Printed Film Labels`,
      }]
    } else {
      body = `Hello\n
The attachment to this email is a cutting list\n
Job: ${data['job_name']}\n
Quote: ${data['quote_number']}\n
Address: ${data['site_address']}, ${data['site_state']}\n
Dispatch/Collection Date: ${moment().format('DD MMM YYYY')}\n\n
Please contact us directly if you  have any issues downloading these attachments or require any further information\n
${getSignature()}
      `
      let pathCutList = await createPdfCutListAndroid()
      attachments = [{
        path: pathCutList,
        type: 'pdf',
        name: `${data['job_name']} CutList`,
      },{
        path: path,
        type: 'pdf',
        name: `${data['job_name']} Cut list Printed Film Labels`,
      }]
    }

    Mailer.mail({
      subject: subject,
      recipients: to,
      ccRecipients: cc,
      bccRecipients: bcc,
      body: body,
      customChooserTitle: 'Send Mail',
      isHTML: Platform.OS === 'ios',
      attachments: attachments
    }, (error, event) => {

    });
  }

  const onOptionDuplicationJob = () => {
    SheetMenu.show({
      actions: [{
        title: "Duplication Job",
        onPress: () => {
          duplicationQuote(data['id'], () => {
            route?.params?.onUpdateListQuote()
          })
        },
      },
      {
        title: "Cancel",
        style: 'cancel',
        onPress: () => {
        },
      }]
    })
  }


  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={{ flexGrow: 1 }}>

          {
            (data['status'] === true && data['confirm'] === undefined) ? (
              <View style={[Layout.rowHCenter, styles.actionTop]}>
                <TouchableOpacity
                  onPress={() => {
                    onUpdateConfirm('accepted')
                  }}
                  style={[Layout.fill, Layout.center, styles.buttonSend]}>
                  <Text style={[styles.textButton, { color: '#434A4F', fontSize: Responsive.font(14) }]}>Quote Accepted</Text>
                </TouchableOpacity>
                <View style={{ width: Responsive.width(20) }} />
                <TouchableOpacity
                  onPress={() => {
                    onUpdateConfirm('rejected')
                  }}
                  style={[Layout.fill, Layout.center, styles.buttonSend]}>
                  <Text style={[styles.textButton, { color: '#434A4F', fontSize: Responsive.font(14) }]}>Quote Rejected</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }

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
            onPress={() => navigation.navigate('SelectFilm', { from: 'Job', onUpdateTintFilm })}
            style={styles.item}>
            <Text style={styles.title}>Tint Film</Text>
            <Text style={styles.subValue}>{data['tint_film']}</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Notes', { notes: data['notes'], from: 'Job', onUpdateNotes })}
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
            onPress={onOptionDuplicationJob}
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
      <Loader visible={loadingQuote || loadingRoom} />
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
  actionTop: {
    paddingHorizontal: Responsive.width(20),
    paddingBottom: Responsive.height(10),
    marginTop: Responsive.height(20)
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
