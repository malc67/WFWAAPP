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
  Switch
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useQuote, useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Header, Avatar, Loader } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment'




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const RequestQuoteContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [loading, errors, , , createQuote] = useQuote()

  const [quoteNumber, setQuoteNumber] = useState(moment().format('DDMMYYHHMMSS'))
  const [customerName, setCustomerName] = useState('')
  const [jobName, setJobName] = useState('')
  const [siteAddress, setSiteAddress] = useState('')
  const [siteState, setSiteState] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [mobile, setMobile] = useState('')

  const [asAbove, setAsAbove] = useState(true)
  const [billingAddress, setBillingAddress] = useState('')
  const [billingState, setBillingState] = useState('')



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'New Quote'}
              type={'normal'}
              rightOption={<TouchableOpacity
                onPress={() => {
                  onCreateQuote()
                  navigation.goBack()
                }}>
                <Text style={styles.textSave}>Save</Text>
              </TouchableOpacity>}
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>Cancel</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation, quoteNumber, customerName, jobName, siteAddress, siteState, name, email, phone, billingAddress, billingState])
  )


  const onCreateQuote = () => {
    let data = {
      "quote_number": quoteNumber,
      "customer_name": customerName,
      "job_name": jobName,
      "site_address": siteAddress,
      "site_state": siteState,
      "contact_name": name,
      "contact_email": email,
      "contact_phone": phone,
      "billing_address": billingAddress,
      "billing_state": billingState,
      "create_date": moment().valueOf()
    }
    createQuote(data)
    route?.params?.onUpdateListQuote()
  }


  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{ height: Responsive.height(20), width: '100%' }} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Quote Number</Text>
            <View style={[styles.inputContainer, errors['quoteNumber'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={quoteNumber}
                onChangeText={(text) => setQuoteNumber(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Customer Name</Text>
            <View style={[styles.inputContainer, errors['customerName'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={customerName}
                onChangeText={(text) => setCustomerName(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Job Name</Text>
            <View style={[styles.inputContainer, errors['jobName'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={jobName}
                onChangeText={(text) => setJobName(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>

          <Text style={styles.header}>Site Address</Text>
          <View style={styles.item}>
            <Text style={[styles.title]}>Address</Text>
            <View style={[styles.inputContainer, errors['siteAddress'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={siteAddress}
                onChangeText={(text) => {
                  setSiteAddress(text)
                  if(asAbove) setBillingAddress(text)
                }}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Suburb / State</Text>
            <View style={[styles.inputContainer, errors['siteState'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={siteState}
                onChangeText={(text) => {
                  setSiteState(text)
                  if(asAbove) setBillingState(text)
                }}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>

          <Text style={styles.header}>Contact</Text>
          <View style={styles.item}>
            <Text style={[styles.title]}>Name</Text>
            <View style={[styles.inputContainer, errors['name'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Email</Text>
            <View style={[styles.inputContainer, errors['email'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Phone</Text>
            <View style={[styles.inputContainer, errors['phone'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Mobile</Text>
            <View style={[styles.inputContainer, errors['mobile'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={mobile}
                onChangeText={(text) => setMobile(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>

          <View style={[Layout.rowHCenter, { marginRight: Responsive.width(20) }]}>
            <Text style={[styles.header]}>Billing Address</Text>
            <View style={Layout.fill}/>
            <Switch
              ios_backgroundColor={"#E0E0E0"}
              thumbColor={'#FFFFFF'}
              trackColor={{ true: '#B2C249', false: '#E0E0E0' }}
              onValueChange={(value) => { 
                setAsAbove(value)
                if(value){
                  setBillingAddress(siteAddress)
                  setBillingState(siteState)
                }
              }}
              value={asAbove} />
          </View>

          <View style={styles.item}>
            <Text style={[styles.title]}>Address</Text>
            <View style={[styles.inputContainer, errors['billingAddress'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={billingAddress}
                onChangeText={(text) => setBillingAddress(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Suburb / State</Text>
            <View style={[styles.inputContainer, errors['billingState'] ? { borderColor: '#F55549' } : {}]}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={billingState}
                onChangeText={(text) => setBillingState(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>

        </ScrollView>
      </View>
      <Loader visible={loading} />
    </SafeAreaView>
  )
}

export default RequestQuoteContainer


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
    fontFamily: 'Ubuntu-Regular',
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: Responsive.width(10)
  },



});
