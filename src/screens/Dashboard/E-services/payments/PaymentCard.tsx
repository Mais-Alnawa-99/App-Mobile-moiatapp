import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import Text from '../../../../component/Text';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import {isArabic} from '../../../../locales';
import {useAppDispatch} from '../../../../redux/store';
import DashedLine from '../../../../component/DashedLine';
import Button from '../../../../component/Button';
import NavigationService from '../../../../navigation/NavigationService';
import {_downloadFile64} from '../../../../component/SaveFiles';

export default function PaymentCard({
  item,
  index,
  setTotalCount,
}: {
  item: any;
  index: number;
  setTotalCount: (i: any) => void;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const serName =
    JSON.parse(item.serviceName)?.find((n: any) =>
      isArabic() ? n.langId === 2 : n.langId === 1,
    )?.value || '';

  useEffect(() => {
    if (item?.totalRows && setTotalCount) {
      setTotalCount(item.totalRows);
    }
  }, [item?.totalRows, setTotalCount]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        NavigationService.navigate('PaymentsReceiptDetails', {
          orderNumber: item?.orderNumber,
          withOutCustmerPluse: true,
        });
      }}>
      <Animatable.View
        animation={index % 2 == 0 ? 'fadeInLeft' : 'fadeInRight'}
        duration={1000}
        delay={150}
        style={style.card}>
        <View
          style={[
            style.row,
            {marginBottom: 0, justifyContent: 'space-between'},
          ]}>
          <Text h3 medium style={{color: colors.secondaryColor}}>
            {item?.applicationNumber}
          </Text>
          <Text
            h4
            style={item?.status === 'Paid' ? style.success : style.failed}>
            {t('Labels.PaymentListStatus' + item?.status)}
          </Text>
        </View>
        <DashedLine style={{marginTop: 4 * BW()}} />
        <View>
          {item?.orderNumber && (
            <View style={[style.row]}>
              <Text h4 style={{color: colors.darkGray, minWidth: '32%'}}>
                {t('Table.OrderNumber')}:
              </Text>
              <Text h4 medium>
                {item?.orderNumber}
              </Text>
            </View>
          )}
          {serName && (
            <View style={[style.row]}>
              <Text h4 style={{color: colors.darkGray, minWidth: '32%'}}>
                {t('Table.ServiceName')}:
              </Text>
              <Text h4 medium style={{width: '75%'}}>
                {serName}
              </Text>
            </View>
          )}
          {item?.urn && (
            <View style={[style.row]}>
              <Text h4 style={{color: colors.darkGray, minWidth: '32%'}}>
                {t('Table.URN')}:
              </Text>
              <Text h4 medium>
                {item?.urn}
              </Text>
            </View>
          )}
          {item?.date && (
            <View style={[style.row]}>
              <Text h4 style={{color: colors.darkGray, minWidth: '32%'}}>
                {t('Table.PaymentDate')}:
              </Text>
              <Text h4 medium>
                {moment(item?.date).format('MMM DD,YYYY hh:mm A')}
              </Text>
            </View>
          )}
          {String(item?.amount) && (
            <View style={[style.row]}>
              <Text h4 style={{color: colors.darkGray, minWidth: '32%'}}>
                {t('Table.TotalAmount')}:
              </Text>
              <Text h4 medium>
                {item?.amount} AED
              </Text>
            </View>
          )}
        </View>
        <DashedLine style={{marginTop: 4 * BW()}} />
        <View style={style.btnContainer}>
          <Button
            title={t('IL.ViewPaymentDetails')}
            style={style.btn}
            onPress={() => {
              NavigationService.navigate('PaymentsReceiptDetails', {
                orderNumber: item?.orderNumber,
                withOutCustmerPluse: true,
              });
            }}
            styleText={style.btnText}
            // loadingColor={colors.mainWhite}
          />
        </View>
        {/* <View style={{flexDirection: 'row', marginTop: -4 * BW()}}>
        <Button
          style={{...style.btn, borderBottomWidth: 0}}
          title={readMore ? t('ReadLess') : t('ReadMore')}
          onPress={() => setReadMore(!readMore)}
        />
      </View>
       */}
        {/* <View style={style.btnContainer}>
        <Button
          title={t('Button.DownloadPayment')}
          style={style.btn}
          onPress={() => {
            _getApplicationPaymentById();
          }}
          styleText={style.btnText}
          loading={loading}
          // loadingColor={colors.mainWhite}
        />
        <Button
          title={t('Button.ViewApplication')}
          onPress={() => {
            NavigationService.navigate('ApplicationDetails', {
              appId: item?.applicationId,
            });
          }}
          style={style.btn}
          styleText={{
            color: colors.primaryColor,
          }}
        />
      </View> */}
      </Animatable.View>
    </TouchableOpacity>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    card: {
      padding: 16 * BW(),
      marginBottom: 8 * BW(),
      backgroundColor: colors.white,
      borderRadius: 6 * BW(),
      borderColor: colors.gray,
      borderWidth: 0.4 * BW(),
      gap: 8 * BW(),
    },
    row: {
      flexDirection: 'row',
      marginBottom: 6 * BW(),
    },
    btn: {
      minWidth: 'auto',
      // minHeight: 40 * BW(),
      height: 'auto',
      padding: 0 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 0 * BW(),
      backgroundColor: 'transparent',
      borderBottomColor: colors.textPrimaryColor,
      borderBottomWidth: 1 * BW(),
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    btnText: {
      color: colors.textPrimaryColor,
    },
    success: {
      color: colors.green,
    },
    failed: {
      color: colors.red,
    },
  });
