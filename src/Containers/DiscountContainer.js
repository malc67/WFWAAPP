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
const DiscountContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [data, setData] = useState(route?.params?.item || { type: 'Amount', value: 0 })

  useEffect(() => {
    const { item } = route?.params
    setData(item)
  }, [route])

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Discount'}
              type={'normal'}
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    updateDiscount()
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
    }, [navigation, data])
  )


  const updateDiscount = () => {
    route?.params?.onUpdateDiscount({ ...data })
  }

  const getTitleLabel = () => {
    if (data && data['type'] === 'Amount') {
      return 'Discount Amount ($)'
    }
    if (data && data['type'] === 'Percent') {
      return 'Discount Percent (%)'
    }
    return 'Discount Amount ($)'
  }

  const setValue = (text) => {
    if (data && data['type'] === 'Amount') {
      return Number(text) < 0 ? '0' : text
    }
    if (data && data['type'] === 'Percent') {
      return Number(text) > 100 ? '100' : text
    }
    return text
  }


  return (
    <SafeAreaView
      style={Layout.fill}>
      <View style={[Layout.fill, Layout.column]}>
        <ScrollView
          style={Layout.fill}
          contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{ height: Responsive.height(20), width: '100%' }} />

          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Discount Type</Text>
            <DiscountType
              value={data['type']}
              onValueChange={value => {
                setData({ ...data, type: value })
              }} />
            <View style={{ width: Responsive.width(15) }} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>{getTitleLabel()}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={''}
                value={data['value']}
                keyboardType={'decimal-pad'}
                onChangeText={text => setData({ ...data, value: setValue(text) })}
                placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>


        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

export default DiscountContainer


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
    flex: 0.6,
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
