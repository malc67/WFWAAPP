import React, { useEffect } from 'react'
import { StyleSheet, View, Image, ImageBackground } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useAuth, useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import Responsive from 'react-native-lightweight-responsive'
import { isUndefined, isEmpty } from 'lodash'
import { useNavigation } from '@react-navigation/native'

Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const StartupContainer = () => {
  const { Layout, Images, Gutters, Fonts } = useTheme()
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { info, profile } = useAuth().Data

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    if(isUndefined(info) || isEmpty(info)){
      navigateAndSimpleReset('Login')
    }else {
      if(isUndefined(profile) || isEmpty(profile)){
        navigateAndSimpleReset('BussinessProfile')
      }else {
        navigateAndSimpleReset('Main')
      }
    }
  }

  useEffect(() => {
    init()
  })

  return (
    <ImageBackground source={Images.background_splash} style={[Layout.fill, Layout.colCenter]}>
      <Image style={styles.logo} source={Images.splash_icon} resizeMode={'contain'} />

    </ImageBackground>
  )
}

export default StartupContainer


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    width: Responsive.width(282),
    height: Responsive.height(80),
    marginBottom: Responsive.height(160)
  }
});
