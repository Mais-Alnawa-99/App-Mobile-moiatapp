import React, {useState, useEffect, Fragment, useCallback, useRef} from 'react';
import {View, StyleSheet, ImageBackground, BackHandler} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {isArabic} from '../../../../locales';
import Page from '../../../../component/Page';
import Header from '../../../../component/Header';
import {BW} from '../../../../style/theme';
import {store, useAppDispatch, useAppSelector} from '../../../../redux/store';
import {
  checkPermission,
  getServiceForms,
} from '../../../../redux/reducers/E-Services/thunk/services';
import Loader from '../../../../component/Loader';
import {setModalData} from '../../../../redux/reducers/General/modal';
import DynamicForm from '../DynamicForm/DynamicForm';
import NavigationService from '../../../../navigation/NavigationService';
import {getServiceProfileData} from '../../../../redux/reducers/E-Services/thunk/profile';
import ServiceConfirmationModal from './ServiceConfirmationModal';
import {eservicesURL} from '../../../../redux/network/apiEservices';
import {
  setLoadingModal,
  setLoadingService,
} from '../../../../redux/reducers/General/loader';
import {setUserDataStored} from '../../../../redux/reducers/User/userDataStored';
import {setNeedRefreshToken} from '../../../../redux/reducers/General/server';
import {services} from '../../utils';
import {exitConfirm} from '../../../WebViewScreen';
import PageBg from '../../../../component/PageBg';

export const _openModal = (
  dispatch?: any,
  title?: string | boolean,
  msg?: string | boolean,
  minHeight?: any,
  CustomView?: any,
  fun?: any,
) => {
  dispatch(
    setModalData({
      title: title,
      message: msg,
      minHeight: minHeight ? minHeight : '15%',
      hideCancel: true,
      CustomView: CustomView,
      fun: fun,
    }),
  );
};

const _switchProfile = (serviceId: any, serviceItem: any) => {
  store.dispatch(setNeedRefreshToken(true));

  let service = {
    serviceId: serviceId,
    Id: serviceId,
    ...serviceItem,
  };

  startApplication(service);
};
export const createApplication = (service: any, serviceItem?: any) => {
  const {userData}: any = store.getState().userDataStored;

  let settings = serviceItem?.Settings ? JSON.parse(serviceItem?.Settings) : '';
  if (service && (!settings?.customUrl || settings?.customUrl === undefined)) {
    store.dispatch(setLoadingService(true));
    store.dispatch(setLoadingModal(true));
    // store.dispatch(
    //   setModalDat store.a({
    //     minHeight: '30%',
    //     hideCancel: true,
    //     hideConfirm: true,
    //     CustomView: (
    //       <View
    //         style={{
    //           width: 20 * BW(),
    //           height: 20 * BW(),
    //         }}>
    //         <Loader isLoading={true} />
    //       </View>
    //     ),
    //   }),
    // );

    store
      .dispatch(
        getServiceProfileData({
          serviceId: '',
          profileRecordId: '',
        }),
      )
      .then(res => {
        if (res.payload.networkSuccess && !!res.payload.profileData) {
          let data = JSON.parse(res.payload?.profileData);
          let entityHasRecords: any = [];
          data?.map((x: any) => {
            if (x.applicationRecords) {
              entityHasRecords.push(x.applicationRecords);
            }
          });

          if (entityHasRecords.length > 0) {
            if (entityHasRecords[0]?.length == 1 && userData == null) {
              store.dispatch(
                setUserDataStored({
                  userData: {
                    record:
                      data && data[0]?.applicationRecords
                        ? data[0]?.applicationRecords[0]
                        : '',
                    entity: data[0],
                  },
                }),
              );

              _switchProfile(service, serviceItem);
            } else if (entityHasRecords?.length > 1 && userData !== null) {
              let currentEntity = data?.find(
                (profile: any) =>
                  profile.entityId == userData?.entity?.entityId,
              );
              let updatedApplications = currentEntity?.applicationRecords?.find(
                (record: any) => record.RecordId == userData?.record?.RecordId,
              );
              let updatedAppliedApplications = updatedApplications
                ? updatedApplications.appliedApplications
                : [];
              store.dispatch(
                setUserDataStored({
                  userData: {
                    record: {
                      ...userData.record,
                      appliedApplications: updatedAppliedApplications,
                    },
                    entity: currentEntity,
                  },
                }),
              );

              _switchProfile(service, serviceItem);
            } else {
              let requestService = {
                serviceId: service,
                Id: service,
                ...serviceItem,
              };

              startApplication(requestService);
            }
          } else {
            let requestService = {
              serviceId: service,
              Id: service,
              ...serviceItem,
            };

            startApplication(requestService);
          }
        }
      });
  } else {
    if (settings && settings?.customUrl == '/custom/recalled-product-inquiry') {
      NavigationService.navigate('RecalledProductInquiry', {serviceItem});
    } else if (
      settings &&
      settings?.customUrl == '/custom/purchase-standards'
    ) {
      NavigationService.navigate('PurchaseStandards', {serviceItem});
    } else {
      NavigationService.navigate('ServiceForm', {
        serviceId: service || service?.Id,
        record: {
          serviceId: service?.Id,
          parentApplication: null,
          profileRecordId: null,
          recordId: '',
          requestedServiceId: service || service?.Id,
        },
      });
    }
  }
};

