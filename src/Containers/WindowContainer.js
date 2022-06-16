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
import { Header, Aspect, Colour, CustomDropdown } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';


const FRAME_TYPE_ITEMS = [
  { label: 'Timber', value: 'Timber' },
  { label: 'Aluminium', value: 'Aluminium' },
  { label: 'Steel', value: 'Steel' },
  { label: 'PVC', value: 'PVC' },
  { label: 'Colonial', value: 'Colonial' },
  { label: 'Federation', value: 'Federation' }
]

const GLASS_TYPE_ITEMS = [
  { label: 'Laminated', value: 'Laminated' },
  { label: 'Toughened', value: 'Toughened' },
  { label: 'Double Glazed', value: 'Double Glazed' },
  { label: 'Float', value: 'Float' },
  { label: 'Low-E', value: 'Low-E' },
]
const GLASS_THICKNESS_ITEMS = [
  { label: '3mm', value: '3mm' },
  { label: '4mm', value: '4mm' },
  { label: '5mm', value: '5mm' },
  { label: '6mm', value: '6mm' },
  { label: '6.38mm', value: '6.38mm' },
  { label: '8.38mm', value: '8.38mm' },
  { label: '10.12mm', value: '10.12mm' },
  { label: '10.38mm', value: '10.38mm' },
]
const LADDER_TYPE_ITEMS = [
  { label: 'Extension', value: 'Extension' },
  { label: 'Scaffold', value: 'Scaffold' },
  { label: 'Platform 600mm', value: 'Platform 600mm' },
  { label: 'Platform 900mm', value: 'Platform 900mm' },
  { label: 'Platform 1200mm', value: 'Platform 1200mm' },
  { label: 'Platfrom 1500mm', value: 'Platfrom 1500mm' },
  { label: 'Platform 1800mm', value: 'Platform 1800mm' },
  { label: 'Platform 2100mm', value: 'Platform 2100mm' },
  { label: 'Platform 2400mm', value: 'Platform 2400mm' },
  { label: 'Step 300mm', value: 'Step 300mm' },
  { label: 'Step 600mm', value: 'Step 600mm' },
  { label: 'Step 900mm', value: 'Step 900mm' },
  { label: 'Step 1200mm', value: 'Step 1200mm' },
  { label: 'Step 1500mm', value: 'Step 1500mm' },
  { label: 'Step 1800mm', value: 'Step 1800mm' },
]


Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const WindowContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'580 x 1480 mm x 20'}
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
                  <Text style={styles.textBack}>Room</Text>
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
            <Text style={[styles.title]}>Width</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Height</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <View style={styles.item}>
            <Text style={[styles.title]}>Quantity</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={{ height: Responsive.height(20), width: '100%' }} />

          <View style={styles.item}>
            <Text style={[styles.title]}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder={'Required'} placeholderTextColor={'#606A70'} />
            </View>
            <View style={{ width: Responsive.width(15) }} />
          </View>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectFilm')}
            style={styles.item}>
            <Text style={styles.title}>Tint Film</Text>
            <Text style={styles.subValue}>Nutler</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Notes</Text>
            <Text style={styles.subValue}>{''}</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={{ height: Responsive.height(20), width: '100%' }} />
          <TouchableOpacity
            onPress={() => navigation.navigate('AddPicture')}
            style={styles.item}>
            <Text style={styles.title}>Add Picture</Text>
            <Text style={styles.subValue}>{''}</Text>
            <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
          </TouchableOpacity>
          <View style={{ height: Responsive.height(20), width: '100%' }} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Aspect</Text>
            <Aspect onValueChange={index => console.log(index)} />
            <View style={{ width: Responsive.width(15) }} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Frame Type</Text>
            <CustomDropdown items={FRAME_TYPE_ITEMS} />
            <View style={{ width: Responsive.width(15) }} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Frame Colour</Text>
            <Colour onValueChange={index => console.log(index)} />
            <View style={{ width: Responsive.width(15) }} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Glass Type</Text>
            <CustomDropdown items={GLASS_TYPE_ITEMS} />
            <View style={{ width: Responsive.width(15) }} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Glass Thickness</Text>
            <CustomDropdown items={GLASS_THICKNESS_ITEMS} />
            <View style={{ width: Responsive.width(15) }} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Include Corking</Text>
            <Switch
              ios_backgroundColor={"#E0E0E0"}
              thumbColor={'#FFFFFF'}
              trackColor={{ true: '#B2C249', false: '#E0E0E0' }}
              onValueChange={(value) => { }}
              value={false} />
            <View style={{ width: Responsive.width(15) }} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Film Removal Required</Text>
            <Switch
              ios_backgroundColor={"#E0E0E0"}
              thumbColor={'#FFFFFF'}
              trackColor={{ true: '#B2C249', false: '#E0E0E0' }}
              onValueChange={(value) => { }}
              value={true} />
            <View style={{ width: Responsive.width(15) }} />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => { }}
            style={styles.item}>
            <Text style={styles.title}>Ladder Type</Text>
            <CustomDropdown items={LADDER_TYPE_ITEMS} flexValue={1.5} />
            <View style={{ width: Responsive.width(15) }} />
          </TouchableOpacity>
          <View style={{ height: Responsive.height(20), width: '100%' }} />
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default WindowContainer


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
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  separator: {
    height: Responsive.height(2)
  },
  imgArrow: {
    marginRight: Responsive.width(10),
    width: Responsive.height(22),
    height: Responsive.height(22),
    tintColor: '#B2C249'
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
    color: '#B2C249',
    fontSize: Responsive.font(17),
    fontFamily: 'Ubuntu-Regular',
    paddingHorizontal: Responsive.width(10)
  },


});
