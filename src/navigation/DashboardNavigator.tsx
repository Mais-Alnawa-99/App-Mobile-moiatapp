import React, {Fragment} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WebViewScreen from '../screens/WebViewScreen';
import LoginScreen from '../screens/Dashboard/Login/Login';
import Dashboard from '../screens/Dashboard/Dashboard';
import {useAppSelector} from '../redux/store';
import UaePassWebView from '../screens/Dashboard/uaepass/UaePassWebView';
import UaePassLink from '../screens/Dashboard/uaepass/UaePassLink';
import Form from '../screens/services/Eservices/ServiceForm';
import ApplicationDetails from '../screens/services/Eservices/Applications/ApplicationDetails';
import PaymentsReceiptDetails from '../screens/services/Eservices/Applications/Payments/PaymentsReceipt';
import ESDashboard from '../screens/Dashboard/E-services/Dashboard';
import Certificates from '../screens/Dashboard/E-services/certificates/Certificates';
import Payments from '../screens/Dashboard/E-services/payments/Payments';

import RequestsPage from '../screens/Dashboard/E-services/Requests/RequestsPage';
import SelectProfile from '../screens/Dashboard/E-services/Profile/SwitchProfile';
import EAllServicesPage from '../screens/Dashboard/E-services/Services/E-servicesPage';
import RecalledProductInquiry from '../screens/services/Eservices/RecalledProductInquiry/RecalledProductInquiry';
import ProductDetails from '../screens/services/Eservices/RecalledProductInquiry/ProductDetails';
import PurchaseStandards from '../screens/services/Eservices/PurchaseStandards/PurchaseStandards';
import StandardsDetails from '../screens/services/Eservices/PurchaseStandards/StandardsDetails';
import StandardsCart from '../screens/services/Eservices/PurchaseStandards/Carts/Carts';
import GeneratedFormScreen from '../screens/services/ILServices/GeneratedFormScreen';

import SwitchFactories from '../screens/Dashboard/IL-Services/Factories/SwitchFactories';
import ILDashboard from '../screens/Dashboard/IL-Services/Dashboard';
import ILRequestsPage from '../screens/Dashboard/IL-Services/Requests/RequestsPage';
import ILAllServicesPage from '../screens/Dashboard/IL-Services/Services/IL-servicesPage';
import ILPayments from '../screens/Dashboard/IL-Services/Payments/ILPayments';
import ILCertificates from '../screens/Dashboard/IL-Services/Certificates/ILCertificates';
import FactoryDetails from '../screens/Dashboard/IL-Services/FactoryDetails';
import IndustrialLicenseCancellation from '../screens/services/IndustrialServices/staticForms/CancelIndustrialProductionLicense';
import PricePreference from '../screens/services/IndustrialServices/staticForms/PricePreference';
import CustomsExemptionRegistration from '../screens/services/IndustrialServices/staticForms/CustomsExemption/Registration';
import RenewalIndustrialProductionLicense from '../screens/services/IndustrialServices/staticForms/RenewalIndustrialProductionLicense/RenewalIndustrialProductionLicense';
import IssueIndustrialProductionLicense from '../screens/services/IndustrialServices/staticForms/IssueIndustrialProductionLicense/IssueIndustrialProductionLicense';
import ValueAddedTaxRequest from '../screens/services/IndustrialServices/staticForms/ValueAddedTaxRequest';
import MaterialQuantityIncrease from '../screens/services/IndustrialServices/staticForms/CustomsExemption/MaterialQuantityIncrease/MaterialQuantityIncrease.tsx';
import DutyExemption from '../screens/services/IndustrialServices/staticForms/CustomsExemption/DutyExemption/DutyExemption';
import DutyExemptionFastTrack from '../screens/services/IndustrialServices/staticForms/CustomsExemption/DutyExemptionFastTrack/DutyExemptionFastTrack.tsx';

import AddFactoryUser from '../screens/services/IndustrialServices/AddingFactoryUser/AddFactoryUser.tsx';
import FactoryUsers from '../screens/services/IndustrialServices/AddingFactoryUser/FactoryUsers.tsx';
import EditFactoryUser from '../screens/services/IndustrialServices/AddingFactoryUser/EditFactoryUser.tsx';
import ProductsPortfolio from '../screens/Dashboard/IL-Services/ProductsPortfolio/index.tsx';
import EditProductPortfolio from '../screens/Dashboard/IL-Services/ProductsPortfolio/EditProductsPortfolio.tsx';
import UaePassWelcomeScreen from '../screens/uaePass/UsePassWelcomeScreen.tsx';
import UaePassLogincreen from '../screens/uaePass/UsePassLoginScreen.tsx';
import SignUpScreen from '../screens/uaePass/SignupScreen.tsx';
import RenewalLicenseOptions from '../screens/services/IndustrialServices/staticForms/RenewalIndustrialProductionLicense/RenewalLicenseOptions.tsx';
import ViewFactoryUser from '../screens/services/IndustrialServices/AddingFactoryUser/ViewFactoryUser.tsx';

