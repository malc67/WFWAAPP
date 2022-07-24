import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Header, Avatar } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import { WebView } from 'react-native-webview';




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const HelpContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const HTML = `<html>

  <head>
      <meta content="text/html; charset=UTF-8" http-equiv="content-type">
      <style type="text/css">
        @font-face {
          font-family: 'New June';
          src: ${Platform.OS === 'ios' ? `url('NewJune-Medium.otf')` : `url('file:///android_asset/fonts/NewJune-Medium.otf')`}  format('truetype')
        }
      </style>
  </head>
  
  <body style="padding: 10pt">
      <p><span style="font-weight: 700;font-size: 25pt;font-family: "New June";">Begin by making the WFAA App a representation of your own Business. </span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span style="font-weight: 700;font-size: 25pt;font-family: "New June";">Enter Settings &gt; Profile</span><span class="c2">&nbsp;and add your Business
              Details </span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span class="c2">Checking the WFAANZ membership box will mean WFAANZ logo will appear on your quotes,
              it is important that you are financial member of the WFAANZ to check this box. </span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span>Also check the </span><span style="font-weight: 700;font-size: 25pt;font-family: "New June";">WERS for film</span><span class="c4">&nbsp;box
              if you certified and current members of </span><span class="c7">WERS</span><span class="c2">. </span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span>Want to know more about becoming a WERS member click here. &nbsp;</span><span
              class="c9"><a class="c0"
                  href="https://www.google.com/url?q=https://www.wfaanz.org.au/wers-for-film/&amp;sa=D&amp;source=editors&amp;ust=1658599831562336&amp;usg=AOvVaw2h8TFPou3eOI05OWUS6ilE">WERS
                  For Film | WFAANZ</a></span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span>Be sure to upload your company logo so it appears on your quotes. </span></p>
      <p><span style="font-weight: 700;font-size: 25pt;font-family: "New June";">Settings&gt;Settings </span></p>
      <p><span style="font-weight: 400;font-size: 25pt;font-family: "New June";">Input where you want copies of emailed Quotes to go </span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span >Select units of measure and input the cost of power to be utilised in Pay Back period
              calculations. Franchise or company details can include BSB and acct number for deposits taken on jobs.
          </span></p>
      <p><span style="font-weight: 700;font-size: 25pt;font-family: "New June";">New Client /Job </span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span>Tap Create a New Quote to start entering details for a job and client .You will need
              to enter at least the client&#39;s name and address.</span></p>
      <p><span style="font-weight: 400;font-size: 25pt;font-family: "New June";">From the main Job view, add a new room, and then add new windows to the room. Many
              fields are optional - required fields are displayed in red.</span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span>The WFWA app is designed with a hierarchy of Jobs (Quotes), Rooms and Windows. For
              example, if you don&#39;t set a specific tint film for an individual window, it will use the film set for
              the room instead. If there is no film specified for the room, it will use the default film for the job. You
              can also set a square metre cost per room, or just use a single cost for the whole job.</span></p>
      <p><span style="font-weight: 700;font-size: 25pt;font-family: "New June";">Cutting Lists</span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span>An important feature of this App is the detailed Cutting list that you can send
              Window Films WA of your own tint shop. This cutting list will make preparation as easy as possible. The
              cutting list will include a PDF attachment of labels for us, or you to attach to individual pieces of film
              as they are cut. They will define the room, dimensions, and the film type. The labels have been formatted to
              be printed from on a sheet of pre-cut and stickered labels by Avery. These labels can be purchased online at
              most good stationary suppliers but we find easier to order the product direct here &nbsp;from Avery
              &nbsp;</span><span class="c9"><a class="c0"
                  href="https://www.google.com/url?q=https://www.averyproducts.com.au/blank-labels/rectangle-63x29mm&amp;sa=D&amp;source=editors&amp;ust=1658599831563817&amp;usg=AOvVaw3A2Awy_0Dg_6UTQEMGFvWP">63.5
                  x 29.6mm Rectangle, Avery&reg; Blank Labels 63x29-R | Avery Australia
                  (averyproducts.com.au)</a></span><span class="c5">.</span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span>If you having trouble sourcing them, we can also supply these Labels with Purchases
              of Film from Window films WA. &nbsp;</span></p>
      <p><span class="c5"></span></p>
      <p><span class="c2"></span></p>
      <h3 ><span style="font-weight: 700;font-size: 25pt;font-family: "New June";">Data </span></h3>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span>The app allows for multiple users from a single company from either &nbsp;IOS or
              Android &nbsp;devices. To enable this universal access , a third-party cloud service called firebase looks
              after your Data. The only access to this data, is thru the app using your company log in details. &nbsp;All
              quotes and information within the app are stored on this Database. An internet connection is required or
              retrieve or store information. &nbsp;</span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span></span></p>
      <p style="font-weight: 400;font-size: 25pt;font-family: "New June";"><span></span></p>
  </body>
  
  </html>`


  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Help'}
              type={'normal'}
              leftOption={
                <TouchableOpacity
                  onPress={() => {
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
    }, [navigation])
  )



  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={{ flexGrow: 1 }}>
          <WebView
            source={{
              html: HTML
            }}
            style={{ flex: 1 }}
          />

        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

export default HelpContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  textBack: {
    fontFamily: 'NewJune',
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
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    paddingHorizontal: Responsive.width(10)
  },



});
