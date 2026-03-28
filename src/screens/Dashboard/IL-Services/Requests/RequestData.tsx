import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {BW} from '../../../../style/theme';
import Text from '../../../../component/Text';
import moment from 'moment';
import {isArabic} from '../../../../locales';
import DashedLine from '../../../../component/DashedLine';

import {useAppDispatch} from '../../../../redux/store';

import NavigationService from '../../../../navigation/NavigationService';
import {_openModal} from '../../../services/Eservices/ServiceForm';
import {setLoadingApplication} from '../../../../redux/reducers/General/loader';

import PayNow from '../../../services/IndustrialServices/PayNow';

const RequestData = ({
  applicationDetails,
  index,
  style,
  listView,
  setTotalCount,
  fromSearch,
  total,
}: any) => {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();

  if (
    applicationDetails?.totalRows &&
    total &&
    applicationDetails?.totalRows?.toString() !== total.toString()
  ) {
    setTotalCount(applicationDetails?.totalRows);
  }

  const moveTo = () => {
    dispatch(setLoadingApplication(true));
    let screen = '';
    let FormId = applicationDetails.FormId?.toString();
    switch (FormId) {
      case '17':
        screen = 'IndustrialLicenseCancellation';
        break;
      // case '15':
      //   screen = 'PricePreference';
      //   break;
      case '11':
        screen = 'CustomsExemptionRegistration';
        break;
      case '12':
        screen = 'MaterialQuantityIncrease';
        break;
      case '13':
        screen = 'DutyExemption';
        break;
      case '25':
        screen = 'DutyExemptionFastTrack';
        break;
      case '19':
        if (applicationDetails?.ServiceActionType == 1)
          screen = 'RenewalIndustrialProductionLicense';
        else screen = 'IssueIndustrialProductionLicense';
        break;
      case '10':
        screen = 'IssueIndustrialProductionLicense';
        break;
      case '14':
        screen = 'ValueAddedTaxRequest';
        break;
      case '21':
        screen = 'IssueIndustrialProductionLicense';
        break;
    }
    NavigationService.navigate(screen, {
      service: {
        serviceId: applicationDetails?.FormId,
        name: applicationDetails?.ApplicationName,
        ReferenceNo: applicationDetails?.ReferenceNo,
        DateCreated: applicationDetails?.DateCreated,
        LockedUser: applicationDetails?.LockedBy,
        ApplicationId: applicationDetails?.Id,
        canPay: applicationDetails?.CanPay,
      },
      applicationId: applicationDetails?.Id,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        moveTo();
      }}>
      <Animatable.View
        animation={index % 2 !== 0 ? 'fadeInLeft' : 'fadeInRight'}
        duration={1000}
        delay={150}
        style={{
          marginTop: 8 * BW(),
          gap: 4 * BW(),
          backgroundColor: colors.mainBackground,
          borderRadius: 8 * BW(),
          ...style,
          padding: 12 * BW(),
        }}>
        <View style={[styles.row, {marginBottom: 10 * BW()}]}>
          <Text h3 bold style={{width: '80%'}}>
            {applicationDetails?.ApplicationName}
          </Text>
        </View>
        <View style={[styles.row]}>
          <Text h4 style={{color: colors.lightPrimaryTextColor}}>
            {t('Labels.ApplicationNo')}:{'  '}
          </Text>
          <Text h4 medium style={{color: colors.textPrimaryColor}}>
            {applicationDetails?.ReferenceNo}
          </Text>
        </View>
        <DashedLine
          style={{
            marginVertical: 0 * BW(),
          }}
        />
        <View
          style={[
            styles.row,
            {
              position: 'absolute',
              right: 12 * BW(),
              top: 12 * BW(),
            },
          ]}>
          {/* <Text h4>{t('Table.Percentage')} </Text> */}
          {/* <ProgressCircle percentage={applicationDetails?.percentCompleted} /> */}
        </View>

        <View style={[styles.row]}>
          <Text h4 style={{color: colors.lightPrimaryTextColor}}>
            {t('IL.ApplicationDate')}:{'  '}
          </Text>
          <Text h4 medium style={{color: colors.textPrimaryColor}}>
            {moment(applicationDetails?.DateCreated).format(
              'MMM DD,YYYY hh:mm A',
            )}
          </Text>
        </View>
        <DashedLine
          style={{
            marginVertical: 0 * BW(),
          }}
        />

        <View style={[styles.row]}>
          <Text h4 style={{color: colors.lightPrimaryTextColor}}>
            {t('IL.CreatedBy')}:{'  '}
          </Text>
          <Text h4 medium style={{color: colors.textPrimaryColor}}>
            {applicationDetails?.CreatedByUserName}
          </Text>
        </View>

        {applicationDetails?.LockedBy && (
          <>
            <DashedLine
              style={{
                marginVertical: 0 * BW(),
              }}
            />
            <View style={[styles.row]}>
              <Text h4 style={{color: colors.lightPrimaryTextColor}}>
                {t('IL.CheckOutBy')}:{'  '}
              </Text>
              <Text h4 medium style={{color: colors.textPrimaryColor}}>
                {applicationDetails?.LockedBy}
              </Text>
            </View>
          </>
        )}
        {(applicationDetails?.StatusTextAr ||
          applicationDetails?.LicenseStatusText ||
          applicationDetails?.StatusTextEn) && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 14 * BW(),
            }}>
            <View
              style={[
                applicationDetails.percentCompleted != 100
                  ? styles.pendingBackground
                  : styles.completedBackground,
              ]}>
              <Text
                h4
                style={{
                  color:
                    applicationDetails.percentCompleted != 100
                      ? colors?.red
                      : colors?.green,
                }}>
                {isArabic()
                  ? applicationDetails?.StatusTextAr ||
                    applicationDetails?.LicenseStatusText
                  : applicationDetails?.StatusTextEn ||
                    applicationDetails?.LicenseStatusClass}
              </Text>
            </View>
            {applicationDetails?.CanPay && (
              <PayNow applicationDetails={applicationDetails} />
            )}
          </View>
        )}
      </Animatable.View>
    </TouchableOpacity>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      // justifyContent: 'space-between',
    },
    pending: {
      color: colors?.red,
    },
    completed: {
      color: colors?.green,
    },
    pendingBackground: {
      backgroundColor: colors?.red + '28',
      paddingHorizontal: 36 * BW(),
      borderRadius: 24 * BW(),
      maxHeight: 40 * BW(),
    },
    completedBackground: {
      backgroundColor: colors?.green + '22',
      paddingHorizontal: 36 * BW(),
      borderRadius: 24 * BW(),
    },
  });

export default RequestData;
