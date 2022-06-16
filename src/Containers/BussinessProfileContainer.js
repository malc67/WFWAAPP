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
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Header, Avatar } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const BussinessProfileContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Bussiness Profile'}
              type={'normal'}
              leftOption={
                <TouchableOpacity
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} style={{ opacity: 0 }} />
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
          style={[Layout.fill, styles.scrollview]}
          contentContainerStyle={{ flexGrow: 1 }}>


          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>Business Name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                placeholder={'Business Name'}
                placeholderTextColor={'#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
          </View>

          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>Contact Person</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                placeholder={'Contact Person'}
                placeholderTextColor={'#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
          </View>

          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                placeholder={'Phone Number'}
                placeholderTextColor={'#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
          </View>

          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>ABN Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                placeholder={'ABN Number'}
                placeholderTextColor={'#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
          </View>

          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>Business Address</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                placeholder={'Business Address'}
                placeholderTextColor={'#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
          </View>
          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>City/Suburb</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                placeholder={'City/Suburb'}
                placeholderTextColor={'#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
          </View>
          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>State</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                placeholder={'State'}
                placeholderTextColor={'#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
          </View>
          <View style={[Layout.fill, Layout.row, { marginRight: Responsive.width(10), marginTop: Responsive.height(30) }]}>

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
            <Text style={styles.textCheckBox}>Are you a member of Window Film Association Ausdtralia New Zealand ? If so WFAANZ logo will appear on your sales quotes to customers with your membership number</Text>
          </View>

          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>WFAANZ Menber Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[Layout.fill, styles.input]}
                placeholder={'WFAANZ Menber Number'}
                placeholderTextColor={'#80606A70'} />
            </View>
            <View style={{ height: Responsive.height(1), backgroundColor: '#979BA3' }} />
          </View>

          <View style={[Layout.fill, Layout.row, { marginRight: Responsive.width(10), marginTop: Responsive.height(30) }]}>

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
            <View style={Layout.column}>
              <Text style={styles.textCheckBox}>Are you an accredited WERS for film for Film installer ?</Text>
              <Text style={styles.textSubCheckBox}>by checking this box and adding your WERS for film membership number,the WERS for film logo will also appear on your sales quotes and you will have the option to to issue WERS certificates and establishes you as a window film energy expert.</Text>
            </View>
          </View>

          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>Upload Company Logo</Text>
            <TouchableOpacity
              style={[Layout.fill, styles.uploadContainer]} >
              <AntDesign name='clouduploado' color={'#606A70'} size={25} />
              <Text style={styles.textUploadCompanyLogo}>Upload Company Logo</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: Responsive.height(80), width: '100%' }}/>

        </ScrollView>

        <View style={[Layout.rowHCenter, styles.actionWrapper]}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Main')
            }}
            style={[Layout.fill, Layout.center, styles.buttonDone]}>
            <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Done</Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  )
}

export default BussinessProfileContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  scrollview: {
    paddingHorizontal: Responsive.width(20),
  },
  textBack: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  inputContainer: {
    flexDirection: 'column',
    marginTop: Responsive.height(35)
  },
  inputLabel: {
    color: '#606A70',
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(13)
  },
  inputWrapper: {
    height: Responsive.height(44),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginTop: Responsive.height(5),
    alignItems: 'center'
  },
  input: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#606A70',
    paddingHorizontal: Responsive.width(10)
  },
  checkBox: {
    height: Responsive.height(20),
    width: Responsive.height(20)
  },
  textCheckBox: {
    color: '#606A70',
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(15),
    marginLeft: Responsive.width(15),
    marginRight: Responsive.width(5)
  },
  textSubCheckBox: {
    color: '#606A70',
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(12),
    marginLeft: Responsive.width(15),
    marginTop: Responsive.height(10),
    marginRight: Responsive.width(5)
  },
  uploadContainer: {
    height: Responsive.height(80),
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    marginTop: Responsive.height(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#A7B0B5',
    borderWidth: 1,
    borderRadius: Responsive.height(5),
    marginTop: Responsive.height(10)
  },
  textUploadCompanyLogo: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(13),
    color: '#606A70',
    marginTop: Responsive.height(5)
  },
  actionWrapper: {
    paddingHorizontal: Responsive.width(20),
    paddingBottom: Responsive.height(10),
    position: 'absolute',
    bottom: 0
  },
  buttonDone: {
    height: Responsive.height(50),
    backgroundColor: '#B2C249',
    borderRadius: Responsive.height(10)
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: Responsive.font(17)
  }

});
