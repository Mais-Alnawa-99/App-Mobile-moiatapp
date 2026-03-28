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
import {setLoadingModal} from '../../../../redux/reducers/General/loader';
import NavigationService from '../../../../navigation/NavigationService';
import {_openModal} from '../../Eservices/ServiceForm';
import DashedLine from '../../../../component/DashedLine';

const EditFactoryUser = (props: any) => {
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
        const userRe = res.payload?.result;
        setUser(userRe);
        setIsLoading(false);
      } else {
      }
    });
  };

  const _submitFactoryUser = () => {
    dispatch(setLoadingModal(true));
    dispatch(
      submitFactoryUser({
        licenseId,
        userId: userData.UserId,
        email: user?.Email?.trim?.(),
        userName: user?.Name?.trim?.(),
        identificationDocumentNumber:
          user?.IdentificationDocument || userData?.IdNumber?.trim?.(),
        formsList: (selectedServices ?? []).map((s: any) =>
          Number(s.value ?? s),
        ),
      }),
    ).then(res => {
      dispatch(setLoadingModal(false));
      if (
        res?.payload.networkSuccess &&
        !!res?.payload?.result?.FactoryUserId
      ) {
        _openModal(
          dispatch,
          false,
          `${t('IL.UserUpdated')} `,
          '15%',
          false,
          () => NavigationService.goBack(),
        );
      } else {
        _openModal(
          dispatch,
          t('IL.ErrorGeneralPageTitle'),
          `${t('IL.ErrorGeneral')} `,
          '15%',
          false,
        );
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
          header={
            <Header
              title={t('IL.editFactoryUser')}
              hideDrawer
              titleContainerStyle={{flex: 8}}
            />
          }
          withHeader>
          <Loader isLoading={isLoading}>
            <>
              <ReadOnlyRow label={t('FullName')} value={user?.Name} />
              <ReadOnlyRow label={t('EmailLabel')} value={user?.Email} />
              <ReadOnlyRow
                label={t('EmiratesIDLabel')}
                value={user?.IdentificationDocument || userData?.IdNumber}
              />
              <Input
                multiSelect
                requiredStar
                label={t('IL.serviceName')}
                items={serviceOptions}
                placeholder={t('Select')}
                value={selectedServices}
                onChangeValue={(selected: number[]) => {
                  setSelectedServices(selected);
                }}
                styleInput={{marginBottom: 8 * BH()}}
                search={serviceOptions.length > 5}
              />
              <Button
                title={t('IL.ActionOk')}
                onPress={_submitFactoryUser}
                style={styles.btn}
                styleText={{color: colors.mainWhite}}
              />
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
    btn: {
      backgroundColor: colors?.secondaryColor,
      width: 'auto',
      height: 'auto',
      minHeight: 45 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10 * BW(),
      // position: 'absolute',
      // bottom: 10 * BH(),
      // left: 0,
      // right: 0,
      marginTop: 48 * BW(),
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

export default EditFactoryUser;
