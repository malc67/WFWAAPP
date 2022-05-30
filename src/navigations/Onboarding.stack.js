import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login/Login";
import Register from "../screens/register/Register";
import Splash from "../screens/splash/Splash";
import Landing from "../screens/landing/Landing";
import BrowseFilms from "../screens/BrowseFilms/BrowseFilms";
import SingleFilms from "../screens/BrowseFilms/SingleFilms";
import DateSheet from "../screens/BrowseFilms/DateSheet";
import Map from "../screens/Map/Map";
import MapClient from "../screens/MapClient/MapClient";
import Notes from "../screens/Notes";
import SelectFilms from "../screens/SelectFilms";
import CreateQuote from "../screens/CreateQuote/CreateQuote";
import SelectRoom from "../screens/CreateQuote/SelectRoom";
import NewQuote from "../screens/NewQuote/NewQuote";
import TintFilms from "../screens/TintFilms/TintFilms";
import Room from "../screens/Room/Room";
import Windows from "../screens/Windows/Windows";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colors } from "../themes/colors";
import { Icon } from "@rneui/base";
import RoomList from "../screens/RoomList/RoomList";
import Setting from "../screens/Settings/Settings";
import Picture from "../screens/Windows/Picture";
import FilmRemoval from "../screens/CreateQuote/FilmRemoval";
import Bussines from "../screens/register/Bussines";
import Email from "../screens/Email/Email";

const OnBoardingStack = createNativeStackNavigator();
const SignInStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function BottomTabs() {
    return (
      <Tab.Navigator 
      activeColor={colors.primaryColor}
      inactiveColor={colors.darkGray}
      barStyle={{ backgroundColor: colors.whiteColor }}>
        <Tab.Screen 
        name="BrowseFilms" 
        component={BrowseFilms}
        options={{
            tabBarLabel: 'Window Films',
            tabBarIcon: ({ color }) => (
              <Icon name="windows" type="antdesign" color={color} size={26} />
            ),
          }} />
        <Tab.Screen name="Quotes" component={Landing} 
        options={{
            tabBarLabel: 'Quotes',
            tabBarIcon: ({ color }) => (
              <Icon name="all-inbox" type="material" color={color} size={26} />
            ),
          }} />
        <Tab.Screen name="Map" component={Map} 
        options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ color }) => (
              <Icon name="map" type="material" color={color} size={26} />
            ),
          }} />
        <Tab.Screen name="Settings" component={Setting} 
        options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <Icon name="setting" type="antdesign" color={color} size={26} />
            ),
          }} />
      </Tab.Navigator>
    );
  }

function SignInScreens() {
    return (
        <SignInStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Splash"}>
            <OnBoardingStack.Screen name="Splash" component={Splash} />
            <OnBoardingStack.Screen name="Login" component={Login} />
            <OnBoardingStack.Screen name="Register" component={Register} />
            <OnBoardingStack.Screen name="Bussines" component={Bussines} />
        </SignInStack.Navigator>
    )
}
function OnBoarding() {
    return (
        <OnBoardingStack.Navigator screenOptions={{ headerShown: false }}>
            <OnBoardingStack.Screen name="Landing" component={BottomTabs} />
            <OnBoardingStack.Screen name="List" component={RoomList} />
            <OnBoardingStack.Screen name="Picture" component={Picture} />
            <OnBoardingStack.Screen name="SingleFilms" component={SingleFilms} />
            <OnBoardingStack.Screen name="DateSheet" component={DateSheet} />
            <OnBoardingStack.Screen name="MapClient" component={MapClient} />
            <OnBoardingStack.Screen name="Notes" component={Notes} />
            <OnBoardingStack.Screen name="SelectFilms" component={SelectFilms} />
            <OnBoardingStack.Screen name="CreateQuote" component={CreateQuote} />
            <OnBoardingStack.Screen name="SelectRoom" component={SelectRoom} />
            <OnBoardingStack.Screen name="NewQuote" component={NewQuote} />
            <OnBoardingStack.Screen name="TintFilms" component={TintFilms} />
            <OnBoardingStack.Screen name="Room" component={Room} />
            <OnBoardingStack.Screen name="Windows" component={Windows} />
            <OnBoardingStack.Screen name="FilmRemoval" component={FilmRemoval} />
            <OnBoardingStack.Screen name="Email" component={Email} />
        </OnBoardingStack.Navigator>
    )
}

export {OnBoarding,SignInScreens};