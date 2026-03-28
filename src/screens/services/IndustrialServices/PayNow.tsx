import {useTheme} from '@react-navigation/native';
import Button from '../../../component/Button';
import {isArabic} from '../../../locales';
import {BW} from '../../../style/theme';
import {t} from 'i18next';
import {_openModal} from '../Eservices/ServiceForm';
import Text from '../../../component/Text';
import NavigationService from '../../../navigation/NavigationService';
import {baseILSsoUrl, baseILUrl} from '../../../redux/network/api_ILServices';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {startPayment} from '../../../redux/reducers/I-Services/thunk/payment';
import {useState} from 'react';

const PayNow = ({applicationDetails, style, styleText}: any) => {
  const dispatch = useAppDispatch();
  const userid = useAppSelector(store => store.userILData.userId);
  const [isLoading, setIsLoading] = useState(false);
  const {colors}: any = useTheme();

  const _startPayment = () => {
    setIsLoading(true);
    const payload = {
      userId: userid,
      ApplicationId: applicationDetails?.Id,
    };
    dispatch(startPayment(payload)).then(res => {
      setIsLoading(false);
      if (
        res?.meta?.requestStatus == 'fulfilled' &&
        res?.payload?.Data?.success &&
        res.payload?.Data?.paymentUrl
      ) {
        NavigationService.navigate('WebViewScreen', {
          url: res.payload.Data.paymentUrl,
          hideDrawer: true,

          setInternalUrl: (url: string) => {
            if (url.startsWith(baseILUrl) || url.startsWith(baseILSsoUrl)) {
              const checkoutId = res.payload.Data.checkoutId;
              NavigationService.replace('PaymentDetails', {
                checkoutId: checkoutId,
                applicationDetails: applicationDetails,
              });
            }
          },
        });
      } else
        _openModal(
          dispatch,
          false,
          false,
          false,
          <Text h4 style={{color: colors.red}}>
            {res?.payload?.Data?.message}
          </Text>,
        );
    });
  };

  return (
    <Button
      antDesign={isArabic() ? 'arrowleft' : 'arrowright'}
      antDesignColor={styleText ? styleText.color : colors.secondaryColor}
      antDesignSize={15 * BW()}
      medium
      title={t('IL.PayNow')}
      styleText={{color: colors.secondaryColor, ...styleText}}
      onPress={_startPayment}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        height: 28 * BW(),
        padding: 0,
        ...style,
      }}
      loading={isLoading}
      loadingColor={styleText ? styleText.color : colors.secondaryColor}
    />
  );
};
export default PayNow;
