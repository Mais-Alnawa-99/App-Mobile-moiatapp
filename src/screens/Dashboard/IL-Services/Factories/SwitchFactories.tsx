import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import Text from '../../../../component/Text';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import Button from '../../../../component/Button';
import PageBg from '../../../../component/PageBg';
import {BW} from '../../../../style/theme';
import {isArabic} from '../../../../locales';
import FlatListComp from '../../../../component/FlatList';
import DashedLine from '../../../../component/DashedLine';
import {getUserFactories} from '../../../../redux/reducers/I-Services/thunk/profile';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import {setUserILData} from '../../../../redux/reducers/User/userILData';
import NavigationService from '../../../../navigation/NavigationService';
import Loader from '../../../../component/Loader';
import {setILNeedUserId} from '../../../../redux/reducers/General/server';
import {startILService} from '../../../services/IndustrialServices';

export default function SwitchFactories(props: any): JSX.Element {
  const params = props?.route?.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const lang = isArabic() ? 'ar' : 'en';
  const dispatch = useAppDispatch();

  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(true);

  const {userILData, userId}: any = useAppSelector(store => store.userILData);

  useEffect(() => {
    dispatch(setILNeedUserId(true));
  }, []);
  const _getUserFactories = () => {
    setLoading(true);
    dispatch(getUserFactories({UserId: userId})).then(res => {
      if (res?.payload?.networkSuccess) {
        setLoading(false);

        setFactories(res?.payload?.result?.Licenses);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    _getUserFactories();
  }, [userId]);

  const onChangeFactory = (item: any) => {
    dispatch(setUserILData({userILData: item}));

    if (params?.actionBack) {
      NavigationService.goBack();
    } else if (!!params?.screen) {
      NavigationService.navigate(params.screen);
    } else {
      NavigationService.goBack();
    }
  };
  const renderFactoryCard = ({item, index}: any) => {
    const isSelected = userILData?.Id === item.Id;

    return (
      <Animatable.View
        key={index}
        style={[
          style.card,
          isSelected && {borderColor: colors?.secondaryColor},
        ]}
        animation={index % 2 == 0 ? 'fadeInRight' : 'fadeInLeft'}
        delay={100 + 100 * index}>
        <TouchableOpacity onPress={() => onChangeFactory(item)}>
          <View
            style={[
              {
                marginBottom: 6 * BW(),
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5 * BW(),
                // justifyContent: 'center',
              },
              isSelected && {justifyContent: 'space-between'},
            ]}>
            <Text h3 bold>
              {isArabic()
                ? item.ApplicationNameAr
                : item?.ApplicationNameEn || '-'}
            </Text>
            {isSelected && (
              <View
                style={{
                  backgroundColor: colors.mainWhite,
                  padding: 3 * BW(),
                  borderColor: colors.secondaryColor,
                  borderWidth: 4 * BW(),
                  borderRadius: 40 * BW(),
                  width: 10 * BW(),
                  height: 10 * BW(),
                }}
              />
            )}
          </View>
          <DashedLine />
          {(item.EmirateNameAr || item.EmirateNameEn) && (
            <>
              <View style={style.fieldRow}>
                <Text h4 style={style.title}>
                  {t('IL.Emirates')} :
                </Text>
                <Text h4 medium>
                  {isArabic() ? item.EmirateNameAr : item.EmirateNameEn}
                </Text>
              </View>
            </>
          )}
          {item.RecordNumber && (
            <>
              <View style={style.fieldRow}>
                <Text h4 style={style.title}>
                  {t('IL.RecordNumber')} :
                </Text>
                <Text h4 medium>
                  {item.RecordNumber}
                </Text>
              </View>
            </>
          )}
          <DashedLine />
          <View style={style.fieldRow}>
            <Text h4 style={style.title}>
              {t('IL.Status')} :
            </Text>
            <View style={[style.fieldRow, {marginBottom: 0}]}>
              <Text
                h4
                medium
                style={{
                  color: ['cancelled', 'expired'].includes(
                    item?.LicenseStatusClass,
                  )
                    ? colors?.red
                    : ['active'].includes(item?.LicenseStatusClass)
                    ? colors?.green
                    : colors.text,
                }}>
                {isArabic() ? item.LicenseStatusAr : item.LicenseStatusEn}
              </Text>
              <Text h4 medium>
                {item?.LicenseExpiryDateText}
              </Text>
            </View>
          </View>
          {!isSelected && (
            <Button
              title={t('Select')}
              style={style.selectButton}
              styleText={style.selectButtonText}
              onPress={() => onChangeFactory(item)}
              medium
              antDesign={'arrowright'}
              styleIcon={{
                marginStart: 4 * BW(),
                fontSize: 16 * BW(),
                transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
              }}
            />
          )}
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <PageBg>
      <Page
        withStatusBar
        withHeader
        ttsScopeId="il-fac-scope"
        withOutScrollView
        header={<Header title={t('IL.SwitchFactories')} showNotification />}>
        <Loader isLoading={loading}>
          <>
            <Button
              title={t('IL.AddNewFactory')}
              onPress={() => {
                NavigationService.navigate('IssueIndustrialProductionLicense', {
                  service: {
                    serviceId: 10,
                    name: t('IL.IssueIndustrialProductionLicense'),
                  },
                });
              }}
              bold
              style={style.createProfileBtn}
              styleText={{color: colors.mainWhite}}
            />

            {/* {showFactoryOptions && (
          <View style={style.licenseOptions}>
            <Text h4 bold style={{marginBottom: 3 * BW()}}>
              {t('IL.ChooseAnOptionBelow')}
            </Text>

            <View style={style.licenseList}>
              <TouchableOpacity
                style={style.optionCard}
                onPress={() => {
                  props.navigation.navigate('WebViewScreen', {
                    url: `/${lang}/InitialIndustrialLicense?addFactory=True`,
                  });
                }}>
                <Icon
                  name="check-circle"
                  size={6 * BW()}
                  color={colors.primary}
                  style={{marginBottom: 2 * BW()}}
                />
                <Text h4>{t('إصدار شهادة الموافقة المبدئية')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={style.optionCard}
                onPress={() => {
                  props.navigation.navigate('WebViewScreen', {
                    url: `/${lang}/IndustrialLicenseRegistration?addFactory=True`,
                  });
                }}>
                <Icon
                  name="industry"
                  size={6 * BW()}
                  color={colors.primary}
                  style={{marginBottom: 2 * BW()}}
                />
                <Text h4>{t('إصدار رخصة إنتاج صناعي')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )} */}

            <FlatListComp
              data={factories}
              noData
              renderItem={renderFactoryCard}
            />
          </>
        </Loader>
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    createProfileBtn: {
      backgroundColor: colors.secondaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16 * BW(),
      height: 46 * BW(),
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: 8 * BW(),
      padding: 12 * BW(),
      marginTop: 12 * BW(),
      position: 'relative',
      borderWidth: 1 * BW(),
      borderColor: colors.white,
    },
    fieldRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6 * BW(),
      gap: 10 * BW(),
    },
    title: {
      color: colors.textColor + '99',
    },
    value: {
      color: colors.secondaryColor,
    },
    licenseOptions: {
      padding: 4 * BW(),
    },
    licenseList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    optionCard: {
      width: '48%',
      backgroundColor: colors.card,
      padding: 4 * BW(),
      borderRadius: 4 * BW(),
      alignItems: 'center',
    },
    selectButton: {
      height: 'auto',
      padding: 0 * BW(),
      flexDirection: 'row',
      minWidth: 40 * BW(),
      alignSelf: 'flex-end',
    },
    selectButtonText: {
      color: colors.secondaryColor,
    },
  });
