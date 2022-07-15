import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import Responsive from 'react-native-lightweight-responsive'

const DiscountType = ({ height, onValueChange, value }) => {
  const { Layout, Images } = useTheme()
  const [listOfItems, setListOfItems] = useState([
    { id: 1, data: "Amount" },
    { id: 2, data: "Percent" },
  ])
  const [selectedId, setSelectedId] = useState(1);

  useEffect(() => {
    const selectedData = listOfItems.filter(item => item.data === value)
    setSelectedId(selectedData[0]?.id)
  }, [value])


  return (
    <View style={[styles.container, { height }]}>

      <FlatList
        data={listOfItems}
        horizontal={true}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const getColorBackground = (isRevert = false) => {
            if(isRevert){
              return item.id !== selectedId ? '#434A4F' : '#ffffff'
            }else {
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
        }}
        extraData={selectedId} />

    </View>
  )
}

DiscountType.propTypes = {
  onValueChange: PropTypes.func,
  value: PropTypes.string
}

DiscountType.defaultProps = {
  onValueChange: (value) => {},
  value: 'Amount'
}

export default DiscountType

const styles = StyleSheet.create({
  container: {
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
    width: Responsive.width(70),
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
    width: Responsive.width(70),
    flexDirection: 'row',
  },
  itemLast: {
    borderColor: '#434A4F',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Responsive.width(5),
    width: Responsive.width(70),
    flexDirection: 'row',
    borderTopRightRadius: Responsive.height(8),
    borderBottomRightRadius: Responsive.height(8)
  },
  title: {
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(13)
  }
});