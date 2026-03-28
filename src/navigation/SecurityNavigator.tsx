import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WebViewScreen from '../screens/WebViewScreen';
import UaePassWebView from '../screens/Dashboard/uaepass/UaePassWebView';
import UaePassLink from '../screens/Dashboard/uaepass/UaePassLink';
import AuthScreen from '../screens/AuthScreen';

type RootStackParamList = {
  AuthScreen: any;
  WebViewScreen: any;
  UaePassWebView: any;
  UaePassLink: any;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
const SecurityNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName={'AuthScreen'}>
      <RootStack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
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

export default SecurityNavigator;
