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
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <style type="text/css">
        @font-face {
          font-family: 'New June';
          src: ${Platform.OS === 'ios' ? `url('NewJune-Medium.otf')` : `url('file:///android_asset/fonts/NewJune-Medium.otf')`}  format('truetype')
        }
      </style>
  </head>
  
  <body style="padding: 10pt">
      <p><span style="font-weight: 700;font-size: 10pt;font-family: "New June";">Begin by making the WFAA App a representation of your own Business. </span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span style="font-weight: 700;font-size: 10pt;font-family: "New June";">Enter Settings &gt; Profile</span><span class="c2">&nbsp;and add your Business
              Details </span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span class="c2">Checking the WFAANZ membership box will mean WFAANZ logo will appear on your quotes,
              it is important that you are financial member of the WFAANZ to check this box. </span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span>Also check the </span><span style="font-weight: 700;font-size: 10pt;font-family: "New June";">WERS for film</span><span class="c4">&nbsp;box
              if you certified and current members of </span><span class="c7">WERS</span><span class="c2">. </span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span>Want to know more about becoming a WERS member click here. &nbsp;</span><span
              class="c9"><a class="c0"
                  href="https://www.google.com/url?q=https://www.wfaanz.org.au/wers-for-film/&amp;sa=D&amp;source=editors&amp;ust=1658599831562336&amp;usg=AOvVaw2h8TFPou3eOI05OWUS6ilE">WERS
                  For Film | WFAANZ</a></span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span>Be sure to upload your company logo so it appears on your quotes. </span></p>
      <p><span style="font-weight: 700;font-size: 10pt;font-family: "New June";">Settings&gt;Settings </span></p>
      <p><span style="font-weight: 400;font-size: 10pt;font-family: "New June";">Input where you want copies of emailed Quotes to go </span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span >Select units of measure and input the cost of power to be utilised in Pay Back period
              calculations. Franchise or company details can include BSB and acct number for deposits taken on jobs.
          </span></p>
      <p><span style="font-weight: 700;font-size: 10pt;font-family: "New June";">New Client /Job </span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span>Tap Create a New Quote to start entering details for a job and client .You will need
              to enter at least the client&#39;s name and address.</span></p>
      <p><span style="font-weight: 400;font-size: 10pt;font-family: "New June";">From the main Job view, add a new room, and then add new windows to the room. Many
              fields are optional - required fields are displayed in red.</span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span>The WFWA app is designed with a hierarchy of Jobs (Quotes), Rooms and Windows. For
              example, if you don&#39;t set a specific tint film for an individual window, it will use the film set for
              the room instead. If there is no film specified for the room, it will use the default film for the job. You
              can also set a square metre cost per room, or just use a single cost for the whole job.</span></p>
      <p><span style="font-weight: 700;font-size: 10pt;font-family: "New June";">Cutting Lists</span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span>An important feature of this App is the detailed Cutting list that you can send
              Window Films WA of your own tint shop. This cutting list will make preparation as easy as possible. The
              cutting list will include a PDF attachment of labels for us, or you to attach to individual pieces of film
              as they are cut. They will define the room, dimensions, and the film type. The labels have been formatted to
              be printed from on a sheet of pre-cut and stickered labels by Avery. These labels can be purchased online at
              most good stationary suppliers but we find easier to order the product direct here &nbsp;from Avery
              &nbsp;</span><span class="c9"><a class="c0"
                  href="https://www.google.com/url?q=https://www.averyproducts.com.au/blank-labels/rectangle-63x29mm&amp;sa=D&amp;source=editors&amp;ust=1658599831563817&amp;usg=AOvVaw3A2Awy_0Dg_6UTQEMGFvWP">63.5
                  x 29.6mm Rectangle, Avery&reg; Blank Labels 63x29-R | Avery Australia
                  (averyproducts.com.au)</a></span><span class="c5">.</span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span>If you having trouble sourcing them, we can also supply these Labels with Purchases
              of Film from Window films WA. &nbsp;</span></p>
      <p><span class="c5"></span></p>
      <p><span class="c2"></span></p>
      <h3 ><span style="font-weight: 700;font-size: 10pt;font-family: "New June";">Data </span></h3>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span>The app allows for multiple users from a single company from either &nbsp;IOS or
              Android &nbsp;devices. To enable this universal access , a third-party cloud service called firebase looks
              after your Data. The only access to this data, is thru the app using your company log in details. &nbsp;All
              quotes and information within the app are stored on this Database. An internet connection is required or
              retrieve or store information. &nbsp;</span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span></span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";"><span></span></p>
  </body>
  
  </html>`


  const HTML_TERM_AND_CONDITIONS = `<html>
  <head>
      <meta content="text/html; charset=UTF-8" http-equiv="content-type">
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <style type="text/css">
        @font-face {
          font-family: 'New June';
          src: ${Platform.OS === 'ios' ? `url('NewJune-Medium.otf')` : `url('file:///android_asset/fonts/NewJune-Medium.otf')`}  format('truetype')
        }
      </style>
  </head>
  
  <body style="padding: 10pt">
      <p><span style="font-weight: 700;font-size: 12pt;font-family: "New June";">Terms & Conditions</span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">By downloading or using the app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app. You’re not allowed to copy or modify the app, any part of the app, or our trademarks in any way. You’re not allowed to attempt to extract the source code of the app, and you also shouldn’t try to translate the app into other languages or make derivative versions. The app itself, and all the trademarks, copyright, database rights, and other intellectual property rights related to it, still belong to Window films WA Pty Ltd .</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">Window films WA Pty Ltd is committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve the right to make changes to the app or to charge for its services, at any time and for any reason. We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">The WFWA V2 app stores and processes personal data that you have provided to us, to provide our Service. It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, compromise your phone’s security features and it could mean that the WFWA V2 app won’t work properly or at all.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">The app does use third-party services that declare their Terms and Conditions.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">Link to Terms and Conditions of third-party service providers used by the app
      <ul>
        <li style="font-weight: 400;font-size: 10pt;font-family: "New June";"><a href="https://policies.google.com/terms">Google Play Services</a></li>
        <li style="font-weight: 400;font-size: 10pt;font-family: "New June";"><a href="https://firebase.google.com/terms/analytics">Google Analytics for Firebase</a></li>
      </ul>
      </p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">You should be aware that there are certain things that Window films WA Pty Ltd will not take responsibility for. Certain functions of the app will require the app to have an active internet connection. The connection can be Wi-Fi or provided by your mobile network provider, but Window films WA Pty Ltd cannot take responsibility for the app not working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">If you’re using the app outside of an area with Wi-Fi, you should remember that the terms of the agreement with your mobile network provider will still apply. As a result, you may be charged by your mobile provider for the cost of data for the duration of the connection while accessing the app, or other third-party charges. In using the app, you’re accepting responsibility for any such charges, including roaming data charges if you use the app outside of your home territory (i.e. region or country) without turning off data roaming. If you are not the bill payer for the device on which you’re using the app, please be aware that we assume that you have received permission from the bill payer for using the app.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">Along the same lines, Window films WA Pty Ltd cannot always take responsibility for the way you use the app i.e. You need to make sure that your device stays charged – if it runs out of battery and you can’t turn it on to avail the Service, Window films WA Pty Ltd cannot accept responsibility.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">With respect to Window films WA Pty Ltd ’s responsibility for your use of the app, when you’re using the app, it’s important to bear in mind that although we endeavor to ensure that it is updated and correct at all times, we do rely on third parties to provide information to us so that we can make it available to you. Window films WA Pty Ltd accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">At some point, we may wish to update the app. The app is currently available on Android & iOS – the requirements for the both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app. Window films WA Pty Ltd does not promise that it will always update the app so that it is relevant to you and/or works with the Android & iOS version that you have installed on your device. However, you promise to always accept updates to the application when offered to you, We may also wish to stop providing the app, and may terminate use of it at any time without giving notice of termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.</p>
      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Changes to This Terms and Conditions</p>

      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">We may update our Terms and Conditions from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms and Conditions on this page.
      These terms and conditions are effective as of 2022-07-29
      </p>
      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Contact Us</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at <a href="mailto:malc@windowfilmswa.com.au">malc@windowfilmswa.com.au</a>.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">This Terms and Conditions page was generated by <a href="https://app-privacy-policy-generator.nisrulz.com">App Privacy Policy Generator</a></p>
      
  </body>
  
  </html>`


  const HTML_PRAVICY_POLICY = `<html>
  <head>
      <meta content="text/html; charset=UTF-8" http-equiv="content-type">
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <style type="text/css">
        @font-face {
          font-family: 'New June';
          src: ${Platform.OS === 'ios' ? `url('NewJune-Medium.otf')` : `url('file:///android_asset/fonts/NewJune-Medium.otf')`}  format('truetype')
        }
      </style>
  </head>
  
  <body style="padding: 10pt">
  <p><span style="font-weight: 700;font-size: 15pt;font-family: "New June";">WFWA V2 app</span></p>
      <p><span style="font-weight: 700;font-size: 12pt;font-family: "New June";">Privacy Policy</span></p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">Window films WA Pty Ltd built the WFWA V2 app as a Free app. This SERVICE is provided by Window films WA Pty Ltd at no cost and is intended for use as is.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at WFWA V2 unless otherwise defined in this Privacy Policy.</p>
      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Information Collection and Use</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to name,address,email address,phone number,. The information that we request will be retained by us and used as described in this privacy policy.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">The app does use third-party services that may collect information used to identify you.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">Link to Terms and Conditions of third-party service providers used by the app
      <ul>
        <li style="font-weight: 400;font-size: 10pt;font-family: "New June";"><a href="https://policies.google.com/terms">Google Play Services</a></li>
        <li style="font-weight: 400;font-size: 10pt;font-family: "New June";"><a href="https://firebase.google.com/terms/analytics">Google Analytics for Firebase</a></li>
      </ul>
      </p>
      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Log Data</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</p>

      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Cookies</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.
      This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
      </p>

      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Service Providers</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">We may employ third-party companies and individuals due to the following reasons:
      <ul>
        <li style="font-weight: 400;font-size: 10pt;font-family: "New June";">To facilitate our Service;</li>
        <li style="font-weight: 400;font-size: 10pt;font-family: "New June";">To provide the Service on our behalf;</li>
        <li style="font-weight: 400;font-size: 10pt;font-family: "New June";">To perform Service-related services; or</li>
        <li style="font-weight: 400;font-size: 10pt;font-family: "New June";">To assist us in analyzing how our Service is used.</li>
      </ul>
      </p>

      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>

      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Security</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>

      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Links to Other Sites</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>

      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Children’s Privacy</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.</p>

      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Changes to This Privacy Policy</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
      This policy is effective as of 2022-07-29
      </p>


      <p style="font-weight: 700;font-size: 10pt;font-family: "New June";">Contact Us</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">If you have any questions or suggestions about our Terms and Conditions, do not hesitate to contact us at <a href="mailto:malc@windowfilmswa.com.au">malc@windowfilmswa.com.au</a>.</p>
      <p style="font-weight: 400;font-size: 10pt;font-family: "New June";">This Terms and Conditions page was generated by <a href="https://app-privacy-policy-generator.nisrulz.com">App Privacy Policy Generator</a></p>
      
  </body>
  
  </html>`



  const [data, setData] = useState(route?.params?.item)

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={getTypeContent()}
              type={'normal'}
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>{route?.params?.from ?? 'Settings'}</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation, route])
  )

  useEffect(() => {
    const item = route?.params?.item
    if (item) {
      setData(item)
    }
  }, [route])


  const getTypeContent = () => {
    switch (data) {
      case 'terms_and_conditions':
        return 'Terms and Conditions';
      case 'privacy_policy':
        return 'Privacy Policy'
      default:
        return 'Help'
    }
  }

  const getContentHtml = () => {
    switch (data) {
      case 'terms_and_conditions':
        return HTML_TERM_AND_CONDITIONS;
      case 'privacy_policy':
        return HTML_PRAVICY_POLICY
      default:
        return HTML
    }
  }

  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={{ flexGrow: 1 }}>
          <WebView
            source={{
              html: getContentHtml()
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
