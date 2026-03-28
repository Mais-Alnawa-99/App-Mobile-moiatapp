import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WebViewScreen from '../screens/WebViewScreen';
import Help from '../screens/help/Help';
import ChatBot from '../screens/chatBot/ChatBot';
import FAQs from '../screens/faqs/FAQs';
import ContactMinister from '../screens/help/contactMinister';
import UserDetails from '../screens/Dashboard/IL-Services/UserProfile/UserProfile';
import UaePassSignup from '../screens/Dashboard/uaepass/UaePassSignup';

type RootStackParamList = {
  Help: any;
  WebViewScreen: any;
  ChatBot: any;
  FAQs: any;
  ContactMinister: any;
  UserDetails: any;
  UaePassSignup: any;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
const HelpNavigation = () => {
  return (
    <RootStack.Navigator initialRouteName="Help">
      <RootStack.Screen
        name="Help"
        component={Help}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ChatBot"
        component={ChatBot}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="FAQs"
        component={FAQs}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ContactMinister"
        component={ContactMinister}
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

export default HelpNavigation;
