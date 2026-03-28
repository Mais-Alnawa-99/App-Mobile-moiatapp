import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Upload} from 'tus-js-client';
import RNFS from 'react-native-fs';

import theme, {BH, BW} from '../../style/theme';
import Button from '../Button';
import Text from '../Text';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {fileUploadUrl} from '../../redux/network/apiEservices';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  deleteAttachment,
  deleteTemporaryAttachment,
} from '../../redux/reducers/E-Services/thunk/services';
import {isArabic} from '../../locales';
import Loader from '../Loader';
import {_downloadFile, _downloadFilePromise} from '../SaveFiles';

export default function UplaodAtachment({
  attachment,
  setAttachment,
  style,
  hideLabel,
  backgroundColor,
  required,
  maxFileSize = 50 * 1024 * 1024,
  acceptedFiles = ['*'],
  title,
  attachmentId,
  applicationStageId,
  tempAppId,
  applicationId,
  appStageActionId,
  attachmentContainerTypeId,
  itemIndex,
  actionTypeId,
  attachmentDescription,
  isDisabled,
  parentEntityFieldId,

  ...props
}: any) {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();
  const [uploads, setUploads] = useState<any[]>([]);
  const [downloading, setDownloading]: any = useState({});
  const dispatch = useAppDispatch();
  const {tokenData}: any = useAppSelector(store => store.userToken);
  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  }

  const _viewFile = async (url: string, title: string, forShare: boolean) => {
    await _downloadFilePromise(url, title, tokenData, forShare);
  };

  if (!!acceptedFiles && acceptedFiles?.length == 0) {
    acceptedFiles = ['*'];
  }

  const picker = async () => {
    try {
      if (Platform.OS !== 'ios') {
        await requestCameraPermission();
      }
      if (
        !!props.maxFile &&
        props.maxFile &&
        attachment?.length >= parseInt(props.maxFile)
      ) {
        Alert.alert(
          props.maxFilesLabel || t('Max file limit reached'),
          `${t('You can upload up to')} ${props.maxFile} ${t('files')}`,
        );
        return;
      }

      const types = mapFileTypes(acceptedFiles);
      const res: any = await DocumentPicker.pickSingle({type: types});

      if (res?.size > maxFileSize) {
        if (isArabic()) {
          Alert.alert(
            `الملف كبير جدًا! الحد الأقصى: ${maxFileSize / 1024 / 1024}MB`,
          );
        } else {
          Alert.alert(
            `The file is too large! Maximum limit: ${
              maxFileSize / 1024 / 1024
            }MB`,
          );
        }
        return;
      }

      const fileData = {
        id: Math.random(),
        attach: res.uri,
        type: res.type,
        name: res.name,
        size: res.size,
        progress: 0,
        lastModified: new Date().valueOf(),
      };

      setAttachment([...attachment, fileData]);
      startUpload(fileData);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
      }
    }
  };
  const copyContentUriToFile = async (uri: string, fileName: string) => {
    const destPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
    const exists = await RNFS.exists(destPath);
    if (exists) await RNFS.unlink(destPath);

    const newPath = await RNFS.copyFile(uri, destPath);
    return 'file://' + destPath;
  };

  const startUpload = async (fileData: any) => {
    try {
      let blob: any;
      let file: any;
      if (Platform.OS === 'ios') {
        const response = await fetch(fileData.attach);
        blob = await response.blob();
      } else {
        const filePath = await copyContentUriToFile(
          fileData.attach,
          fileData.name,
        );
        file = {
          uri: filePath,
          name: fileData.name,
          type: fileData.type,
        };
      }

      let returnedAtachmentId;
      let data: any = {
        name: fileData.name,
        size: fileData.size.toString(),
        type: fileData.type || 'application/octet-stream',
        contentType: 'application/octet-stream',
        applicationId: applicationId,
        applicationStageId: applicationStageId,
        applicationType: applicationId == 0 ? 'new' : 'view',
        attachmentContainerTypeId: attachmentContainerTypeId
          ? attachmentContainerTypeId
          : '1',
        itemIndex: itemIndex ? itemIndex : '',
        parentEntityFieldId: parentEntityFieldId ? parentEntityFieldId : '',
        tempAppId: applicationId == 0 ? tempAppId.toString() : applicationId,
      };

      if (appStageActionId || appStageActionId === '') {
        data.appStageActionId = appStageActionId;
      }

      if (actionTypeId) {
        data.actionTypeId = actionTypeId;
      }

      if (attachmentId) {
        data.attachmentId = attachmentId;
      }
      if (fileData.type == '' && fileData.name.split('.').pop() == 'rar') {
        data.fileData = 'application/vnd.rar';
      }
      if (fileData.type == '' && fileData.name.split('.').pop() == 'msg') {
        data.fileData = 'application/vnd.ms-outlook';
      }

      const options = {
        endpoint: fileUploadUrl,
        retryDelays: [0, 3000, 6000],
        headers: {
          Authorization: `Bearer ${tokenData?.access_token}`,
        },
        metadata: data,
        onError: (error: any) => {
          setUploads(prev =>
            prev.map(file =>
              file.id === fileData.id ? {...file, requestFail: true} : file,
            ),
          );
          deleteFile(fileData);
          if (isArabic()) {
            Alert.alert(`فشل رفع الملف: ${fileData.name}`);
          } else {
            Alert.alert(`File upload failed: ${fileData.name}`);
          }
        },
        onProgress: (bytesUploaded: number, bytesTotal: number) => {
          const progress = Math.floor((bytesUploaded / bytesTotal) * 100);

          setUploads(prev =>
            prev.map(file =>
              file.id === fileData.id ? {...file, progress} : file,
            ),
          );
        },
        onSuccess: () => {
          setUploads(prev =>
            prev.map(file =>
              file.id === fileData.id ? {...file, progress: 100} : file,
            ),
          );
        },
        onAfterResponse: function (req: any, res: any) {
          if (res.getHeader('AttachmentId') != null) {
            returnedAtachmentId = res.getHeader('AttachmentId');

            fileData.returnedAtachmentId = returnedAtachmentId;
          }
          fileData.progress = 100;

          setUploads(prev => [...prev, fileData]);
          return res;
        },
      };

      const upload =
        Platform.OS == 'ios'
          ? new Upload(blob, options)
          : new Upload(file, options);
      // fileData.uploadObject = upload;
      // fileData.returnedAtachmentId = returnedAtachmentId

      // setUploads(prev => [...prev, fileData]);
      upload.start();
    } catch (error) {
      deleteFile(fileData);

      isArabic()
        ? Alert.alert('حدث خطأ أثناء تحويل الملف، يرجى المحاولة مرة أخرى.')
        : Alert.alert(
            'An error occurred while converting the file, please try again.',
          );
    }
  };

  const mapFileTypes = (acceptedFiles: any) => {
    const typeFiles: any = {
      png: DocumentPicker.types.images,
      jpg: DocumentPicker.types.images,
      docx: DocumentPicker.types.docx,
      pdf: DocumentPicker.types.pdf,
      jpeg: DocumentPicker.types.images,
      doc: DocumentPicker.types.doc,
      xls: DocumentPicker.types.xls,
      xlsx: DocumentPicker.types.xlsx,
      zip: DocumentPicker.types.zip,
      '*': DocumentPicker.types.allFiles,
    };
    return acceptedFiles.map(
      (type: any) => typeFiles[type] || DocumentPicker.types.allFiles,
    );
  };

  const deleteFile = (file: any) => {
    if (applicationId != 0 && !!file?.returnedAtachmentId) {
      dispatch(deleteAttachment({attachmentId: file?.returnedAtachmentId}));
    } else {
      if (!!file?.returnedAtachmentId || !!file?.temp) {
        if (!!file?.temp) {
          dispatch(deleteTemporaryAttachment({attachmentId: file?.id}));
        } else {
          dispatch(
            deleteTemporaryAttachment({
              attachmentId: file?.returnedAtachmentId,
            }),
          );
        }
      }
    }

    setAttachment(attachment.filter((item: any) => item.id !== file.id));
  };

  const _openFile = async (file: any, forShare: boolean = false) => {
    setDownloading((d: any) => ({...d, [file.id]: true}));
    try {
      if (file?.temp) {
        await _viewFile(file?.attach, file?.name, forShare);
      } else {
        await FileViewer.open(file.attach);
      }
    } finally {
      setDownloading((d: any) => {
        const {[file.id]: _, ...rest} = d;
        return rest;
      });
    }
  };

  return (
    <View style={style}>
      {!hideLabel && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            h4={!props.h3 && !props.h2 && !props.h1}
            h3={props.h3}
            h2={props.h2}
            h1={props.h1}
            h5={props.h5}
            medium={props.medium}
            bold={props.bold}
            style={{
              color: colors.text,
              width: props.requiredStar ? '95%' : '100%',
              ...props,
            }}>
            {title ? title : t('Files')}
          </Text>
          {props.requiredStar && (
            <Icon
              name="star-of-life"
              size={6 * BW()}
              color="#db2c43"
              style={{marginHorizontal: 4 * BW()}}
            />
          )}
        </View>
      )}

      {!!attachment &&
        attachment != undefined &&
        attachment?.map((item: any, index: number): any => (
          <Animatable.View
            duration={1000}
            delay={150}
            animation={index % 2 !== 0 ? 'fadeInLeft' : 'fadeInRight'}
            key={index}
            style={[
              styles.row,
              {
                paddingHorizontal: 10 * BW(),
                backgroundColor: colors.primary + '11',
              },
            ]}>
            <View style={{flex: 3, flexDirection: 'row'}}>
              <Text h4 style={{flex: 1}} numberOfLines={1}>
                {item.name}
              </Text>
              <Text h4>{Math.ceil(item?.size / 1000)} KB</Text>
            </View>
            {item?.progress != 100 || downloading?.[item?.id] ? (
              <Loader isLoading={true} style={{flex: 0}} />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 6 * BW(),
                }}>
                {item?.attach !== 'base64' && (
                  <>
                    {/* <Button
                      style={styles.icon}
                      styleIcon={styles.styleIconEye}
                      containerIcon={styles.containerIcon}
                      onPress={() => _openFile(item)}
                      icon={require('../../assets/icons/eye.png')}
                    /> */}

                    <Button
                      style={styles.icon}
                      styleIcon={styles.styleIconDownload}
                      containerIcon={styles.containerIcon}
                      onPress={() => _openFile(item, false)}
                      icon={require('../../assets/icons/download.png')}
                    />
                  </>
                )}
                {!isDisabled && (
                  <Button
                    style={styles.icon}
                    styleIcon={styles.styleIconDelete}
                    onPress={() => deleteFile(item)}
                    containerIcon={styles.containerIcon}
                    icon={require('../../assets/icons/delete.png')}
                  />
                )}
              </View>
            )}
          </Animatable.View>
        ))}
      {!isDisabled && (
        <Button
          title={t('uploadFile')}
          onPress={() => picker()}
          disabled={
            !!props.maxFile && attachment?.length >= parseInt(props.maxFile)
          }
          style={{
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.background,
            borderColor: required ? 'red' : '#cccccc88',
            borderWidth: required ? 0.5 * BW() : 0 * BW(),
            ...styles.button,
            ...props.addFileStyle,
            opacity:
              !!props.maxFile && attachment?.length >= parseInt(props.maxFile)
                ? 0.7
                : 1,
          }}
          icon={require('../../assets/icons/upload.png')}
          containerIcon={styles.containerUploadIcon}
          styleIcon={styles.styleUploadIcon}
        />
      )}
      {maxFileSize && (
        <>
          <Text style={styles.maxFileSizeText}>
            {t('allowedExtension')} {'  '}
            {(acceptedFiles && acceptedFiles.join(', ')) || ''}
          </Text>

          <Text style={styles.maxFileSizeText}>
            {t('maximumSize')} {maxFileSize / 1024 / 1024} MB
          </Text>
        </>
      )}
      {props.maxFilesLabel && props.maxFile && (
        <Text style={styles.maxFileSizeText}>
          {props.maxFilesLabel} {props.maxFile}
        </Text>
      )}
      {attachmentDescription && attachmentDescription.trim() != '' && (
        <Text
          h5
          style={{
            ...styles.maxFileSizeText,
            ...{marginTop: 6 * BW()},
          }}>
          {attachmentDescription}
        </Text>
      )}
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: colors.primaryColor,
    },
    // container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   borderTopEndRadius: 20 * BW(),
    //   borderTopStartRadius: 20 * BW(),
    //   paddingHorizontal: 20 * BW(),
    //   padding: 10 * BW(),
    // },
    text: {
      color: '#535353',
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: 8 * BW(),
      marginVertical: 5 * BW(),
      alignItems: 'center',
      paddingVertical: 8 * BW(),
      borderRadius: 4 * BW(),
      minHeight: 40 * BW(),
    },
    image: {
      width: 15 * BW(),
      height: 15 * BW(),
      tintColor: '#CDCDCD',
    },

    button: {
      height: 'auto',
      padding: 8 * BW(),
      paddingVertical: 4 * BW(),
      borderRadius: 4 * BW(),
      minHeight: 40 * BW(),
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      marginTop: 8 * BW(),
    },
    icon: {
      width: 'auto',
      height: 'auto',
      padding: 0,
      backgroundColor: 'transparent',
      borderRadius: 0,
      marginHorizontal: 6 * BW(),
    },
    styleIconEye: {
      tintColor: 'green',
      width: 16 * BW(),
      height: 16 * BW(),
    },
    styleIconDownload: {
      tintColor: 'green',
      width: 22 * BW(),
      height: 22 * BW(),
    },
    styleIconDelete: {
      tintColor: colors.iconPrimaryColor,
      width: 16 * BW(),
      height: 16 * BW(),
    },
    containerIcon: {
      width: 'auto',
      height: 'auto',
    },
    containerUploadIcon: {
      backgroundColor: colors.secondaryColor,
      borderRadius: 4 * BW(),
      width: 30 * BW(),
      height: 30 * BW(),
    },
    styleUploadIcon: {
      width: 15 * BW(),
    },
    maxFileSizeText: {
      color: colors.textPrimaryColor,
      fontSize: 9 * BW(),
      lineHeight: 15 * BW(),
    },
  });
