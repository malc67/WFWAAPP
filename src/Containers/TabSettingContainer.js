import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
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


Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const TabSettingContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header text={'Settings'} isShowLine={true} />
          );
        },
      })
    }, [navigation])
  )



  return (
    <SafeAreaView
      style={Layout.fill}>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[
          Layout.fill,
        ]}>

        <View style={styles.infoWrapper}>

          <Avatar height={64} firstName={'Ahihi'} lastName={'So'} />
          <Text style={styles.textName}>John Adams</Text>
          <Text style={styles.textSub}>New York</Text>
          <View style={{ height: Responsive.height(15) }} />
          <Text style={styles.textSub}>+1 987654321</Text>
          <View style={{ height: Responsive.height(15) }} />
          <Text style={styles.textSub}>johnadam@anydmain.com</Text>
          <View style={{ height: Responsive.height(30) }} />
        </View>

        <View style={{ height: Responsive.height(30) }} />
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Edit Profile</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Settings</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>About</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Help</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Sign Out</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>

        <Text style={styles.textVersion}>Version-1.02 - 2022</Text>


      </ScrollView>
    </SafeAreaView>
  )
}

export default TabSettingContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  infoWrapper: {
    backgroundColor: '#ffffff',
    paddingHorizontal: Responsive.width(20),
    paddingTop: Responsive.height(43)
  },
  textName: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: Responsive.font(48),
    color: '#1D1D1D',
    marginTop: Responsive.height(10)
  },
  textSub: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    marginTop: Responsive.height(5)
  },
  item: {
    backgroundColor: "#ffffff",
    height: Responsive.height(48),
    marginHorizontal: Responsive.width(20),
    borderRadius: Responsive.height(5),
    alignItems: 'center',
    flexDirection: 'row'
  },
  separator: {
    height: Responsive.height(2)
  },
  itemTitle: {
    flex: 1,
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  imgArrow: {
    marginRight: Responsive.width(10),
    width: Responsive.height(22),
    height: Responsive.height(22),
    tintColor: '#B2C249'
  },
  textVersion: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(13),
    color: '#606A70',
    marginTop: Responsive.height(20),
    marginHorizontal: Responsive.width(20),
  }


});