export const startApplication = (service: any) => {
  const {userData}: any = store.getState().userDataStored;
  store
    .dispatch(
      checkPermission({
        ServiceId: service?.Id,
        StageActionId: '',
      }),
    )
    .then(res => {
      if (res && res.payload?.permission == true) {
        if (res.payload?.needProfile) {
          // if (userData == null) {
          //   store.dispatch(setLoadingModal(false));

          //   NavigationService.navigate('SelectProfile', {toServices: true});
          //   return;
          // }
          let requestParams = {
            serviceId: service?.Id,
            profileRecordId: '',
          };
          if (userData?.record && userData?.entity) {
            store
              .dispatch(getServiceProfileData(requestParams))
              .then(result => {
                if (result && result?.payload?.profileData) {
                  let entityData = JSON.parse(result?.payload?.profileData);
                  if (entityData && entityData?.length > 0) {
                    let currentSelectedEntity = entityData.find(
                      (e: any) => e.entityId == userData?.entity.entityId,
                    );
                    if (currentSelectedEntity) {
                      return checkIsProfileExist(
                        currentSelectedEntity,
                        userData?.record,
                        service,
                      );
                    } else {
                      checkIsProfileExist(
                        userData?.entity,
                        userData?.record,
                        service,
                      );
                    }
                  } else {
                  }
                } else {
                  checkIsProfileExist(
                    userData?.entity,
                    userData?.record,
                    service,
                  );
                }
              });
          } else {
            store.dispatch(getServiceProfileData(requestParams)).then(res => {
              if (res.payload.networkSuccess && !!res.payload.profileData) {
                let entityData = JSON.parse(res.payload?.profileData);
                if (entityData && entityData?.length > 0) {
                  if (userData == null) {
                    openChooseServiceModal(entityData[0], service);
                  } else {
                    gotToPendingProfile(entityData, service);
                  }
                }
              }
            });
          }
        } else {
          //Custom service- Manaa: Recalled Product Inquiry
          let settings = service?.Settings ? JSON.parse(service?.Settings) : '';
          // if (settings && settings?.customUrl) {
          //   setTimeout(() => {
          //     NavigationService.navigate('WebViewScreen', {
          //       url: eservicesURL + settings?.customUrl,
          //       hideDrawer: true,
          //     });
          //   }, 100);
          // } else {
          //   // userData?.record?.RecordId
          proceedToNewApplication(service, [], '');
        }
      }
      store.dispatch(setLoadingService(false));
      store.dispatch(setLoadingModal(false));

      // store.dispatch(hideModal());
    });
};

const checkIsProfileExist = (entity: any, record: any, service: any) => {
  const serviceId = service?.Id;
  const matchingRecord: any[] = [];
  entity?.entityServiceProfiles
    ?.filter((x: any) => x.ServiceId == serviceId)
    ?.map((allowedService: any) => {
      if (record.appliedApplications) {
        record.appliedApplications.map((appliedApplication: any) => {
          if (appliedApplication.ServiceId == allowedService.ProfileServiceId) {
            let newObject = {
              RecordId: record.RecordId,
              Service: appliedApplication,
            };
            matchingRecord.push(newObject);
          }
        });
      }
    });

  if (matchingRecord.length > 0) {
    const matchingRecordAppId = matchingRecord[0].RecordId;
    proceedToNewApplication(service, matchingRecordAppId, record.RecordId);
  } else {
    return createProfile(entity, [], record.RecordId, service);
  }
};
const proceedToNewApplication = (
  service: any,
  matchingRecordAppId: any,
  recordId: any,
) => {
  if (
    typeof matchingRecordAppId == 'object' &&
    Object.keys(matchingRecordAppId).length == 0
  ) {
    matchingRecordAppId = '';
  }

  const inputRequest = {
    serviceId: service?.Id,
    parentApplication: null,
    profileRecordId: !!matchingRecordAppId ? matchingRecordAppId : null,
    recordId: recordId ? recordId : '',
    requestedServiceId: service?.Id,
  };
  if (inputRequest.profileRecordId) {
    inputRequest.recordId = '';
  }

  if (service?.Id == 1050) {
    // NavigationService.navigate('WebViewScreen', {
    //   url: eservicesURL + '/custom/purchase-standards',
    //   hideDrawer: true,
    // });
    NavigationService.navigate('PurchaseStandards', {service});
  } else {
    NavigationService.navigate('ServiceForm', {
      serviceId: service?.Id,
      record: inputRequest,
    });
  }
  // /custom/purchase-standards 1050
};

