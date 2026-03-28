import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import Text from '../../../../component/Text';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import DashedLine from '../../../../component/DashedLine';
import {_downloadFile64} from '../../../../component/SaveFiles';
import Button from '../../../../component/Button';
import {useAppDispatch} from '../../../../redux/store';
import {downlaodCertificateOrReceipt} from '../../../../redux/reducers/I-Services/thunk/certificates';

export default function PaymentCard({
  item,
  index,
}: {
  item: any;
  index: number;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const _getApplicationPaymentById = () => {
    setLoading(true);
    dispatch(
      downlaodCertificateOrReceipt({
        Id: item?.Id,
        Type: 1,
      }),
    ).then(async res => {
      if (res.payload?.networkSuccess) {
        await _downloadFile64(
          `${item?.OrderNumber}`,
          'pdf',
          res.payload?.data,
          false,
        );
      }
      setLoading(false);
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      // onPress={() => {
      //   NavigationService.navigate('PaymentsReceiptDetails', {
      //     orderNumber: item?.receiptNumber,
      //     withOutCustmerPluse: true,
      //   });
      // }}
    >
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
          <View style={{flex: 1}}>
            <Text h3 medium style={{color: colors.secondaryColor}}>
              {item?.Title}
            </Text>
            <Text h4>{item?.PaymentType}</Text>
          </View>
          <Text
            h4
            style={
              item?.statusClass === 'Approved' ? style.success : style.failed
            }>
            {item?.statusText}
          </Text>
        </View>
        <DashedLine style={{marginTop: 4 * BW()}} />
        <View>
          {/* {item?.Title && (
            <View style={[style.row]}>
              <Text h4 style={{color: colors.darkGray, minWidth: '32%'}}>
                {t('Table.ServiceName')}:
              </Text>
              <Text h4 medium style={{width: '75%'}}>
                {item?.Title}
              </Text>
            </View>
          )} */}
          {item?.ReferenceNo && (
            <View style={[style.row]}>
              <Text h4 style={{color: colors.darkGray, minWidth: '32%'}}>
                {t('IL.TransactionNumber')}:
              </Text>
              <Text h4 medium>
                {item?.ReferenceNo}
              </Text>
            </View>
          )}
          {item?.URN && (
            <View style={[style.row]}>
              <Text h4 style={{color: colors.darkGray, minWidth: '32%'}}>
                {t('IL.ReceiptNumber')}:
              </Text>
              <Text h4 medium>
                {item?.URN}
              </Text>
            </View>
          )}

          {item?.PaymentDate && (
            <View style={[style.row]}>
              <Text h4 style={{color: colors.darkGray, minWidth: '32%'}}>
                {t('IL.PaymentDate')}:
              </Text>
              <Text h4 medium>
                {moment(item?.PaymentDate).format('MMM DD,YYYY hh:mm A')}
              </Text>
            </View>
          )}
          {String(item?.TotalAmount) && (
            <View style={[style.row]}>
              <Text h4 style={{color: colors.darkGray, minWidth: '32%'}}>
                {t('IL.TotalPayment')}:
              </Text>
              <Text h4 medium>
                {item?.TotalAmount} AED
              </Text>
            </View>
          )}
        </View>
        {/* <View style={{flexDirection: 'row', marginTop: -4 * BW()}}>
        <Button
          style={{...style.btn, borderBottomWidth: 0}}
          title={readMore ? t('ReadLess') : t('ReadMore')}
          onPress={() => setReadMore(!readMore)}
        />
      </View>
      <DashedLine style={{marginTop: 4 * BW()}} /> */}
        {item?.statusClass === 'Approved' && (
          <>
            <DashedLine />

            <View style={style.btnContainer}>
              <Button
                title={t('Button.DownloadReceipt')}
                style={style.btn}
                onPress={() => {
                  _getApplicationPaymentById();
                }}
                styleText={style.btnText}
                loading={loading}
                // loadingColor={colors.mainWhite}
              />
              {/* <Button
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
        /> */}
            </View>
          </>
        )}
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
