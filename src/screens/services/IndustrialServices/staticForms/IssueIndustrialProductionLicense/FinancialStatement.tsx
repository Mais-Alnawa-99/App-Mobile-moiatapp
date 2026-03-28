import React, {useState} from 'react';
import {View} from 'react-native';
import {useFormikContext} from 'formik';
import Input from '../../../../../component/input/Input';
import {t} from 'i18next';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import reactotron from 'reactotron-react-native';
import {BW} from '../../../../../style/theme';
import {useDisabled} from './DisabledContext';

const FinancialStatement = () => {
  const {values, handleChange, errors, touched} = useFormikContext();
  const {isDisabled} = useDisabled();

  return (
    <View>
      <StepIndicator
        stepNumber={12}
        stepName={t('financialStatement')}
        style={{marginBottom: 0 * BW()}}
      />
      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('annualSales')}
        value={values.annualSales}
        onChangeText={handleChange('annualSales')}
        error={touched.annualSales && errors.annualSales}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('finishedGoodsOpeningStock')}
        value={values.finishedGoodsOpeningStock}
        onChangeText={handleChange('finishedGoodsOpeningStock')}
        error={
          touched.finishedGoodsOpeningStock && errors.finishedGoodsOpeningStock
        }
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('finishedGoodsClosingStock')}
        value={values.finishedGoodsClosingStock}
        onChangeText={handleChange('finishedGoodsClosingStock')}
        error={
          touched.finishedGoodsClosingStock && errors.finishedGoodsClosingStock
        }
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('netProfit')}
        value={values.netProfit}
        onChangeText={handleChange('netProfit')}
        error={touched.netProfit && errors.netProfit}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('wagesandSalaries')}
        value={values.wagesandSalaries}
        onChangeText={handleChange('wagesandSalaries')}
        error={touched.wagesandSalaries && errors.wagesandSalaries}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('valueofBuildings')}
        value={values.valueofBuildings}
        onChangeText={handleChange('valueofBuildings')}
        error={touched.valueofBuildings && errors.valueofBuildings}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('depreciationofBuilding')}
        value={values.depreciationofBuilding}
        onChangeText={handleChange('depreciationofBuilding')}
        error={touched.depreciationofBuilding && errors.depreciationofBuilding}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('valueofMachinery')}
        value={values.valueofMachinery}
        onChangeText={handleChange('valueofMachinery')}
        error={touched.valueofMachinery && errors.valueofMachinery}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('depreciationofMachinery')}
        value={values.depreciationofMachinery}
        onChangeText={handleChange('depreciationofMachinery')}
        error={
          touched.depreciationofMachinery && errors.depreciationofMachinery
        }
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('buildingRent')}
        value={String(values?.buildingRent || '')}
        onChangeText={handleChange('buildingRent')}
        error={touched.buildingRent && errors.buildingRent}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('rentOfWarehousesForTheFactory')}
        value={values.rentOfWarehousesForTheFactory}
        onChangeText={handleChange('rentOfWarehousesForTheFactory')}
        error={
          touched.rentOfWarehousesForTheFactory &&
          errors.rentOfWarehousesForTheFactory
        }
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('rentOfLaborAccommodation')}
        value={values.rentOfLaborAccommodation}
        onChangeText={handleChange('rentOfLaborAccommodation')}
        error={
          touched.rentOfLaborAccommodation && errors.rentOfLaborAccommodation
        }
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('valueofLongtermLoans')}
        value={values.valueofLongtermLoans}
        onChangeText={handleChange('valueofLongtermLoans')}
        error={touched.valueofLongtermLoans && errors.valueofLongtermLoans}
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('interestPaidofLongterms')}
        value={values.interestPaidofLongterms}
        onChangeText={handleChange('interestPaidofLongterms')}
        error={
          touched.interestPaidofLongterms && errors.interestPaidofLongterms
        }
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('administrationandGeneralExpenses')}
        value={values.administrationandGeneralExpenses}
        onChangeText={handleChange('administrationandGeneralExpenses')}
        error={
          touched.administrationandGeneralExpenses &&
          errors.administrationandGeneralExpenses
        }
        disabled={isDisabled('FirstName')}
      />

      <Input
        textInput
        requiredStar
        keyboardType="numeric"
        label={t('patentCost')}
        value={values.patentCost}
        onChangeText={handleChange('patentCost')}
        error={touched.patentCost && errors.patentCost}
        disabled={isDisabled('FirstName')}
      />
    </View>
  );
};

export default FinancialStatement;
