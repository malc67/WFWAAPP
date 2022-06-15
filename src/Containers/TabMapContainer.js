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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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
  }
];

Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const TabMapContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header text={'Near by Clients'} />
          );
        },
      })
    }, [navigation])
  )



  return (
    <SafeAreaView
      style={Layout.fill}>
      <TabBarQuote colorHeightline={'#B2C249'} onChangeTab={index => { }} />

      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
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
  }


});
