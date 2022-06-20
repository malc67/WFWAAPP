import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import Responsive from 'react-native-lightweight-responsive'

const Aspect = ({ height, onValueChange, value }) => {
  const { Layout, Images } = useTheme()
  const [listOfItems, setListOfItems] = useState([
    { id: 1, data: "N" },
    { id: 2, data: "E" },
    { id: 3, data: 'S' },
    { id: 4, data: 'W' },
  ])
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    const selectedData = listOfItems.filter(item => item.data === value)
    setSelectedId(selectedData[0]?.id)
  }, [value])

  return (
    <View style={[styles.container, { height }]}>

      {
        listOfItems.map((item, index) => {
          const getColorBackground = (isRevert = false) => {
            if (isRevert) {
              return item.id !== selectedId ? '#434A4F' : '#ffffff'
            } else {
              return item.id === selectedId ? '#434A4F' : '#ffffff'
            }
          }
          const getStyleItem = () => {
            if (index === 0) return styles.itemFirst
            if (index === listOfItems.length - 1) return styles.itemLast
            return styles.item
          }
          return (
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedId(item.id)
                  onValueChange(item.data)
                }}
              >
                <View style={{ ...getStyleItem(), backgroundColor: getColorBackground() }}>
                  <Text style={[styles.title, { color: getColorBackground(true) }]}>
                    {item.data}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        })
      }

    </View>
  )
}

Aspect.propTypes = {
  onValueChange: PropTypes.func,
  value: PropTypes.string
}

Aspect.defaultProps = {
  onValueChange: (value) => { },
  value: 'N'
}

export default Aspect

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  itemContainer: {
    justifyContent: 'space-around'
  },
  itemFirst: {
    borderColor: '#434A4F',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Responsive.width(5),
    width: Responsive.width(36),
    flexDirection: 'row',
    borderTopLeftRadius: Responsive.height(8),
    borderBottomLeftRadius: Responsive.height(8)
  },
  item: {
    borderColor: '#434A4F',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Responsive.width(5),
    width: Responsive.width(36),
    flexDirection: 'row',
  },
  itemLast: {
    borderColor: '#434A4F',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Responsive.width(5),
    width: Responsive.width(36),
    flexDirection: 'row',
    borderTopRightRadius: Responsive.height(8),
    borderBottomRightRadius: Responsive.height(8)
  },
  title: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: Responsive.font(13)
  }
});