import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAuth, useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme } from '@/Store/Theme'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import { Header, Avatar, Loader } from '@/Components'
import Responsive from 'react-native-lightweight-responsive'
import auth from '@react-native-firebase/auth';


Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const TabSettingContainer = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { info, profile } = useAuth().Data
  const [loading, signOut] = useAuth().SignOut
  const { Common, Fonts, Gutters, Layout, Images } = useTheme()
  const [isLoading, setIsLoading] = useState(false)


  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => {
          return (
            <Header text={'Settings'} isShowLine={true} />
          );
        },
      })
    }, [navigation])
  )


  const deleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to Delete Account?\nAll data and information will be deleted. That can\'t be undone',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'OK',
          onPress: () => {
            setIsLoading(true)
            auth().currentUser.delete()
              .then(() => {
                signOut()
                setIsLoading(false)
              }).catch(error => {
                setIsLoading(false)
              })
          }
        },
      ],
      { cancelable: false },
    );
  }


  var fullName = profile ? profile['contactPerson']?.split(' ') : []
  let firstName = fullName ? fullName[0] || '' : ''
  let lastName = fullName ? fullName[fullName.length - 1] || '' : '';
  return (
    <SafeAreaView
      style={Layout.fill}>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[
          { flexGrow: 1 }
        ]}>

        <View style={styles.infoWrapper}>

          <Avatar height={64} firstName={firstName} lastName={lastName} urlImage={profile ? profile['companyLogo'] : ''} />
          <Text style={styles.textName}>{profile ? profile['contactPerson'] : ''}</Text>
          <Text style={styles.textSub}>{profile ? profile['city'] : ''}</Text>
          <View style={{ height: Responsive.height(15) }} />
          <Text style={styles.textSub}>{profile ? `+${profile['callingCode']} ${profile['phoneNumber']}` : ``}</Text>
          <View style={{ height: Responsive.height(15) }} />
          <Text style={styles.textSub}>{info ? info['email'] : ''}</Text>
          <View style={{ height: Responsive.height(30) }} />
        </View>

        <View style={{ height: Responsive.height(30) }} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BussinessProfile', { isEditProfile: true })
          }}
          style={styles.item}>
          <Text style={styles.itemTitle}>Edit Profile</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingsPref')}
          style={styles.item}>
          <Text style={styles.itemTitle}>Settings</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>About</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
        onPress={() => navigation.navigate('Help')}
         style={styles.item}>
          <Text style={styles.itemTitle}>Help</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => signOut()}
          style={styles.item}>
          <Text style={styles.itemTitle}>Sign Out</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => deleteAccount()}
          style={styles.item}>
          <Text style={styles.itemTitle}>Delete Account</Text>
          <Image style={styles.imgArrow} source={Images.ic_arrow_right} />
        </TouchableOpacity>

        <Text style={styles.textVersion}>Version-1.02 - 2022</Text>
        <View style={{ height: Responsive.height(10) }} />

      </ScrollView>
      <Loader visible={loading} />
    </SafeAreaView>
  )
}

export default TabSettingContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1',
  },
  infoWrapper: {
    backgroundColor: '#ffffff',
    paddingHorizontal: Responsive.width(20),
    paddingTop: Responsive.height(43)
  },
  textName: {
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(48),
    color: '#1D1D1D',
    marginTop: Responsive.height(10)
  },
  textSub: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    marginTop: Responsive.height(5)
  },
  item: {
    backgroundColor: "#ffffff",
    height: Responsive.height(48),
    marginHorizontal: Responsive.width(20),
    borderRadius: Responsive.height(5),
    alignItems: 'center',
    flexDirection: 'row'
  },
  separator: {
    height: Responsive.height(2)
  },
  itemTitle: {
    flex: 1,
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  imgArrow: {
    marginRight: Responsive.width(10),
    width: Responsive.height(22),
    height: Responsive.height(22),
    tintColor: '#B2C249'
  },
  textVersion: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(13),
    color: '#606A70',
    marginTop: Responsive.height(20),
    marginHorizontal: Responsive.width(20),
  }


});
