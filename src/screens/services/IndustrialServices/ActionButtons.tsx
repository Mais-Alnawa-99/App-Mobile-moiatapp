import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import Button from '../../../component/Button';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../style/theme';

interface Props {
  onSubmit: () => void;
  onSaveDraft?: () => void;
  style?: any;
  disabled?: any;
}

const ActionButtons: React.FC<Props> = ({
  onSubmit,
  onSaveDraft,
  style,
  disabled,
}) => {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  return (
    <View style={[styles.container, style]}>
      <Button
        title={t('IL.ActionOk')}
        onPress={onSubmit}
        style={styles.btn}
        styleText={{color: colors.mainWhite}}
        disabled={disabled}
        backgroundColorDisabled={disabled ? colors.darkGray : undefined}
      />
      <Button
        title={t('IL.SaveDraft')}
        onPress={onSaveDraft}
        style={styles.btn}
        styleText={{color: colors.mainWhite}}
        disabled={disabled}
        backgroundColorDisabled={disabled ? colors.darkGray : undefined}
      />
    </View>
  );
};

export default ActionButtons;

const getStyle = (colors: any) =>
  StyleSheet.create({
    btn: {
      backgroundColor: colors?.secondaryColor,
      width: 'auto',
      height: 'auto',
      minHeight: 45 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 8 * BW(),
    },
  });