import {Success} from '../screens/services/IndustrialServices/staticForms/Success.tsx';
import ServiceDetails from '../screens/services/details/ServiceDetails.tsx';
import PaymentDetails from '../screens/Dashboard/IL-Services/Requests/PaymentDetails.tsx';
import UaePassSignup from '../screens/Dashboard/uaepass/UaePassSignup.tsx';
import UserDetails from '../screens/Dashboard/IL-Services/UserProfile/UserProfile.tsx';

type RootStackParamList = {
  LoginScreen: any;
  DashboardScreen: any;
  WebViewScreen: any;
  UaePassWebView: any;
  UaePassLink: any;
  UaePassSignup: any;
  UaePassLogincreen: any;
  SignUpScreen: any;
  UaePassWelcomeScreen: any;
  ServiceForm: any;
  ApplicationDetails: any;
  PaymentsReceiptDetails: any;
  ESDashboard: any;
  Certificates: any;
  RequestsPage: any;
  SelectProfile: any;
  EAllServicesPage: any;
  RecalledProductInquiry: any;
  ProductDetails: any;
  PurchaseStandards: any;
  StandardsDetails: any;
  StandardsCart: any;
  GeneratedFormScreen: any;
  Payments: any;

  SwitchFactories?: any;
  ILDashboard?: any;
  ILRequestsPage?: any;
  ILAllServicesPage?: any;
  ILPayments?: any;
  ILCertificates?: any;
  FactoryDetails?: any;
  ProductsPortfolio?: any;
  EditProductPortfolio?: any;
  IndustrialLicenseCancellation?: any;
  PricePreference?: any;
  CustomsExemptionRegistration?: any;
  RenewalIndustrialProductionLicense?: any;
  RenewalLicenseOptions?: any;
  IssueIndustrialProductionLicense?: any;
  ValueAddedTaxRequest?: any;
  MaterialQuantityIncrease?: any;
  DutyExemption?: any;
  DutyExemptionFastTrack?: any;
  AddFactoryUser?: any;
  FactoryUsers?: any;
  EditFactoryUser?: any;
  ViewFactoryUser?: any;
  Success?: any;
  ServiceDetails?: any;
  PaymentDetails?: any;
  UserDetails?: any;
};
const RootStack = createNativeStackNavigator<RootStackParamList>();
const DashboardNavigator = () => {
  const {isLoggedIn} = useAppSelector(state => state.auth);
  return (
    <RootStack.Navigator
      initialRouteName={isLoggedIn ? 'DashboardScreen' : 'LoginScreen'}>
      {isLoggedIn ? (
        <RootStack.Screen
          name="DashboardScreen"
          component={Dashboard}
          options={{headerShown: false}}
        />
      ) : (
        <RootStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      )}
      {commonEservicesScreens(RootStack.Screen)}
    </RootStack.Navigator>
  );
};

export default DashboardNavigator;

type AnyStack = ReturnType<
  typeof import('@react-navigation/native-stack').createNativeStackNavigator
>;

