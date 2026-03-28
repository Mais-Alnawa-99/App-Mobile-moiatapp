import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useFormikContext} from 'formik';
import {t} from 'i18next';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import ReadOnlyInput from '../ReadOnlyText';
import {BW} from '../../../../../style/theme';

const TotalCostofForeignOriginMaterials = () => {
  const {values, setFieldValue} = useFormikContext();
  useEffect(() => {
    let foreign =
      values.ForeignMaterialsCost?.length > 0
        ? values.ForeignMaterialsCost[values.ForeignMaterialsCost.length - 1]
            .sum
        : 0;
    let local =
      values.LocalMaterialsCost?.length > 0
        ? values.LocalMaterialsCost[values.LocalMaterialsCost.length - 1].sum
        : 0;
    const TotalProductionCost =
      foreign +
      local +
      Number(values.wagesandSalaries || 0) +
      Number(values.depreciationofBuilding || 0) +
      Number(values.depreciationofMachinery || 0) +
      Number(values.buildingRent || 0) +
      Number(values.rentOfWarehousesForTheFactory || 0) +
      Number(values.rentOfLaborAccommodation || 0) +
      Number(values.interestPaidofLongterms || 0) +
      Number(values.administrationandGeneralExpenses || 0);
    setFieldValue('TotalProductionCost', TotalProductionCost);
  }, [
    values.administrationandGeneralExpenses,
    values.interestPaidofLongterms,
    values.rentOfLaborAccommodation,
    values.rentOfWarehousesForTheFactory,
    values.buildingRent,
    values.depreciationofMachinery,
    values.depreciationofBuilding,
    values.wagesandSalaries,
    values.ForeignMaterialsCost,
    values.LocalMaterialsCost,
  ]);
  return (
    <View>
      <StepIndicator
        stepNumber={13}
        stepName={t('totalCostofForeignOriginMaterials')}
        style={{marginBottom: 0 * BW()}}
      />
      <View>
        {values.ForeignMaterialsCost?.map(item => (
          <ReadOnlyInput
            key={`${item.value}-${item.sum}`}
            requiredStar
            label={item.label}
            value={item?.sum}
          />
        ))}
      </View>
      {values.ForeignMaterialsCost &&
        values.ForeignMaterialsCost.length > 0 && (
          <ReadOnlyInput
            label={t('IL.VAT.TotalProductionCost')}
            value={values.TotalProductionCost}
          />
        )}
    </View>
  );
};

export default TotalCostofForeignOriginMaterials;
