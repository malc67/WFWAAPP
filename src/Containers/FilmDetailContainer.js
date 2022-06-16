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
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const FilmDetailContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Night Owl 05'}
              type={'normal'}
              isShowLine={true}
              rightOption={
                <TouchableOpacity>
                  <Text style={styles.textDatasheet}>Datasheet</Text>
                </TouchableOpacity>
              }
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>Films</Text>
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
            <Text style={styles.title}>Group</Text>
            <Text style={styles.value}>-</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>Sub-Group</Text>
            <Text style={styles.value}>-</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>Code</Text>
            <Text style={styles.subValue}>R058N0W</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>Type</Text>
            <Text style={styles.subValue}>Interior</Text>
          </View>

          <Text style={styles.header}>Glass Compatibility</Text>
          <View style={styles.item}>
            <View style={{ width: Responsive.width(20) }} />
            <Icon name='checkmark-circle' size={18} color={'#00A43F'} />
            <Text style={styles.subTitle}>Single Clear</Text>
            <MaterialCommunityIcons name='information' size={18} color={'#606A70'} />
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <View style={{ width: Responsive.width(20) }} />
            <Icon name='checkmark-circle' size={18} color={'#00A43F'} />
            <Text style={styles.subTitle}>Single Clear</Text>
            <MaterialCommunityIcons name='information' size={18} color={'#606A70'} />
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <View style={{ width: Responsive.width(20) }} />
            <Icon name='checkmark-circle' size={18} color={'#00A43F'} />
            <Text style={styles.subTitle}>Single Clear</Text>
            <MaterialCommunityIcons name='information' size={18} color={'#606A70'} />
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <View style={{ width: Responsive.width(20) }} />
            <Icon name='checkmark-circle' size={18} color={'#00A43F'} />
            <Text style={styles.subTitle}>Single Clear</Text>
            <MaterialCommunityIcons name='information' size={18} color={'#606A70'} />
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <View style={{ width: Responsive.width(20) }} />
            <Icon name='checkmark-circle' size={18} color={'#00A43F'} />
            <Text style={styles.subTitle}>Single Clear</Text>
            <MaterialCommunityIcons name='information' size={18} color={'#606A70'} />
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <View style={{ width: Responsive.width(20) }} />
            <Icon name='checkmark-circle' size={18} color={'#00A43F'} />
            <Text style={styles.subTitle}>Single Clear</Text>
            <MaterialCommunityIcons name='information' size={18} color={'#606A70'} />
            <View style={{ width: Responsive.width(15) }} />
          </View>


          <Text style={styles.header}>Full Roll Sizes</Text>
          <View style={styles.item}>
            <Text style={styles.title}>24" Wide</Text>
            <Text style={styles.subValue}>610 mm</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>36" Wise</Text>
            <Text style={styles.subValue}>914 mm</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>43" Wide</Text>
            <Text style={styles.subValue}>1020 mm</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>24" Wide</Text>
            <Text style={styles.subValue}>610 mm</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>36" Wise</Text>
            <Text style={styles.subValue}>914 mm</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={styles.title}>43" Wide</Text>
            <Text style={styles.subValue}>1020 mm</Text>
          </View>

          <View style={{ height: Responsive.height(80), width: '100%' }} />



        </ScrollView>

        <View style={[Layout.rowHCenter, styles.actionWrapper]}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateQuote')
            }}
            style={[Layout.fill, Layout.center, styles.buttonAdd]}>
            <Text style={[styles.textButton, { color: '#FFFFFF' }]}>Add to Order</Text>
          </TouchableOpacity>
          <View style={{ width: Responsive.width(20) }} />
          <TouchableOpacity
            style={[Layout.fill, Layout.center, styles.buttonOrder]}>
            <Text style={[styles.textButton, { color: '#434A4F' }]}>Current Order</Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>
  )
}

export default FilmDetailContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  textBack: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  textDatasheet: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(15),
    color: '#606A70'
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
