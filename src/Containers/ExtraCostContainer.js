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
import { Header, Avatar, DiscountType } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const ExtraCostContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [data, setData] = useState(route?.params?.item || [])

  const [data1, setData1] = useState(route?.params?.item[0] || {})
  const [data2, setData2] = useState(route?.params?.item[1] || {})
  const [data3, setData3] = useState(route?.params?.item[2] || {})
  const [data4, setData4] = useState(route?.params?.item[3] || {})

  useEffect(() => {
    const { item } = route?.params
    setData(item)
    setData1(item[0] || {})
    setData2(item[1] || {})
    setData3(item[2] || {})
    setData4(item[3] || {})
  }, [route])

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Extra Costs'}
              type={'normal'}
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    updateExtraCost()
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>Quote</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation, data, data1, data2, data3, data4])
  )


  const updateExtraCost = () => {
    route?.params?.onUpdateExtraCost([data1, data2, data3, data4])
  }


  const setValue = (text) => {
    return Number(text) < 0 ? '0' : text
  }

  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{ height: Responsive.height(20), width: '100%' }} />

          <View style={styles.item}>
            <Text style={[styles.title]}>Extra Cost</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={'Description'}
                value={data1['description']}
                onChangeText={text => setData1({ ...data1, description: text })}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Extra Cost Amount</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={''}
                value={data1['value']}
                keyboardType={'decimal-pad'}
                onChangeText={text => setData1({ ...data1, value: setValue(text) })}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={{ height: Responsive.height(20), width: '100%' }} />

          <View style={styles.item}>
            <Text style={[styles.title]}>Extra Cost</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={'Description'}
                value={data2['description']}
                onChangeText={text => setData2({ ...data2, description: text })}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Extra Cost Amount</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={''}
                value={data2['value']}
                keyboardType={'decimal-pad'}
                onChangeText={text => setData2({ ...data2, value: setValue(text) })}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={{ height: Responsive.height(20), width: '100%' }} />

          <View style={styles.item}>
            <Text style={[styles.title]}>Extra Cost</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={'Description'}
                value={data3['description']}
                onChangeText={text => setData3({ ...data3, description: text })}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Extra Cost Amount</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={''}
                value={data3['value']}
                keyboardType={'decimal-pad'}
                onChangeText={text => setData3({ ...data3, value: setValue(text) })}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={{ height: Responsive.height(20), width: '100%' }} />

          <View style={styles.item}>
            <Text style={[styles.title]}>Extra Cost</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={'Description'}
                value={data4['description']}
                onChangeText={text => setData4({ ...data4, description: text })}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Extra Cost Amount</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={''}
                value={data4['value']}
                keyboardType={'decimal-pad'}
                onChangeText={text => setData4({ ...data4, value: setValue(text) })}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>


        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

export default ExtraCostContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  textBack: {
    fontFamily: 'NewJune',
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
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  value: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  subValue: {
    fontFamily: 'NewJune',
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
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    paddingHorizontal: Responsive.width(10)
  },



});
