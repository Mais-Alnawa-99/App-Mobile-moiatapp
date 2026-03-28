import React, {useState, useEffect, useRef} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  ImageBackground,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import RenderHtmlComponent from '../../../../component/renderHtml/RenderHtml';
import Text from '../../../../component/Text';
import {BW} from '../../../../style/theme';
import {serviceApiGateway} from '../../../../redux/network/apiEservices';
import {_downloadFile} from '../../../../component/SaveFiles';
import {announcementsAcknowledgment} from '../../../../redux/reducers/E-Services/thunk/announcements';
import {useAppDispatch, useAppSelector} from '../../../../redux/store';
import Button from '../../../../component/Button';
import {setILAnnouncementsAcknowledgment} from '../../../../redux/reducers/I-Services/thunk/announcements';

export default function Announcements({
  announcements,
  setAnnouncements,
}: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const {userId}: any = useAppSelector(store => store.userILData);

  announcements =
    announcements?.filter?.((a: any) => a?.isAcknowledgment === false) || [];

  const [modalVisible, setModalVisible] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [step, setStep] = useState(0);
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animTranslate = useRef(new Animated.Value(30)).current;
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (announcements.length > 0 && firstLoading) {
      setModalVisible(true);
      animateIn();
    } else {
      // setModalVisible(false);
    }
  }, [announcements]);

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(animOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animTranslate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(animOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animTranslate, {
        toValue: -30,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      animTranslate.setValue(30); // reset for next animation
      animateIn();
    });
  };

  const onDotPress = (index: number) => {
    if (index !== step) {
      animateOut(() => setStep(index));
    }
  };

  const onClose = () => {
    setModalVisible(false);
    setStep(0);
    setFirstLoading(false);
  };

  const current = announcements?.[step];
  const attachments = current?.attachments
    ? JSON.parse(current?.attachments)
    : [];

  const handleDownload = (item: any) => {
    const url = `${serviceApiGateway}/EntityAdmin/AnnouncementsAttachmentById?Id=${item?.Id}&download=false`;
    _downloadFile(url, item?.FileName, {});
  };

  const acknowledge = () => {
    // Call API here if needed
    // onClose();
    setLoading(true);
    dispatch(
      setILAnnouncementsAcknowledgment({
        userId: userId,
        messageid: current?.id,
      }),
    ).then(res => {
      if (res.payload?.networkSuccess && res.payload?.result?.status == 200) {
        setAnnouncements((prev: any[]) =>
          prev.map(a =>
            a.id === current?.id ? {...a, isAcknowledgment: true} : a,
          ),
        );
        setStep(0);
      }
      setLoading(false);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../../../../assets/AdsBg.png')}
          style={styles.modalView}>
          <View style={styles.header}>
            <Text h2 bold style={{color: colors.mainWhite}}>
              {t('Labels.Announcements')}
            </Text>
            <TouchableOpacity
              style={{
                width: 20 * BW(),
                height: 20 * BW(),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={onClose}>
              <Image
                style={{
                  width: 12 * BW(),
                  height: 12 * BW(),
                  resizeMode: 'contain',
                  tintColor: colors.mainWhite,
                }}
                source={require('../../../../assets/icons/close.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 16 * BW(),
              backgroundColor: colors.secondaryColor + '99',
              borderWidth: 2 * BW(),
              borderColor: colors.secondaryColor + '99',
              width: 50 * BW(),
              left: -20 * BW(),
            }}
          />
          <Animated.View
            style={{
              opacity: animOpacity,
              transform: [{translateX: animTranslate}],
              flex: 1,
            }}>
            <ScrollView style={{flex: 1}}>
              <Text
                h3
                medium
                style={{marginBottom: 12 * BW(), color: colors.mainWhite}}>
                {current?.title}
              </Text>
              {current?.description && (
                <RenderHtmlComponent
                  key={current?.id}
                  baseStyle={{
                    alignItems: 'flex-start',
                    padding: 0,
                  }}
                  textColor={colors.mainWhite}
                  styleBody={{paddingHorizontal: 0}}
                  description={current?.description || ''}
                />
              )}

              {/* {attachments?.length > 0 && (
                <View style={{marginTop: 20 * BW()}}>
                  <Text
                    h3
                    medium
                    style={{marginBottom: 8 * BW(), color: colors.mainWhite}}>
                    {t('Labels.UserAnnouncementAttachments')}
                  </Text>
                  {attachments.map((item: any) => (
                    <View key={item.Id} style={styles.attachmentContainer}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          gap: 6 * BW(),
                        }}>
                        <Text h4 medium style={{color: colors.mainWhite}}>
                          {item.FileName}
                        </Text>
                        <Text h4 style={{color: colors.mainWhite}}>
                          ({(item.Size / 1024).toFixed(1)} KB)
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          width: 20 * BW(),
                          height: 20 * BW(),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => handleDownload(item)}>
                        <Image
                          resizeMode="contain"
                          style={{
                            width: 20 * BW(),
                            height: 20 * BW(),
                            resizeMode: 'contain',
                            tintColor: colors.mainWhite,
                          }}
                          source={require('../../../../assets/icons/download.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )} */}
            </ScrollView>
          </Animated.View>

          <View style={styles.footer}>
            <Button
              title={t('Button.AcknowledgeButton')}
              styleText={{color: colors.mainWhite}}
              loadingColor={colors.secondaryColor}
              loading={loading}
              style={{
                borderRadius: 30 * BW(),
                borderColor: colors.secondaryColor,
                borderWidth: 1 * BW(),
                padding: 3 * BW(),
                minWidth: 100 * BW(),
                alignItems: 'center',
                justifyContent: 'center',
                width: 'auto',
                height: 'auto',
                minHeight: 35 * BW(),
                backgroundColor: colors?.secondaryColor,
              }}
              onPress={acknowledge}
            />
            {announcements?.length > 1 && (
              <View style={styles.dotsContainer}>
                {announcements.map((_: any, index: any) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onDotPress(index)}
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          index === step
                            ? colors.secondaryColor
                            : colors.mainWhite + '88',
                      },
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        </ImageBackground>
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
      backgroundColor: colors.black + '99',
      paddingHorizontal: 16 * BW(),
    },
    modalView: {
      borderRadius: 8 * BW(),
      minWidth: '100%',
      maxWidth: '100%',
      maxHeight: '88%',
      minHeight: '50%',
      padding: 16 * BW(),
      overflow: 'hidden',
      resizeMode: 'stretch',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
    },
    attachmentContainer: {
      marginBottom: 8 * BW(),
      backgroundColor: colors.mainWhite + '11',
      padding: 8 * BW(),
      borderRadius: 6 * BW(),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footer: {
      marginTop: 16 * BW(),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    dotsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10 * BW(),
    },
    dot: {
      width: 8 * BW(),
      height: 8 * BW(),
      borderRadius: 5,
    },
  });
