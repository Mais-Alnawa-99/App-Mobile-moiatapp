import {useFormikContext} from 'formik';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import ReadOnlyRow from '../ReadOnlyText';
import {useMemo} from 'react';
import {View} from 'react-native';
import {t} from 'i18next';
import moment from 'moment';
import {AttachmentRow} from '../ReusableComponents';
import {BW} from '../../../../../style/theme';

export const DisplayFactoryManagerDetails = () => {
  const {values}: any = useFormikContext();

  let selectedDate = values.ManagerIdentificationExpirationDate;
  const showManager = useMemo(() => {
    const isTrue =
      (values.LegalEntity?.isManager === 'Y' &&
        values.LegalEntity?.showDoYouHaveManager === 'N') ||
      (values.LegalEntity?.showDoYouHaveManager === 'Y' &&
        values.DoYouHaveManager?.value) ||
      Object.keys(values.LegalEntity || {}).length === 0;
    return isTrue;
  }, [values.LegalEntity, values.DoYouHaveManager]);

  return (
    <>
      {showManager && (
        <View>
          <StepIndicator
            stepNumber={2}
            stepName={
              values.LegalEntity?.MnagerLabel || t('FactoryManagerData')
            }
            style={{marginBottom: 0 * BW()}}
          />

          <>
            <ReadOnlyRow
              label={t('IL.FD.Representative')}
              value={values.FactoryManagerName}
            />
            <ReadOnlyRow
              label={t('Nationality')}
              value={values.Nationality?.label}
            />
            <ReadOnlyRow
              label={t('IL.Mobile_Phone')}
              value={values.MobileNumber}
            />
            <ReadOnlyRow
              label={t('EmailAddress')}
              value={values.EmailAddress}
            />
            <ReadOnlyRow
              label={t('Gender')}
              value={values.ManagerGender?.label}
            />
            <ReadOnlyRow
              label={t('IL.IdExpirationDate')}
              value={
                selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : ''
              }
            />
            <ReadOnlyRow
              label={t('IL.IdNumber')}
              value={values.ManagerIdentificationNumber}
            />
            <AttachmentRow
              label={t('IL.IdCopy')}
              files={values.ManagerIdentificationCopy || []}
            />
          </>
        </View>
      )}
    </>
  );
};
