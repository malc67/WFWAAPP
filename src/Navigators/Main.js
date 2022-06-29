import React from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { 
  ExampleContainer, 
  TabWindowFilmContainer,
  TabQuoteContainer,
  TabMapContainer,
  TabSettingContainer
 } from '@/Containers'
import Responsive from 'react-native-lightweight-responsive'
import { useTheme } from '@/Hooks'
import { Header } from '@/Components'

const Tab = createBottomTabNavigator()

// @refresh reset
Responsive.setOptions({ width: 390, height: 844, enableOnlySmallSize: true });
const MainNavigator = () => {
  const { Images } = useTheme()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Window Films"
        component={TabWindowFilmContainer}
        options={{
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: '#B2C249',
          tabBarInactiveTintColor: '#606A70',
          tabBarIcon: ({ color }) => (<Image source={Images.tab_window} style={{ tintColor: color }} tintColor={color} resizeMode={'contain'} />),
          tabBarLabel: ({ focused }) => (<Text style={focused ? styles.tabTextSelected : styles.tabTextNormal}>Window Films</Text>),
        }}
      />
      <Tab.Screen
        name="Quotes"
        component={TabQuoteContainer}
        options={{
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: '#B2C249',
          tabBarInactiveTintColor: '#606A70',
          tabBarIcon: ({ color }) => (<Image source={Images.tab_quote} style={{ tintColor: color }} tintColor={color} resizeMode={'contain'} />),
          tabBarLabel: ({ focused }) => (<Text style={focused ? styles.tabTextSelected : styles.tabTextNormal}>Quotes</Text>)
        }}
      />
      <Tab.Screen
        name="Map"
        component={TabMapContainer}
        options={{
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: '#B2C249',
          tabBarInactiveTintColor: '#606A70',
          tabBarIcon: ({ color }) => (<Image source={Images.tab_map} style={{ tintColor: color }} tintColor={color} resizeMode={'contain'} />),
          tabBarLabel: ({ focused }) => (<Text style={focused ? styles.tabTextSelected : styles.tabTextNormal}>Map</Text>)
        }}
      />
      <Tab.Screen
        name="Settings"
        component={TabSettingContainer}
        options={{
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: '#B2C249',
          tabBarInactiveTintColor: '#606A70',
          tabBarIcon: ({ color }) => (<Image source={Images.tab_setting} style={{ tintColor: color }} tintColor={color} resizeMode={'contain'} />),
          tabBarLabel: ({ focused }) => (<Text style={focused ? styles.tabTextSelected : styles.tabTextNormal}>Settings</Text>)
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator

const styles = StyleSheet.create({
  tabTextNormal: {
    color: '#606A70',
    fontFamily: 'NewJune',
    fontSize: Responsive.font(11)
  },
  tabTextSelected: {
    color: '#606A70',
    fontFamily: 'NewJune-Bold',
    fontSize: Responsive.font(11)
  },
});
