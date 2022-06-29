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
import { Header, TabBarQuote } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/AntDesign';


Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const TabMapContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [loading, , quotesList, getQuotesApi, ,] = useQuote()

  const [quotesListDisplay, setQuotesListDisplay] = useState(quotesList)


  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header text={'Near by Clients'} />
          );
        },
      })
    }, [navigation]))

  useEffect(() => {
    getQuotesApi()
    onFilterStatus(undefined)
  }, [])

  useEffect(() => {
    onFilterStatus(undefined)
  }, [quotesList])


  const onFilterStatus = (status = undefined) => {
    if (status === undefined) {
      setQuotesListDisplay(filter(quotesList, item => (item['status'] === undefined || item['status'] === false || item['status'] === true) && item['location']))
      return
    }
    if (status === true) {
      setQuotesListDisplay(filter(quotesList, item => item['status'] === true && item['location']))
      return
    }
    if (status === false) {
      setQuotesListDisplay(filter(quotesList, item => (item['status'] === undefined || item['status'] === false) && item['location']))
      return
    }
  }

  const onUpdateListQuote = () => {
    getQuotesApi()
  }

  return (
    <SafeAreaView
      style={Layout.fill}>
      <TabBarQuote colorHeightline={'#B2C249'} onChangeTab={index => {
        if (index === 0) onFilterStatus(undefined)
        if (index === 1) onFilterStatus(false)
        if (index === 2) onFilterStatus(true)
      }} />

      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={{
          latitude: -25.274398,
          longitude: 133.775136,
          latitudeDelta: 30,
          longitudeDelta: 50,
        }}
      >
        {
          quotesListDisplay.map(item => {
            return <Marker key={item.id} coordinate={{ latitude: item['location'].lat, longitude: item['location'].lng }}>
              <Callout onPress={() => {
                navigation.navigate('QuoteDetail', { item, onUpdateListQuote })
              }}>
                <View style={styles.markerContainer}>
                  <View>
                    <Text style={styles.titleMarker}>{item['customer_name']}</Text>
                    <View style={{ height: Responsive.height(5) }} />
                    <Text style={styles.subTitleMarker}>{item['job_name']}</Text>
                  </View>
                  <View style={{ width: Responsive.width(10) }} />
                  <TouchableOpacity>
                    <Icon
                      name="exclamationcircleo"
                      type="antdesign"
                      size={20} />
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          })
        }

      </MapView>

    </SafeAreaView>
  )
}

export default TabMapContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  map: {
    flex: 1
  },
  markerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleMarker: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
  },
  subTitleMarker: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(13),
    color: '#606A70',
  }


});
