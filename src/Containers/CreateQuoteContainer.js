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
import { useTheme, useWindow } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty, isUndefined } from 'lodash'
import { Header, Avatar } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const CreateQuoteContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [loading, errors, windows, getWindowsApi, , ,] = useWindow()

  const [room, setRoom] = useState(route?.params.room)
  const [data, setData] = useState(route?.params.item)

  const [price, setPrice] = useState('')
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

  const getGlassArea = () => {
    let glassArea = 0
    if (room) {
      room['windows'].forEach(item => {
        glassArea += item['width'] / 1000 * item['height'] / 1000 * item['quantity']
      })
    }
    return Math.round(glassArea * 100) / 100
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
    let priceFilm = getGlassArea() * price + getPriceFilmRemoval()
    return Math.round(priceFilm * percent * 100) / 100
  }


  console.log('DATA', data)
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
              <TextInput style={styles.input} placeholder={'$ per m²'} placeholderTextColor={'#606A70'} />
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
              let body = `Quotation No. 14

              23 Apr 2022
              
              Customer details:
              
              Sorrento Surf Club West Coast Hwy, Sorrento
              
              Christine
              
              Site details:
              
              West Coast Hwy, Sorrento Dear Sorrento Surf Club,
              
              I have great pleasure in submitting the
              
              following quotation and have attached the following documents:
              
              Quotation 14 (contained within thisdocument)
              
              Natura 28 Internal Window Film Brochure • Sample copy of the Manufacturer's Warranty Form (attached to original email)
              
              Scope of Works:
              
              Provide quotation to supply and install Natura
              
              28 as described
              
              Project Requirements & Benefits Reduce Solar Heat Gain (Heat)
              
              Reduce Ultra Violet Radiation (Fading)
              
              Reduce Clare
              
              Provide Daytime Privacy
              
              About your Glass and Frames:
              
              Glass Type: New window /glass type
              
              Frame Type: =new window/frame type Film-to-Glass Application (Recommendation): Natura 28 Internal Window Film is recommended by the manufacturer
              
              About SolarZone Internal Window Films:
              
              • Deliver high levels of protection from solar
              
              heat, cut energy costs by reducing the need
              
              for air-conditioning, boosting energy
              
              efficiency
              
              • Dual Reflective films are ideal for
              
              commercial and residential energy-upgrade
              
              glazing projects when the customer wants quick payback but wants a neutral Interior that preserves the view outside
              
              High levels of heat rejection cuts energy costs by reducing consumption and peak
              
              load Outstanding glare control for enhanced
              
              comfort Warm neutral interior with low reflectivity
              
              preserves ambiance and views 99+% UV block limits fading and damage
              
              from the sun Bold appearance upgrades building exterior and maintains daytime privacy
              
              Fade Reduction:
               Manufacturer's Note: This data is a guide enabling an estimate only of fade reduction, as there are many variables that cause fading, it would be impossible to give an exact figure, therefore, does not constitute a warranty.
              
              Installation of your Window Film:
              
              Will be supplied and installed in accordance
              
              with manufacturer's installation instructions.
              
              Window Films WA employees are licenced and
              
              approved window film applicators.
              
              We are currently booking ahead for between 7-10 working days (if you require immediate
              
              installation, please contact me directly and I - will endeavour to accommodate your requirements).
              
              Please let me know directly when you are ready to proceed and I will schedule ASAP.
              
              Window Energy Rating System
              
              Window films WA is an accredited WERS installer. Upon completion you will issued a certification of the WERS rating appropriate to the film being installed on your current Glazing specifications. Based on the Natura 28 you will achieve a WERS rating 15 % heating ***32% Cooling Rating.
              
              Warranty Period & Registration:
               Natura 28 Internal Window Film carries a Lifetime Warranty for Residential applications and 12 Years Warranty for Commercial applications. The warranty period on the External Window film applications varies depending on the film used and other site variables. Please refer to the sample copy of the manufacturer's warranty form attached to confirm the warranty period relevant to this particular application.
              
              The original warranty document will be sent to
              
              you after installation for this types of glazing.
              
              Apples for Apples Policy:
              
              Window Films WA pride ourselves on giving`
              Linking.openURL(`mailto:abc@example.com?cc=abc@example.com&subject=${`Cutting list for ABC`}&body=${body}`)
            }}
            style={[Layout.fill, Layout.center, styles.buttonAdd]}>
            <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Create Deatiled Proposal</Text>
          </TouchableOpacity>
          <View style={{ height: Responsive.height(10) }} />
          <TouchableOpacity
            onPress={() => navigation.navigate('RequestQuote')}
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
