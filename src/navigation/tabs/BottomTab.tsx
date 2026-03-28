import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import {StackActions, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
//Screens
import InitialNavigator from '../InitialNavigator';

import theme, {BW, BH} from '../../style/theme';
import Text from '../../component/Text';
import ServicesNavigator from '../ServicesNavigator';
import HelpNavigation from '../HelpNavigation';
import {isArabic} from '../../locales';
import MediaNavigation from '../MediaNavigation';
import DashboardNavigator from '../DashboardNavigator';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const {t} = useTranslation();
  const {colors}: any = useTheme();

  return (
    <Tab.Navigator
      screenListeners={({navigation, route}) => ({
        tabPress: e => {
          const state = navigation.getState();
          const tabState = state.routes.find(r => r.key === route.key)?.state;

          if (tabState && tabState.type === 'stack' && tabState.index > 0) {
            e.preventDefault();

            navigation.navigate(route.name);

            navigation.dispatch({
              ...StackActions.popToTop(),
              target: tabState.key,
            });
          }
        },
      })}
      initialRouteName={'initialRoute'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          size = 16 * BW();
          // color = focused ? '#CE9C56' : '#C4C4C4';
          let rn = route.name;
          let tabIcon;

          if (rn === 'initialRoute') {
            tabIcon = focused
              ? require('../../assets/tabs/homeActive.png')
              : require('../../assets/tabs/home.png');
          } else if (rn === 'services') {
            tabIcon = focused
              ? require('../../assets/tabs/servicesActive.png')
              : require('../../assets/tabs/services.png');
          } else if (rn === 'help') {
            size = 18 * BW();
            tabIcon = focused
              ? require('../../assets/tabs/helpActive.png')
              : require('../../assets/tabs/help.png');
          } else if (rn === 'dashboard') {
            size = 24 * BW();
            tabIcon = focused
              ? require('../../assets/tabs/dashboardActive1.png')
              : require('../../assets/tabs/dashboard1.png');
          } else if (rn === 'settings') {
            tabIcon = focused
              ? require('../../assets/tabs/settingActive.png')
              : require('../../assets/tabs/setting.png');
          } else if (rn === 'media') {
            size = 22 * BW();
            tabIcon = focused
              ? require('../../assets/tabs/mediaSolid.png')
              : require('../../assets/tabs/media.png');
          }

          return (
            <Image
              source={tabIcon}
              style={{
                height: size,
                width: size,
                resizeMode: 'cover',
                tintColor: focused
                  ? colors.secondaryColor
                  : colors.iconPrimaryColor,
              }}
            />
          );
        },
        tabBarActiveTintColor: colors.secondaryColor,
        tabBarInactiveTintColor: colors.primary,
        tabBarButton: props => (
          <TouchableOpacity
            {...props}
            activeOpacity={0.6} // Set your desired activeOpacity
          />
        ),
        tabBarLabel: ({focused}) => (
          <View>
            <Text
              h4
              numberOfLines={1}
              style={{
                marginBottom: 6 * BW(),
                marginTop: 4 * BW(),
                fontFamily: isArabic()
                  ? theme.themeObject.currentFontFamilyAR.normal
                  : theme.themeObject.currentFontFamily.normal,
                color: focused
                  ? colors.secondaryColor
                  : colors.lightPrimaryTextColor,
              }}>
              {route.name === 'initialRoute' ? t('home') : t(route.name)}
            </Text>
            <View
              style={{
                borderWidth: focused ? 2 * BW() : 0,
                borderColor: focused ? colors.secondaryColor : 'transparent',
                borderRadius: 8 * BW(),
              }}
            />
          </View>
        ),
        tabBarStyle: {
          padding: 10 * BW(),
          minHeight: Platform.OS == 'android' ? 80 * BH() : 100 * BH(),
          paddingBottom: 16 * BW(),
        },
        popToTopOnBlur: ['services', 'dashboard', 'initialRoute'].includes(
          route.name,
        )
          ? true
          : false,
        animation: 'fade',
        tabBarBackground: () => (
          <View style={{flex: 1, backgroundColor: colors.background}} />
        ),
      })}>
      <Tab.Screen
        name={'initialRoute'}
        component={InitialNavigator}
        options={{
          headerShown: false,
          title: t('home'),
        }}
      />

      <Tab.Screen
        name={'services'}
        component={ServicesNavigator}
        options={{
          headerShown: false,
          title: t('services'),
        }}
      />
      <Tab.Screen
        name={'media'}
        component={MediaNavigation}
        options={{
          headerShown: false,
          title: t('Media'),
        }}
      />
      <Tab.Screen
        name={'help'}
        options={{
          headerShown: false,
          title: t('help'),
        }}
        component={HelpNavigation}
      />
      <Tab.Screen
        name={'dashboard'}
        component={DashboardNavigator}
        options={{
          headerShown: false,
          title: t('dashboard'),
        }}
      />
      {/* <Tab.Screen
        name={'settings'}
        component={Settings}
        options={{
          headerShown: false,
          title: t('settings'),
        }}
      /> */}
    </Tab.Navigator>
  );
}
export default BottomTabs;
