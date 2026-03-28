import React, {useState, useEffect, Fragment} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import Text from '../../../../component/Text';
import moment from 'moment';
import ProgressCircle from '../../../../component/ProgressCircle';
import {isArabic} from '../../../../locales';

const ApplicationDetailsData = ({applicationDetails}: any) => {
  const langId = isArabic() ? 2 : 1;
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  if (!applicationDetails?.applicationNumber) return;

  return (
    <View
      style={{
        marginBottom: 16 * BW(),
        marginTop: 8 * BW(),
        gap: 8 * BW(),
        backgroundColor: colors.white,
        padding: 16 * BW(),
        borderRadius: 8 * BW(),
      }}>
      <View style={[style.row, {gap: 6 * BW()}]}>
        <Text h4 medium style={{color: colors.secondaryColor, minWidth: '25%'}}>
          {t('Labels.ApplicationNo')}:{' '}
        </Text>
        <Text h4 medium>
          {applicationDetails?.applicationNumber}
        </Text>
      </View>

      <View
        style={[
          style.row,
          {
            position: 'absolute',
            right: 16 * BW(),
            top: 16 * BW(),
          },
        ]}>
        {/* <Text h4>{t('Table.Percentage')} </Text> */}
        <ProgressCircle percentage={applicationDetails?.percentCompleted} />
      </View>
      <View style={[style.row, {gap: 6 * BW()}]}>
        <Text h4 medium style={{color: colors.secondaryColor, minWidth: '25%'}}>
          {t('Labels.ApplicationCreatedDate')}:{' '}
        </Text>
        <Text h4 medium>
          {moment(applicationDetails?.createdDate).format(
            'MMM DD,YYYY hh:mm A',
          )}
        </Text>
      </View>
      <View style={[style.row, {gap: 6 * BW()}]}>
        <Text h4 medium style={{color: colors.secondaryColor, minWidth: '25%'}}>
          {t('Labels.CreatedBy')}:{' '}
        </Text>
        <Text h4 medium>
          {applicationDetails?.creatorName}
        </Text>
      </View>

      <View style={[style.row, {gap: 6 * BW()}]}>
        <Text h4 medium style={{color: colors.secondaryColor, minWidth: '25%'}}>
          {t('Labels.ApplicationCurrentStage')}:{' '}
        </Text>
        <View style={[style.row, {gap: 6 * BW()}]}>
          <Text
            h4
            medium
            style={
              applicationDetails.currentStatusId == 1 ||
              applicationDetails.currentStatusId == 5
                ? style.pending
                : style.completed
            }>
            {
              JSON.parse(applicationDetails?.currentStatusName || '[]')?.find(
                (item: any) => item.langId === langId,
              )?.value
            }
          </Text>
          <Text h4 medium>
            {
              JSON.parse(applicationDetails?.stageName || '[]')?.find(
                (item: any) => item.langId === langId,
              )?.value
            }
          </Text>
        </View>
      </View>
    </View>
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
  });

export default ApplicationDetailsData;
