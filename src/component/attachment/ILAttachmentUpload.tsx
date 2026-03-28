import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import * as Animatable from 'react-native-animatable';

import Text from '../Text';
import Button from '../Button';
import {BW} from '../../style/theme';
import {isArabic} from '../../locales';
import reactotron from 'reactotron-react-native';

interface FileItem {
  name: string;
  size: number;
  type: string;
  base64: string;
  isnew: boolean;
  uri: string;
}

interface Props {
  title: string;
  value: FileItem[];
  onChange: (val: FileItem[]) => void;
  maxFile?: number;
  maxFileSize?: number;
  acceptedFiles?: string[];
  requiredStar?: boolean;
  isDisabled?: boolean;
  required?: any;
  errors?: any;
  attachmentDescription?: string;
  medium?: boolean;
  defaultBase64?: string;
}

const ILAttachmentUpload: React.FC<Props> = ({
  title,
  value,
  onChange,
  maxFile = 5,
  maxFileSize = 9 * 1024 * 1024,
  acceptedFiles = ['*'],
  requiredStar,
  required,
  isDisabled = false,
  errors,
  attachmentDescription,
  medium = false,
  defaultBase64,
}) => {
  const {colors}: any = useTheme();
  const {t} = useTranslation();
  const styles = getStyles(colors);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (acceptedFiles.length === 0) acceptedFiles = ['*'];
  }, []);

  const isDefaultFile = (file: FileItem) => {
    return file.name.toLowerCase().includes('default-avatar');
  };

  const effectiveFiles = value.filter(file => !isDefaultFile(file));
  const effectiveLength = effectiveFiles.length;

  const requestPermission = async () => {
    if (Platform.OS !== 'android') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  };

  const mapFileTypes = (files: string[]) => {
    const map: any = {
      png: DocumentPicker.types.images,
      jpg: DocumentPicker.types.images,
      jpeg: DocumentPicker.types.images,
      docx: DocumentPicker.types.docx,
      pdf: DocumentPicker.types.pdf,
      '*': DocumentPicker.types.allFiles,
    };
    return files.map(ext => map[ext] || DocumentPicker.types.allFiles);
  };

  const copyContentUriToFile = async (uri: string, name: string) => {
    const dest = `${RNFS.TemporaryDirectoryPath}/${name}`;
    const exists = await RNFS.exists(dest);
    if (exists) await RNFS.unlink(dest);
    await RNFS.copyFile(uri, dest);
    return 'file://' + dest;
  };

  const copyContentBase64ToFile = async (
    base64: string,
    fileName: string = 'document.pdf',
  ) => {
    try {
      // pick extension from fileName or fallback
      const ext = fileName.split('.').pop() || 'pdf';
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      // write file from base64
      await RNFS.writeFile(path, base64, 'base64');

      // open with native viewer
      return path;
    } catch (err) {
      return '';
    }
  };

  const handlePick = async () => {
    const granted = await requestPermission();
    //if (!granted) return;

    if (effectiveLength >= maxFile && maxFile !== 1) {
      Alert.alert(
        t('Max file limit reached'),
        `${t('You can upload up to')} ${maxFile} ${t('files')}`,
      );
      return;
    }
    const types = mapFileTypes(acceptedFiles);
    try {
      const res: any = await DocumentPicker.pickSingle({type: types});
      let allSize = res.size;
      value?.map(f => {
        allSize += f.size;
      });

      if (allSize > maxFileSize) {
        Alert.alert(
          isArabic()
            ? `الملف كبير جدًا! الحد الأقصى: ${maxFileSize / 1024 / 1024}MB`
            : `The file is too large! Maximum: ${maxFileSize / 1024 / 1024}MB`,
        );

        return;
      }
      setLoading(true);
      let base64 = '';
      if (Platform.OS === 'android') {
        const path = await copyContentUriToFile(res.uri, res.name);
        base64 = await RNFS.readFile(path, 'base64');
      } else {
        base64 = await RNFS.readFile(
          decodeURI(res.uri.replace('file://', '')),
          'base64',
        );
      }

      const file: FileItem = {
        name: res.name,
        size: res.size,
        type: res.type || 'application/octet-stream',
        base64,
        isnew: true,
        uri: res.uri,
      };
      let newValue = [...value];
      if (maxFile === 1) {
        // Replace the (possibly default) file
        newValue = [file];
      } else {
        newValue.push(file);
      }
      onChange(newValue);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (file: FileItem) => {
    try {
      let path = file.uri;
      if (path) {
        if (Platform.OS === 'android') {
          path = await copyContentUriToFile(file.uri, file.name);
        }
      } else path = await copyContentBase64ToFile(file.base64, file.name);
      await FileViewer.open(path, {showOpenWithDialog: true});
    } catch (err) {
      Alert.alert('Error', 'Unable to preview this file.');
    }
  };

  const removeFile = (index: number) => {
    const updated = [...value];
    if (defaultBase64 && maxFile === 1) {
      let cleaned = defaultBase64?.split?.(',')?.pop?.() || defaultBase64;
      let padding = 0;
      if (cleaned?.endsWith?.('==')) padding = 2;
      else if (cleaned?.endsWith?.('=')) padding = 1;
      const sizeInBytes = (cleaned?.length * 3) / 4 - padding;
      const defaultFile: FileItem = {
        name: 'default-avatar.png',
        size: sizeInBytes ?? 0,
        type: 'image/png',
        base64: cleaned,
        isnew: true,
        uri: '',
      };
      onChange([defaultFile]);
    } else {
      // Normal remove for other cases
      updated.splice(index, 1);
      onChange(updated);
    }
  };

  return (
    <View style={{marginTop: 8 * BW()}}>
      <View style={styles.labelRow}>
        <Text medium={medium} style={{color: colors.text}} h4>
          {title}
        </Text>
        {requiredStar && (
          <Icon
            name="star-of-life"
            size={6 * BW()}
            color="#db2c43"
            style={{marginLeft: 6}}
          />
        )}
      </View>

      {attachmentDescription && (
        <Text style={styles.helpText}>{attachmentDescription}</Text>
      )}

      {effectiveLength > 0 &&
        effectiveFiles?.map((file, index) => (
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
                {file.name}
              </Text>
              <Text h4>{Math.ceil(file?.size / 1024)} KB</Text>
            </View>
            <Button
              icon={require('../../assets/icons/eye.png')}
              style={styles.icon}
              styleIcon={styles.styleIconEye}
              containerIcon={styles.containerIcon}
              onPress={() => handlePreview(file)}
            />
            {!isDisabled && (
              <Button
                icon={require('../../assets/icons/delete.png')}
                style={styles.icon}
                styleIcon={styles.styleIconDelete}
                containerIcon={styles.containerIcon}
                onPress={() => removeFile(value.indexOf(file))}
              />
            )}
          </Animatable.View>
        ))}
      {loading && (
        <ActivityIndicator size="small" color={colors.secondaryColor + '99'} />
      )}
      {!isDisabled && (
        <Button
          title={t('uploadFile')}
          onPress={handlePick}
          disabled={effectiveLength >= maxFile || loading}
          icon={require('../../assets/icons/upload.png')}
          style={{
            backgroundColor: colors.background,
            borderColor: required || errors ? colors.red : '#cccccc88',
            borderWidth: required || errors ? 0.5 * BW() : 0 * BW(),
            ...styles.button,
            opacity: effectiveLength >= maxFile ? 0.7 : 1,
          }}
          containerIcon={styles.containerUploadIcon}
          styleIcon={styles.styleUploadIcon}
        />
      )}

      {errors && (
        <Text h5 style={{color: colors.red}}>
          {errors}
        </Text>
      )}

      <Text style={styles.helpText}>
        {t('allowedExtension') + ': ' + acceptedFiles.join(', ')}
      </Text>
      <Text style={styles.helpText}>
        {t('maximumSize')}: {maxFileSize / 1024 / 1024} MB
      </Text>
      <Text style={styles.helpText}>
        {t('MaxFilesLabel')}: {maxFile}
      </Text>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
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
    fileName: {
      flex: 1,
      fontSize: 14,
    },
    previewBtn: {
      marginLeft: 8,
      padding: 4,
      backgroundColor: 'transparent',
    },
    removeBtn: {
      marginLeft: 8,
      padding: 4,
      backgroundColor: 'transparent',
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
      borderRadius: 0,
      marginHorizontal: 6 * BW(),
    },
    styleIconEye: {
      tintColor: 'green',
      width: 16 * BW(),
      height: 16 * BW(),
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
    helpText: {
      fontSize: 10,
      color: '#555',
      marginTop: 2,
    },
  });

export default ILAttachmentUpload;
