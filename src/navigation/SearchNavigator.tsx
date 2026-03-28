import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WebViewScreen from '../screens/WebViewScreen';
import MediaDetails from '../screens/media/details/Details';
import SearchScreen from '../screens/search';
import Media from '../screens/media/Media';
import Services from '../screens/services/Services';
import ServiceDetails from '../screens/services/details/ServiceDetails';

type RootStackParamList = {
  SearchScreen: any;
  WebViewScreen: any;
  MediaDetails: any;
  MediaScreen: any;
  Services: any;
  ServiceDetails: any;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
const SearchNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="SearchScreen">
      <RootStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MediaDetails"
        component={MediaDetails}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MediaScreen"
        component={Media}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Services"
        component={Services}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default SearchNavigator;
