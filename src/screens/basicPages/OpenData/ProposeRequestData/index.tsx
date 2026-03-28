import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import Page from '../../../../component/Page';
import PageBg from '../../../../component/PageBg';
import Header from '../../../../component/Header';
import Text from '../../../../component/Text';
import Input from '../../../../component/input/Input';
import Button from '../../../../component/Button';
import {BW} from '../../../../style/theme';
import {proposeOrRequestData} from '../../../../redux/reducers/OpenData/thunk/openData';
import {useAppDispatch} from '../../../../redux/store';

interface ValuesType {
  fullName: any;
  email: any;
  contactNumber: any;
  subject: any;
  message: any;
  type: any;
  category: any;
}

export default function ProposeOrRequestData(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    type: '',
    category: '',
    fullName: '',
    email: '',
    contactNumber: '',
    subject: '',
    message: '',
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string().required(t('Required')),
    category: Yup.string().required(t('Required')),
    fullName: Yup.string().required(t('Required')),
    email: Yup.string().email(t('ValidationEmail')).required(t('Required')),
    contactNumber: Yup.string().required(t('Required')),
    subject: Yup.string().required(t('Required')),
    message: Yup.string().required(t('Required')),
  });
  const dispatch = useAppDispatch();
  const _submit = (values: ValuesType) => {
    setIsLoading(true);

    const params = {
      type: values.type,
      category: values.category,
      email: values?.email,
      contactNumber: values?.contactNumber,
      fullName: values?.fullName,
      subject: values?.subject,
      text: values?.message,
      attachments: [],
    };

    dispatch(proposeOrRequestData(params)).then(res => {
      if (res.payload.networkSuccess) {
      }
      Alert.alert(res.payload?.message || t('IL.ErrorGeneral'));
      setIsLoading(false);
    });
  };

  return (
    <PageBg>
      <Page
        withStatusBar
        ttsScopeId="ProposeOrRequest-scope"
        styles={{padding: 16}}
        header={
          <Header
            titleContainerStyle={{flex: 8}}
            title={t('OpenDataObj.ProposeOrRequest')}
            hideDrawer
          />
        }
        withHeader
        withOutScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text h4>{t('OpenDataObj.Description')}</Text>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={_submit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <View>
                <Input
                  dropdown
                  requiredStar
                  label={t('OpenDataObj.Type')}
                  value={values.type}
                  items={[
                    {
                      label: t('OpenDataObj.ProposeData'),
                      value: 'ProposeData',
                    },
                    {
                      label: t('OpenDataObj.RequestData'),
                      value: 'RequestData',
                    },
                  ]}
                  onChange={(item: any) => handleChange('type')(item.value)}
                  error={touched.type && errors.type}
                />

                <Input
                  dropdown
                  requiredStar
                  label={t('OpenDataObj.Category')}
                  value={values.category}
                  items={[
                    {
                      label: t('OpenDataObj.IndustryData'),
                      value: 'IndustryData',
                    },
                    {
                      label: t('OpenDataObj.ConformityData'),
                      value: 'ConformityStandardizationData',
                    },
                    {
                      label: t('OpenDataObj.Standards'),
                      value: 'Standards',
                    },
                    {
                      label: t('OpenDataObj.Accreditation'),
                      value: 'Accreditation',
                    },
                    {
                      label: t('OpenDataObj.TechnologyData'),
                      value: 'TechnologyData',
                    },
                    {
                      label: t('OpenDataObj.OtherData'),
                      value: 'OtherData',
                    },
                  ]}
                  onChange={(item: any) => handleChange('category')(item.value)}
                  error={touched.category && errors.category}
                />

                <Input
                  textInput
                  requiredStar
                  label={t('OpenDataObj.FullName')}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  error={touched.fullName && errors.fullName}
                />

                <Input
                  textInput
                  requiredStar
                  label={t('OpenDataObj.Email')}
                  value={values.email}
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                />

                <Input
                  textInput
                  requiredStar
                  label={t('OpenDataObj.ContactNumber')}
                  value={values.contactNumber}
                  keyboardType="phone-pad"
                  onChangeText={handleChange('contactNumber')}
                  onBlur={handleBlur('contactNumber')}
                  error={touched.contactNumber && errors.contactNumber}
                />

                <Input
                  textInput
                  requiredStar
                  label={t('OpenDataObj.Subject')}
                  value={values.subject}
                  onChangeText={handleChange('subject')}
                  onBlur={handleBlur('subject')}
                  error={touched.subject && errors.subject}
                />

                <Input
                  textInput
                  requiredStar
                  label={t('OpenDataObj.Message')}
                  value={values.message}
                  multiline
                  numberOfLines={4}
                  styleInput={{minHeight: 100 * BW()}}
                  onChangeText={handleChange('message')}
                  onBlur={handleBlur('message')}
                  error={touched.message && errors.message}
                />

                <Button
                  onPress={handleSubmit}
                  title={t('OpenDataObj.Submit')}
                  style={styles.submit}
                  styleText={{color: colors.mainWhite}}
                  loading={isLoading}
                  loadingColor={colors?.mainWhite}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    section: {
      marginBottom: 8 * BW(),
    },

    submit: {
      marginVertical: 20 * BW(),
      backgroundColor: colors.secondaryColor,
      minHeight: 40 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      padding: 0 * BW(),
    },
  });