const createProfile = (
  entity: any,
  matchingRecordAppId: any,
  recordId: any,
  service: any,
) => {
  if (entity?.entityServiceProfiles?.length > 0) {
    return openChooseServiceModal(entity, service);
  } else {
    let serviceId = entity?.entityServiceProfiles[0].ProfileServiceId;
    proceedToNewApplication(serviceId, matchingRecordAppId, recordId);
  }
};

const openChooseServiceModal = (entity: any, service: any) => {
  const {userData}: any = store.getState().userDataStored;
  const matched: any = [];
  store
    .dispatch(
      getServiceProfileData({
        serviceId: '',
        profileRecordId: '',
      }),
    )
    .then(res => {
      if (res.payload.networkSuccess && !!res.payload.profileData) {
        let data = JSON.parse(res.payload?.profileData);
        data.forEach((profile: any) => {
          profile?.entityServiceProfiles?.forEach((ser: any) => {
            if (ser.ServiceId == service?.Id) {
              matched.push(ser);
            }
          });
        });

        return store.dispatch(
          setModalData({
            minHeight: '30%',
            hideCancel: true,
            hideConfirm: true,
            CustomView: (
              <ServiceConfirmationModal
                entity={entity}
                matchedServices={matched}
                serviceInstructions={entity?.ServiceInstructions}
                requestedServiceId={service?.Id}
                selectedProfileRecord={userData}
              />
            ),
          }),
        );
      }
    });
};

const gotToPendingProfile = (entityData: any, service: any) => {
  let requestedServiceId = service?.Id;
  if (entityData[0]?.entityServiceProfiles) {
    let serviceProfile = entityData[0].entityServiceProfiles.find(
      (s: any) => s.ServiceId == requestedServiceId,
    );
    let isPendingApps = serviceProfile?.pendingApplications;
    if (isPendingApps) {
      let pendingApplications = JSON.parse(isPendingApps);
      if (pendingApplications.length > 0) {
        NavigationService.navigate('ApplicationDetails', {
          appId: pendingApplications[0].Id,
        });
      }
    } else {
      proceedToProfile(requestedServiceId);
    }
  } else {
    proceedToProfile(requestedServiceId);
  }
};

const proceedToProfile = (serviceId: any) => {
  NavigationService.navigate('SelectProfile', {
    serviceId: serviceId,
    toScreen: 'ServiceForm',
  });
};

const Form = (props: any) => {
  let params = props.route?.params;

  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const dispatch = useAppDispatch();
  const {userData}: any = useAppSelector(store => store.userDataStored);
  const [isLoading, setIsLoading] = useState(false);
  const [servicform, setServicForm]: any = useState('');
  const {tokenData}: any = useAppSelector(state => state.userToken);

  let service = '1129';
  const tempAppIdRef = useRef(
    String(new Date().valueOf()) + String(params?.serviceId),
  );
  let applicationId = 0;
  const tempAppId = tempAppIdRef?.current;

  const _getServiceForms = () => {
    setIsLoading(true);
    dispatch(setLoadingModal(false));
    dispatch(
      getServiceForms({
        serviceId: params?.serviceId,
        recordId: params?.record?.recordId || null,
        tempAppId: tempAppId,
        profileRecordId: params?.record?.profileRecordId || null,
        defaultValues: params?.record?.defaultValueArr || '',
      }),
    ).then(res => {
      if (
        res.meta.requestStatus == 'fulfilled' &&
        !!res.payload?.networkSuccess
      ) {
        setServicForm(res.payload);
      } else {
        NavigationService.goBack();
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    _getServiceForms();
  }, [params?.serviceId, tokenData, tokenData?.access_token]);

  let langId = isArabic() ? 2 : 1;

  let serviceName =
    !!servicform && servicform?.serviceName != undefined
      ? JSON.parse(servicform?.serviceName)?.find(
          (name: any) => name.langId === langId,
        )?.value
      : '';

  const handleBackButtonPress = (): any => {
    exitConfirm(dispatch, t);
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonPress,
      );
    };
  }, []);
  return (
    <PageBg>
      <Page
        withStatusBar
        hideBottomTab
        styles={{padding: 8 * BW()}}
        header={
          <Header
            titleContainerStyle={{
              flex: 9,
            }}
            onPress={() => {
              exitConfirm(dispatch, t);
            }}
            title={serviceName}
            hideDrawer
            hideHome
            style={{
              borderBottomColor: colors.gray,
              borderBottomWidth: 0.6 * BW(),
            }}
          />
        }
        withHeader>
        <Loader isLoading={isLoading}>
          <>
            {!!servicform && (
              <DynamicForm
                service={servicform}
                formData={
                  !!servicform?.forms ? JSON.parse(servicform?.forms) : ''
                }
                tempAppId={tempAppId}
                applicationId={applicationId}
                profId={
                  params?.record?.recordId ||
                  params?.record?.profileRecordId ||
                  null
                }
                record={params?.record}
                path="new"
                setIsLoading={setIsLoading}
              />
            )}
          </>
        </Loader>
      </Page>
    </PageBg>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
  });

export default Form;
