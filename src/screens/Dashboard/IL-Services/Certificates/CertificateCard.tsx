import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import Text from '../../../../component/Text';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import {useAppDispatch} from '../../../../redux/store';
import DashedLine from '../../../../component/DashedLine';
import Button from '../../../../component/Button';
import {_downloadFile64} from '../../../../component/SaveFiles';
import {downlaodCertificateOrReceipt} from '../../../../redux/reducers/I-Services/thunk/certificates';

export default function CertificateCard({
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
  const [loading, setLoading] = useState(false);
  const cerName = item?.ApplicationName;

  useEffect(() => {
    if (item?.totalRows && setTotalCount) {
      setTotalCount(item.totalRows);
    }
  }, [item?.totalRows, setTotalCount]);

  const dispatch = useAppDispatch();

  const _getApplicationCertificateById = () => {
    setLoading(true);
    dispatch(
      downlaodCertificateOrReceipt({
        Id: item?.Id,
        Type: 0,
      }),
    ).then(async res => {
      if (res.payload?.networkSuccess) {
        await _downloadFile64(
          `${cerName}_${item?.recordId || item?.ReferenceNo}`,
          'pdf',
          res.payload?.data,
          false,
        );
      }
      setLoading(false);
    });
  };

  return (
    <Animatable.View
      animation={index % 2 == 0 ? 'fadeInLeft' : 'fadeInRight'}
      duration={1000}
      delay={150}
      style={style.card}>
      <View style={[style.row, {marginBottom: 0}]}>
        <Text h3 medium style={{color: colors.secondaryColor}}>
          {item?.ApplicationName}
        </Text>
      </View>
      <DashedLine style={{marginTop: 4 * BW()}} />
      <View>
        {item?.ReferenceNo && (
          <View style={[style.row]}>
            <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
              {t('IL.ApplicationNumber')}:
            </Text>
            <Text h4 medium>
              {item?.ReferenceNo}
            </Text>
          </View>
        )}
        {item?.ApplicationName && (
          <View style={[style.row]}>
            <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
              {t('IL.Service')}:
            </Text>
            <Text h4 medium style={{width: '75%'}}>
              {item?.ApplicationName}
            </Text>
          </View>
        )}
        {item?.CertificateIssueDate && (
          <View style={[style.row]}>
            <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
              {t('IL.IssueDate')}:
            </Text>
            <Text h4 medium style={{width: '75%'}}>
              {moment(item?.CertificateIssueDate).format('MMM DD,YYYY hh:mm A')}
            </Text>
          </View>
        )}
        {item?.CertificateExpiryDate && (
          <View style={[style.row]}>
            <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
              {t('IL.ExpiryDate')}:
            </Text>
            <Text h4 medium style={{width: '75%'}}>
              {moment(item?.CertificateExpiryDate).format(
                'MMM DD,YYYY hh:mm A',
              )}
            </Text>
          </View>
        )}
      </View>

      {/* <DashedLine style={{marginTop: 4 * BW()}} /> */}
      <View style={style.btnContainer}>
        <Button
          title={t('Button.DownloadCertificate')}
          style={style.btn}
          onPress={() => {
            _getApplicationCertificateById();
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
    </Animatable.View>
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
  });
