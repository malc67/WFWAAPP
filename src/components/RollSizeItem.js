import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Alert } from 'react-native'
import { useTheme } from '@/Hooks'
import Responsive from 'react-native-lightweight-responsive'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

const RollSizeItem = ({ data }) => {
  const { Layout, Images } = useTheme()

  

  return (
    <View key={data['id']} style={Layout.column}>
      <View style={styles.item}>
        <Text style={styles.title}>{data['title']}</Text>
        <Text style={styles.subValue}>{data['subtitle']}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  )
}

RollSizeItem.propTypes = {
  data: PropTypes.object
}

RollSizeItem.defaultProps = {
  data: {}
}

export default RollSizeItem


const styles = StyleSheet.create({
  container: {
  },
  item: {
    backgroundColor: "#ffffff",
    height: Responsive.height(48),
    marginHorizontal: Responsive.width(20),
    borderRadius: Responsive.height(5),
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(20)
  },
  subValue: {
    fontFamily: 'NewJune',
    fontSize: Responsive.font(17),
    color: '#A7B0B5',
    paddingHorizontal: Responsive.width(20)
  },
  separator: {
    height: Responsive.height(2)
  },
});
