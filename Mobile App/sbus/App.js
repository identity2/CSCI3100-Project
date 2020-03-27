import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
import { AuthLoadingScreen } from './Screens/AuthLoadingScreen'
import { SignInScreen } from './Screens/SignInScreen'
import { HomeScreen } from './Screens/HomeScreen'
import { RouteScreen } from './Screens/RouteScreen'
import { ScheduleScreen } from './Screens/ScheduleScreen'
import { TravelScreen } from './Screens/TravelScreen'

import COLORS from './Colors';
import {Ionicons,  Entypo} from '@expo/vector-icons';


const DetailTabs = createBottomTabNavigator({
  Route: RouteScreen,
  Schedule: ScheduleScreen,
},{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      // You can return any component that you like here!
      if (routeName == "Schedule")
        return <Ionicons name={"ios-list-box"} size={25} color={tintColor} />;
      else
        return <Entypo name={"flow-branch"} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: COLORS.tintcolor,
    inactiveTintColor: COLORS.deepgrey,
  },
});

const AppStack = createStackNavigator(
  { 
    Home: HomeScreen,
    Detail: DetailTabs,
    Travel: TravelScreen,
  },
  {
    defaultNavigationOptions:{
      headerShown: false,
    }
  });

const AuthStack = createStackNavigator(
  { 
    SignIn: SignInScreen 
  }, 
  {
  });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);