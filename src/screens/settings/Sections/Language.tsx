import React, {Fragment, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Text from '../../../component/Text';
import {BW} from '../../../style/theme';
import {useTheme} from '@react-navigation/native';
import Section from './Section';
import {isArabic} from '../../../locales';
import {_setLang} from '../../Lang';
import Button from '../../../component/Button';
import {useAppSelector} from '../../../redux/store';
import {Image} from 'react-native';
export default function Language() {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const [showLangModal, setShowLangModal] = useState(false);

  const {lang} = useAppSelector(store => store.lang);

  const languages = [
    {label: 'عربي', code: 'ar'},
    {label: 'English', code: 'en'},
    {label: 'Français', code: 'fr'},
    {label: 'Русский', code: 'ru'},
    {label: 'Español', code: 'es'},
    {label: '中文', code: 'zh'},
    {label: 'اردو', code: 'ur'},
    {label: 'Filipino', code: 'tl'},
  ];
  const currentLanguageLabel = languages.find(l => l.code === lang)?.label;

  return (
    <>
      <Section
        icon={require('../../../assets/settings/GlobeSimple.png')}
        title={t('Language')}
        endChildren={
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: 4 * BW()}}>
            <Text
              h3
              ar={!isArabic()}
              medium
              style={{color: colors.secondaryColor}}>
              {currentLanguageLabel}
            </Text>
          </View>
        }
        onPress={() => setShowLangModal(true)}
      />
      <LanguageSelectorModal
        visible={showLangModal}
        onClose={() => setShowLangModal(false)}
      />
    </>
  );
}

export function LanguageSelectorModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const {lang} = useAppSelector(store => store.lang);
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();

  const languages = [
    {label: 'عربي', code: 'ar'},
    {label: 'English', code: 'en'},
    {label: 'Français', code: 'fr'},
    {label: 'Русский', code: 'ru'},
    {label: 'Español', code: 'es'},
    {label: '中文', code: 'zh'},
    {label: 'اردو', code: 'ur'},
    {label: 'Filipino', code: 'tl'},
  ];

  const handleSelect = (code: string) => {
    _setLang(code);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
            }}>
            <Text h2 bold>
              {t('ChooseLanguage')}
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
                  tintColor: colors.text,
                }}
                source={require('../../../assets/icons/close.png')}
              />
            </TouchableOpacity>
          </View>
          {languages.map((item, index): any => (
            <Fragment key={index}>
              <TouchableOpacity
                key={item.code}
                style={styles.languageItem}
                onPress={() => {
                  item.code !== lang ? handleSelect(item.code) : {};
                }}>
                <Text
                  h3
                  medium
                  style={{
                    color:
                      item.code !== lang ? colors.text : colors.secondaryColor,
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
              {index != languages.length - 1 && <View style={styles.border} />}
            </Fragment>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    btn: {
      width: 'auto',
      height: 'auto',
      borderRadius: 4 * BW(),
      borderColor: colors.secondaryColor,
      padding: 1 * BW(),
      minWidth: 30 * BW(),
      borderWidth: 1 * BW(),
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.black + '88',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.white,
      padding: 16 * BW(),
      borderRadius: 6 * BW(),
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    languageItem: {
      paddingVertical: 3 * BW(),
    },
    border: {
      borderColor: colors?.border + '99',
      borderWidth: 0.7 * BW(),
      width: 130 * BW(),
      marginVertical: 6 * BW(),
    },
    closeBtn: {
      alignSelf: 'center',
      marginTop: 10 * BW(),
    },
  });
