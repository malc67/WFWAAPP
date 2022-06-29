import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import { Dropdown } from 'react-native-element-dropdown'
import Responsive from 'react-native-lightweight-responsive'

const CustomDropdown = ({ height, value, items, onValueChange, flexValue }) => {
  const { Layout, Images } = useTheme()

  const [isFocus, setIsFocus] = useState(false);


  return (
    <View style={{ height: Responsive.height(32), flex: flexValue }}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#B2C249' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onValueChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  )
}

CustomDropdown.propTypes = {
  flexValue: PropTypes.number,
  height: PropTypes.number,
  value: PropTypes.string,
  items: PropTypes.array,
  onValueChange: PropTypes.func
}

CustomDropdown.defaultProps = {
  flexValue: 1,
  height: Responsive.height(32),
  value: '',
  items: [],
  onValueChange: (value) => {}
}

export default CustomDropdown


const styles = StyleSheet.create({
  container: {
  },
  dropdown: {
    height: Responsive.height(32),
    flex: 1,
    borderColor: 'rgb(224, 224, 224)',
    borderWidth: Responsive.height(1),
    borderRadius: Responsive.height(5),
    paddingHorizontal: Responsive.height(8),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    color: '#434A4F'
  },
  selectedTextStyle: {
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    color: '#434A4F',
    textAlign: 'right'
  },
  inputSearchStyle: {
    fontSize: Responsive.font(17),
    fontFamily: 'NewJune',
    color: '#434A4F'
  },
});
