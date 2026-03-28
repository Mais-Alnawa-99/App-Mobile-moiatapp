import {StyleSheet} from 'react-native';
import {BW} from './theme';

export const getGeneralStyle = (colors: any) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
    },

    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
