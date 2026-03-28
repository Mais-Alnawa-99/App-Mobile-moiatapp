import React, {useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import Text from '../../../component/Text';
import Input from '../../../component/input/Input';
import Button from '../../../component/Button';
import {BW} from '../../../style/theme';
import Loader from '../../../component/Loader';
import PageBg from '../../../component/PageBg';
import Page from '../../../component/Page';
import Header from '../../../component/Header';
import {isArabic} from '../../../locales';
import {contactMinister} from '../../../redux/reducers/Help/thunk/thunk';
import {useAppDispatch} from '../../../redux/store';

interface ValuesType {
  fullName: any;
  email: any;
  contactNumber: any;
  subject: any;
  message: any;
}

export default function ContactMinister(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const initialValues = {
    fullName: '',
    contactNumber: '',
    email: '',
    subject: '',
    message: '',
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(t('Required')),
    contactNumber: Yup.string().required(t('Required')),
    email: Yup.string().email(t('ValidationEmail')).required(t('Required')),
    subject: Yup.string().required(t('Required')),
    message: Yup.string().required(t('Required')),
  });

  const _submit = (values: ValuesType) => {
    setIsLoading(true);

    const params = {
      type: 0,
      category: 0,
      email: values?.email,
      contactNumber: values?.contactNumber,
      fullName: values?.fullName,
      subject: values?.subject,
      text: values?.message,
      attachments: [],
    };

    dispatch(contactMinister(params)).then(res => {
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
        styles={{padding: 8 * BW()}}
        ttsScopeId="ContactMinister-scope"
        header={<Header title={t('ContactMinister')} />}
        withHeader>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              borderRadius: 8 * BW(),
              overflow: 'hidden',
              width: '100%',
              height: 420 * BW(),
              marginBottom: 6 * BW(),
            }}>
            <Image
              resizeMode="cover"
              source={require('../../../assets/our-leadership-image.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
            />
          </View>
          {isArabic() ? (
            <>
              <Text h2 bold>
                الدكتور سلطان بن أحمد الجابر
              </Text>
              <Text h3>وزير الصناعة والتكنولوجيا المتقدمة</Text>
            </>
          ) : (
            <>
              <Text h3 bold>
                His Excellency Dr. Sultan bin Ahmed Al Jaber
              </Text>
              <Text h3>UAE Minister of Industry and Advanced Technology</Text>
            </>
          )}
        </View>
        <Text h3 bold style={styles.title}>
          {t('ContactMinisterPage.ContactMinister')}
        </Text>
        <Text h4 style={styles.subtitle}>
          {t('ContactMinisterPage.ContactMinisterSubtitle')}
        </Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={_submit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <Input
                medium
                label={t('FullName')}
                placeholder={t('FullName')}
                textInput
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                error={touched.fullName && errors.fullName}
                requiredStar
              />
              <Input
                medium
                label={t('ContactNumber')}
                placeholder={t('ContactNumber')}
                textInput
                value={values.contactNumber}
                onChangeText={handleChange('contactNumber')}
                onBlur={handleBlur('contactNumber')}
                error={touched.contactNumber && errors.contactNumber}
                requiredStar
              />
              <Input
                medium
                label={t('EmailAddress')}
                placeholder={t('EmailAddress')}
                textInput
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                requiredStar
              />
              <Input
                medium
                label={t('Subject')}
                placeholder={t('Subject')}
                textInput
                value={values.subject}
                onChangeText={handleChange('subject')}
                onBlur={handleBlur('subject')}
                error={touched.subject && errors.subject}
                requiredStar
              />
              <Input
                medium
                label={t('Message')}
                placeholder={t('Message')}
                textInput
                value={values.message}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                error={touched.message && errors.message}
                requiredStar
                multiline
                numberOfLines={4}
                styleInput={{minHeight: 100 * BW()}}
              />
              <Button
                onPress={handleSubmit}
                title={t('Submit')}
                h3
                medium
                style={styles.submit}
                styleText={{color: colors.mainWhite}}
                loading={isLoading}
                loadingColor={colors?.mainWhite}
              />
            </View>
          )}
        </Formik>
      </Page>
    </PageBg>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {},
    title: {
      marginTop: 16 * BW(),
    },
    subtitle: {
      color: colors.textColor,
      marginBottom: 8 * BW(),
    },

    submit: {
      marginTop: 20 * BW(),
      backgroundColor: colors.secondaryColor,
      minHeight: 40 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      padding: 0 * BW(),
    },
  });
