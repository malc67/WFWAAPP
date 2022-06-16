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
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/AntDesign';


Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const TabMapContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [data, setData] = useState([
    { lat: -25.274398, lng: 133.775136, title: 'Dev buttor warranty', description: '6, Forest Green Field', id: 1 },
    { lat: -33.865143, lng: 151.209900, title: 'Dev buttor warranty', description: '6, Forest Green Field', id: 2 },
    { lat: -35.473469, lng: 149.012375, title: 'Dev buttor warranty', description: '6, Forest Green Field', id: 3 },
    { lat: -36.473469, lng: 148.012375, title: 'Dev buttor warranty', description: '6, Forest Green Field', id: 4 },
  ])


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
        loadingEnabled={true}
        region={{
          latitude: -25.274398,
          longitude: 133.775136,
          latitudeDelta: 30,
          longitudeDelta: 50,
        }}
      >
        {
          data.map(item => {
            return <Marker coordinate={{ latitude: item.lat, longitude: item.lng }}>
              <Callout onPress={() => { }}>
                <View style={styles.markerContainer}>
                  <View>
                    <Text style={styles.titleMarker}>{item.title}</Text>
                    <View style={{ height: Responsive.height(5) }} />
                    <Text style={styles.subTitleMarker}>{item.description}</Text>
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
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#434A4F',
  },
  subTitleMarker: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(13),
    color: '#606A70',
  }


});
