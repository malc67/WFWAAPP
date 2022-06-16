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
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';




Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const AddPictureContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()



  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={'Add Picture'}
              type={'normal'}
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
          style={[Layout.fill, styles.scrollview]}
          contentContainerStyle={{ flexGrow: 1 }}>

          <View style={{ height: Responsive.height(20), width: '100%' }} />
          

          <View style={[Layout.fullWidth, styles.inputContainer]}>
            <Text style={styles.inputLabel}>Upload Picture</Text>
            <TouchableOpacity
              style={[Layout.fill, styles.uploadContainer]} >
                <AntDesign name='clouduploado' color={'#606A70'} size={25} />
              <Text style={styles.textUploadCompanyLogo}>Upload Company Logo</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

export default AddPictureContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  scrollview: {
    paddingHorizontal: Responsive.width(20),
  },
  textBack: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  inputLabel: {
    color: '#606A70',
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(13)
  },
  inputContainer: {
    flexDirection: 'column'
  },
  uploadContainer: {
    height: Responsive.height(160),
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    marginTop: Responsive.height(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#A7B0B5',
    borderWidth: 1,
    borderRadius: Responsive.height(5),
    marginTop: Responsive.height(10)
  },
  textUploadCompanyLogo: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(13),
    color: '#606A70',
    marginTop: Responsive.height(5)
  },


});
