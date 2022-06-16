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
const QuoteDetailContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Job Name....'}
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
            <Text style={styles.subValue}>Nutler</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectFilm')}
            style={styles.item}>
            <Text style={styles.title}>Tint Film</Text>
            <Text style={styles.subValue}>Nutler</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Notes</Text>
            <Text style={styles.subValue}>{''}</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>


          <Text style={styles.header}>Rooms</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('NewRoom')}
            style={styles.item}>
            <Image style={[styles.imgArrow, { marginLeft: Responsive.height(20) }]} source={Images.ic_plus} />
            <Text style={[styles.title, { paddingHorizontal: Responsive.height(5) }]}>Add a New Room</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('RoomDetail')}
            style={styles.item}>
            <Text style={styles.title}>Office</Text>
            <Text style={styles.subValue}>1 window</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('RoomDetail')}
            style={styles.item}>
            <Text style={styles.title}>Spare</Text>
            <Text style={styles.subValue}>1 window</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>


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
