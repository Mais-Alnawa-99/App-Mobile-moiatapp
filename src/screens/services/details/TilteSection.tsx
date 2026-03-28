import React, {useState} from 'react';
import {StyleSheet, View, Image, ScrollView, Linking} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {BW} from '../../../style/theme';
import Text from '../../../component/Text';
import Button from '../../../component/Button';
import NavigationService from '../../../navigation/NavigationService';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {setFavouriteServices} from '../../../redux/reducers/Services/slice/favouriteServices';
import {onShare} from '../../../component/Generalfunction';
import {startILService} from '../IndustrialServices';
import {createApplication} from '../Eservices/ServiceForm';
import {setSelectedService} from '../../../redux/reducers/Services/slice/selectedService';
import RenewalLicenseOptions from '../IndustrialServices/staticForms/RenewalIndustrialProductionLicense/RenewalLicenseOptions';
import {_updateUserFavouriteServices} from '../FavouriteServices';

export default function TilteSection(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const [modalRenewalVisiable, setModalRenewalVisiable] = useState(false);
  const {isLoggedIn} = useAppSelector(state => state.auth);

  const {details, data} = props;

  const {favouriteServices} = useAppSelector(state => state.favouriteServices);
  const dispatch = useAppDispatch();

  const isFavourite = favouriteServices.some((fav: any) => fav.Id === data?.Id);

  const _setFavouriteServices = (item: any) => {
    _updateUserFavouriteServices(item, isFavourite);
  };

  const startService = () => {
    if (data?.relatedServiceId === 'link') {
      Linking.openURL(data?.FieldValues?.StartServiceURL);
      return;
    }
    if (isLoggedIn) {
      if (data?.type === 'il') {
        if (data?.relatedServiceId === 10) {
          NavigationService.navigate('IssueIndustrialProductionLicense', {
            service: {
              serviceId: 10,
              name: data?.FieldValues?.Title,
            },
          });
        } else {
          startILService({
            id: data?.relatedServiceId,
            serviceId: data?.relatedServiceId,
            name: data?.FieldValues?.Title,
          });
        }
      } else
        createApplication(data?.relatedServiceId, {
          ...data,
          Id: data?.relatedServiceId,
        });
    } else {
      dispatch(setSelectedService(details));
      NavigationService.goBack();
      NavigationService.navigate('dashboard');
    }
  };
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        borderRadius: 16 * BW(),
        padding: 16 * BW(),
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 2,
          }}>
          <Text h3 bold style={style.title}>
            {details?.FieldValues?.Title || data?.FieldValues.Title}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <Button
            onPress={() => {
              onShare({
                title: details?.FieldValues?.Title,
                message:
                  details?.FieldValues?.Title +
                  '\n' +
                  details?.FieldValues?.ServiceFullURL,
                url: details?.FieldValues?.ServiceFullURL,
              });
            }}
            icon={require('../../../assets/icons/share.png')}
            style={style.shareContainer}
            containerIcon={style.containerIcon}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16 * BW(),
        }}>
        <Button
          style={{
            ...style.btnFav,
            opacity:
              !!data?.relatedServiceId &&
              typeof data?.relatedServiceId == 'number'
                ? 1
                : 0,
          }}
          disabled={
            !!data?.relatedServiceId &&
            typeof data?.relatedServiceId == 'number'
              ? false
              : true
          }
          medium
          title={isFavourite ? t('removeFromFavorite') : t('addToFavorite')}
          styleText={{...style.title, marginStart: 8 * BW()}}
          containerIcon={style.containerIcon}
          onPress={() => {
            _setFavouriteServices(data);
          }}
          antDesignColor={colors?.mainWhite}
          antDesign={isFavourite ? 'heart' : 'hearto'}
          antDesignSize={18 * BW()}
        />
        {!!data?.relatedServiceId && (
          <Button
            style={style.SatrtService}
            medium
            title={t('StartService')}
            styleText={style.title}
            containerIcon={style.containerIcon}
            onPress={() => {
              startService();
            }}
          />
        )}
        <RenewalLicenseOptions
          service={{
            id: data?.relatedServiceId,
            name: details?.DisplayName,
            serviceId: data?.relatedServiceId,
          }}
          modalVisible={modalRenewalVisiable}
          setModalVisible={setModalRenewalVisiable}
        />
      </View>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    title: {
      color: colors.mainWhite,
      marginEnd: 8 * BW(),
    },
    white: {
      color: colors.mainWhite,
    },

    shareContainer: {
      padding: 1 * BW(),
      // borderRadius: 12 * BW(),
      height: 'auto',
      width: 'auto',
    },
    icon: {
      width: 18 * BW(),
      height: 18 * BW(),
      resizeMode: 'contain',
    },
    btnFav: {
      width: 'auto',
      height: 'auto',
      backgroundColor: colors.primary,
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
      padding: 0,
      borderRadius: 0,
    },
    SatrtService: {
      width: 140 * BW(),
      height: 'auto',
      padding: 5 * BW(),
      backgroundColor: colors.secondaryColor,
      borderRadius: 100 * BW(),
    },
    containerIcon: {
      width: 22 * BW(),
      height: 22 * BW(),
    },
  });
