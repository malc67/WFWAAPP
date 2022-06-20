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
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Header, Avatar } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [
  {
    id: '1',
    title: 'Bathrom',
  },
  {
    id: '2',
    title: 'Bedroom',
  },
  {
    id: '3',
    title: 'Bedroom 2 & 3',
  },
  {
    id: '4',
    title: 'Bobby office',
  },
  {
    id: '5',
    title: 'Celestial',
  },
  {
    id: '6',
    title: 'control Tower',
  },
  {
    id: '7',
    title: 'Dinning Room',
  },
  {
    id: '8',
    title: 'Door',
  },
  {
    id: '9',
    title: 'Ensuit',
  },
];



Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const NewRoomContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [customName, setCustomName] = useState('')


  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'New Room'}
              type={'normal'}
              rightOption={
                <TouchableOpacity
                  onPress={() => {
                    onRoomSelected({
                      id: 'c',
                      title: customName,
                    })
                  }}
                >
                  <Text style={styles.textSave}>Save</Text>
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
    }, [navigation, route, customName])
  )


  const onRoomSelected = (room) => {
    route?.params?.onAddNewRoom(room)
    navigation.goBack()
  }




  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{ height: Responsive.height(20), width: '100%' }} />

          <Text style={styles.header}>Room Name</Text>
          <View style={styles.item}>
            <Text style={[styles.title]}>Customer Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={'Required'}
                value={customName}
                onChangeText={(text) => setCustomName(text)}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          {
            DATA.map(item => {
              return (
                <View key={item['id']} style={Layout.column}>
                  <TouchableOpacity
                    onPress={() => onRoomSelected(item)}
                    style={styles.item}>
                    <Text style={styles.title}>{item['title']}</Text>
                  </TouchableOpacity>
                  <View style={styles.separator} />
                </View>
              )
            })
          }

        </ScrollView>



      </View>

    </SafeAreaView>
  )
}

export default NewRoomContainer


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
    color: '#434A4F',
    fontSize: Responsive.font(17),
    fontFamily: 'Ubuntu-Regular',
    paddingBottom: 0,
    paddingTop: 0,
    paddingHorizontal: Responsive.width(10)
  },


});
