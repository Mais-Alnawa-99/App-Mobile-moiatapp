import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import Text from '../../../../component/Text';
import {BW} from '../../../../style/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

const StepIndicator = ({
  stepNumber,
  stepName,
  isLastStep,
  style,
  requiredStar,
}: any) => {
  const {colors} = useTheme();
  const styles = getStyle(colors);
  return (
    <View style={[styles.stepContainer, {...style}]}>
      <View style={styles.circle}>
        <Text h3 bold style={styles.stepNumber}>
          {stepNumber}
        </Text>
      </View>
      <Text h2 bold>
        {stepName}
      </Text>
      {requiredStar && (
        <Icon
          name="star-of-life"
          size={6 * BW()}
          color="#db2c43"
          style={{marginHorizontal: 4 * BW()}}
        />
      )}
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    stepContainer: {
      alignItems: 'center',
      position: 'relative',
      flexDirection: 'row',
      marginBottom: 8 * BW(),
    },
    circle: {
      width: 25 * BW(),
      height: 25 * BW(),

      borderRadius: 20 * BW(),
      backgroundColor: colors.secondaryColor + '99',
      justifyContent: 'center',
      alignItems: 'center',
      marginEnd: 8 * BW(),
    },
    stepNumber: {
      color: '#fff',
      width: 32 * BW(),
      height: 32 * BW(),
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      position: 'absolute',
      lineHeight: 32 * BW(),
    },
  });

export default StepIndicator;
