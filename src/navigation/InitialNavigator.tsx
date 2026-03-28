import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WebViewScreen from '../screens/WebViewScreen';
import Home from '../screens/home/Home';
import Services from '../screens/services/Services';
import MediaDetails from '../screens/media/details/Details';
import Media from '../screens/media/Media';
import UaePassWebView from '../screens/Dashboard/uaepass/UaePassWebView';
import UaePassLink from '../screens/Dashboard/uaepass/UaePassLink';
import ServiceDetails from '../screens/services/details/ServiceDetails';
import Form from '../screens/services/Eservices/ServiceForm';
import UaePassWelcomeScreen from '../screens/uaePass/UsePassWelcomeScreen.tsx';
import UserDetails from '../screens/Dashboard/IL-Services/UserProfile/UserProfile.tsx';
import UaePassSignup from '../screens/Dashboard/uaepass/UaePassSignup.tsx';
import AddOpportunity from '../screens/services/opportunities/AddOpportunity.tsx';

type RootStackParamList = {
  Home: any;
  ServicesScreen: any;
  MediaCenterScreen: any;
  MediaDetails: any;
  UaePassWebView: any;
  UaePassLink: any;
  UaePassWelcomeScreen: any;
  ServiceDetails: any;
  WebViewScreen: any;
  ServiceForm: any;
  IssuePricePreferenceCertificate: any;
  IssueIndustrialProductionLicense: any;
  RenewalIndustrialProductionLicense: any;
  DutyExemption: any;
  RenewalLicenseOptions: any;
  UserDetails: any;
  UaePassSignup: any;
  AddOpportunity: any;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const InitialNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ServicesScreen"
        component={Services}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="MediaCenterScreen"
        component={Media}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="MediaDetails"
        component={MediaDetails}
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
      <RootStack.Screen
        name="UaePassWelcomeScreen"
        component={UaePassWelcomeScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="ServiceForm"
        component={Form}
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
      <RootStack.Screen
        name="AddOpportunity"
        component={AddOpportunity}
        options={{headerShown: false}}
      />
      {/* 
      <RootStack.Screen
        name="RenewalIndustrialProductionLicense"
        component={RenewalIndustrialProductionLicense}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="RenewalLicenseOptions"
        component={RenewalLicenseOptions}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="IssueIndustrialProductionLicense"
        component={IssueIndustrialProductionLicense}
        options={{headerShown: false}}
      />*/}
    </RootStack.Navigator>
  );
};

export default InitialNavigator;
