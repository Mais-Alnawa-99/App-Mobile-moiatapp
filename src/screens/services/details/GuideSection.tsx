import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../style/theme';
import Button from '../../../component/Button';
import {_downloadFile} from '../../../component/SaveFiles';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {setLoadingModal} from '../../../redux/reducers/General/loader';
import ButtonSlides from '../../../component/ButtonSlides';
export default function GuideSection(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);
  const {tokenData}: any = useAppSelector(store => store.userToken);
  const dispatch = useAppDispatch();
  const data = props.data;

  const doc = data?.FieldValues?.GeneralDocument;
  const video = props.data?.FieldValues?.TutorialVideo;
  const openYouTube = async (url: string) => {
    try {
      let finalUrl = url;
      Linking.openURL(finalUrl);

      // if (finalUrl.includes('youtube.com/embed/')) {
      //   const videoId = finalUrl.split('/embed/')[1]?.split('?')[0];
      //   finalUrl = `https://www.youtube.com/watch?v=${videoId}`;
      // }

      // const appUrl = finalUrl.replace(
      //   'https://www.youtube.com/watch?v=',
      //   'vnd.youtube://',
      // );
      // const canOpenApp = await Linking.canOpenURL(appUrl);

      // if (canOpenApp) {
      //   await Linking.openURL(appUrl);
      // } else {
      //   await Linking.openURL(finalUrl);
      // }
    } catch (err) {}
  };

  return (
    <View style={[style.row, {marginVertical: 16 * BW()}]}>
      {video?.Url && (
        <Button
          style={style.btn}
          medium
          icon={require('../../../assets/icons/Play.png')}
          title={t('WatchVideoTutorial')}
          styleText={style.title}
          styleIcon={{tintColor: colors.secondaryColor}}
          containerIcon={style.containerIcon}
          onPress={() => openYouTube(video.Url)}
        />
      )}
      {doc && doc?.Buttons.length > 0 && (
        <Button
          style={style.btn}
          medium
          icon={require('../../../assets/icons/DownloadSimple.png')}
          title={t('DownloadUserGuide')}
          styleText={style.title}
          containerIcon={style.containerIcon}
          styleIcon={{tintColor: colors.secondaryColor}}
          onPress={async () => {
            const file = doc.Buttons?.[0];
            //  Linking.openURL(file.Url);
            dispatch(setLoadingModal(true));
            await _downloadFile(file.Url, doc.Title + '.pdf', {}).then(
              () => {},
            );
            setTimeout(() => dispatch(setLoadingModal(false)), 7000);
          }}
        />
      )}
      {data?.FieldValues?.UserManual && (
        <Button
          style={style.btn}
          medium
          icon={require('../../../assets/icons/DownloadSimple.png')}
          title={data?.FieldValues.UserManual.Title}
          styleText={style.title}
          containerIcon={style.containerIcon}
          styleIcon={{tintColor: colors.secondaryColor}}
          numberOfLines={1}
          onPress={() => {
            const file = data?.FieldValues.UserManual;
            dispatch(setLoadingModal(true));

            _downloadFile(file.Url, file.Title + '.pdf', {});
            setTimeout(() => dispatch(setLoadingModal(false)), 7000);
          }}
        />
      )}
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    icon: {
      width: 18 * BW(),
      height: 18 * BW(),
      resizeMode: 'contain',
    },
    btn: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 0,
      borderRadius: 0,
      flex: 1,
    },

    containerIcon: {
      width: 22 * BW(),
      height: 22 * BW(),
    },
    title: {
      color: colors.secondaryColor,
      marginStart: 4 * BW(),
      flex: 1,
    },
  });
