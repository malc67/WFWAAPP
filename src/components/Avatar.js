import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Image, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import Responsive from 'react-native-lightweight-responsive'
import { isEmpty, isUndefined } from 'lodash'

Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const Avatar = ({ height, firstName, lastName, urlImage }) => {
  const { Layout, Gutters } = useTheme()

  const [isLoadError, setIsLoadError] = useState(false)

  const getFirstChar = () => {
    if (isEmpty(firstName)) return ""
    return firstName.charAt(0)
  }

  const getLastChar = () => {
    if (isEmpty(lastName)) return ""
    return lastName.charAt(0)
  }
  return (
    <SafeAreaView style={[styles.container, { height, width: height, borderRadius: height / 2 }]}>
      {
        (isUndefined(urlImage) || isEmpty(urlImage) || isLoadError) ? (
          <Text style={styles.textStyle}>{getFirstChar()}{getLastChar()}</Text>
        ) : (
          <Image style={{ width: height, height, borderRadius: height / 2 }}
            source={{ uri: urlImage }}
            onError={({ nativeEvent: { error } }) => {
              setIsLoadError(true)
            }} />
        )
      }

    </SafeAreaView>
  )
}

Avatar.propTypes = {
  height: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  urlImage: PropTypes.string
}

Avatar.defaultProps = {
  height: Responsive.height(100),
  firstName: '',
  lastName: '',
  urlImage: ''
}

export default Avatar

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B2C249',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(26),
    color: '#ffffff'
  }
});
