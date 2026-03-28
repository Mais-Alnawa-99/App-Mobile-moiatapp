import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WebViewScreen from '../screens/WebViewScreen';
import Help from '../screens/help/Help';
import Media from '../screens/media/Media';
import MediaDetails from '../screens/media/details/Details';
import UserDetails from '../screens/Dashboard/IL-Services/UserProfile/UserProfile';
import UaePassSignup from '../screens/Dashboard/uaepass/UaePassSignup.tsx';

type RootStackParamList = {
  MediaScreen: any;
  WebViewScreen: any;
  MediaDetails: any;
  FAQs: any;
  UserDetails: any;
  UaePassSignup: any;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
const MediaNavigation = () => {
  return (
    <RootStack.Navigator initialRouteName="MediaScreen">
      <RootStack.Screen
        name="MediaScreen"
        component={Media}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MediaDetails"
        component={MediaDetails}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="UaePassSignup"
        component={UaePassSignup}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default MediaNavigation;
