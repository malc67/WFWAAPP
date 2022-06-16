import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  StartupContainer,
  FilmDetailContainer,
  CreateQuoteContainer,
  PriceRemovalContainer,
  RequestQuoteContainer,
  QuoteDetailContainer,
  NewRoomContainer,
  SelectFilmContainer,
  RoomDetailContainer,
  WindowContainer
} from '@/Containers'
import { useTheme } from '@/Hooks'
import MainNavigator from './Main'
import { navigationRef } from './utils'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <View style={Layout.fill}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="FilmDetail"
            component={FilmDetailContainer}
            options={{
              headerShown: true
            }} />
          <Stack.Screen
            name="CreateQuote"
            component={CreateQuoteContainer}
            options={{
              headerShown: true
            }} />
          <Stack.Screen
            name="PriceRemoval"
            component={PriceRemovalContainer}
            options={{
              headerShown: true
            }} />
          <Stack.Screen
            name="RequestQuote"
            component={RequestQuoteContainer}
            options={{
              headerShown: true
            }} />
          <Stack.Screen
            name="QuoteDetail"
            component={QuoteDetailContainer}
            options={{
              headerShown: true
            }} />
          <Stack.Screen
            name="NewRoom"
            component={NewRoomContainer}
            options={{
              headerShown: true
            }} />
          <Stack.Screen
            name="SelectFilm"
            component={SelectFilmContainer}
            options={{
              headerShown: true
            }} />
          <Stack.Screen
            name="RoomDetail"
            component={RoomDetailContainer}
            options={{
              headerShown: true
            }} />
          <Stack.Screen
            name="Window"
            component={WindowContainer}
            options={{
              headerShown: true
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default ApplicationNavigator
