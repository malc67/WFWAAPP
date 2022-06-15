import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, ViewPropTypes, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import Responsive from 'react-native-lightweight-responsive'

Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const Header = ({ height, text, containStyle, textStyle, leftOption, rightOption, isShowLine }) => {
  const { Layout, Gutters } = useTheme()

  const getContainerStyle = () => {
    if (isShowLine) {
      return [styles.container, {
        borderColor: '#707070',
        borderBottomWidth: 0.5
      }]
    }else {
      return styles.container
    }
  }

  return (
    <SafeAreaView style={[Layout.fullWidth, Layout.rowHCenter, getContainerStyle(), containStyle, { height }]}>
      {leftOption}
      <Text style={[Layout.fill, Gutters.smallHPadding, styles.textStyle, textStyle]}>{text}</Text>
      {rightOption}
    </SafeAreaView>
  )
}

Header.propTypes = {
  height: PropTypes.number,
  text: PropTypes.string,
  containStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  leftOption: PropTypes.element,
  rightOption: PropTypes.element,
  isShowLine: PropTypes.bool
}

Header.defaultProps = {
  height: Responsive.height(100),
  text: '',
  containStyle: {},
  textStyle: {},
  leftOption: null,
  rightOption: null,
  isShowLine: false
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  textStyle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: Responsive.font(34),
    color: '#434A4F'
  }
});
