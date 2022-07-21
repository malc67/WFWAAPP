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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import moment from 'moment'
import SheetMenu from 'react-native-sheetmenu'


const ImageOptions = {
  width: 500,
  height: 500,
  quality: 0.6,
  mediaType: 'photo',
};


Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const AddPictureContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute()
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()

  const [picture, setPicture] = useState(route?.params?.picture);


  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header
              text={route?.params?.title ? route?.params?.title : 'Add Picture'}
              type={'normal'}
              leftOption={
                <TouchableOpacity
                  onPress={() => {
                    route?.params?.onUpdatePicture(picture)
                    navigation.goBack();
                  }}
                  style={Layout.rowHCenter}>
                  <Image source={Images.ic_back} />
                  <Text style={styles.textBack}>{route?.params?.from}</Text>
                </TouchableOpacity>
              }
            />
          );
        },
      })
    }, [navigation, route, picture])
  )

  const imagePicker = () => {
    launchImageLibrary(ImageOptions, async response => {
      console.log('image response', response);
      if (response.didCancel) {
        console.log('Image Picker Canceled');
      } else if (response.error) {
        console.log('image picker error', response.error);
      } else {
        const source = {
          name: moment().format('x') + ".jpeg",
          uri: response.assets[0].uri,
          type: "image/jpeg",
        };
        setPicture(source)
      }
    });
  }

  const imageCameraPicker = () => {
    launchCamera(ImageOptions, async response => {
      console.log('image response', response);
      if (response.didCancel) {
        console.log('Image Picker Canceled');
      } else if (response.error) {
        console.log('image picker error', response.error);
      } else {
        const source = {
          name: moment().format('x') + ".jpeg",
          uri: response.assets[0].uri,
          type: "image/jpeg",
        };
        setPicture(source)
      }
    });
  }

  const onOptionPickerImage = () => {
    SheetMenu.show({
      actions: [{
        title: "Camera",
        onPress: () => {
          imageCameraPicker()
        },
      },
      {
        title: "Library",
        onPress: () => {
          imagePicker()
        },
      },
      {
        title: "Cancel",
        style: 'cancel',
        onPress: () => {
        },
      }]
    })
  }

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
              onPress={onOptionPickerImage}
              style={[Layout.fill, styles.uploadContainer]} >
              {
                picture ? (
                  <Image source={picture} style={styles.imagePicture} resizeMode={'contain'} />
                ) : (
                  <View style={Layout.colCenter}>
                    <AntDesign name='clouduploado' color={'#606A70'} size={25} />
                    <Text style={styles.textUploadPicture}>Upload Picture</Text>
                  </View>
                )
              }
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
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#B2C249'
  },
  inputLabel: {
    color: '#606A70',
    fontFamily: 'NewJune',
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
  textUploadPicture: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(13),
    color: '#606A70',
    marginTop: Responsive.height(5)
  },
  imagePicture: {
    width: '100%',
    height: '100%',
    borderRadius: Responsive.height(5)
  },


});
