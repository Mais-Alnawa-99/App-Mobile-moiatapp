// TTSBottomSheet.tsx
import React, {useEffect} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTTS} from './useTTS';
import {BW} from '../../style/theme';
import {useTheme} from '@react-navigation/native';

type Props = {
  visible: boolean;
  onClose: () => void;
  text: string;
};

export default function TTSBottomSheet({visible, onClose, text}: Props) {
  const {colors} = useTheme();
  const styles = getStyle(colors);
  const {ready, speaking, speak, stop} = useTTS();

  const canPlay = !!text?.trim() && ready;

  const onToggle = async () => {
    if (speaking) {
      stop();
    } else if (canPlay) {
      await speak(text);
    }
  };
  const _onClose = () => {
    onClose();
    stop();
  };
  useEffect(() => {
    if (visible) {
      speak(text);
    }
  }, [visible]);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={_onClose}>
      <Pressable style={styles.backdrop} onPress={_onClose} />

      <View style={styles.sheet}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={_onClose} style={styles.iconBtn}>
            <Icon name="close" size={22} color="#111827" />
          </TouchableOpacity>
        </View>

        <View style={styles.controlsRow}>
          <TouchableOpacity
            onPress={onToggle}
            disabled={!canPlay && !speaking}
            style={[
              styles.roundBtn,
              speaking ? styles.roundBtnStop : styles.roundBtnPlay,
              !canPlay && !speaking ? styles.disabled : undefined,
            ]}>
            <Icon
              name={speaking ? 'stop' : 'play-arrow'}
              size={28 * BW()}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    backdrop: {flex: 1, backgroundColor: 'rgba(0,0,0,0.35)'},
    sheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.background,
      borderTopLeftRadius: 20 * BW(),
      borderTopRightRadius: 20 * BW(),
      padding: 16 * BW(),
    },
    grabber: {
      alignSelf: 'center',
      width: 44 * BW(),
      height: 4 * BW(),
      borderRadius: 2 * BW(),
      backgroundColor: '#ccc',
      marginBottom: 4 * BW(),
    },
    headerRow: {
      alignItems: 'flex-end',
    },
    iconBtn: {},
    controlsRow: {
      marginBottom: 16 * BW(),
      flexDirection: 'row',
      justifyContent: 'center',
    },
    roundBtn: {
      width: 56 * BW(),
      height: 56 * BW(),
      borderRadius: 28 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
    },
    roundBtnPlay: {backgroundColor: '#10b981'}, // أخضر
    roundBtnStop: {backgroundColor: '#ef4444'}, // أحمر
    disabled: {opacity: 0.5},
  });
