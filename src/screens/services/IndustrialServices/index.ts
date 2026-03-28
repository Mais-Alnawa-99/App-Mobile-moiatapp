/* eslint-disable curly */
import {getTextFromHtml} from '../../../component/Generalfunction';
import {isArabic} from '../../../locales';
import NavigationService from '../../../navigation/NavigationService';
import {setLoadingModal} from '../../../redux/reducers/General/loader';
import {
  canApplyForService,
  getUserFactories,
} from '../../../redux/reducers/I-Services/thunk/profile';
import {setUserILData} from '../../../redux/reducers/User/userILData';
import {store} from '../../../redux/store';
import {_openModal} from '../Eservices/ServiceForm';

export const startILService = async (service: any, screenOption?: any) => {
  const serviceID = String(service.serviceId || service.ServiceId);
  const userData: any = store.getState().userILData.userILData;
  const userId = store.getState().userILData.userId;

  if (userData == null && serviceID !== '10') {
    NavigationService.navigate('SwitchFactories', {actionBack: true});
    return;
  }

  let screen = '';

  switch (serviceID) {
    case '17':
      screen = 'IndustrialLicenseCancellation';
      break;
    // case '15':
    //   screen = 'PricePreference';
    //   break;
    case '11':
      screen = 'CustomsExemptionRegistration';
      break;
    case '12':
      screen = 'MaterialQuantityIncrease';
      break;
    case '13':
      screen = 'DutyExemption';
      break;
    case '25':
      screen = 'DutyExemptionFastTrack';
      break;
    case '19':
      screen = 'RenewalIndustrialProductionLicense';
      break;
    case '10':
      screen = 'IssueIndustrialProductionLicense';
      break;
    case '14':
      screen = 'ValueAddedTaxRequest';
      break;
    case '21':
      screen = 'IssueIndustrialProductionLicense';
      break;
  }
  if (screenOption) {
    screen = screenOption;
  }
  store.dispatch(setLoadingModal(true));
  if (['draft', 'pending'].includes(userData?.LicenseStatusClass)) {
    await store.dispatch(getUserFactories({UserId: userId})).then(res => {
      if (res?.payload?.networkSuccess) {
        if (userData?.Id) {
          let License: any = res?.payload?.result?.Licenses?.find?.(
            (p: any) =>
              p.LocalIndustrialLicenseNumber ===
              userData?.LocalIndustrialLicenseNumber,
          );
          if (!!License)
            store.dispatch(
              setUserILData({
                userILData: License,
              }),
            );
        }
      }
    });
  }
  const userData1: any = store.getState().userILData.userILData;

  if (
    userData1?.LicenseStatusClass &&
    ['draft', 'pending'].includes(userData1?.LicenseStatusClass)
  ) {
    store.dispatch(setLoadingModal(false));

    const isAr = isArabic();

    const msg =
      userData1?.LicenseStatusClass === 'draft'
        ? isAr
          ? 'لا يمكنك المتابعة لأن طلب تصريح الإنتاج الصناعي في حالة مسودة. يرجى إرسال الطلب للاعتماد أولًا.'
          : 'You can’t proceed because the Industrial Production Permit request is in Draft. Please submit it for approval first.'
        : isAr
        ? 'لا يمكنك المتابعة حتى يتم اعتماد طلب تصريح الإنتاج الصناعي. طلبك حاليًا قيد المراجعة.'
        : 'You can’t proceed until the Industrial Production Permit request is approved. Your request is currently under review.';

    return _openModal(store.dispatch, '', msg, '30%');
  }
  store
    .dispatch(
      canApplyForService({
        FormId: serviceID,
        UserId: userId,
        LicenseId: userData?.Id,
      }),
    )
    .then(res => {
      store.dispatch(setLoadingModal(false));

      if (res?.payload?.Data?.data) {
        NavigationService.navigate(screen, {service});
      } else {
        _openModal(
          store.dispatch,
          '',
          getTextFromHtml(
            isArabic()
              ? res?.payload?.Data?.messageAr || res?.payload?.Data?.message
              : res?.payload?.Data?.message,
          ),
          '30%',
        );
      }
    });
  // if (screen === 'RenewalLicenseOptions') return;

  // NavigationService.navigate(screen, {service});
};

export const maxFileSize = 20 * 1024 * 1024;
export const acceptedFiles = ['jpg', 'jpeg', 'png', 'pdf'];
