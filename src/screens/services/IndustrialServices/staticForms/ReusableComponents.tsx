import {
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BW} from '../../../../style/theme';
import Text from '../../../../component/Text';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import reactotron from 'reactotron-react-native';
import {useTheme} from '@react-navigation/native';
import DashedLine from '../../../../component/DashedLine';

export const ReadOnlyRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => {
  const {colors}: any = useTheme();
  return (
    <View style={{gap: 8 * BW(), marginTop: 8 * BW()}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          gap: 4 * BW(),
        }}>
        <Text h4 style={{color: colors.lightPrimaryTextColor}}>
          {label + ': '}
        </Text>
        <Text h4 style={{flex: 1, color: colors.textPrimaryColor}} medium>
          {value}
        </Text>
      </View>
      <DashedLine style={{marginVertical: 0 * BW()}} />
    </View>
  );
};

export const AttachmentRow = ({
  label,
  files,
}: {
  label: string;
  files: any[];
}) => {
  const {t} = useTranslation();

  const copyContentBase64ToFile = async (
    base64: string,
    fileName: string = 'document.pdf',
  ) => {
    try {
      // pick extension from fileName or fallback
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      // write file from base64
      await RNFS.writeFile(path, base64, 'base64');

      // open with native viewer
      return path;
    } catch (err) {
      return '';
    }
  };

  const copyContentUriToFile = async (uri: string, name: string) => {
    const dest = `${RNFS.TemporaryDirectoryPath}/${name}`;
    const exists = await RNFS.exists(dest);
    if (exists) await RNFS.unlink(dest);
    await RNFS.copyFile(uri, dest);
    return 'file://' + dest;
  };
  const openFile = async file => {
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

  return (
    <View
      style={{
        gap: 8 * BW(),
        marginTop: 8 * BW(),
      }}>
      <Text
        h4
        style={{
          color: '#767676ff',
        }}>
        {label}
      </Text>
      {files && files.length > 0 ? (
        files.map((file, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              !!file?.base64 && openFile(file);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="insert-drive-file"
              size={20 * BW()}
              color="#666"
            />
            <Text h4 style={{marginStart: 8 * BW(), flex: 1}} numberOfLines={1}>
              {file.fileName ||
                file?.name ||
                file.filePath?.split('/').pop() ||
                t('File')}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text h4 style={{color: '#545454ff'}}>
          {t('NoFileUploaded')}
        </Text>
      )}
      <DashedLine style={{marginVertical: 0 * BW()}} />
    </View>
  );
};
