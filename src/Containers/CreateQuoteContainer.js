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
const CreateQuoteContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Quote Cost Calculations'}
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
          <View style={styles.item}>
            <Text style={styles.title}>Office</Text>
            <CheckBox
              disabled={false}
              value={false}
              style={styles.checkBox}
              boxType={'square'}
              tintColor={'#B2C249'}
              onCheckColor={'#FFFFFF'}
              onTintColor={'#B2C249'}
              onFillColor={'#B2C249'}
              onValueChange={(newValue) => { }}
            />
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>Glass Area</Text>
            <Text style={styles.subValue}>2.53m</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title, { color: '#C40215' }]}>Price Per m2</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'$ per m²'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title, { color: '#C40215' }]}>Price Film Removal</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'$ per m²'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title, { color: '#C40215' }]}>Price for Sealing</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'$ per m²'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>Film and labour total</Text>
            <Text style={styles.subValue}>$0.00</Text>
          </View>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('PriceRemoval')}
            style={styles.item}>
            <Text style={styles.title}>Film Removal</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>


          <View style={{ height: Responsive.height(20), width: '100%' }} />
          <View style={styles.item}>
            <Text style={styles.title}>Spare</Text>
            <CheckBox
              disabled={false}
              value={false}
              style={styles.checkBox}
              boxType={'square'}
              tintColor={'#B2C249'}
              onCheckColor={'#FFFFFF'}
              onTintColor={'#B2C249'}
              onFillColor={'#B2C249'}
              onValueChange={(newValue) => { }}
            />
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Notes</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={{ height: Responsive.height(20), width: '100%' }} />


          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Discount</Text>
            <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>$0.00</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Extra Costs</Text>
            <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>$0.00</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>

          <View style={{ height: Responsive.height(20), width: '100%' }} />


          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>GST (10%)</Text>
            <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>Natura</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Total</Text>
            <Text style={[styles.subValue, { paddingHorizontal: Responsive.height(10) }]}>Natuura 1.5</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>

          <View style={{ height: Responsive.height(20), width: '100%' }} />
          <View style={styles.item}>
            <Text style={styles.title}>Attach energy saving</Text>
            <Switch
              ios_backgroundColor={"#E0E0E0"}
              thumbColor={'#FFFFFF'}
              trackColor={{ true: '#B2C249', false: '#E0E0E0' }}
              onValueChange={(value) => { }}
              value={false} />
            <View style={{ width: Responsive.width(15) }} />
          </View>



          <View style={{ height: Responsive.height(140), width: '100%' }} />

        </ScrollView>

        <View style={[Layout.fullWidth, Layout.colHCenter, styles.actionWrapper]}>

          <TouchableOpacity style={[Layout.fill, Layout.center, styles.buttonAdd]}>
            <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Create Deatiled Proposal</Text>
          </TouchableOpacity>
          <View style={{ height: Responsive.height(10) }} />
          <TouchableOpacity
            onPress={() => navigation.navigate('RequestQuote')}
            style={[Layout.fill, Layout.center, styles.buttonOrder]}>
            <Text style={[styles.textButton, { color: '#434A4F' }]}>Quick Quote</Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  )
}

export default CreateQuoteContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  textBack: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  checkBox: {
    height: Responsive.height(20),
    width: Responsive.height(20)
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
  header: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    textTransform: 'uppercase',
    color: '#A7B0B5',
    paddingHorizontal: Responsive.width(20),
    paddingTop: Responsive.width(15),
    paddingBottom: Responsive.height(10)
  },
  subTitle: {
    flex: 1,
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(10)
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
    fontFamily: 'Ubuntu-Regular',
    paddingHorizontal: Responsive.width(10)
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
