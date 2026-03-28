import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import Page from '../../../../../component/Page';
import PageBg from '../../../../../component/PageBg';
import Header from '../../../../../component/Header';
import Text from '../../../../../component/Text';
import Input from '../../../../../component/input/Input';
import Button from '../../../../../component/Button';
import Loader from '../../../../../component/Loader';
import {BW} from '../../../../../style/theme';
import {exitConfirm} from '../../../../WebViewScreen';
import {useAppDispatch} from '../../../../../redux/store';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';

interface FormValues {
  theOwnerOfTheTender: string;
  nameOfTheProject: string;
  tenderNumber: string;
  subjectOfTheTender: string;
  acceptTerms: boolean;
}

export default function PricePreference(props: any): JSX.Element {
  const params = props.route.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    theOwnerOfTheTender: '',
    nameOfTheProject: '',
    tenderNumber: '',
    subjectOfTheTender: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    theOwnerOfTheTender: Yup.string().required(t('Required')),
    nameOfTheProject: Yup.string().required(t('Required')),
    tenderNumber: Yup.string().required(t('Required')),
    subjectOfTheTender: Yup.string().required(t('Required')),
    acceptTerms: Yup.bool().oneOf([true], t('IL.ILC.mustAgreeToTerms')),
  });

  const onSubmit = (values: FormValues) => {};

  return (
    <PageBg>
      <Page
        withStatusBar
        styles={{padding: 8 * BW()}}
        hideBottomTab
        header={
          <Header
            title={params?.service?.name || t('IL.PricePreference.Title')}
            hideDrawer
            onPress={() => {
              exitConfirm(dispatch, t);
            }}
            titleContainerStyle={{flex: 8}}
          />
        }
        withHeader>
        <Loader>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={onSubmit}>
            {({handleSubmit, values, setFieldValue, errors, touched}) => (
              <ScrollView keyboardShouldPersistTaps="handled">
                <StepIndicator
                  stepNumber={1}
                  stepName={t('requestDetails')}
                  style={{marginBottom: 0 * BW(), marginTop: 8 * BW()}}
                />

                <Input
                  textInput
                  label={t('IL.PricePreference.Bidder')}
                  value={values.theOwnerOfTheTender}
                  onChangeText={(text: any) =>
                    setFieldValue('theOwnerOfTheTender', text)
                  }
                  requiredStar
                  error={
                    touched.theOwnerOfTheTender && errors.theOwnerOfTheTender
                  }
                  required={
                    touched.theOwnerOfTheTender && errors.theOwnerOfTheTender
                  }
                />
                <Input
                  textInput
                  label={t('IL.PricePreference.ProjectName')}
                  value={values.nameOfTheProject}
                  onChangeText={(text: any) =>
                    setFieldValue('nameOfTheProject', text)
                  }
                  requiredStar
                  error={touched.nameOfTheProject && errors.nameOfTheProject}
                  required={touched.nameOfTheProject && errors.nameOfTheProject}
                />
                <Input
                  textInput
                  label={t('IL.PricePreference.TenderNumber')}
                  value={values.tenderNumber}
                  onChangeText={(text: any) =>
                    setFieldValue('tenderNumber', text)
                  }
                  requiredStar
                  error={touched.tenderNumber && errors.tenderNumber}
                  required={touched.tenderNumber && errors.tenderNumber}
                />
                <Input
                  textInput
                  label={t('IL.PricePreference.TenderSubject')}
                  value={values.subjectOfTheTender}
                  onChangeText={(text: any) =>
                    setFieldValue('subjectOfTheTender', text)
                  }
                  error={
                    touched.subjectOfTheTender && errors.subjectOfTheTender
                  }
                  required={
                    touched.subjectOfTheTender && errors.subjectOfTheTender
                  }
                  requiredStar
                  multiline
                  styleInput={{minHeight: 100 * BW()}}
                />

                <Text h4 style={{marginTop: 16 * BW()}}>
                  {t('IL.TermsAndConditionsNote')}
                </Text>
                <Input
                  checkbox
                  title={t('IL.ILC.AgreeToTerms')}
                  requiredStar
                  checked={values.acceptTerms}
                  onPress={() =>
                    setFieldValue('acceptTerms', !values.acceptTerms)
                  }
                  error={touched.acceptTerms && errors.acceptTerms}
                />

                <Button
                  title={t('IL.ActionOk')}
                  style={style.btn}
                  onPress={handleSubmit}
                  styleText={{color: colors.mainWhite}}
                />
              </ScrollView>
            )}
          </Formik>
        </Loader>
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    btn: {
      backgroundColor: colors?.secondaryColor,
      width: 'auto',
      height: 'auto',
      minHeight: 45 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30 * BW(),
    },
  });
