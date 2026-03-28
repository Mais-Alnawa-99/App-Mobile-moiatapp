import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Linking, Modal} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Text from '../../../component/Text';
import {BW} from '../../../style/theme';
import {isArabic} from '../../../locales';
import {eservicesURL} from '../../../redux/network/apiEservices';
import NavigationService from '../../../navigation/NavigationService';
import {createApplication} from '../../services/Eservices/ServiceForm';
import {URL} from '../../../redux/network/api';
import {startILService} from '../../services/IndustrialServices';
import RenewalLicenseOptions from '../../services/IndustrialServices/staticForms/RenewalIndustrialProductionLicense/RenewalLicenseOptions';
import Button from '../../../component/Button';
import DashedLine from '../../../component/DashedLine';
import {getServiceByRelated} from '../../services/details/dataMapper';

export default function ServiceCard({
  item,
  style,
  index,
  ilServices,
}: {
  item: any;
  style?: any;
  index?: any;
  ilServices?: boolean;
}) {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceItem, setServiceItem] = useState({});
  const settings = JSON.parse(item?.Settings || '{}');
  let name = '';
  if (ilServices) {
    name = item.name || item?.ServiceName;
  } else {
    name =
      item?.ServiceName?.find((n: any) =>
        isArabic() ? n.langId === 2 : n.langId === 1,
      )?.value ||
      item?.serviceName?.find((n: any) =>
        isArabic() ? n.langId === 2 : n.langId === 1,
      )?.value ||
      item.Name ||
      '';
  }

  let viewUrl = false;
  if (ilServices) {
    let type = 'il';
    let service = getServiceByRelated(item?.ServiceId || item?.serviceId, type);
    viewUrl = !!service;
  } else {
    let type = undefined;
    let service = getServiceByRelated(item?.Id, type);
    viewUrl = !!service;
  }
  const startUrl = eservicesURL + '/';

  return (
    <View style={[styles.card, style]}>
      <Text h4 medium style={styles.title}>
        {name}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: !!viewUrl ? 'space-between' : 'flex-end',
        }}>
        {viewUrl && (
          <TouchableOpacity
            // style={{
            //   borderBottomColor: colors.textPrimaryColor,
            //   borderBottomWidth: 0.4 * BW(),
            // }}
            onPress={() => {
              // NavigationService.navigate('ServiceDetials');
              let type;
              let service;
              if (ilServices) {
                type = 'il';
                service = getServiceByRelated(
                  item?.ServiceId || item?.serviceId,
                  type,
                );
              } else {
                type = undefined;
                service = getServiceByRelated(item?.Id, type);
              }
              NavigationService.navigate('ServiceDetails', {item: service});
            }}>
            <Text
              h4
              style={{
                color: colors.textPrimaryColor,
              }}>
              {t('info')}
            </Text>
          </TouchableOpacity>
        )}
        {(ilServices || (item?.StartStageID && item?.StartStageID > 0)) && (
          <TouchableOpacity
            style={styles.alignItemsCenter}
            onPress={() => {
              // startApplication(item);

              if (ilServices) {
                startILService({
                  id: item?.ServiceId,
                  name: item?.ServiceName,
                  url: item?.ServiceUrl,
                  serviceId: item?.ServiceId,
                  ...item,
                });
              } else createApplication(item.Id, item);

              // NavigationService.navigate('SelectProfile', {
              //   serviceId: item.Id,
              //   toScreen: 'ServiceForm',
              // });
            }}>
            <Text
              h4
              medium
              style={{
                color: colors.secondaryColor,
              }}>
              {t('Button.Start')}
            </Text>
            <AntDesign
              name={'arrowright'}
              style={{
                marginStart: 4 * BW(),
                fontSize: 16 * BW(),
                transform: [{rotate: isArabic() ? '180deg' : '0deg'}],
              }}
              color={colors.secondaryColor}
            />
          </TouchableOpacity>
        )}
      </View>
      <RenewalLicenseOptions
        service={serviceItem}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.white,
      borderRadius: 12 * BW(),
      padding: 12 * BW(),
      maxWidth: 260 * BW(),
      minWidth: 160 * BW(),
      justifyContent: 'space-between',
      flex: 1,
    },
    containerCard: {
      backgroundColor: colors.white,
      borderRadius: 12 * BW(),
    },
    title: {
      color: colors.text,
      marginBottom: 12 * BW(),
    },
    btnGroup: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 8 * BW(),
    },
    startBtn: {
      backgroundColor: colors.secondaryColor,
      paddingVertical: 6 * BW(),
      paddingHorizontal: 14 * BW(),
      borderRadius: 8 * BW(),
      height: 'auto',
    },
    detailsBtn: {
      backgroundColor: colors.primary,
      paddingVertical: 6 * BW(),
      paddingHorizontal: 14 * BW(),
      borderRadius: 8 * BW(),
      height: 'auto',
    },
    startText: {
      color: 'white',
      fontWeight: 'bold',
    },
    detailsText: {
      color: colors.text,
    },
    alignItemsCenter: {flexDirection: 'row', alignItems: 'center'},
  });
