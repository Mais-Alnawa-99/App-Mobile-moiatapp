import React, {useState, useEffect, Fragment, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

import {isArabic} from '../../../../../locales';
import {useAppDispatch} from '../../../../../redux/store';
import {
  getApplicationChildForm,
  getRecordChildForm,
} from '../../../../../redux/reducers/E-Services/thunk/services';
import Input from '../../../../../component/input/Input';
import {BW} from '../../../../../style/theme';

interface RelationFieldProps {
  field: any;
  title: string;
  formValues: Record<number, any>;
  setFormValues: React.Dispatch<React.SetStateAction<Record<number, any>>>;
  recordId: number;
  tempAppId?: any;
  service?: any;
  requiredStar?: any;
  errors?: any;
  isDisabled?: any;
  applicationId?: any;
  currentStatusId?: any;
  handleChange?: any;
  record?: any;
  itemIndex?: any;
  withOutItemIndex?: any;
}

const RelationMultiDropDownField: React.FC<RelationFieldProps> = ({
  field,
  title,
  formValues,
  setFormValues,
  recordId,
  tempAppId,
  service,
  requiredStar,
  errors,
  isDisabled,
  applicationId,
  currentStatusId,
  handleChange,
  record,
  itemIndex,
  withOutItemIndex,
}) => {
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const langId = isArabic() ? 2 : 1;

  const [loading, setLoading] = useState<boolean>(false);

  const [optionsMap, setOptionsMap]: any = useState('');
  const [childrens, setChildrens]: any = useState('');
  const setting =
    (field?.formSectionFieldSettings &&
      JSON.parse(field?.formSectionFieldSettings)) ||
    {};
  const _getRecordChildForm = () => {
    setLoading(true);
    dispatch(
      getRecordChildForm({
        FormSectionFieldId: formValues?.[field.entityFieldId]
          ?.formSectionFieldId
          ? formValues?.[field.entityFieldId]?.formSectionFieldId
          : field.formSectionFieldid,
        RecordId: recordId,
        TempAppId: tempAppId != undefined ? tempAppId : '',
        ApplicationId: applicationId != undefined ? applicationId : '',
        ServiceId: service?.serviceId,
        EntityId: setting?.entityId
          ? setting?.entityId
          : field?.entityRelationships
          ? field?.entityRelationships[0].ToEntityId
          : field.entityFieldId,
        CurrentStageId: currentStatusId,
      }),
    ).then(res => {
      setLoading(false);

      if (
        res.meta.requestStatus == 'fulfilled' &&
        res?.payload?.networkSuccess
      ) {
        let child =
          !!res?.payload[0]?.childFormFields &&
          JSON.parse(res?.payload[0]?.childFormFields);

        let childData = child?.[0];

        if (!!childData?.Values) {
          createDropdownOptionsFromValues(childData?.Values, true);
        }
      }
    });
  };

  const _getApplicationChildForm = () => {
    setLoading(true);
    dispatch(
      getApplicationChildForm({
        EntityId: field?.entityRelationships
          ? field?.entityRelationships[0].ToEntityId
          : 0,
        FormSectionFieldId: formValues?.[field.entityFieldId]
          ?.formSectionFieldId
          ? formValues?.[field.entityFieldId]?.formSectionFieldId
          : field?.formSectionFieldid,
        ServiceId: service?.serviceId,
        ApplicationId: applicationId,
        ItemIndex: withOutItemIndex ? null : itemIndex || null,
        defaultValues: '',
      }),
    ).then((res: any) => {
      setLoading(false);
      if (res.meta.requestStatus === 'fulfilled') {
        const childFormFields = JSON.parse(res.payload[0]?.childFormFields);

        if (!childFormFields?.length) return;

        let childData = childFormFields?.[0];

        if (!!childData?.Values) {
          createDropdownOptionsFromValues(
            childData?.Values,
            true,
            formValues?.[field.entityFieldId]?.value,
          );
        }
      }
    });
  };

  const createDropdownOptionsFromValues = (
    childRecordValues: any,
    isAdd: any,
    defaultValue?: any,
  ) => {
    if (setting?.showAsDropDown) {
      let options: any = [];
      let childs: any = [];

      if (isAdd == true) {
        childRecordValues?.map((record: any) => {
          let data = {
            EntityFieldId: field.entityFieldId,
            label: record?.Fields
              ? record?.Fields[0].formSectionFieldValue
              : '',
            value: record.RecordId.toString(),
          };
          let dataChild = {
            itemIndex: record?.ItemIndex,
            fields: [
              {
                entityFieldId: record?.Fields?.[0].entityFieldId,
                value: record?.Fields?.[0].formSectionFieldValue,
              },
            ],
            status: 2,
            recordId: record?.RecordId,
          };

          options.push(data);
          childs.push(dataChild);
        });
      }
      setOptionsMap(options);
      setChildrens(childs);

      if (defaultValue) {
        handleChange(
          field.entityFieldId,
          {
            value: {
              entityFieldId: field?.entityFieldId,
              value: defaultValue,
              children: childrens,
            },
            field: field,
          },
          field,
        );
      }
    }
  };

  useEffect(() => {
    let appChield = true;

    // if (
    //   path == 'record' ||
    //   (applicationId == 0 && record && record?.recordId) ||
    //   service?.isServiceProfile == 'true' ||
    //   fieldSettings?.returnAllRecord == true
    // ) {
    //   appChield = false;
    // }
    if (itemIndex) {
      _getApplicationChildForm();
    } else {
      _getRecordChildForm();
    }
  }, [recordId]);

  return (
    <Input
      dropdown
      label={title}
      required={
        !!errors[field.entityFieldId] &&
        !formValues[field.entityFieldId]?.value?.value
      }
      error={
        !!errors[field.entityFieldId] &&
        !formValues[field.entityFieldId]?.value?.value &&
        errors[field.entityFieldId]
      }
      value={
        typeof formValues?.[field.entityFieldId]?.value == 'object'
          ? formValues?.[field.entityFieldId]?.value?.value
          : formValues?.[field.entityFieldId]?.value || ''
      }
      items={optionsMap || []}
      search={optionsMap && optionsMap?.length > 5}
      requiredStar={requiredStar}
      onChangeValue={(item: any) => {
        handleChange(
          field.entityFieldId,
          {
            value: {
              entityFieldId: field?.entityFieldId,
              value: item.value,
              children: childrens,
            },
            label: item.label,
            lookupId: item.lookupId,
            settings: item.settings,
            field: field,
            formSectionFieldId:
              formValues?.[field.entityFieldId]?.formSectionFieldId || '',
            fromId: formValues?.[field.entityFieldId]?.fromId || '',
          },
          field,
        );
      }}
      disabled={isDisabled}
    />
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    btnConfirm: {
      width: 'auto',
      height: 'auto',
      backgroundColor: colors.secondaryColor,
      minWidth: '33%',
      padding: 6 * BW(),
    },
    btnClose: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      minWidth: '25%',
      borderColor: colors.secondaryColor,
      borderWidth: 1 * BW(),
      padding: 6 * BW(),
    },
    btnTitle: {color: colors.secondaryColor},
    listItem: {
      borderBottomWidth: 1 * BW(),
      borderBottomColor: colors.border,
      paddingVertical: 10 * BW(),
    },
    listItemRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      paddingHorizontal: 8 * BW(),
      backgroundColor: colors.black + '99',
    },
    modalView: {
      backgroundColor: colors.mainBackground,
      borderRadius: 12 * BW(),
      paddingHorizontal: 12 * BW(),
      paddingVertical: 12 * BW(),
      width: '100%',
      borderWidth: 0.2 * BW(),
      borderColor: colors.border,
      minHeight: '40%',
      maxHeight: '88%',
    },
    footerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4 * BW(),
      bottom: 12 * BW(),
      left: 12 * BW(),
      right: 12 * BW(),
      position: 'absolute',
      width: '100%',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 12 * BW(),
    },

    paginationButton: {
      width: 'auto',
      height: 'auto',
    },
    imgContainer: {
      width: 16 * BW(),
      height: 16 * BW(),
    },

    pageButton: {
      width: 35 * BW(),
      height: 35 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5 * BW(),
      borderWidth: 1 * BW(),
      borderColor: colors.border,
      marginHorizontal: 5 * BW(),
      backgroundColor: colors.white,
    },

    activePage: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    pageText: {
      fontSize: 14 * BW(),
      color: colors.text,
    },

    activePageText: {
      fontSize: 14 * BW(),
      color: colors.white,
      fontWeight: 'bold',
    },
    btn: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.secondaryColor,
      borderWidth: 1 * BW(),
      marginTop: 4 * BW(),
    },
    searchContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    searchMainContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      paddingHorizontal: 8 * BW(),
      paddingVertical: 2 * BW(),
      paddingBottom: 4 * BW(),

      borderRadius: 4 * BW(),
      marginTop: 4 * BW(),
    },
    searchBtn: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.border,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
    },
    searchBtnContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      minWidth: '49%',
    },
    requiredText: {
      color: '#db2c43',
      fontSize: 8 * BW(),
      lineHeight: 20 * BW(),
    },

    styleIcon: {
      tintColor: colors.mainWhite,
      width: 16 * BW(),
      height: 16 * BW(),
    },
  });

export default RelationMultiDropDownField;
