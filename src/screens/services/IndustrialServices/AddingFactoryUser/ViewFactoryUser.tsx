import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {useTranslation} from 'react-i18next';
import {useRoute, useTheme} from '@react-navigation/native';
import {BW, BH} from '../../../../style/theme';
import Button from '../../../../component/Button';
import {ReadOnlyRow} from '../staticForms/ReusableComponents';
import {
  submitFactoryUser,
  updateFactoryUser,
} from '../../../../redux/reducers/I-Services/thunk/factory';
import {useAppDispatch} from '../../../../redux/store';
import Input from '../../../../component/input/Input';
import Loader from '../../../../component/Loader';
import Text from '../../../../component/Text';
import {Icon} from 'react-native-elements';
import InfoRow from './UserInfoRow';
import ServiceContainer from './ServiceContainer';

const ViewFactoryUser = () => {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const route = useRoute<any>();
  const {userData, licenseId} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [serviceOptions, setServiceOptions] = useState<
    {label: any; value: any}[]
  >([]);

  useEffect(() => {
    if (user?.Services) {
      const selected = user.Services.filter((s: any) => s.Selected).map(
        (s: any) => s.Id,
      );

      const options = user.Services.map((s: any) => ({
        label: s.Name,
        value: s.Id,
      }));

      setSelectedServices(selected);
      setServiceOptions(options);
    }
  }, [user]);

  const _editFactoryUser = () => {
    setIsLoading(true);
    dispatch(
      updateFactoryUser({
        userId: userData.UserId,
      }),
    ).then(res => {
      if (
        res.meta.requestStatus === 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        const user = res.payload?.result;
        setUser(user);
        setIsLoading(false);
      } else {
      }
    });
  };

  useEffect(() => {
    _editFactoryUser();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          styles={{padding: 8 * BW()}}
          header={<Header title={user?.Name} titleContainerStyle={{flex: 8}} />}
          withHeader>
          <Loader isLoading={isLoading}>
            <>
              <InfoRow icon="person" label={t('FullName')} value={user?.Name} />
              <InfoRow
                icon="email"
                label={t('EmailLabel')}
                value={user?.Email}
              />
              <InfoRow
                icon="badge"
                label={t('EmiratesIDLabel')}
                value={
                  user?.IdentificationDocument != 'NULL'
                    ? user?.IdentificationDocument
                    : '-'
                }
              />

              <View style={{marginTop: 8 * BW()}}>
                <Text h3 medium>
                  {t('services')} :
                </Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {serviceOptions
                    .filter(option => selectedServices.includes(option.value))
                    .map((option, index) => (
                      <View key={option.value} style={{width: '50%'}}>
                        <ServiceContainer
                          index={index + 1}
                          value={option.label}
                        />
                      </View>
                    ))}
                </View>
              </View>
            </>
          </Loader>
        </Page>
      </ImageBackground>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },

    floatingAddBtn: {
      position: 'absolute',
      bottom: 10 * BH(),
      right: 10 * BW(),
      width: 50 * BW(),
      height: 50 * BW(),
      borderRadius: 28 * BW(),
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      zIndex: 100,
    },
  });

export default ViewFactoryUser;
