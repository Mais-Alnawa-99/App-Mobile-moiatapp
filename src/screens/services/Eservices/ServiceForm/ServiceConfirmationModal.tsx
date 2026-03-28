import React, {useState} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';

import RadioButton from '../../../../component/RadioButton';
import Text from '../../../../component/Text';
import {isArabic} from '../../../../locales';
import NavigationService from '../../../../navigation/NavigationService';
import {hideModal} from '../../../../redux/reducers/General/modal';
import Button from '../../../../component/Button';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import {services} from '../../utils';
import {eservicesURL} from '../../../../redux/network/apiEservices';
import {useAppSelector} from '../../../../redux/store';

interface Props {
  entity: any;
  matchedServices: any[];
  serviceInstructions?: string;
  requestedServiceId?: number;
  selectedProfileRecord?: any;
}

const ServiceConfirmationModal: React.FC<Props> = ({
  entity,
  matchedServices,
  serviceInstructions,
  requestedServiceId,
  selectedProfileRecord,
}) => {
  const dispatch = useDispatch();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null,
  );
  const [error, setError] = useState(false);
  const {userData}: any = useAppSelector(store => store.userDataStored);
  const {userHasProfiles} = useAppSelector(state => state.userToken);
  const handleConfirm = () => {
    if (!selectedServiceId) {
      setError(true);
      return;
    }

    const selectedId = selectedProfileRecord?.record?.RecordId || '';
    const serviceProfile = entity.entityServiceProfiles?.find(
      (s: {ServiceId: number | undefined}) =>
        s.ServiceId === requestedServiceId,
    );
    const pendingApplications = serviceProfile?.pendingApplications
      ? JSON.parse(serviceProfile.pendingApplications)
      : [];

    if (pendingApplications.length > 0) {
      NavigationService.navigate('ApplicationDetails', {
        appId: pendingApplications[0].Id,
      });
    } else {
      proceedToNewApplication(
        selectedServiceId,
        '',
        userData?.record?.RecordId || null,
        requestedServiceId,
      );
    }
    dispatch(hideModal());
    // onClose();
  };

  const selectProfile = () => {
    NavigationService.navigate('SelectProfile', {
      toServices: true,
    });
    dispatch(hideModal());
  };

  const proceedToNewApplication = (
    service: any,
    matchingRecordAppId: any,
    recordId: any,
    requestedServiceId: any,
  ) => {
    const inputRequest = {
      serviceId: service,
      parentApplication: null,
      profileRecordId: matchingRecordAppId ? matchingRecordAppId : null,
      recordId: recordId ? recordId : '',
      requestedServiceId: requestedServiceId,
    };
    if (inputRequest.profileRecordId) {
      inputRequest.recordId = '';
    }

    // if (service && services.includes(service)) {
    NavigationService.navigate('ServiceForm', {
      serviceId: service,
      record: inputRequest,
    });
    // } else {
    //   NavigationService.navigate('WebViewScreen', {
    //     url: eservicesURL + '/newapp/' + service,
    //   });
    // }
    // /custom/purchase-standards 1050
  };

  return (
    <View
      style={{
        justifyContent: 'space-between',
        height: '100%',
      }}>
      <View>
        <Text h2 bold>
          {t('Labels.SelectProfileService')}
        </Text>

        {serviceInstructions && (
          <Text h3 style={styles.instructions}>
            {t(serviceInstructions)}
          </Text>
        )}

        {matchedServices.map(service => {
          const currentLang = isArabic() ? 2 : 1;
          const serviceLabel =
            service.ServiceNameTranslation?.find(
              (s: any) => s.langId === currentLang,
            )?.value || '';

          return (
            <View key={service.ProfileServiceId} style={styles.radioItem}>
              <TouchableOpacity
                style={styles.radioItem}
                onPress={() => {
                  setSelectedServiceId(service.ProfileServiceId);
                  setError(false);
                }}>
                <RadioButton
                  selected={selectedServiceId === service.ProfileServiceId}
                  onPress={() => {
                    setSelectedServiceId(service.ProfileServiceId);
                    setError(false);
                  }}
                />
                <Text h3>{serviceLabel}</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {error && (
          <Text style={styles.errorText}>{t('ChoosePorfileType')}</Text>
        )}
      </View>
      <View style={styles.footer}>
        <Button
          style={styles.confirmButton}
          title={t('Button.ConfirmationService')}
          onPress={() => handleConfirm()}
          styleText={styles.confirmText}
        />
        {/* <Button
            style={styles.confirmButton}
            title={t('Button.SelectProfileButton')}
            onPress={() => selectProfile()}
            styleText={styles.confirmText}
          /> */}
        <Button
          style={styles.cancelButton}
          title={t('Cancel')}
          onPress={() => dispatch(hideModal())}
          styleText={{color: colors.black}}
        />
      </View>
      {userHasProfiles == 'yes' && (
        <Button
          style={styles.selectProfileButton}
          title={t('SelectProfileButton')}
          onPress={() => selectProfile()}
          styleText={{
            color: colors.secondaryColor,
          }}
          antDesign={isArabic() ? 'arrowleft' : 'arrowright'}
          antDesignSize={12 * BW()}
        />
      )}
    </View>
  );
};

export default ServiceConfirmationModal;

const getStyle = (colors: any) =>
  StyleSheet.create({
    // modalContainer: {
    //   backgroundColor: '#fff',
    //   borderRadius: 12,
    //   padding: 20,
    //   maxHeight: '80%',
    //   width: '100%',
    //   height: '100%',
    // },

    instructions: {
      marginBottom: 10 * BW(),
    },
    radioItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },

    errorText: {
      color: 'red',
      marginTop: 8 * BW(),
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cancelButton: {
      backgroundColor: colors.gray,
      height: 'auto',
      minWidth: 90 * BW(),
    },

    confirmButton: {
      backgroundColor: colors.primaryColor,
      height: 'auto',
      minWidth: 100 * BW(),
    },
    selectProfileButton: {
      backgroundColor: 'transparent',
      height: 'auto',
      width: 'auto',
      gap: 6 * BW(),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    confirmText: {
      color: colors.mainWhite,
    },
  });
