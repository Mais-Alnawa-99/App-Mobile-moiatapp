import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import RNFS from 'react-native-fs';
import PDFView from 'react-native-view-pdf';

import Loader from './Loader';
import theme, {BW} from '../style/theme';
import Text from './Text';
import {isArabic} from '../locales';

function PdfViewComp(props: any): JSX.Element {
  let title = props?.title ? props?.title : '';
  const downloadPath = `${RNFS.DocumentDirectoryPath}/${title}`;

  const ref = useRef(null);
  const resourceType = 'url';

  const resources = {
    file: downloadPath,
    url: props?.file ? props?.file : '',
  };
  const {t} = useTranslation();
  const {colors} = useTheme();
  const styles = getStyle(colors);
  const [isLoading, setIsLoading] = useState(true);

  const onLoadEnd = () => {
    setIsLoading(false);
  };
  return (
    <>
      {
        props?.file && (
          <>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                position: Platform.OS == 'android' ? 'relative' : 'absolute',
                marginTop: Platform.OS == 'android' ? 0 : 200 * BW(),
              }}>
              <Loader isLoading={isLoading} />
              <Text
                h4
                style={{
                  color: theme.themeObject.colors.primaryColor,
                  marginTop: 10 * BW(),
                }}>
                {isArabic() ? 'يرجى الانتظار ...' : 'Please Wait ...'}
              </Text>
            </View>
            <PDFView
              fadeInDuration={250.0}
              style={styles.pdf}
              resource={resources[resourceType]}
              resourceType={resourceType}
              onLoad={onLoadEnd}
              // onLoad={() => setIsLoading(false)}
            />
          </>
        )
        // ))
      }
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    pdf: {
      display: 'flex',
      flex: 1,
    },
  });
export default PdfViewComp;
