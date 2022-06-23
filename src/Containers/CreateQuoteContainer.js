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
  Linking
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useQuote, useTheme, useWindow } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty, isUndefined } from 'lodash'
import { Header, Avatar } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import email from 'react-native-email'
import Mailer from 'react-native-mail';
import moment from 'moment'


Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const CreateQuoteContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [, , , , , updateQuote, deleteQuote] = useQuote()

  const [loading, errors, windows, getWindowsApi, , ,] = useWindow()

  const [room, setRoom] = useState(route?.params.room)
  const [data, setData] = useState(route?.params.item)

  const [price, setPrice] = useState('')
  const [priceForSealing, setPriceForSealing] = useState('')
  const [priceFilmRemoval, setPriceFilmRemoval] = useState({})

  useEffect(() => {
    const { item, room } = route?.params
    setData(item)
    setRoom(room)
  }, [route])



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Quote Cost Calculations'}
              type={'normal'}
              rightOption={
                <TouchableOpacity>
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
    }, [navigation])
  )

  const onUpdatePriceRemoval = (data) => {
    setPriceFilmRemoval(data)
  }

  const onUpdateStatusQuote = () => {
    updateQuote(data['id'], { status: true })
    setData({ ...data, status: true })
    route?.params?.onUpdateListQuote()
  }

  const getGlassArea = () => {
    let glassArea = 0
    if (room) {
      if (room['windows']) {
        room['windows'].forEach(item => {
          glassArea += item['width'] / 1000 * item['height'] / 1000 * item['quantity']
        })
      }
    } else {
      for (let room of data['rooms']) {
        if (room['windows']) {
          room['windows'].forEach(item => {
            glassArea += item['width'] / 1000 * item['height'] / 1000 * item['quantity']
          })
        }
      }
    }
    return Math.round(glassArea * 1.1 * 100) / 100
  }

  const getPriceFilmRemoval = () => {
    if (isUndefined(priceFilmRemoval) || isEmpty(priceFilmRemoval)) {
      return 0
    } else {
      let area = priceFilmRemoval['width'] / 1000 * priceFilmRemoval['drop'] / 1000 * priceFilmRemoval['quantity']
      return Math.round(area * priceFilmRemoval['price'] * 100) / 100
    }
  }


  const getPriceTotal = (percent = 1) => {
    let priceFilm = getGlassArea() * price + getPriceFilmRemoval() + Number(priceForSealing)

    return Math.round(priceFilm * percent * 100) / 100
  }

  const getEmailHtml = (isQuick = false) => {
    onUpdateStatusQuote()
    if (isQuick) {
      return (`<h1>Quotation No. ${data['quote_number']}</h1>
    <h1>${moment().format('DD MMM YYYY')}</h1>
    <p><strong>Customer details:</strong>${data['customer_name']}</p>
    <p><strong>Site details:</strong>${data['site_address']}, ${data['site_state']}</p>
    <p>Dear ${data['customer_name']},</p>
    <p>I have great pleasure in submitting the following quotation and have attached the following documents:</p>
    <ul>
    <li>Quotation 14 (contained within this document)</li>
    <li>Natura 28 Internal Window Film Brochure</li>
    <li>Sample copy of the Manufacturer&rsquo;s Warranty Form (attached to original email)</li>
    </ul>
    <p>Scope of Works:</p>
    <p><strong>Provide quotation to supply and install Natura 28 as described</strong></p>
    <p>Project Requirements &amp; Benefits:</p>
    <p>Reduce Solar Heat Gain (Heat)</p>
    <p>Reduce Ultra Violet Radiation (Fading)</p>
    <p>Reduce Glare</p>
    <p>Provide Daytime Privacy</p>
    <p><strong>About your Glass and Frames:</strong></p>
    <p>Glass Type: =&nbsp; New window /glass type</p>
    <p>Frame Type: =new window/frame type</p>
    <p><strong>Film-to-Glass Application (Recommendation):</strong></p>
    <p>Natura 28 Internal Window Film is recommended by the manufacturer</p>
    <p><strong>About SolarZone Internal Window Films:</strong></p>
    <ul>
    <li>Deliver high levels of protection from solar heat, cut energy costs by reducing the need for air-conditioning, boosting energy efficiency</li>
    <li>Dual Reflective films are ideal for commercial and residential energy-upgrade glazing projects when the customer wants quick payback but wants a neutral interior that preserves the view outside</li>
    <li>High levels of heat rejection cuts energy costs by reducing consumption and peak load</li>
    <li>Outstanding glare control for enhanced comfort</li>
    <li>Warm neutral interior with low reflectivity preserves ambiance and views</li>
    <li>99+% UV block limits fading and damage from the sun</li>
    <li>Bold appearance upgrades building exterior and maintains daytime privacy</li>
    </ul>
    <p><strong>Fade Reduction:</strong></p>
    <p>Manufacturer&rsquo;s Note: This data is a guide enabling an estimate only of fade reduction, as there are many variables that cause fading, it would be impossible to give an exact figure, therefore, does not constitute a warranty.</p>
    <p><strong>Installation of your Window Film:</strong></p>
    <p>Will be supplied and installed in accordance with manufacturer&rsquo;s installation instructions.</p>
    <p>Window Films WA employees are licenced and approved window film applicators.</p>
    <p>We are currently booking ahead for between 7 - 10 working days (if you require immediate installation, please contact me directly and I will endeavour to accommodate your requirements).</p>
    <p>Please let me know directly when you are ready to proceed and I will schedule ASAP.</p>
    <p><strong>Window Energy Rating System&nbsp;</strong></p>
    <p>Window films WA is an accredited WERS installer. Upon completion you will issued a certification of the WERS rating appropriate to the film being installed on your current&nbsp; Glazing specifications. Based on the Natura 28&nbsp; you will achieve a WERS rating <span style="color: #ff0000;">★</span><span style="color: #ff0000;">15 %&nbsp; </span>heating <span style="color: #8eaadb;">★★★</span><span style="color: #8eaadb;">32%&nbsp; </span>Cooling<span style="color: #8eaadb;">&nbsp; Rating</span><span style="color: #8eaadb;">.&nbsp;</span></p>
    <p><strong>Warranty Period &amp; Registration:</strong></p>
    <p>Natura 28 Internal Window Film carries a Lifetime Warranty for Residential applications and 12 Years Warranty for Commercial applications. The warranty period on the External Window film applications varies depending on the film used and other site variables. Please refer to the sample copy of the manufacturer&rsquo;s warranty form attached to confirm the warranty period relevant to this particular application.</p>
    <p>The original warranty document will be sent to you after installation for this types of glazing.</p>
    <p><strong>Apples for Apples Policy:</strong></p>
    <p>Window Films WA pride ourselves on giving best value pricing for quality products but if you receive a cheaper quote from our competitors we will do our very best to match it. Competitor&rsquo;s quotes must be in writing and comparable to our quoted product and service.</p>
    <p><strong>Energy savings and Payback period</strong></p>
    <p>The film manufacturers have calculated the energy savings (kwh/sqm2) based on applying film to the different glass types of commercial buildings that require air-conditioning. While we haven&rsquo;t energy modelled your particular building yet, if we apply the same reduction in Solar Energy Gain achieved by applying this film and multiply that by the amount you actually pay to run your air-conditioning we can get this estimate of the savings in your power costs.</p>
    <p>Our estimate is that you will save $315 a year and have a payback period of 3.1 years.</p>
    <p><em>Please note that this is only a guide and more accurate figures can be obtained by employing an energy auditor.</em></p>
    <div>
    <table>
    <tbody>
    <tr>
    <td>Total</td>
    <td>$${getPriceTotal(0)}</td>
    </tr>
    <tr>
    <td>GST</td>
    <td>$${getPriceTotal(0.1)}</td>
    </tr>
    <tr>
    <td>Total (including GST)</td>
    <td>$${getPriceTotal(1.1)}</td>
    </tr>
    </tbody>
    </table>
    </div>
    <p>Payment Types:</p>
    <p>Cheque, EFT (see bank details below)</p>
    <p>Please contact me directly should you require any additional information.</p>
    <p style="text-align: center;">Window Films WA77 Boulder Road MALAGA 6090&nbsp;</p>`
      )
    } else {
      return (`<h1>Quotation No. ${data['quote_number']}</h1>
      <h1>${moment().format('DD MMM YYYY')}</h1>
      <p><strong>Customer details:</strong>${data['customer_name']}</p>
      <p><strong>Site details:</strong>${data['site_address']}, ${data['site_state']}</p>
      <p>Dear ${data['customer_name']},</p>
      <p>I have great pleasure in submitting the following quotation and have attached the following documents:</p>
      <ul>
      <li>Quotation 14 (contained within this document)</li>
      <li>Natura 28 Internal Window Film Brochure</li>
      <li>Sample copy of the Manufacturer&rsquo;s Warranty Form (attached to original email)</li>
      </ul>
      <div>
      <table>
      <tbody>
      <tr>
      <td>Total</td>
      <td>$${getPriceTotal(1)}</td>
      </tr>
      <tr>
      <td>GST</td>
      <td>$${getPriceTotal(0.1)}</td>
      </tr>
      <tr>
      <td>Total (including GST)</td>
      <td>$${getPriceTotal(1.1)}</td>
      </tr>
      </tbody>
      </table>
      </div>
      <p>Payment Types:</p>
      <p>EFT (see bank details below)</p>
      <p>Please contact me directly should you require any additional information.</p>
      <p>Window Films WA77 Boulder Road MALAGA 6090</p>`)
    }
  }


  const handleEmail = (isQuick = false) => {
    const to = [data['contact_email']]
    const cc = ['malc@windowfilmswa.com.au']
    const subject = `Window Film WA Quote ${data['quote_number']}`
    Mailer.mail({
      subject: subject,
      recipients: to,
      ccRecipients: cc,
      bccRecipients: [],
      body: getEmailHtml(isQuick),
      customChooserTitle: 'Send Mail',
      isHTML: true,
      attachments: []
    }, (error, event) => {
      email(to, {
        cc: cc,
        bcc: [],
        subject: subject,
        body: getEmailHtml(isQuick),
        checkCanOpen: true
      }).catch(console.error)
    });
  }



  console.log('XXXXX', data)
  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{ height: Responsive.height(20), width: '100%' }} />
          <View style={styles.item}>
            <Text style={styles.title}>Office</Text>
            <CheckBox
              disabled={false}
              value={false}
              style={styles.checkBox}
              boxType={'square'}
              tintColor={'#B2C249'}
              onCheckColor={'#FFFFFF'}
              onTintColor={'#B2C249'}
              onFillColor={'#B2C249'}
              onValueChange={(newValue) => { }}
            />
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>Glass Area</Text>
            <Text style={styles.subValue}>{getGlassArea()}m²</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title, { color: '#C40215' }]}>Price Per m²</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={text => setPrice(text)}
                placeholder={'$ per m²'}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title, { color: '#C40215' }]}>Price Film Removal</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={'$ per m²'}
                value={priceFilmRemoval['price']}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title, { color: '#C40215' }]}>Price for Sealing</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={'$ per m²'}
                value={priceForSealing}
                onChangeText={text => setPriceForSealing(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>Film and labour total</Text>
            <Text style={styles.subValue}>$0.00</Text>
          </View>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('PriceRemoval', { item: priceFilmRemoval, onUpdatePriceRemoval })}
            style={styles.item}>
            <Text style={styles.title}>Film Removal</Text>
            <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>${getPriceFilmRemoval()}</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>


          <View style={{ height: Responsive.height(20), width: '100%' }} />
          <View style={styles.item}>
            <Text style={styles.title}>Spare</Text>
            <CheckBox
              disabled={false}
              value={false}
              style={styles.checkBox}
              boxType={'square'}
              tintColor={'#B2C249'}
              onCheckColor={'#FFFFFF'}
              onTintColor={'#B2C249'}
              onFillColor={'#B2C249'}
              onValueChange={(newValue) => { }}
            />
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Notes</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={{ height: Responsive.height(20), width: '100%' }} />


          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Discount</Text>
            <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>$0.00</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Extra Costs</Text>
            <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>$0.00</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>

          <View style={{ height: Responsive.height(20), width: '100%' }} />


          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>GST (10%)</Text>
            <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>${getPriceTotal(0.1)}</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Total</Text>
            <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>${getPriceTotal(1.1)}</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>

          <View style={{ height: Responsive.height(20), width: '100%' }} />
          <View style={styles.item}>
            <Text style={styles.title}>Attach energy saving</Text>
            <Switch
              ios_backgroundColor={"#E0E0E0"}
              thumbColor={'#FFFFFF'}
              trackColor={{ true: '#B2C249', false: '#E0E0E0' }}
              onValueChange={(value) => { }}
              value={false} />
            <View style={{ width: Responsive.width(15) }} />
          </View>



          <View style={{ height: Responsive.height(140), width: '100%' }} />

        </ScrollView>

        <View style={[Layout.fullWidth, Layout.colHCenter, styles.actionWrapper]}>

          <TouchableOpacity
            onPress={() => {
              handleEmail(false)
            }}
            style={[Layout.fill, Layout.center, styles.buttonAdd]}>
            <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Create Deatiled Proposal</Text>
          </TouchableOpacity>
          <View style={{ height: Responsive.height(10) }} />
          <TouchableOpacity
            onPress={() => {
              handleEmail(true)
            }}
            style={[Layout.fill, Layout.center, styles.buttonOrder]}>
            <Text style={[styles.textButton, { color: '#434A4F' }]}>Quick Quote</Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  )
}

export default CreateQuoteContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  textBack: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  checkBox: {
    height: Responsive.height(20),
    width: Responsive.height(20)
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
  header: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    textTransform: 'uppercase',
    color: '#A7B0B5',
    paddingHorizontal: Responsive.width(20),
    paddingTop: Responsive.width(15),
    paddingBottom: Responsive.height(10)
  },
  subTitle: {
    flex: 1,
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(10)
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
    fontSize: Responsive.font(17),
    fontFamily: 'Ubuntu-Regular',
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: Responsive.width(10)
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
  buttonAdd: {
    height: Responsive.height(50),
    backgroundColor: '#B2C249',
    borderRadius: Responsive.height(10)
  },
  buttonOrder: {
    height: Responsive.height(50),
    backgroundColor: '#FFFFFF',
    borderRadius: Responsive.height(10)
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: Responsive.font(17)
  }


});
