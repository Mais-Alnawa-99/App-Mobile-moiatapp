import React from 'react';
import {Modal, View, TouchableOpacity, Linking, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../style/theme';
import FlatListComp from '../../../../component/FlatList';
import Text from '../../../../component/Text';
import {useTranslation} from 'react-i18next';
import {isArabic} from '../../../../locales';
import moment from 'moment';
import {_downloadFile} from '../../../../component/SaveFiles';
import {
  eservicesURL,
  serviceApiGateway,
} from '../../../../redux/network/apiEservices';
import RenderHtmlComponent from '../../../../component/renderHtml/RenderHtml';

export default function ActionHistoryModal({visible, onClose, data}: any) {
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {t} = useTranslation();
  const currentLangId = isArabic() ? 2 : 1;

  const getTranslatedValue = (arr: any[], langId: number) =>
    arr?.find(item => item.langId === langId)?.value || '';
  const renderAttachment = (att: any) => (
    <View
      key={att.Id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text h4>
        {att.FileName} ({(att.Size / 1024).toFixed(2)} KB)
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            _downloadFile(
              `${serviceApiGateway}/UploadAttachment/GetActionAttachmentById?ApplicationId=${data.ApplicationId}&ActionAttachmentId=${att.Id}&download=true`,
              att.FileName,
              data?.tokenData,
            );
          }}>
          <Text h4 style={{color: 'green'}}>
            {t('Download')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderAction = (action: any) =>
    (!!action.Comments || action.ActionAttachment?.length > 0) && (
      <View
        style={{
          marginBottom: 6 * BW(),
          padding: 8 * BW(),
          marginStart: 8 * BW(),
          backgroundColor: colors.mainBackground,
          borderRadius: 4 * BW(),
        }}>
        <Text h4 bold>
          {action.CreatedBy}
        </Text>
        {!!action?.PerformedDate && (
          <Text h5 style={{color: '#666'}}>
            {moment(action?.PerformedDate).format('MMM DD,YYYY hh:mm A')}
          </Text>
        )}
        {!!action.Comments && (
          <RenderHtmlComponent
            baseStyle={{alignItems: 'flex-start'}}
            description={action.Comments}
          />
        )}
        {!!action.ActionAttachment?.length && (
          <View
            key={action.Id}
            style={{
              marginVertical: 4 * BW(),
              padding: 8 * BW(),
              backgroundColor: '#f2f2f2',
              borderRadius: 4 * BW(),
            }}>
            <View>{action.ActionAttachment.map(renderAttachment)}</View>
          </View>
        )}
      </View>
    );

  const renderStage = ({item: stage, index: stageIndex}: any) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4 * BW(),
      }}>
      <View
        style={{
          width: 12 * BW(),
          height: 12 * BW(),
          borderRadius: 20 * BW(),
          backgroundColor: colors.secondaryColor,
        }}
      />
      <Text h3 bold>
        {getTranslatedValue(stage.StagesName, currentLangId)} -{' '}
        {getTranslatedValue(stage.StatusesName, currentLangId)}
      </Text>
    </View>
  );
  const renderMainAction = ({item: stage, index: stageIndex}: any) => (
    <View key={stageIndex}>{(stage.Actions || []).map(renderAction)}</View>
  );
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={{padding: 16 * BW(), flex: 1}}>
            <FlatListComp
              data={
                data.Stages?.length ? [data.Stages[data.Stages.length - 1]] : []
              }
              scrollview
              renderItem={renderStage}
            />
            <FlatListComp
              data={data.Stages}
              scrollview
              renderItem={renderMainAction}
            />
            <TouchableOpacity onPress={onClose} style={{marginTop: 20 * BW()}}>
              <Text h4 style={{textAlign: 'center', color: 'red'}}>
                {t('Button.CloseButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      paddingHorizontal: 16 * BW(),
      backgroundColor: colors.black + '99',
    },
    modalView: {
      backgroundColor: colors.white,
      borderRadius: 12 * BW(),
      paddingHorizontal: 12 * BW(),
      paddingVertical: 12 * BW(),
      width: '100%',
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      minHeight: '40%',
      maxHeight: '88%',
    },
  });
