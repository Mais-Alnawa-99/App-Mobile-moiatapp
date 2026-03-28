import React, {useState, useEffect, Fragment} from 'react';
import {View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {BW} from '../../../../style/theme';
import Text from '../../../../component/Text';
import moment from 'moment';
import ProgressCircle from '../../../../component/ProgressCircle';
import {isArabic} from '../../../../locales';
import NavigationService from '../../../../navigation/NavigationService';
import {parseJSON} from '../../../services/utils';
import DashedLine from '../../../../component/DashedLine';

const RequestData = ({
  applicationDetails,
  index,
  style,
  listView,
  setTotalCount,
  fromSearch,
  total,
}: any) => {
  const langId = isArabic() ? 2 : 1;
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  if (
    applicationDetails?.totalRows &&
    total &&
    applicationDetails?.totalRows?.toString() !== total.toString()
  ) {
    setTotalCount(applicationDetails?.totalRows);
  }

  return (
    <TouchableOpacity
      onPress={() =>
        NavigationService.navigate('ApplicationDetails', {
          appId: applicationDetails.applicationId,
        })
      }>
      <Animatable.View
        animation={index % 2 !== 0 ? 'fadeInLeft' : 'fadeInRight'}
        duration={1000}
        delay={150}
        style={{
          marginTop: 8 * BW(),
          gap: 6 * BW(),
          backgroundColor: colors.mainBackground,
          borderRadius: 8 * BW(),
          ...style,
          padding: 12 * BW(),
        }}>
        {listView && (
          <View style={[styles.row, {gap: 6 * BW()}]}>
            <Text h4 bold style={{width: '80%'}}>
              {
                parseJSON(applicationDetails?.serviceName || '[]')?.find(
                  (item: any) => item.langId === langId,
                )?.value
              }
            </Text>
          </View>
        )}
        <View style={[styles.row, {gap: 6 * BW()}]}>
          <Text h4 style={{color: colors.darkGray, minWidth: '24%'}}>
            {t('Labels.ApplicationNo')}:{' '}
          </Text>
          <Text h4 medium>
            {applicationDetails?.applicationNumber}
          </Text>
        </View>
        {listView && (
          <DashedLine
            style={{
              marginVertical: 2 * BW(),
            }}
          />
        )}
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
          <ProgressCircle percentage={applicationDetails?.percentCompleted} />
        </View>

        <View style={[styles.row, {gap: 6 * BW()}]}>
          <Text h4 style={{color: colors.darkGray, minWidth: '24%'}}>
            {t('Labels.ApplicationCreatedDate')}:{' '}
          </Text>
          <Text h4 medium>
            {moment(applicationDetails?.createdOn).format(
              'MMM DD,YYYY hh:mm A',
            )}
          </Text>
        </View>
        {listView && (
          <DashedLine
            style={{
              marginVertical: 2 * BW(),
            }}
          />
        )}

        <View style={[styles.row, {gap: 6 * BW()}]}>
          <Text h4 style={{color: colors.darkGray, minWidth: '24%'}}>
            {t('Labels.CreatedBy')}:{' '}
          </Text>
          <Text h4 medium>
            {applicationDetails?.createdBy}
          </Text>
        </View>

        {listView && (
          <View style={[styles.row, {gap: 6 * BW()}]}>
            <View
              style={[
                styles.row,
                {gap: 6 * BW()},

                applicationDetails.percentCompleted != 100
                  ? styles.pendingBackground
                  : styles.completedBackground,
              ]}>
              <Text
                h4
                style={
                  applicationDetails.percentCompleted != 100
                    ? styles.pending
                    : styles.completed
                }>
                {
                  parseJSON(applicationDetails?.statusName || '[]')?.find(
                    (item: any) => item.langId === langId,
                  )?.value
                }
              </Text>
              <View
                style={{
                  borderColor: colors.primary,
                  borderWidth: 0.4 * BW(),
                  width: 0,
                  height: 20 * BW(),
                  marginHorizontal: 8 * BW(),
                }}
              />
              <Text h4>
                {
                  parseJSON(applicationDetails?.stageName || '[]')?.find(
                    (item: any) => item.langId === langId,
                  )?.value
                }
              </Text>
            </View>
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
      backgroundColor: colors?.red + '33',
      paddingHorizontal: 36 * BW(),
      padding: 4 * BW(),
      borderRadius: 24 * BW(),
    },
    completedBackground: {
      backgroundColor: colors?.green + '22',
      paddingHorizontal: 36 * BW(),
      padding: 4 * BW(),
      borderRadius: 24 * BW(),
    },
  });

export default RequestData;
