import React, {useState} from 'react';
import {View} from 'react-native';
import Input from '../../../../../component/input/Input';
import {t} from 'i18next';
import Text from '../../../../../component/Text';
import {useDisabled} from './DisabledContext';

interface TermsAndConditionsProps {
  importantNote?: boolean;
  setCheck?: any;
}
const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  importantNote,
  setCheck,
}) => {
  const {isDisabled} = useDisabled();
  const [checked, setChecked] = useState(isDisabled('TermsAndConditions'));
  return (
    <View>
      <Text h3>{t('termsIssuePricePreferenceCertificate')}</Text>
      {importantNote && <Text h3>{t('importantNote')}</Text>}

      <Input
        checkbox
        title={t('AgreeWithTermsConditions')}
        onPress={() => {
          setCheck(!checked);
          setChecked(!checked);
        }}
        viewStyle={{marginTop: 0}}
        checked={checked}
        disabled={isDisabled('TermsAndConditions')}
      />
    </View>
  );
};

export default TermsAndConditions;
