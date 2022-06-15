import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, ViewPropTypes, TextInput, View, Image, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import Responsive from 'react-native-lightweight-responsive'

Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const SearchBar = ({ height, textLabel, containStyle, textSearchStyle, onSearch }) => {
  const { Layout, Gutters, Images } = useTheme()

  return (
    <SafeAreaView style={[Layout.fullWidth, Layout.rowHCenter, styles.container, containStyle, { height }]}>
      <View style={[styles.iconWrapper, { height, width: height }]}>
        <Image style={styles.icon} source={Images.ic_search} />
      </View>
      <TextInput onChangeText={onSearch} style={[Layout.fill, styles.textStyle, textSearchStyle]} placeholder={textLabel} placeholderTextColor={'#434A4F'}></TextInput>
    </SafeAreaView>
  )
}

SearchBar.propTypes = {
  height: PropTypes.number,
  textLabel: PropTypes.string,
  containStyle: ViewPropTypes.style,
  textSearchStyle: ViewPropTypes.style,
  onSearch: PropTypes.func
}

SearchBar.defaultProps = {
  height: Responsive.height(48),
  textLabel: '',
  containStyle: {},
  textSearchStyle: {},
  onSearch: (text) => {}
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    height: Responsive.height(21),
    width: Responsive.height(21),
    tintColor: '#B2C249'
  },
  textStyle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#434A4F'
  }
});
