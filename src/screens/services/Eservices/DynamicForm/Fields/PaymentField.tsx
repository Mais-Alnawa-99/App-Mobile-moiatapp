import React, {useState, useEffect, Fragment, useRef} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../../../style/theme';
import Text from '../../../../../component/Text';
import {useAppDispatch} from '../../../../../redux/store';
import {getApplicationPaymentFee} from '../../../../../redux/reducers/E-Services/thunk/payments';
import {isArabic} from '../../../../../locales';

const PaymentField = ({
  service,
  formData,
  profId,
  formValues,
  generateDataFromFormValues,
  applicationId,
  field,
  handleChange,
  title,
}: any) => {
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const [serviceFees, setServiceFees] = useState([]);
  const [serviceFeesFieldId, setServiceFeesFieldId] = useState(null);

  const dispatch = useAppDispatch();
  const prevFormValuesRef = useRef<any>(formValues);

  // Service Fees
  useEffect(() => {
    const feesField = formData
      .flatMap((form: any) => form?.formSection)
      .flatMap((section: any) => section?.formSectionFields)
      .find((field: any) => field?.formSectionFieldTypeName === 'Payments');

    if (feesField) {
      setServiceFeesFieldId(feesField.entityFieldId);
    }
  }, [formData]);

  const fetchServiceFees = () => {
    if (!serviceFeesFieldId) return;

    try {
      let body = {
        ApplicationId: applicationId,
        EntityFieldId: serviceFeesFieldId,
        CurrentApplicationStageId: service.stageId,
        Data: JSON.stringify(generateDataFromFormValues(formValues, formData)),
        ProfileRecordId: profId,
      };

      dispatch(getApplicationPaymentFee(body)).then(res => {
        if (res.meta.requestStatus === 'fulfilled' && res.payload) {
          if (res.payload.paymentsDetail != null) {
            const parsedPayments = JSON.parse(res.payload.paymentsDetail);

            const transformed = parsedPayments?.flatMap((payment: any) =>
              payment?.PaymentDetails.map((item: any) => ({
                ServiceCode: item.ServiceCode,
                Amount: item.Amount,
                Quantity: item.Quantity,
                PaymentId: payment?.PaymentId,
                Paid: payment?.Paid,
                PaymentDetailId: item.PaymentDetailId,
                Notes: item.Notes,
              })),
            );

            const currentValue = formValues?.[field?.entityFieldId]?.value;
            const newValue = JSON.stringify(transformed);

            if (currentValue !== newValue) {
              handleChange(field?.entityFieldId, newValue, field);
            }

            setServiceFees(parsedPayments || []);
          } else {
            handleChange(field?.entityFieldId, '', field);
            setServiceFees([]);
          }
        }
      });
    } catch (error) {}
  };
  const paymentFieldId = field?.entityFieldId;

  const debounceTimer = useRef<any>(null);
  const [debouncedFormValues, setDebouncedFormValues] = useState(formValues);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      setDebouncedFormValues(formValues);
    }, 2000);
  }, [formValues]);

  useEffect(() => {
    if (!serviceFeesFieldId) return;

    const prevFormValues = prevFormValuesRef.current;
    const hasChanged = Object.keys(debouncedFormValues).some(key => {
      if (key === String(paymentFieldId)) return false;
      return (
        JSON.stringify(debouncedFormValues[key]) !==
        JSON.stringify(prevFormValues[key])
      );
    });

    if (hasChanged) {
      fetchServiceFees();
      prevFormValuesRef.current = debouncedFormValues;
    }
  }, [debouncedFormValues, serviceFeesFieldId]);

  const {t} = useTranslation();
  return (
    <View>
      {/* <Text h3 bold>
        {title}
      </Text> */}
      {serviceFees.length > 0 ? (
        serviceFees.map((payment: any, index): any => (
          <View key={index}>
            <View
              style={{
                backgroundColor: payment?.Paid ? colors.green : colors.red,
                padding: 8 * BW(),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4 * BW(),
                position: 'absolute',
                top: -40 * BW(),
                right: 0,
                paddingHorizontal: 16 * BW(),
              }}>
              <Text h4 medium style={{color: colors.mainWhite}}>
                {payment?.Paid
                  ? t('Labels.PaymentPaid')
                  : t('Labels.PaymentNotPaid')}
              </Text>
            </View>

            {payment.PaymentDetails.map((fee: any, index: any) => (
              <View key={index} style={style.paymentContainer}>
                {fee?.ServiceCodedescription != undefined && (
                  <>
                    {!isArabic() ? (
                      <Text h4 bold>
                        {
                          fee?.ServiceCodedescription[0]
                            ?.ServiceDescriptionInEnglish
                        }
                      </Text>
                    ) : (
                      <Text h4 bold>
                        {
                          fee?.ServiceCodedescription[0]
                            ?.ServiceDescriptionInArabic
                        }
                      </Text>
                    )}
                  </>
                )}
                <Text h4>
                  {t('ServiceCode')}: {fee?.ServiceCode}
                </Text>

                <Text h4>
                  {t('Amount')}: {fee?.Amount} {t('AED')}
                </Text>
                <Text h4>
                  {t('Quantity')}: {fee?.Quantity}
                </Text>
                <Text h4>
                  {t('ServiceTotalAmount')}: {fee?.SubTotal} {t('AED')}
                </Text>
              </View>
            ))}
          </View>
        ))
      ) : (
        <Text h4>{t('NoFeesAvailable')}</Text>
      )}

      {serviceFees.length > 0 && (
        <View style={style.paymentContainer}>
          <Text h4 bold>
            {t('TotalAmount')}:
          </Text>
          <Text h3>
            {serviceFees.reduce((total, payment: any) => {
              const subTotal = payment.PaymentDetails.reduce(
                (sum: number, fee: any) => sum + (fee?.SubTotal || 0),
                0,
              );
              return total + subTotal;
            }, 0)}{' '}
            {t('AED')}
          </Text>
        </View>
      )}
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    paymentContainer: {
      marginTop: 8 * BW(),
      padding: 8 * BW(),
      borderWidth: 0.6 * BW(),
      borderColor: colors.border,
      borderRadius: 4 * BW(),
      backgroundColor: colors.white + '77',
    },
  });

export default PaymentField;
