import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, ViewPropTypes, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import Responsive from 'react-native-lightweight-responsive'

Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const TabBarQuote = ({ height, containStyle, textStyle, onChangeTab, initSelected, colorHeightline }) => {
  const { Layout, Gutters, Images } = useTheme()
  const [idxSelected, setIdxSelected] = useState(initSelected)

  const onClickPositon = (position) => {
    setIdxSelected(position)
    onChangeTab(position)
  }


  const getStyleText = (position) => {
    return (position === (idxSelected | initSelected)) ? styles.textStyleSSelected : styles.textStyle
  }

  const getStyleBackground = (position) => {
    return (position === (idxSelected | initSelected)) ? [styles.tabStyleSelected, { backgroundColor: colorHeightline, shadowColor:colorHeightline }] : styles.tabStyle
  }

  return (
    <SafeAreaView style={[Layout.fullWidth, Layout.rowHCenter, styles.container, containStyle, { height }]}>
      <View style={[Layout.fill, Layout.row, styles.tabStyleWrapper]}>
        <TouchableOpacity
          onPress={() => onClickPositon(0)}
          style={[Layout.fill, getStyleBackground(0)]}>
          <Text style={getStyleText(0)}>All Quotes</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => onClickPositon(1)}
          style={[Layout.fill, getStyleBackground(1)]}>
          <Text style={getStyleText(1)}>Pendding Quotes</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => onClickPositon(2)}
          style={[Layout.fill, getStyleBackground(2)]}>
          <Text style={getStyleText(2)}>Sent Quotes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

TabBarQuote.propTypes = {
  colorHeightline: PropTypes.string,
  height: PropTypes.number,
  containStyle: ViewPropTypes.style,
  tabStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style,
  initSelected: PropTypes.number,
  onChangeTab: PropTypes.func
}

TabBarQuote.defaultProps = {
  height: Responsive.height(44),
  containStyle: {},
  tabStyle: {},
  textStyle: {},
  initSelected: 0,
  onChangeTab: (index) => {},
  colorHeightline: '#ffffff'
}

export default TabBarQuote

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: Responsive.width(10)
  },
  tabStyleWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    alignItems: 'center',
    borderRadius: Responsive.height(8)
  },
  tabStyle: {
    alignItems: 'center',
    height: Responsive.height(33),
    justifyContent: 'center'
  },
  tabStyleSelected: {
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.16)',
    backgroundColor: '#ffffff',
    borderWidth: Responsive.height(2),
    height: Responsive.height(33),
    justifyContent: 'center',
    borderRadius: Responsive.height(8),
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 0.8
  },
  textStyle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(13),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(5)
  },
  textStyleSSelected: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: Responsive.font(13),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(5)
  },
  separator: {
    backgroundColor: '#8E8E93',
    width: Responsive.width(1),
    height: Responsive.height(16)
  }
});
