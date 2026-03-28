import React, {useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';
import reactotron from 'reactotron-react-native';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';
import {Header, Input} from 'react-native-elements';
import Text from '../../../../../component/Text';
import Page from '../../../../../component/Page';
import {BW, BH} from '../../../../../style/theme';
import DateField from '../../../Eservices/DynamicForm/Fields/DateField';
import SelectField from '../../../Eservices/DynamicForm/Fields/SelectField';
import {isArabic} from '../../../../../locales';
import countryOrigin from '../../countryOrigin';
const ProofOfPurchase = () => {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  type FormField = {
    name: string;
    label: string;
    type: 'text' | 'bigText';
  };
  const fields = [
    {
      name: 'commercialInvoiceNumber',
      label: t('commercialInvoiceNumber'),
      type: 'text',
    },
    {name: 'invoiceDate', label: t('invoiceDate'), type: 'date'},
    {
      name: 'countryOfOrigin',
      label: t('countryOfOrigin'),
      type: 'country',
      entityFieldId: 'countryOfOrigin',
    },
    {
      name: 'localGulfOriginForeign',
      label: t('localGulfOriginForeign'),
      type: 'text',
    },
  ];
  type TextFieldNames = (typeof fields)[number]['name'];

  type FormValues = {
    [key in TextFieldNames]: string;
  };

  const validationSchema = Yup.object(
    Object.fromEntries(
      fields.map(field => {
        if (field.type === 'date') {
          return [
            field.name,
            Yup.mixed().test(t('Required'), value => {
              if (typeof value === 'string') return value.trim() !== '';
              if (typeof value === 'object' && value?.value)
                return String(value.value).trim() !== '';
              return false;
            }),
          ];
        }

        return [
          field.name,
          Yup.string()
            .transform((value, originalValue) => {
              return originalValue?.trim() === '' ? null : value;
            })
            .nullable()
            .required(t('Required')),
        ];
      }),
    ),
  );
  const initialValues: FormValues = {
    ...(Object.fromEntries(fields.map(f => [f.name, ''])) as Record<
      TextFieldNames,
      string
    >),
  };
  const countryOptions = countryOrigin.map(c => ({
    label: isArabic ? c.ar : c.en,
    value: c.value,
  }));
  return (
    <Formik<FormValues>
      initialValues={{theOwnerOfTheTender: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {}}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View>
          <StepIndicator
            stepNumber={1}
            stepName={t('proofOfPurchase')}
            style={{marginBottom: 0 * BW(), marginTop: 8 * BW()}}
          />
          {fields.map(field => {
            const isBigText = field.type === 'bigText';
            const isDate = field.type === 'date';
            const isCountry = field.type === 'country';
            return (
              <View key={field.name} style={{marginBottom: 16}}>
                {isDate ? (
                  <DateField
                    formData={values}
                    title={field.label}
                    field={field.name}
                    handleChange={(name, val) => setFieldValue(name, val.value)}
                    formValues={values}
                    requiredFields={{[field.name]: true}}
                    errors={errors}
                    isDisabled={false}
                    validations={{}}
                  />
                ) : isCountry ? (
                  <SelectField
                    formData={values}
                    title={field.label}
                    field={field}
                    handleChange={handleChange}
                    formValues={values}
                    requiredFields={{[field.name]: true}}
                    errors={errors}
                    isDisabled={false}
                    validations={{}}
                    optionsMap={{countryOfOrigin: countryOptions}}
                    setOptionsMap={() => {}}
                    validateOnMount={false}
                  />
                ) : (
                  <Input
                    label={field.label}
                    value={values[field.name]}
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    viewStyle={{width: '100%'}}
                    textInput
                    required
                    requiredStar
                    multiline={isBigText}
                    style={{
                      minHeight: isBigText ? 60 * BW() : undefined,
                      borderRadius: 8,
                      backgroundColor: colors.white,
                    }}
                  />
                )}

                {touched[field.name] && errors[field.name] && (
                  <Text h5 style={{color: 'red'}}>
                    {errors[field.name]}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      )}
    </Formik>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },
    btn: {
      backgroundColor: '#5fb634',
      height: 50 * BH(),
      marginTop: 10 * BW(),
    },
    buttonSubmit: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.secondaryColor,
      backgroundColor: colors.secondaryColor,
      borderWidth: 1 * BW(),
      minWidth: '49%',
      padding: 8 * BW(),
      marginTop: 6 * BW(),
      minHeight: 40 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSubmitDisable: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.secondaryColor + '22',
      backgroundColor: colors.secondaryColor + '22',
      borderWidth: 1 * BW(),
      minWidth: '49%',
      padding: 8 * BW(),
      marginTop: 6 * BW(),
      opacity: 0.6,
    },
  });

export default ProofOfPurchase;
