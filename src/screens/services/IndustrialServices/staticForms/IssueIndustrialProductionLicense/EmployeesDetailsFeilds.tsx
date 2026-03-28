import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import Input from '../../../../../component/input/Input';
import {t} from 'i18next';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import {BW} from '../../../../../style/theme';
import {ReadOnlyRow} from '../ReusableComponents';

const EmployeesDetailsFeilds = () => {
  const {values, setFieldValue}: any = useFormikContext();
  useEffect(() => {
    if (values.Employees.length > 0) {
      const gulfCountries = ['AE', 'SA', 'KW', 'QA', 'OM', 'BH'];

      let citizenEmpSum = 0,
        gulfEmpSum = 0,
        foreignEmpSum = 0;
      values.Employees?.map((emp: any) => {
        if (emp.nationality.Value == 'AE')
          citizenEmpSum += Number(emp.numberofEmployees);
        else if (gulfCountries.includes(emp.nationality.Value))
          gulfEmpSum += Number(emp.numberofEmployees);
        else foreignEmpSum += Number(emp.numberofEmployees);
      });
      setFieldValue('numberofEmployeesLocal', citizenEmpSum);
      setFieldValue('numberofEmployeesGCC', gulfEmpSum);
      setFieldValue('numberofEmployeesForeign', foreignEmpSum);
      setFieldValue(
        'totalNumberofEmployees',
        citizenEmpSum + gulfEmpSum + foreignEmpSum,
      );
    }
  }, [values.Employees]);
  return (
    <View style={{}}>
      <ReadOnlyRow
        label={t('numberofEmployeesLocal')}
        value={values.numberofEmployeesLocal}
      />

      <ReadOnlyRow
        label={t('numberofEmployeesGCC')}
        value={values.numberofEmployeesGCC}
      />

      <ReadOnlyRow
        label={t('numberofEmployeesForeign')}
        value={values.numberofEmployeesForeign}
      />

      <ReadOnlyRow
        label={t('totalNumberofEmployees')}
        value={values.totalNumberofEmployees}
      />
    </View>
  );
};

export default EmployeesDetailsFeilds;
