import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
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
import { Header, TabBarQuote } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'


const DATA = [
  {
    title: "Main dishes",
  },
  {
    title: "Sides",
  },
  {
    title: "Drinks",
  },
  {
    title: "Desserts",
  },
  {
    title: "Main dishes",
  },
  {
    title: "Sides",
  },
  {
    title: "Drinks",
  },
  {
    title: "Desserts",
  }
];

Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const TabQuoteContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Quotes'}
              rightOption={(<TouchableOpacity onPress={() => navigation.navigate('RequestQuote')}>
                <Image style={styles.imgArrow} source={Images.ic_plus} />
              </TouchableOpacity>)} />
          );
        },
      })
    }, [navigation])
  )

  const Item = ({ title }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('QuoteDetail')}
      style={styles.item}>
      <View style={styles.itemHeader}>
        <Text style={styles.title}>{title}</Text>
        <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
      </View>
      <Text style={styles.subTitle}>KBSC in Kommana Bay</Text>
      <View style={styles.itemHeader}>
        <Text style={styles.subTitle}>Quote:{' '}
          <Text style={styles.subTitleBold}>10</Text>
        </Text>
        <View style={Layout.fill} />
        <Text style={styles.subTitle}>Last Modified: 20 Apr 2022</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView
      style={Layout.fill}>
      <TabBarQuote colorHeightline={'#ffffff'} onChangeTab={index => { }} />

      <FlatList
        data={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item {...item} />}
        ListHeaderComponent={() => <View style={styles.separator} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={{ height: Responsive.height(85), width: '100%' }} />}
      />

      <View style={[Layout.fullWidth, Layout.colHCenter, styles.actionWrapper]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RequestQuote')}
          style={[Layout.fill, Layout.center, styles.buttonAdd]}>
          <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Create a New Quote</Text>
        </TouchableOpacity>
        <View style={{ height: Responsive.height(10) }} />
      </View>

    </SafeAreaView>
  )
}

export default TabQuoteContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  item: {
    backgroundColor: "#ffffff",
    height: Responsive.height(120),
    marginHorizontal: Responsive.width(20),
    borderRadius: Responsive.height(5),
    flexDirection: 'column',
    justifyContent: 'center'
  },
  itemHeader: {
    height: Responsive.height(48),
    alignItems: 'center',
    flexDirection: 'row'
  },
  separator: {
    height: Responsive.height(20)
  },
  title: {
    flex: 1,
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  subTitle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(13),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  subTitleBold: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: Responsive.font(13),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  imgArrow: {
    marginRight: Responsive.width(10),
    width: Responsive.height(22),
    height: Responsive.height(22),
    tintColor: '#B2C249'
  },
  actionWrapper: {
    paddingHorizontal: Responsive.width(60),
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
