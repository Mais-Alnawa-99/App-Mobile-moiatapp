import {combineReducers} from '@reduxjs/toolkit';
import loader from './General/loader';
import auth from './User/startup';
import userToken from './User/userToken';
import userDataStored from './User/userDataStored';
import userILData from './User/userILData';
import signUpToken from './User/signUpToken';
import tokenPayload from './User/tokenPayload';

import lang from './General/lang';
import dimensions from './General/dimensions';
import server from './General/server';
import modal from './General/modal';
import customerPulse from './General/customerPulse';
import intro from './General/intro';
import settings from './General/settings';
import bottomSheet from './General/bottomSheet';
import navigation from './General/navigator';
import theme from './General/theme';
import fontFamily from './General/fontFamily';
import fontSize from './General/fontSize';
import webview from './General/webview';
import securityAuth from './General/securityAuth';

import lookupsData from './Lookup';
import services from './Services';
import favouriteServices from './Services/slice/favouriteServices';
import cartItems from './E-Services/slice/cartItems';

import Media from './Media';
import Help from './Help';
import FAQs from './FAQs/slice/faqs';
import UaePass from './UaePass';
import eservices from './E-Services';
import ilServices from './I-Services';
import HSCodes from './I-Services/slice/HSCode';
import City from './I-Services/slice/City';
import Area from './I-Services/slice/Area';
import Country from './I-Services/slice/Country';
import Emirate from './I-Services/slice/Emirates';
import legalEntity from './I-Services/slice/LegalEntities';
import LocalAuthority from './I-Services/slice/LocalAuthorities';
import Category from './I-Services/slice/Category';
import userImgProfile from './User/userImgProfile';

export default combineReducers({
  loader,
  auth,
  lang,
  dimensions,
  theme,
  fontFamily,
  fontSize,
  server,
  webview,
  modal,
  intro,
  lookupsData,
  services,
  settings,
  Media,
  bottomSheet,
  Help,
  FAQs,
  favouriteServices,
  UaePass,
  securityAuth,
  userToken,
  userDataStored,
  userILData,
  eservices,
  cartItems,
  HSCodes,
  City,
  Area,
  Country,
  Emirate,
  legalEntity,
  LocalAuthority,
  Category,
  ilServices,
  signUpToken,
  navigation,
  userImgProfile,
  tokenPayload,
  customerPulse,
});
