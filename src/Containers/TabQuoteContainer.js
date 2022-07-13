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
import { useQuote, useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { isEmpty, filter } from 'lodash'
import { Header, Loader, TabBarQuote } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import moment from 'moment'



Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const TabQuoteContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [loading, , quotesList, getQuotesApi, ,] = useQuote()

  const [quotesListDisplay, setQuotesListDisplay] = useState(quotesList)

  const [statusTab, setStatusTab] = useState(undefined)

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Quotes'}
              rightOption={(<TouchableOpacity onPress={() => navigation.navigate('RequestQuote', { onUpdateListQuote })}>
                <Image style={styles.imgArrow} source={Images.ic_plus} />
              </TouchableOpacity>)} />
          );
        },
      })
    }, [navigation])
  )

  useEffect(() => {
    onFilterStatus(statusTab)
  }, [quotesList])

  useEffect(() => {
    getQuotesApi()
    onFilterStatus(undefined)
  }, [])

  const onUpdateListQuote = () => {
    getQuotesApi()
  }

  const onFilterStatus = (status = undefined) => {
    if (status === undefined) {
      setStatusTab(undefined)
      setQuotesListDisplay(filter(quotesList, item => item['status'] === undefined || item['status'] === false || item['status'] === true))
      return
    }
    if (status === true) {
      setStatusTab(true)
      setQuotesListDisplay(filter(quotesList, item => item['status'] === true))
      return
    }
    if (status === false) {
      setStatusTab(false)
      setQuotesListDisplay(filter(quotesList, item => item['status'] === undefined || item['status'] === false))
      return
    }
  }


  const Item = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('QuoteDetail', { item, from: 'Quotes', onUpdateListQuote })}
      style={styles.item}>
      <View style={styles.itemHeader}>
        <Text style={styles.title}>{item['customer_name']}</Text>
        <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
      </View>
      <Text style={styles.subTitle}>{item['site_address']}</Text>
      <View style={[styles.itemHeader]}>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={[Layout.fill, styles.subTitle]}>Quote:{' '}
          <Text style={styles.subTitleBold}>{item['job_name']}</Text>
        </Text>
        <Text style={styles.subTitle}>{moment(item['create_date']).format('DD MMM YYYY')}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView
      style={Layout.fill}>
      <TabBarQuote colorHeightline={'#ffffff'} onChangeTab={index => {
        if (index === 0) onFilterStatus(undefined)
        if (index === 1) onFilterStatus(false)
        if (index === 2) onFilterStatus(true)
      }} />

      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={quotesListDisplay}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item item={item} />}
        ListHeaderComponent={() => <View style={styles.separator} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={{ height: Responsive.height(85), width: '100%' }} />}
        ListEmptyComponent={<View style={[Layout.fullSize, Layout.center]}>
          <Text style={styles.textEmpty}>No Data</Text>
        </View>}
      />

      <View style={[Layout.fullWidth, Layout.colHCenter, styles.actionWrapper]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('RequestQuote', { onUpdateListQuote })}
          style={[Layout.fill, Layout.center, styles.buttonAdd]}>
          <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Create a New Quote</Text>
        </TouchableOpacity>
        <View style={{ height: Responsive.height(10) }} />
      </View>
      <Loader visible={loading} />
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
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  subTitle: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(13),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  subTitleBold: {
    fontFamily: 'NewJune-Bold',
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
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(17)
  },
  textEmpty: {
    color: '#434A4F',
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(17)
  }

});
