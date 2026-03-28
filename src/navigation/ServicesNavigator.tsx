import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WebViewScreen from '../screens/WebViewScreen';
import Services from '../screens/services/Services';
import ServiceDetails from '../screens/services/details/ServiceDetails';
import SelectProfile from '../screens/dashboard/E-services/Profile/SwitchProfile';
import Form from '../screens/services/Eservices/ServiceForm';
import ApplicationDetails from '../screens/services/Eservices/Applications/ApplicationDetails';
import PaymentsReceiptDetails from '../screens/services/Eservices/Applications/Payments/PaymentsReceipt';
import EAllServicesPage from '../screens/dashboard/E-services/Services/E-servicesPage';
import SwitchFactories from '../screens/dashboard/IL-Services/Factories/SwitchFactories';
import {commonEservicesScreens} from './DashboardNavigator';

type RootStackParamList = {
  Services: any;
  ServiceDetails: any;
  WebViewScreen: any;
  ServiceForm: any;
  ApplicationDetails: any;
  PaymentsReceiptDetails: any;
  SelectProfile: any;
  EAllServicesPage: any;
  SwitchFactories: any;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
const ServicesNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Services">
      <RootStack.Screen
        name="Services"
        component={Services}
        options={{headerShown: false}}
      />

      {commonEservicesScreens(RootStack.Screen)}
    </RootStack.Navigator>
  );
};

export default ServicesNavigator;
