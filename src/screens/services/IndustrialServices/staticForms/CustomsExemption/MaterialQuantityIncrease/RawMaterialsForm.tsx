import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';

import Input from '../../../../../../component/input/Input';
import Button from '../../../../../../component/Button';
import {BH, BW} from '../../../../../../style/theme';
import {useTheme} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';
import HsCodes from '../../HsCode';
import Text from '../../../../../../component/Text';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/store';
import {GetHsCodeFactoriesAndDetails} from '../../../../../../redux/reducers/I-Services/thunk/HSCodes';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

const getRawMaterialsSchema = (t: any) =>
  Yup.object().shape({
    HSCodeId: Yup.object()
      .test(
        'has-keys',
        t('Required'),
        value => value && Object.keys(value).length > 0,
      )
      .required(t('Required')),

    ExtraRequiredWeight: Yup.number()
      .typeError(t('NumericOnly'))
      .positive(t('NumericOnly'))
      .required(t('IL.RequestedQuantity')),
    // .test('check-weight', t('IL.Help_ExtraRequiredWeight'), function (value) {
    //         const {ReservedQuantity, RemainingWeight} = this.parent;

    //         const extra = Number(value);
    //         const reserved = Number(ReservedQuantity);
    //         const remaining = Number(RemainingWeight);

    //         return extra + reserved < remaining;
    //       }),
    ReasonsofMaterialIncrement: Yup.string().required(
      t('IL.ReasonsofMaterialIncrementRequired'),
    ),
  });

const MaterialForm = (props: any) => {
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormikContext();
  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const dispatch = useAppDispatch();
  const [newMaterials, setNewMaterials] = useState(values.NewMaterials);
  const [totalValue, setTotalValue] = useState('');
  const {userILData} = useAppSelector(state => state.userILData);
  const {t} = useTranslation();
  const validationSchema = useMemo(() => getRawMaterialsSchema(t), [t]);

  return (
    <Formik
      initialValues={props.initials}
      validationSchema={validationSchema}
      onSubmit={values => {
        let myNewMaterial = [];

        if (values.index == null) {
          myNewMaterial = [...newMaterials, values];
        } else {
          myNewMaterial = [...newMaterials];
          myNewMaterial[values.index] = values;
        }
        setNewMaterials(myNewMaterial);
        setFieldValue('NewMaterials', myNewMaterial);

        props.closeForm();
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => {
        useEffect(() => {
          if (values?.HSCodeId?.Id) {
            dispatch(
              GetHsCodeFactoriesAndDetails({
                licenseId: userILData?.Id,
                HscodeId: values.HSCodeId.Id,
              }),
            ).then(res => {
              if (res.payload?.networkSuccess) {
                const result = res.payload.HSCodeValues;

                setFieldValue('TotalApprovedWeight', result.total.toString());
                setFieldValue('RemainingWeight', result.remaining.toString());
                setFieldValue('ReservedQuantity', result.reserved.toString());
                setFieldValue(
                  'RemainingAvailableWeight',
                  result.available.toString(),
                );
                setFieldValue(
                  'TotalWeightuponApproval',
                  values.TotalApprovedWeight + values.ExtraRequiredWeight,
                );
                setFieldValue(
                  'TotalRemainingWeightuponApproval',
                  values.RemainingWeight + values.ExtraRequiredWeight,
                );
              }
            });
          }
        }, [values.HSCodeId]);
        useEffect(() => {
          const totalWeightuponApproval =
            Number(values.TotalApprovedWeight) +
            Number(values.ExtraRequiredWeight);
          setFieldValue(
            'TotalWeightuponApproval',
            totalWeightuponApproval.toString(),
          );
        }, [values.ExtraRequiredWeight, values.HSCodeId]);
        useEffect(() => {
          const totalRemainingWeightuponApproval =
            Number(values.RemainingWeight) + Number(values.ExtraRequiredWeight);
          setFieldValue(
            'TotalRemainingWeightuponApproval',
            totalRemainingWeightuponApproval.toString(),
          );
        }, [values.ExtraRequiredWeight, values.HSCodeId]);

        return (
          <View>
            <HsCodes
              fieldName={'HSCodeId'}
              title={t('IL.HsCodeLabel')}
              required={true}
              editValue={values.HSCodeId}
              licenseId={userILData?.Id}
              error={touched.HSCodeId && errors.HSCodeId}
            />

            <Text
              h5
              style={{
                color: colors.lightPrimaryTextColor,
              }}>
              {t('IL.Help_RawMaterialsHsCode')}
            </Text>

            <Input
              textInput
              label={t('IL.TotalApprovedWeight')}
              value={values.TotalApprovedWeight}
              disabled
            />
            <Input
              textInput
              label={t('IL.RemainingAvailableWeight')}
              value={values.RemainingAvailableWeight}
              disabled
            />

            <Input
              textInput
              requiredStar={true}
              keyboardType="numeric"
              label={t('IL.ExtraRequiredWeight')}
              value={values.ExtraRequiredWeight}
              onChangeText={(text: any) =>
                setFieldValue('ExtraRequiredWeight', text)
              }
              onBlur={handleBlur('ExtraRequiredWeight')}
              error={touched.ExtraRequiredWeight && errors.ExtraRequiredWeight}
            />

            <Input
              textInput
              label={t('IL.ReservedQuantity')}
              value={values.ReservedQuantity}
              disabled
            />
            <Input
              textInput
              requiredStar={true}
              label={t('IL.ReasonsofMaterialIncrement')}
              value={values.ReasonsofMaterialIncrement}
              onChangeText={(text: any) =>
                setFieldValue('ReasonsofMaterialIncrement', text)
              }
              onBlur={handleBlur('ReasonsofMaterialIncrement')}
              multiline
              numberOfLines={4}
              error={
                touched.ReasonsofMaterialIncrement &&
                errors.ReasonsofMaterialIncrement
              }
            />

            <Input
              textInput
              label={t('IL.TotalWeightuponApproval')}
              value={values.TotalWeightuponApproval}
              disabled
            />
            <Input
              textInput
              label={t('IL.TotalRemainingWeightuponApproval')}
              value={values.TotalRemainingWeightuponApproval}
              disabled
            />
            {Object.entries(errors).length > 0 && (
              <Text h4 style={{color: colors.red, marginTop: 8 * BW()}}>
                {t('IL.ERRORVALID')}
              </Text>
            )}
            <Button
              title={t('Save')}
              onPress={handleSubmit}
              style={{
                backgroundColor: colors.secondaryColor,
                height: 40 * BW(),
                marginVertical: 8 * BW(),
                padding: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              h4
              medium
              styleText={{color: 'white'}}
            />
          </View>
        );
      }}
    </Formik>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    btn: {
      height: 80 * BH(),
      borderRadius: 8 * BW(),
      flexDirection: 'column',
      alignItems: 'center',

      justifyContent: 'space-between',
      overflow: 'hidden',
      padding: 10 * BW(),
    },
    icon: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    containerIcon: {
      width: 30 * BW(),
      height: 30 * BH(),
      alignItems: 'center',
      justifyContent: 'center',
      resizeMode: 'center',
    },
    imgCover: {
      width: '100%',
      height: '100%',
      tintColor: 'rgba(0,0,0,0.3)',
      resizeMode: 'contain',
    },
    logoContainer: {
      width: '100%',
      height: '80%',
      position: 'absolute',
      alignSelf: 'flex-start',
      justifyContent: 'flex-end',
      bottom: 5 * BW(),
      left: 5 * BW(),
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

export default MaterialForm;
