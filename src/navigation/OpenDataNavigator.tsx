import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import OpenData from '../screens/basicPages/OpenData';
import OpenDataMap from '../screens/basicPages/OpenData/OpenDataMap';
import ProposeOrRequestData from '../screens/basicPages/OpenData/ProposeRequestData';
import OpenDataPolicyScreen from '../screens/basicPages/OpenData/OpenDataPolicy';
import HalalCertifiedBodies from '../screens/basicPages/OpenData/HalalCertifiedBodies';
import ConformityAssessmentBodies from '../screens/basicPages/OpenData/ConformityAssessmentBodies';
import NotifiedBodies from '../screens/basicPages/OpenData/NotifiedBodies/indes';
import NationalICV from '../screens/basicPages/OpenData/NationalICV/indes';
import UserDetails from '../screens/Dashboard/IL-Services/UserProfile/UserProfile';

type RootStackParamList = {
  OpenDataScreen: any;
  OpenDataMap: any;
  ProposeOrRequestData: any;
  OpenDataPolicyScreen: any;
  HalalCertifiedBodies: any;
  ConformityAssessmentBodies: any;
  NotifiedBodies: any;
  NationalICV: any;
  UserDetails: any;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();

const OpenDataNavigator = () => {
  const scheme = useColorScheme();

  return (
    <RootStack.Navigator initialRouteName="OpenDataScreen">
      <RootStack.Screen
        name="OpenDataScreen"
        component={OpenData}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="OpenDataMap"
        component={OpenDataMap}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ProposeOrRequestData"
        component={ProposeOrRequestData}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="OpenDataPolicyScreen"
        component={OpenDataPolicyScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="HalalCertifiedBodies"
        component={HalalCertifiedBodies}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="ConformityAssessmentBodies"
        component={ConformityAssessmentBodies}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="NotifiedBodies"
        component={NotifiedBodies}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="NationalICV"
        component={NationalICV}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default OpenDataNavigator;
