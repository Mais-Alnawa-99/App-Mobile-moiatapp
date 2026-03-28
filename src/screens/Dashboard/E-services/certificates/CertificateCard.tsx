import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import Text from '../../../../component/Text';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import {isArabic} from '../../../../locales';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import DashedLine from '../../../../component/DashedLine';
import Button from '../../../../component/Button';
import {getApplicationCertificateById} from '../../../../redux/reducers/E-Services/thunk/certificates';
import NavigationService from '../../../../navigation/NavigationService';
import {_downloadFile64} from '../../../../component/SaveFiles';

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
  const [readMore, setReadMore] = useState(false);
  const serName =
    JSON.parse(item.servicename)?.find((n: any) =>
      isArabic() ? n.langId === 2 : n.langId === 1,
    )?.value || '';
  const cerName =
    JSON.parse(item?.certificateTranslations)?.find((n: any) =>
      isArabic() ? n.langId === 2 : n.langId === 1,
    )?.value || '';
  useEffect(() => {
    if (item?.totalRows && setTotalCount) {
      setTotalCount(item.totalRows);
    }
  }, [item?.totalRows, setTotalCount]);

  const dispatch = useAppDispatch();

  const _getApplicationCertificateById = () => {
    setLoading(true);
    dispatch(
      getApplicationCertificateById({
        ApplicationId: item?.applicationId,
        AppCertificateId: item?.applicationCertificateId,
      }),
    ).then(async res => {
      if (res.payload?.networkSuccess) {
        await _downloadFile64(
          `${cerName} ${item?.recordId || item?.applicationNumber}`,
          'pdf',
          res.payload?.fileContents,
          true,
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
          {item?.applicationNumber} / {cerName}
        </Text>
      </View>
      <DashedLine style={{marginTop: 4 * BW()}} />
      <View>
        {item?.certificateNumber && (
          <View style={[style.row]}>
            <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
              {t('Labels.CertificateNumber')}:
            </Text>
            <Text h4 medium>
              {item?.certificateNumber}
            </Text>
          </View>
        )}
        {serName && (
          <View style={[style.row]}>
            <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
              {t('Table.ServiceName')}:
            </Text>
            <Text h4 medium style={{width: '75%'}}>
              {serName}
            </Text>
          </View>
        )}
        {readMore && (
          <>
            {item?.recordId && (
              <View style={[style.row]}>
                <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
                  {t('Labels.RecordId')}:
                </Text>
                <Text h4 medium>
                  {item?.recordId}
                </Text>
              </View>
            )}
            {item?.createdBy && (
              <View style={[style.row]}>
                <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
                  {t('Table.CreatedBy')}:
                </Text>
                <Text h4 medium>
                  {item?.createdBy}
                </Text>
              </View>
            )}
            {item?.registrationDate && (
              <View style={[style.row]}>
                <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
                  {t('Table.RegistrationDate')}:
                </Text>
                <Text h4 medium>
                  {moment(item?.registrationDate).format('MMM DD,YYYY hh:mm A')}
                </Text>
              </View>
            )}
            {item?.expiryDate != null && (
              <View style={[style.row]}>
                <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
                  {t('Table.ExpirydDate')}:
                </Text>
                <Text h4 medium>
                  {moment(item?.expiryDate).format('MMM DD,YYYY hh:mm A')}
                </Text>
              </View>
            )}
            {item?.issueDate && (
              <View style={[style.row, {marginBottom: 2 * BW()}]}>
                <Text h4 style={{color: colors.darkGray, minWidth: '27%'}}>
                  {t('Table.IssueDate')}:
                </Text>
                <Text h4 medium>
                  {moment(item?.issueDate).format('MMM DD,YYYY hh:mm A')}
                </Text>
              </View>
            )}
          </>
        )}
      </View>
      <View style={{flexDirection: 'row', marginTop: -4 * BW()}}>
        <Button
          style={{...style.btn, borderBottomWidth: 0}}
          title={readMore ? t('ReadLess') : t('ReadMore')}
          onPress={() => setReadMore(!readMore)}
        />
      </View>
      <DashedLine style={{marginTop: 4 * BW()}} />
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
