import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, TextInput, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import reactotron from 'reactotron-react-native';
import StepIndicator from '../../../Eservices/DynamicForm/StepIndicator';

import Text from '../../../../../component/Text';
import Page from '../../../../../component/Page';
import { BW, BH } from '../../../../../style/theme';
import ProofOfPurchase from './ProofOfPurchase';
import Header from '../../../../../component/Header';

const RequestRegistrationOfIndustrialInputForCustomsDutyExemption = () => {
  const { t } = useTranslation();
  const { colors }: any = useTheme();
  const styles = getStyle(colors);
    return (
    <View style={styles.container}>
      <ImageBackground
        source={colors.mainBackgroundImg}
        style={{
          height: '100%',
          width: '100%',
        }}>
        <Page
          withStatusBar
          styles={{
            padding: 8 * BW(),
            paddingTop: 16 * BW(),
          }}
          contentContainerStyle={{
            gap: 16 * BW(),
          }}
          header={<Header title={t('')} hideBack hideDrawer showBackDrawer />}
          withHeader>
          <ProofOfPurchase/>
        </Page>
      </ImageBackground>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },
    btn: {
      backgroundColor: '#5fb634',
      height: 50 * BH(),
      marginTop: 10 * BW()
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

export default RequestRegistrationOfIndustrialInputForCustomsDutyExemption;
