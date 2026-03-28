import Rate, {AndroidMarket} from 'react-native-rate';

export const handleRateApp = () => {
  const options = {
    AppleAppID: '6739280464',
    GooglePackageName: 'com.moiatsmart.app',
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: true,
    openAppStoreIfInAppFails: true,
  };

  Rate.rate(options, success => {
    if (success) {
    } else {
    }
  });
};
