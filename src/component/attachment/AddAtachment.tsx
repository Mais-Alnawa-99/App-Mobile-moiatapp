import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome5';

import theme, {BH, BW} from '../../style/theme';
import Button from '../Button';
import Text from '../Text';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

export default function AddAttachment({
  attachment,
  setAttachment,
  style,
  hideLabel,
  backgroundColor,
  required,
  maxFileSize = 5 * 1024 * 1024,
  acceptedFiles = ['*'],
  title,
  ...props
}: any) {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();
  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  const picker = async () => {
    try {
      if (Platform.OS !== 'ios') {
        const allow = await requestCameraPermission();
      }

      const types = mapFileTypes(acceptedFiles);
      const res = await DocumentPicker.pickSingle({
        type: types,
      });
      let files: any = [];
      const fileData = {
        id: Math.random(),
        attach: res.uri,
        type: res.type,
        name: res.name,
        size: res.size,
      };
      if (Platform.OS === 'android') {
        const base64 = await RNFetchBlob.fs.readFile(res.uri, 'base64');
        fileData.file = base64;
      }
      setAttachment([...attachment, fileData]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const mapFileTypes = (acceptedFiles: any) => {
    const typeFiles: any = {
      png: DocumentPicker.types.images,
      jpg: DocumentPicker.types.images,
      jpeg: DocumentPicker.types.images,
      docx: DocumentPicker.types.docx,
      pdf: DocumentPicker.types.pdf,
      '*': DocumentPicker.types.allFiles,
    };
    return acceptedFiles.map(
      (type: any) => typeFiles?.[type] || DocumentPicker.types.allFiles,
    );
  };

  const deleteFile = (file: any) => {
    setAttachment(attachment.filter((item: any) => item.id !== file.id));
  };
  const _openFile = (file: any) => {
    FileViewer.open(file.attach);
  };

  return (
    <View style={style}>
      {!hideLabel && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            h4={!props.h3 && !props.h2 && !props.h1}
            h3={props.h3}
            h2={props.h2}
            h1={props.h1}
            medium={props.medium}
            bold={props.bold}
            style={{color: colors.text, ...props}}>
            {title ? title : t('Files')}
          </Text>
          {props.requiredStar && (
            <Icon
              name="star-of-life"
              size={6 * BW()}
              color="#db2c43"
              style={{marginHorizontal: 3 * BW()}}
            />
          )}
        </View>
      )}

      {attachment.map((item: any, index: number): any => (
        <Animatable.View
          duration={1000}
          delay={150}
          animation={index % 2 != 0 ? 'fadeInLeft' : 'fadeInRight'}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              marginLeft: 10 * BW(),
            }}>
            {item?.attach != 'base64' && (
              <Button
                style={styles.icon}
                styleIcon={styles.styleIconEye}
                containerIcon={styles.containerIcon}
                onPress={() => _openFile(item)}
                icon={require('../../assets/icons/eye.png')}
              />
            )}
            <View
              style={{
                height: 18 * BH(),
                width: 1 * BW(),
                backgroundColor: '#B6B6B6',
                marginHorizontal: 10 * BW(),
              }}
            />
            <Button
              style={styles.icon}
              styleIcon={styles.styleIconDelete}
              onPress={() => deleteFile(item)}
              containerIcon={styles.containerIcon}
              icon={require('../../assets/icons/delete.png')}
            />
          </View>
        </Animatable.View>
      ))}
      <Button
        title={t('uploadFile')}
        onPress={() => picker()}
        style={{
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.background,
          borderColor: required ? 'red' : '#cccccc88',
          borderWidth: required ? 0.5 * BW() : 0 * BW(),
          ...styles.button,
          ...props.addFileStyle,
        }}
        icon={require('../../assets/icons/upload.png')}
        containerIcon={styles.containerUploadIcon}
        styleIcon={styles.styleUploadIcon}
      />
      {maxFileSize && (
        <>
          <Text style={styles.maxFileSizeText}>
            {t('allowedExtension')}
            {'  '}
            {(acceptedFiles && acceptedFiles.join(', ')) || ''}
          </Text>

          <Text style={styles.maxFileSizeText}>
            {t('maximumSize')} {Math.floor(maxFileSize / 1000000)} MB
          </Text>
        </>
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
      marginTop: 4 * BW(),
    },
    icon: {
      width: 'auto',
      height: 'auto',
      padding: 0,
      backgroundColor: 'transparent',
      flex: 1,
      borderRadius: 0,
    },
    styleIconEye: {
      tintColor: 'green',
      width: 16 * BW(),
      height: 16 * BW(),
    },
    styleIconDelete: {
      tintColor: colors.primary,
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
