import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Alert } from 'react-native'
import { useTheme } from '@/Hooks'
import Responsive from 'react-native-lightweight-responsive'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

const CompatibilityItem = ({ film, data }) => {
  const { Layout, Images } = useTheme()

  const getIconCompatibilty = (type) => {
    switch (type) {
      case "C":
        return "checkmark-circle";
      case "CC":
        return "ellipse";
      case "T":
        return "triangle"
      default:
        return "close"
    }
  }

  const getColorIconCompatibilty = (type) => {
    switch (type) {
      case "C":
        return "#B25751";
      case "CC":
        return "#D5732E";
      case "T":
        return "#B12418"
      default:
        return "#000000"
    }
  }

  const getTextAlertCompatibiltyInfo = (nameFilm, type) => {
    switch (type) {
      case "C":
        return `${nameFilm} is compatible with this glass type.`;
      case "CC":
        return "Conditional Compatibility:\nFilm can be applied if VLT is lighter than 45% or if glass is fully tempered.";
      case "T":
        return "Tempered/Heat Strengthened:\nFilm can be applied only if the glass is tempered, and not annealed (for IGU requirement for both panels)."
      default:
        return "Incompatible"
    }
  }

  const onPressInfo = () => {
    Alert.alert(data['title'], getTextAlertCompatibiltyInfo(film['name'], data['compatibilty']))
}

  return (
    <View key={data['id']} style={Layout.column}>
      <View style={styles.item}>
        <View style={{ width: Responsive.width(20) }} />
        <Icon name={getIconCompatibilty(data['compatibilty'])} size={18} color={getColorIconCompatibilty(data['compatibilty'])} />
        <Text style={styles.subTitle}>{data['title']}</Text>
        <MaterialCommunityIcons name='information' size={18} color={'#606A70'} onPress={onPressInfo} />
        <View style={{ width: Responsive.width(15) }} />
      </View>
      <View style={styles.separator} />
    </View>
  )
}

CompatibilityItem.propTypes = {
  film: PropTypes.object,
  data: PropTypes.object
}

CompatibilityItem.defaultProps = {
  film: {},
  data: {}
}

export default CompatibilityItem


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
  subTitle: {
    flex: 1,
    fontFamily: 'Ubuntu-Regular',
    fontSize: Responsive.font(17),
    color: '#434A4F',
    paddingHorizontal: Responsive.width(10)
  },
  separator: {
    height: Responsive.height(2)
  },
});
