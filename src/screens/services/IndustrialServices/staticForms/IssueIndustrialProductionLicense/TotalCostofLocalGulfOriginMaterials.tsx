import {View} from 'react-native';
import {useFormikContext} from 'formik';
import {t} from 'i18next';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import ReadOnlyInput from '../ReadOnlyText';
import {BW} from '../../../../../style/theme';

const TotalCostofLocalGulfOriginMaterials = () => {
  const {values} = useFormikContext();
  return (
    <View>
      <StepIndicator
        stepNumber={11}
        stepName={t('totalCostofLocalGulfOriginMaterials')}
        style={{marginBottom: 0 * BW()}}
      />
      <View>
        {values.LocalMaterialsCost?.map(item => {
          return (
            <ReadOnlyInput
              key={`${item.value}-${item.sum}`}
              requiredStar
              label={item.label}
              value={item?.sum}
            />
          );
        })}
      </View>
    </View>
  );
};

export default TotalCostofLocalGulfOriginMaterials;
