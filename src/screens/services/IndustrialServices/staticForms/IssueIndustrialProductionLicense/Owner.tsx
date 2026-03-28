import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ReadOnlyRow, AttachmentRow} from '../ReusableComponents';

interface Props {
  values: any;
}

export const OwnerPerson = ({values}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={{}}>
      <ReadOnlyRow label={t('PersonNameEnglish')} value={values.PersonName} />
      <ReadOnlyRow
        label={t('PersonNameArabic')}
        value={values.PersonNameArabic}
      />
      <ReadOnlyRow label={t('Nationality')} value={values.Nationality.label} />
      <ReadOnlyRow label={t('EmiratesID')} value={values.PersonEmiratesID} />
      <ReadOnlyRow
        label={t('SharePercentage')}
        value={values.PersonPercentage}
      />
      <ReadOnlyRow
        label={t('ContributionAmount')}
        value={values.PersonContributionAmount}
      />
      <ReadOnlyRow
        label={t('Gender')}
        value={values.OwnerGender?.label || values.OwnerGender}
      />

      <AttachmentRow
        label={t('EmiratesIDCopy')}
        files={values.PersonEmiratesIdAttachment || []}
      />
      <AttachmentRow
        label={t('PassportCopy')}
        files={values.PersonPassportAttachment || []}
      />
      <AttachmentRow
        label={t('VisaForExpats')}
        files={values.PersonVisaExpatsAttachment || []}
      />
    </View>
  );
};

export const OwnerCompany = ({values}: Props) => {
  const {t} = useTranslation();

  return (
    <View>
      <ReadOnlyRow label={t('CompanyNameEnglish')} value={values.CompanyName} />
      <ReadOnlyRow
        label={t('CompanyNameArabic')}
        value={values.CompanyNameArabic}
      />
      <ReadOnlyRow
        label={t('CompanyNationality')}
        value={values.Nationality?.label}
      />
      <ReadOnlyRow
        label={t('CompanyLocalLicenseNumber')}
        value={values.CompanyLocalLicenseNumber}
      />
      <ReadOnlyRow
        label={t('SharePercentage')}
        value={values.CompanyPercentage}
      />
      <ReadOnlyRow
        label={t('ContributionAmount')}
        value={values.CompanyContributionAmount}
      />

      <AttachmentRow
        label={t('CompanyLocalLicenseAttachment')}
        files={values.CompanyLocalLicenseAttachment || []}
      />
      <AttachmentRow
        label={t('CompanyEstablishmentContractAttachment')}
        files={values.CompanyEstablishmentContractAttachment || []}
      />
    </View>
  );
};
