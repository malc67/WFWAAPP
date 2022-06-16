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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const RequestQuoteContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'New Quote'}
              type={'normal'}
              rightOption={<TouchableOpacity>
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
    }, [navigation])
  )



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
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Customer Name</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Job Name</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>

          <Text style={styles.header}>Site Address</Text>
          <View style={styles.item}>
            <Text style={[styles.title]}>Address</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Suburb / State</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>

          <Text style={styles.header}>Contact</Text>
          <View style={styles.item}>
            <Text style={[styles.title]}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Phone</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Mobile</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>

          <Text style={styles.header}>Billing Address</Text>
          <View style={styles.item}>
            <Text style={[styles.title]}>Address</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Suburb / State</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>

        </ScrollView>
      </View>

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
    paddingHorizontal: Responsive.width(10)
  },



});
