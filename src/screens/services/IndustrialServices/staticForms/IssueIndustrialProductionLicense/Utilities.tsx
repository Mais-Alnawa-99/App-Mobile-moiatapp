import React from 'react';
import {View} from 'react-native';
import {useFormikContext} from 'formik';
import Input from '../../../../../component/input/Input';
import {t} from 'i18next';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import Text from '../../../../../component/Text';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../../style/theme';
import {useDisabled} from './DisabledContext';

const Utilities = () => {
  const {values, handleChange, errors, touched} = useFormikContext();
  const {isDisabled} = useDisabled();
  const {colors}: any = useTheme();

  return (
    <View>
      <StepIndicator
        stepNumber={9}
        stepName={t('utilities')}
        style={{marginBottom: 0 * BW()}}
      />
      <Input
        textInput
        requiredStar
        label={t('monthlyElectricityConsumptioninKWH')}
        value={values.monthlyElectricityConsumptioninKWH}
        onChangeText={handleChange('monthlyElectricityConsumptioninKWH')}
        error={
          touched.monthlyElectricityConsumptioninKWH &&
          errors.monthlyElectricityConsumptioninKWH
        }
        disabled={isDisabled('FirstName')}
      />

      <Text
        h5
        style={{
          color: colors.lightPrimaryTextColor,
        }}>
        {t('IL.Help_UtilitiesText')}
      </Text>

      <Input
        textInput
        requiredStar
        label={t('monthlyElectricityConsumptionChargesinAED')}
        value={values.monthlyElectricityConsumptionChargesinAED}
        onChangeText={handleChange('monthlyElectricityConsumptionChargesinAED')}
        error={
          touched.monthlyElectricityConsumptionChargesinAED &&
          errors.monthlyElectricityConsumptionChargesinAED
        }
        disabled={isDisabled('FirstName')}
      />

      <Text
        h5
        style={{
          color: colors.lightPrimaryTextColor,
        }}>
        {t('IL.Help_UtilitiesText')}
      </Text>

      <Input
        textInput
        requiredStar
        label={t('monthlyWaterConsumptionGallon')}
        value={values.monthlyWaterConsumptionGallon}
        onChangeText={handleChange('monthlyWaterConsumptionGallon')}
        error={
          touched.monthlyWaterConsumptionGallon &&
          errors.monthlyWaterConsumptionGallon
        }
        disabled={isDisabled('FirstName')}
      />

      <Text
        h5
        style={{
          color: colors.lightPrimaryTextColor,
        }}>
        {t('IL.Help_UtilitiesText')}
      </Text>

      <Input
        textInput
        requiredStar
        label={t('monthlyWaterConsumptionChargesinAED')}
        value={values.monthlyWaterConsumptionChargesinAED}
        onChangeText={handleChange('monthlyWaterConsumptionChargesinAED')}
        error={
          touched.monthlyWaterConsumptionChargesinAED &&
          errors.monthlyWaterConsumptionChargesinAED
        }
        disabled={isDisabled('FirstName')}
      />

      <Text
        h5
        style={{
          color: colors.lightPrimaryTextColor,
        }}>
        {t('IL.Help_UtilitiesText')}
      </Text>

      <Input
        textInput
        label={t('monthlyGasConsumptionMMBTU')}
        value={values.monthlyGasConsumptionMMBTU}
        onChangeText={handleChange('monthlyGasConsumptionMMBTU')}
        disabled={isDisabled('FirstName')}
      />
      <Text
        h5
        style={{
          color: colors.lightPrimaryTextColor,
        }}>
        {t('IL.Help_UtilitiesText')}
      </Text>

      <Input
        textInput
        label={t('monthlyGasConsumptionChargesinAED')}
        value={values.monthlyGasConsumptionChargesinAED}
        onChangeText={handleChange('monthlyGasConsumptionChargesinAED')}
        disabled={isDisabled('FirstName')}
      />
      <Text
        h5
        style={{
          color: colors.lightPrimaryTextColor,
        }}>
        {t('IL.Help_UtilitiesText')}
      </Text>
    </View>
  );
};

export default Utilities;