export function commonEservicesScreens(Screen: any) {
  return [
    <Screen
      name="ServiceDetails"
      component={ServiceDetails}
      options={{headerShown: false}}
    />,
    <Screen
      name="WebViewScreen"
      component={WebViewScreen}
      options={{headerShown: false}}
    />,
    <Screen
      name="UaePassWebView"
      component={UaePassWebView}
      options={{headerShown: false}}
    />,
    <Screen
      name="UaePassLink"
      component={UaePassLink}
      options={{headerShown: false}}
    />,
    <Screen
      name="UaePassSignup"
      component={UaePassSignup}
      options={{headerShown: false}}
    />,

    <Screen
      name="UaePassWelcomeScreen"
      component={UaePassWelcomeScreen}
      options={{headerShown: false}}
    />,
    <Screen
      name="UaePassLogincreen"
      component={UaePassLogincreen}
      options={{headerShown: false}}
    />,
    <Screen
      name="SignUpScreen"
      component={SignUpScreen}
      options={{headerShown: false}}
    />,
    <Screen
      name="ServiceForm"
      component={Form}
      options={{headerShown: false}}
    />,
    <Screen
      name="RecalledProductInquiry"
      component={RecalledProductInquiry}
      options={{headerShown: false}}
    />,
    <Screen
      name="ProductDetails"
      component={ProductDetails}
      options={{headerShown: false}}
    />,
    <Screen
      name="ProductsPortfolio"
      component={ProductsPortfolio}
      options={{headerShown: false}}
    />,
    <Screen
      name="EditProductPortfolio"
      component={EditProductPortfolio}
      options={{headerShown: false}}
    />,
    <Screen
      name="ApplicationDetails"
      component={ApplicationDetails}
      options={{headerShown: false}}
    />,
    <Screen
      name="PaymentsReceiptDetails"
      component={PaymentsReceiptDetails}
      options={{headerShown: false}}
    />,
    <Screen
      name="ESDashboard"
      component={ESDashboard}
      options={{headerShown: false}}
    />,
    <Screen
      name="Certificates"
      component={Certificates}
      options={{headerShown: false}}
    />,
    <Screen
      name="Payments"
      component={Payments}
      options={{headerShown: false}}
    />,
    <Screen
      name="RequestsPage"
      component={RequestsPage}
      options={{headerShown: false}}
    />,
    <Screen
      name="SelectProfile"
      component={SelectProfile}
      options={{headerShown: false}}
    />,
    <Screen
      name="EAllServicesPage"
      component={EAllServicesPage}
      options={{headerShown: false}}
    />,
    <Screen
      name="PurchaseStandards"
      component={PurchaseStandards}
      options={{headerShown: false}}
    />,
    <Screen
      name="StandardsDetails"
      component={StandardsDetails}
      options={{headerShown: false}}
    />,
    <Screen
      name="StandardsCart"
      component={StandardsCart}
      options={{headerShown: false}}
    />,
    <Screen
      name="GeneratedFormScreen"
      component={GeneratedFormScreen}
      options={{headerShown: false}}
    />,
    <Screen
      name="ILDashboard"
      component={ILDashboard}
      options={{headerShown: false}}
    />,
    <Screen
      name="SwitchFactories"
      component={SwitchFactories}
      options={{headerShown: false}}
    />,
    <Screen
      name="ILRequestsPage"
      component={ILRequestsPage}
      options={{headerShown: false}}
    />,
    <Screen
      name="ILAllServicesPage"
      component={ILAllServicesPage}
      options={{headerShown: false}}
    />,
    <Screen
      name="ILPayments"
      component={ILPayments}
      options={{headerShown: false}}
    />,
    <Screen
      name="ILCertificates"
      component={ILCertificates}
      options={{headerShown: false}}
    />,
    <Screen
      name="FactoryDetails"
      component={FactoryDetails}
      options={{headerShown: false}}
    />,
    <Screen
      name="IndustrialLicenseCancellation"
      component={IndustrialLicenseCancellation}
      options={{headerShown: false}}
    />,
    // <Screen
    //   name="PricePreference"
    //   component={PricePreference}
    //   options={{headerShown: false}}
    // />,
    <Screen
      name="CustomsExemptionRegistration"
      component={CustomsExemptionRegistration}
      options={{headerShown: false}}
    />,
    <Screen
      name="RenewalIndustrialProductionLicense"
      component={RenewalIndustrialProductionLicense}
      options={{headerShown: false}}
    />,
    <Screen
      name="IssueIndustrialProductionLicense"
      component={IssueIndustrialProductionLicense}
      options={{headerShown: false}}
    />,
    <Screen
      name="ValueAddedTaxRequest"
      component={ValueAddedTaxRequest}
      options={{headerShown: false}}
    />,
    <Screen
      name="MaterialQuantityIncrease"
      component={MaterialQuantityIncrease}
      options={{headerShown: false}}
    />,
    <Screen
      name="DutyExemption"
      component={DutyExemption}
      options={{headerShown: false}}
    />,
    <Screen
      name="DutyExemptionFastTrack"
      component={DutyExemptionFastTrack}
      options={{headerShown: false}}
    />,

    <Screen
      name="AddFactoryUser"
      component={AddFactoryUser}
      options={{headerShown: false}}
    />,
    <Screen
      name="FactoryUsers"
      component={FactoryUsers}
      options={{headerShown: false}}
    />,
    <Screen
      name="EditFactoryUser"
      component={EditFactoryUser}
      options={{headerShown: false}}
    />,
    <Screen
      name="RenewalLicenseOptions"
      component={RenewalLicenseOptions}
      options={{headerShown: false}}
    />,
    <Screen
      name="ViewFactoryUser"
      component={ViewFactoryUser}
      options={{headerShown: false}}
    />,

    <Screen
      name="Success"
      component={Success}
      options={{headerShown: false}}
    />,
    <Screen
      name="PaymentDetails"
      component={PaymentDetails}
      options={{headerShown: false}}
    />,
    <Screen
      name="UserDetails"
      component={UserDetails}
      options={{headerShown: false}}
    />,
  ];
}
