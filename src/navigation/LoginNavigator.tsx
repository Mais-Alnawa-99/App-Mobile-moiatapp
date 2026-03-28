import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WebViewScreen from '../screens/WebViewScreen';
import LoginScreen from '../screens/dashboard/Login/Login';
import Dashboard from '../screens/dashboard/Dashboard';
import UaePassWebView from '../screens/dashboard/uaepass/UaePassWebView';
import UaePassLink from '../screens/dashboard/uaepass/UaePassLink';

type RootStackParamList = {
  LoginScreen: any;
  DashboardScreen: any;
  WebViewScreen: any;
  UaePassWebView: any;
  UaePassLink: any;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
const LoginNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName={'LoginScreen'}>
      <RootStack.Screen
        name="DashboardScreen"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="UaePassWebView"
        component={UaePassWebView}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="UaePassLink"
        component={UaePassLink}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default LoginNavigator;
