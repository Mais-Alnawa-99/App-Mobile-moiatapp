import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useTranslation} from 'react-i18next';
import Text from '../../../../../component/Text';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../../style/theme';
import Header from '../../../../../component/Header';
import Page from '../../../../../component/Page';
import LinearGradient from 'react-native-linear-gradient';
import NavigationService from '../../../../../navigation/NavigationService';
import PageBg from '../../../../../component/PageBg';
import {exitConfirm} from '../../../../WebViewScreen';
import {useAppDispatch} from '../../../../../redux/store';
import {Modal} from 'react-native';
import DashedLine from '../../../../../component/DashedLine';
import Button from '../../../../../component/Button';
import {startILService} from '../..';
const RenewalLicenseOptions = ({
  service,
  setModalVisible,
  modalVisible,
}: any) => {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text h3 bold>
              {t('IL.selectServiceType')}
            </Text>
            <Button
              ioniconsColor={colors.red}
              ionicons={'close'}
              onPress={() => setModalVisible(false)}
              style={{
                padding: 0,
                width: 30 * BW(),
                height: 30 * BW(),
                justifyContent: 'center',
              }}
            />
          </View>
          <DashedLine dashColor={colors?.gray} />

          <View style={{flex: 1, justifyContent: 'center'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{
                  width: '48%',
                  ...styles.button,
                  backgroundColor: colors.primary,
                }}
                onPress={() => {
                  setModalVisible(false);
                  startILService(service, 'RenewalIndustrialProductionLicense');

                  // NavigationService.navigate(
                  //   'RenewalIndustrialProductionLicense',
                  //   {
                  //     service,
                  //   },
                  // );
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <Text h4 medium style={styles.buttonText}>
                    {t('IL.renewOnly')}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Icon
                    name="chevron-left"
                    size={20 * BW()}
                    color={colors.mainWhite}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '48%',
                  ...styles.button,
                  backgroundColor: colors.primary,
                }}
                onPress={() => {
                  setModalVisible(false);
                  startILService(service, 'IssueIndustrialProductionLicense');
                  // NavigationService.navigate(
                  //   'IssueIndustrialProductionLicense',
                  //   {
                  //     service: service,
                  //   },
                  // );
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <Text h4 medium style={styles.buttonText}>
                    {t('IL.renewAndEdit')}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Icon
                    name="chevron-left"
                    size={20 * BW()}
                    color={colors.mainWhite}
                    style={[styles.icon]}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },

    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 40 * BW(),
      gap: 8,
    },
    titleText: {},
    button: {
      borderColor: colors.primaryColor + '99',
      borderWidth: 1,
      borderRadius: 12 * BW(),
      padding: 12 * BW(),
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: 40 * BW(),
    },
    icon: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    buttonText: {
      color: colors.mainWhite,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      paddingHorizontal: 16 * BW(),
      backgroundColor: colors.black + '89',
    },
    modalView: {
      backgroundColor: colors.mainBackground,
      borderRadius: 12 * BW(),
      paddingHorizontal: 12 * BW(),
      paddingVertical: 12 * BW(),
      width: '100%',
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      minHeight: '20%',
      maxHeight: '88%',
    },
  });

export default RenewalLicenseOptions;
