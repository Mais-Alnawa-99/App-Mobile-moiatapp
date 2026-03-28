import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Dimensions, View} from 'react-native';
import BottomTab from '../tabs/BottomTab';
import DrawerLabel from './DrawerLabel';
import DrawerContent from './DrawerContent';
import WebViewScreen from '../../screens/WebViewScreen';
import {useTranslation} from 'react-i18next';
import IntroPage from '../../screens/intro/IntroPage';
import Settings from '../../screens/settings/Settings';
import GovernmentCharter from '../../screens/basicPages/GovernmentCharter';
import {isArabic} from '../../locales';
import SearchNavigator from '../SearchNavigator';
import {useTheme} from '@react-navigation/native';
import AboutMinistry from '../../screens/basicPages/About/AboutMinistry';
import PrivacyPolicy from '../../screens/basicPages/PrivacyPolicy/PrivacyPolicy';
import TermsOfUse from '../../screens/basicPages/TermsOfUse';
import Programs from '../../screens/basicPages/Programs';
import MakeItInTheEmirates from '../../screens/basicPages/MakeItInTheEmirates';
import {BW} from '../../style/theme';
import OpenData from '../../screens/basicPages/OpenData';
import OpenDataNavigator from '../OpenDataNavigator';

const Drawer = createDrawerNavigator();

export default function CustomDrawer() {
  const contents = [
    {
      name: 'DrawerRoot',
      icon: require('../../assets/drawer/home.png'),
      title: 'Home',
      params: {
        type: 'first',
      },
      home: true,
      rout: BottomTab,
    },
    {
      name: 'AboutUs',
      icon: require('../../assets/drawer/aboutUs.png'),
      title: 'AboutUs',
      rout: AboutMinistry,
    },
    {
      name: 'Privacy',
      icon: require('../../assets/drawer/Privacy.png'),
      title: 'PrivacyPolicy',
      rout: PrivacyPolicy,
    },
    {
      name: 'Terms',
      icon: require('../../assets/drawer/TermsOfUse.png'),
      title: 'TermsOfUse',
      rout: TermsOfUse,
    },
    {
      name: 'Programs',
      icon: require('../../assets/drawer/Programs.png'),
      title: 'Programs',
      rout: Programs,
    },
    {
      name: 'Make',
      icon: require('../../assets/drawer/Flag.png'),
      title: 'MakeItInTheEmirates',
      rout: MakeItInTheEmirates,
    },

    // {
    //   name: 'E-Services',
    //   icon: require('../../assets/drawer/e-service.png'),
    //   title: 'EServicesHelp',
    //   params: {
    //     hideBack: true,
    //     showBackDrawer: true,
    //     hideDrawer: true,
    //     url: isArabic()
    //       ? 'https://moiat.gov.ae/ar/e-services/help'
    //       : 'https://moiat.gov.ae/en/e-services/help',
    //   },
    //   rout: WebViewScreen,
    // },

    // {
    //   name: 'HelpMenu',
    //   icon: require('../../assets/tabs/help.png'),
    //   title: 'help',
    //   params: {
    //     type: 'second',
    //   },
    //   rout: HelpNavigation,
    // },

    {
      name: 'OpenData',
      icon: require('../../assets/drawer/ChartBar.png'),
      title: 'OpenData',

      rout: OpenDataNavigator,
    },
    {
      name: 'GovermantCharter',
      icon: require('../../assets/drawer/Bank.png'),
      title: 'TheGovernmentCharter',
      rout: GovernmentCharter,
    },

    // {
    //   name: 'RateApplecation',
    //   icon: require('../../assets/drawer/Star.png'),
    //   title: 'RateTheApplication',
    //   params: {
    //     type: 'second',
    //     onPress: () => {
    //       handleRateApp();
    //     },
    //   },
    //   rout: BottomTab,
    // },

    {
      name: 'ApplicatioTour',
      icon: require('../../assets/drawer/Signpost.png'),
      title: 'ApplicationTour',
      params: {
        fromDrawer: true,
      },
      rout: IntroPage,
    },
    {
      name: 'settings',
      icon: require('../../assets/tabs/setting.png'),
      title: 'settings',
      rout: Settings,
    },
    {
      name: 'SearchDrawer',
      icon: require('../../assets/drawer/Bank.png'),
      title: 'SearchScreen',
      home: true,
      rout: SearchNavigator,
    },
  ];
  const width = Dimensions.get('window').width;
  const {t} = useTranslation();
  const {colors}: any = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: width,
        },
      }}
      initialRouteName="DrawerRoot"
      drawerContent={props => <DrawerContent {...props} />}>
      {contents.map((item: any, index) => (
        <Drawer.Screen
          key={index}
          options={{
            headerShown: false,
            drawerActiveBackgroundColor: colors.backgroundDrawer,
            drawerLabel: ({color, focused}) => (
              <DrawerLabel
                title={t(`${item.title}`)}
                icon={item.icon}
                focused={focused}
                onPress={!!item.onPress && item.onPress}
                home={!!item.home && item.home}
                index={index}
              />
            ),
            drawerItemStyle: {
              marginTop: 12 * BW(),
              borderRadius: 8 * BW(),
            },
          }}
          name={item.name}
          component={item.rout}
          initialParams={item.params}
        />
      ))}
    </Drawer.Navigator>
  );
}
