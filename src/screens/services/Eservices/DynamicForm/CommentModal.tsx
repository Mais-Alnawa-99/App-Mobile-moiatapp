import React from 'react';
import {Image, Modal, StyleSheet, View, useColorScheme} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {BW} from '../../../../style/theme';

import Text from '../../../../component/Text';
import Button from '../../../../component/Button';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import Input from '../../../../component/input/Input';
import UplaodAtachment from '../../../../component/attachment/UplaodAtachment';

const CommentModal = ({
  modalVisible,
  setModalVisible,
  title,
  titleConfirm,
  fun,
  comment,
  setComment,
  tempAppId,
  service,
  attachmentsComment,
  setAttachmentsComment,
  action,
  applicationId,
  langId,
}: any) => {
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View style={{flex: 1, position: 'relative'}}>
              <View style={{position: 'relative'}}>
                <Text
                  h2
                  bold
                  style={{
                    marginTop: 8 * BW(),
                    color: colors.textColor,
                  }}>
                  {
                    JSON.parse(action?.StageActionName).find(
                      (a: {langId: number}) => a.langId === langId,
                    )?.value
                  }
                </Text>
              </View>
              <View style={{height: '100%', paddingBottom: 10 * BW()}}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{height: '100%'}}>
                  <Input
                    textInput
                    h5
                    requiredStar={
                      action.stageActionTypeId == 5 ||
                      action.stageActionTypeId == 6 ||
                      action.stageActionTypeId == 11
                    }
                    label={t('EnterActionComment')}
                    value={comment || ''}
                    styleInput={{
                      borderWidth: 1 * BW(),
                      borderColor: '#cccccc88',
                      minHeight: 100 * BW(),
                    }}
                    multiline={true}
                    onChangeText={(text: any) => setComment(text)}
                  />

                  <UplaodAtachment
                    tempAppId={tempAppId}
                    attachmentId={''}
                    h5
                    applicationStageId={service?.stageId}
                    style={{marginTop: 12}}
                    addFileStyle={{
                      minHeight: 40 * BW(),
                      borderColor: '#cccccc88',
                      borderWidth: 1 * BW(),
                    }}
                    attachment={attachmentsComment}
                    setAttachment={setAttachmentsComment}
                    title={t('UploadActionAttachments')}
                    attachmentContainerTypeId="2"
                    appStageActionId={''}
                    actionTypeId={action?.stageActionTypeId}
                    applicationId={applicationId}
                  />
                </ScrollView>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Button
                title={titleConfirm ? titleConfirm : t('OK')}
                style={styles.btn}
                styleText={{
                  color: '#fff',
                }}
                onPress={() => {
                  setModalVisible(false);
                  !!fun && fun();
                }}
              />
              <View style={{flex: 1}} />
              <Button
                title={t('Cancel')}
                style={styles.btnClose}
                styleText={{
                  color: colors.primaryColor,
                }}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      paddingHorizontal: 8 * BW(),
      backgroundColor: colors.black + '99',
    },
    modalView: {
      backgroundColor: colors.background,
      borderRadius: 12 * BW(),
      paddingHorizontal: 15 * BW(),
      paddingVertical: 10 * BW(),
      width: '100%',
      minHeight: '85%',
      borderColor: colors.gray + '66',
      borderWidth: 0.2 * BW(),
    },

    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 22,
    },
    btn: {
      width: 'auto',
      height: 'auto',
      padding: 8 * BW(),
      paddingHorizontal: 10 * BW(),
      minWidth: '40%',
      backgroundColor: colors.primaryColor,
      color: colors.background,
    },
    btnClose: {
      width: 'auto',
      height: 'auto',
      padding: 8 * BW(),
      paddingHorizontal: 10 * BW(),
      minWidth: '20%',
      backgroundColor: 'transparent',
      color: colors.background,
      borderColor: colors.primaryColor,
      borderWidth: 1 * BW(),
    },
  });

export default CommentModal;
