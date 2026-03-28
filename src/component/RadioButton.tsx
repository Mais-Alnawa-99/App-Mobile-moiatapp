import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {BW} from '../style/theme';
import {useTheme} from '@react-navigation/native';

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  color?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({selected, onPress}) => {
  const {colors}: any = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.radioButton,
        {borderColor: colors.secondaryColor},
        selected && styles.radioButtonSelected,
      ]}
      onPress={onPress}>
      {selected && (
        <View
          style={[styles.radioInner, {backgroundColor: colors.secondaryColor}]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    width: 20 * BW(),
    height: 20 * BW(),
    borderRadius: 10 * BW(),
    borderWidth: 2 * BW(),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10 * BW(),
  },
  radioButtonSelected: {
    backgroundColor: 'transparent',
  },
  radioInner: {
    width: 10 * BW(),
    height: 10 * BW(),
    borderRadius: 5 * BW(),
  },
});

export default RadioButton;
