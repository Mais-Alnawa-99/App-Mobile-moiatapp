import React from 'react';
import {Image, Modal, StyleSheet, View, useColorScheme} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../redux/store';
import {BW} from '../style/theme';
import Text from './Text';
import Button from './Button';
import {useTranslation} from 'react-i18next';
import {hideModal} from '../redux/reducers/General/modal';

const CustomModal = () => {
  const {
    modalVisible,
    title,
    message,
    fun,
    hideCancel,
    CustomView,
    hideConfirm,
    showClose,
    titleConfirm,
    minHeight,
  } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();

  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();

  return (
    <>
      {modalVisible && <View style={styles.absolute} />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          dispatch(hideModal());
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {minHeight: minHeight || '35%'}]}>
            <View style={{flex: 1, position: 'relative'}}>
              <View style={{position: 'relative'}}>
                {title && (
                  <Text
                    h2
                    bold
                    style={{
                      marginTop: 8 * BW(),
                      color: colors.textColor,
                    }}>
                    {title}
                  </Text>
                )}
                {showClose && (
                  <>
                    <View
                      style={{
                        alignItems: 'flex-end',
                      }}>
                      <Button
                        title={'X'}
                        onPress={() => dispatch(hideModal())}
                        h2
                        style={styles.closeBtn}
                      />
                    </View>
                  </>
                )}
                {(title || showClose) && (
                  <View
                    style={{
                      borderColor: colors.gray + '77',
                      borderBottomWidth: 0.8 * BW(),
                      height: 0,
                      marginVertical: 12 * BW(),
                    }}
                  />
                )}
              </View>

              {message && (
                <View style={{marginTop: 8 * BW()}}>
                  <Text h3 style={styles.modalText}>
                    {message}
                  </Text>
                </View>
              )}
              {CustomView && eval(CustomView)}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {!hideConfirm && (
                <Button
                  title={titleConfirm ? titleConfirm : t('OK')}
                  style={hideCancel ? styles.btnOK : styles.btn}
                  styleText={{
                    color: '#fff',
                  }}
                  onPress={() => {
                    dispatch(hideModal());
                    !!fun && fun();
                  }}
                />
              )}
              <View style={{flex: 1}} />
              {!hideCancel && (
                <Button
                  title={t('Cancel')}
                  style={styles.btn}
                  styleText={{
                    color: '#fff',
                  }}
                  onPress={() => dispatch(hideModal())}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const getStyles = (themeSelected: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    modalView: {
      backgroundColor: themeSelected.background,
      borderRadius: 12 * BW(),
      paddingHorizontal: 15 * BW(),
      paddingVertical: 10 * BW(),
      width: '90%',
      minHeight: '35%',
      borderColor: themeSelected.gray + '99',
      borderWidth: 0.2 * BW(),
    },

    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      color: themeSelected.textColor,
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 22,
      backgroundColor: themeSelected.black + '88',
    },
    btn: {
      width: 'auto',
      height: 'auto',
      padding: 8 * BW(),
      paddingHorizontal: 10 * BW(),
      minWidth: '45%',
      backgroundColor: themeSelected.primaryColor,
      color: themeSelected.background,
      flex: 1,
    },
    btnOK: {
      width: 'auto',
      height: 'auto',
      padding: 8 * BW(),
      paddingHorizontal: 10 * BW(),
      minWidth: '45%',
      color: themeSelected.background,
      backgroundColor: themeSelected.primaryColor,
    },
    otpBox: {
      width: 35 * BW(),
      paddingVertical: 5 * BW(),
      minHeight: 40 * BW(),
      borderWidth: 1 * BW(),
      borderRadius: 8 * BW(),
      borderColor: themeSelected.gray + '99',
      backgroundColor: themeSelected.background,
      color: themeSelected.primaryColor,
      fontSize: 18 * BW(),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorText: {
      color: '#db2c43',
      fontSize: 8 * BW(),
      lineHeight: 15 * BW(),
    },
    closeBtn: {
      height: 'auto',
      width: 'auto',
      padding: 3 * BW(),
      paddingHorizontal: 8 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default CustomModal;
