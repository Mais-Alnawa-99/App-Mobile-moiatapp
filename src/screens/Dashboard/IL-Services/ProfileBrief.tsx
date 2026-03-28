import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Text from '../../../component/Text';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../style/theme';
import {isArabic} from '../../../locales';
import NavigationService from '../../../navigation/NavigationService';
import Button from '../../../component/Button';
import DashedLine from '../../../component/DashedLine';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function ProfileBrief({
  userILData,
  withoutAction,
  style,
  showFactoryUsers,
}: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  return (
    <>
      {userILData != null && userILData?.Id && (
        <View
          style={[
            styles.userContainer,
            {...style, paddingBottom: withoutAction ? 16 * BW() : 4 * BW()},
          ]}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text h3 bold style={{flex: 1}}>
              {isArabic()
                ? userILData.ApplicationNameAr
                : userILData?.ApplicationNameEn || '-'}
            </Text>
            {showFactoryUsers &&
              !['pending', 'draft'].includes(
                userILData?.LicenseStatusClass,
              ) && (
                <View
                  style={{
                    width: 32 * BW(),
                    height: 32 * BW(),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20 * BW(),
                    padding: 6 * BW(),
                    backgroundColor: colors.mainWhite + '22',
                  }}>
                  <Button
                    style={styles.btnContainer}
                    medium
                    antDesign={'adduser'}
                    antDesignColor={colors.secondaryColor}
                    onPress={() => NavigationService.navigate('FactoryUsers')}
                  />
                </View>
              )}
          </View>
          {(userILData?.EmirateNameAr || userILData.EmirateNameEn) && (
            <>
              <View style={[styles.fieldRow, {marginTop: 8 * BW()}]}>
                <Text h4 style={styles.title}>
                  {t('IL.Emirates')} :
                </Text>
                <Text h4 medium>
                  {isArabic()
                    ? userILData.EmirateNameAr
                    : userILData.EmirateNameEn}
                </Text>
              </View>
              <DashedLine />
            </>
          )}
          {userILData?.RecordNumber && (
            <>
              <View style={styles.fieldRow}>
                <Text h4 style={styles.title}>
                  {t('IL.RecordNumber')} :
                </Text>
                <Text h4 medium>
                  {userILData?.RecordNumber}
                </Text>
              </View>
              <DashedLine />
            </>
          )}
          <View style={styles.fieldRow}>
            <Text h4 style={styles.title}>
              {t('IL.Status')} :
            </Text>
            <View style={[styles.fieldRow, {marginBottom: 0}]}>
              <Text
                h4
                medium
                style={{
                  color: ['cancelled', 'expired'].includes(
                    userILData?.LicenseStatusClass,
                  )
                    ? colors?.red
                    : ['active'].includes(userILData?.LicenseStatusClass)
                    ? colors?.green
                    : colors.text,
                }}>
                {isArabic()
                  ? userILData.LicenseStatusAr
                  : userILData.LicenseStatusEn}
              </Text>
              <Text h4 medium>
                {userILData?.LicenseExpiryDateText}
              </Text>
            </View>
          </View>
          {!withoutAction && (
            <>
              <DashedLine />

              {['pending', 'draft'].includes(userILData?.LicenseStatusClass) ? (
                <View>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                    onPress={() =>
                      NavigationService.navigate(
                        'IssueIndustrialProductionLicense',
                        {
                          service: {
                            serviceId: '10',
                            name: isArabic()
                              ? userILData?.ApplicationNameAr
                              : userILData?.ApplicationNameEn,
                            ReferenceNo: userILData?.RecordNumber,
                            DateCreated: userILData?.DateCreated,
                            LockedUser: '',
                            ApplicationId: userILData?.Id,
                          },
                          applicationId: userILData?.Id,
                        },
                      )
                    }>
                    <FontAwesome5Icon
                      name="file-alt"
                      color={colors.secondaryColor}
                      size={20 * BW()}
                    />
                    <Text h4 style={{color: colors.secondaryColor}}>
                      {t('IL.ViewApplication')}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={[
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      padding: 2 * BW(),
                    },
                  ]}>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                    onPress={() =>
                      NavigationService.navigate('FactoryDetails')
                    }>
                    <FontAwesome5Icon
                      name="file-alt"
                      color={colors.secondaryColor}
                      size={20 * BW()}
                    />
                    <Text h4 style={{color: colors.secondaryColor}}>
                      {t('IL.FactoryProfile')}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: '100%',
                      borderColor: '#D4DDEA',
                      alignSelf: 'center',
                      borderRadius: 1 * BW(),
                      borderRightWidth: 1 * BW(),
                    }}
                  />

                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() =>
                      NavigationService.navigate('ProductsPortfolio')
                    }>
                    <MaterialIcons
                      name="format-list-bulleted"
                      color={colors.secondaryColor}
                      size={20 * BW()}
                    />

                    <Text h4 style={{color: colors.secondaryColor}}>
                      {t('IL.ProductsPortfolio')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
      )}
    </>
  );
}
const getStyle = (colors: any) =>
  StyleSheet.create({
    userContainer: {
      padding: 16 * BW(),
      paddingBottom: 4 * BW(),
      borderRadius: 8 * BW(),
      backgroundColor: colors.white + 'bb',
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'center',
    },
    fieldRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10 * BW(),
    },
    title: {
      color: colors.textColor + '99',
    },
    switchBtn: {
      // backgroundColor: 'red',
      width: 'auto',
      height: 'auto',
      alignItems: 'center',
      gap: 8 * BW(),
      flexDirection: 'row',
      borderRadius: 0 * BW(),
      padding: 0,
    },
    btnContainer: {
      width: 35 * BW(),
      height: 35 * BW(),
      backgroundColor: colors.black + '11',
      borderRadius: 30 * BW(),
      padding: 0,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row-reverse',
      gap: 4 * BW(),
    },
  });
