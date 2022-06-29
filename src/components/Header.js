import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, ViewPropTypes, Text, View, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import Responsive from 'react-native-lightweight-responsive'

Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const Header = ({ height, text, containStyle, textStyle, leftOption, rightOption, isShowLine, type }) => {
  const { Layout, Gutters } = useTheme()

  const getContainerStyle = () => {
    if (isShowLine) {
      return [styles.container, {
        borderColor: '#707070',
        borderBottomWidth: 0.5
      }]
    } else {
      return styles.container
    }
  }

  return (
    <SafeAreaView style={[Layout.fullWidth, Layout.rowHCenter, getContainerStyle(), containStyle, { height }]}>
      <View style={[Layout.fullWidth, Layout.rowHCenter]} >
        {
          leftOption && (<View style={[Gutters.smallHPadding, { zIndex: 9999 }]}>{leftOption}</View>)
        }
        {
          type === 'large' ? (
            <Text style={[Layout.fill, Gutters.smallHPadding, styles.textStyleLarge, textStyle]}>{text}</Text>
          ) : (
            <>
              <View style={Layout.fill} />
              <View style={styles.styleNormalWrapper}>
                <Text style={[Layout.fill, Gutters.smallHPadding, styles.textStyleNormal, textStyle]}>{text}</Text>
              </View>
            </>
          )
        }
        {
          rightOption && (<View style={[Gutters.smallHPadding, { zIndex: 9999 }]}>{rightOption}</View>)
        }
      </View>
    </SafeAreaView>
  )
}

Header.propTypes = {
  height: PropTypes.number,
  text: PropTypes.string,
  type: PropTypes.oneOf(['large', 'normal']),
  containStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  leftOption: PropTypes.element,
  rightOption: PropTypes.element,
  isShowLine: PropTypes.bool
}

Header.defaultProps = {
  height: Responsive.height(100),
  text: '',
  type: 'large',
  containStyle: {},
  textStyle: {},
  leftOption: null,
  rightOption: null,
  isShowLine: false
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  textStyleLarge: {
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(34),
    color: '#434A4F'
  },
  styleNormalWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyleNormal: {
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    textAlign: 'center'
  }
});
