import React, {useState, useEffect, Fragment, Children, useRef} from 'react';
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

import {isArabic} from '../../../../../locales';
import Text from '../../../../../component/Text';
import {useAppDispatch, useAppSelector} from '../../../../../redux/store';
import {
  getSearchRelatedRecords,
  getApplicationChildForm,
  setSelectedRecord,
  getChildEntityFieldLookups,
  getSearchLookups,
} from '../../../../../redux/reducers/E-Services/thunk/services';
import Button from '../../../../../component/Button';
import Input from '../../../../../component/input/Input';
import {BW} from '../../../../../style/theme';
import Loader from '../../../../../component/Loader';
import RadioButton from '../../../../../component/RadioButton';
import FlatListComp from '../../../../../component/FlatList';
import {EntityFieldTypeEnum} from '../EntityFieldTypeIdEnum';
import {parseJSON} from '../../../utils';
import {FieldTypeEnum} from '../Constants';

interface RelationFieldProps {
  field: any;
  title: string;
  formValues: Record<number, any>;
  setFormValues: React.Dispatch<React.SetStateAction<Record<number, any>>>;
  profId: number;
  tempAppId?: any;
  service?: any;
  requiredStar?: any;
  errors?: any;
  isDisabled?: any;
  applicationId?: any;
  handleChange?: any;
  updateAttachmentsFromSelectedRecord?: any;
  selectedRecordIdProps?: any;
  setSelectedRecordIdProps?: any;
  updateVisibility?: any;
}

interface RecordData {
  recordId: number;
  data: Record<string, string>;
}

const PAGE_SIZE = 5;

const RelationField: React.FC<RelationFieldProps> = ({
  field,
  title,
  formValues,
  setFormValues,
  profId,
  tempAppId,
  service,
  requiredStar,
  errors,
  isDisabled,
  applicationId,
  handleChange,
  updateAttachmentsFromSelectedRecord,
  selectedRecordIdProps,
  setSelectedRecordIdProps,
  updateVisibility,
}) => {
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const langId = isArabic() ? 2 : 1;
  const {userData}: any = useAppSelector(store => store.userDataStored);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<RecordData[]>([]);
  const [message, setMessage] = useState<any>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
  const [selectedFields, setselectedFields] = useState<any | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchFilters, setSearchFilters] = useState<any>('');
  const [searchFiltersOperator, setSearchFiltersOperator] = useState<any>('');

  const fieldSettings = field?.formSectionFieldSettings
    ? JSON.parse(field?.formSectionFieldSettings)
    : {};

  const searchFields = field.relatedEntityFieldFilters
    ? JSON.parse(field.relatedEntityFieldFilters)
    : [];
  useEffect(() => {
    if (modalVisible) {
      _getSearchRelatedRecords();
    }
  }, [currentPage]);
  useEffect(() => {
    if (modalVisible) {
      _getSearchRelatedRecords(true);
    }
  }, [modalVisible]);

  const _getSearchRelatedRecords = (reset = false) => {
    setLoading(true);
    setMessage('');
    const filtersArray = Object.entries(searchFilters)
      .filter(
        ([_, value]: any) => (!!value && value !== '') || value != undefined,
      )
      .map(([entityFieldId, value]) => {
        const searchField = searchFields.find(
          (f: any) => f.entityFieldId == Number(entityFieldId),
        );
        let searchFieldOperator = '';
        let settings = searchField.settings
          ? JSON.parse(searchField.settings)
          : '';
        if (settings && settings.CascadedBy) {
          searchField.fieldTypeId = EntityFieldTypeEnum.Options;
          searchField.entityFieldLookups = [];
        }
        if (settings?.equalOnly) {
          searchFieldOperator = 'equal';
        } else if (settings?.containsOnly) {
          searchFieldOperator = 'contains';
        } else {
          searchFieldOperator = searchFiltersOperator[Number(entityFieldId)];
        }
        return {
          EntityFieldId: Number(entityFieldId),
          FieldTypeId: searchField?.fieldTypeId ?? 1,
          Operator: searchFieldOperator
            ? searchFieldOperator
            : searchField.fieldTypeId != EntityFieldTypeEnum.Integer
            ? 'contains'
            : '',
          Value: value,
        };
      });
    let extraFieldFilters = '';
    if (!reset) {
      extraFieldFilters = !!searchFilters ? JSON.stringify(filtersArray) : '';
    } else {
      extraFieldFilters = '';
      setSearchFilters('');
    }

    dispatch(
      getSearchRelatedRecords({
        FormSectionFieldId: field.formSectionFieldid,
        RecordId: '',
        PageNumber: currentPage,
        PageSize: PAGE_SIZE,
        ProfileRecordId: userData?.record?.RecordId || '',
        ExtraFieldFilters: extraFieldFilters,
        MatchAnyCondition: false,
        TempAppId: tempAppId != undefined ? tempAppId : '',
        ApplicationId: applicationId != undefined ? applicationId : '',
        ServiceId: service?.serviceId,
      }),
    ).then((res: any) => {
      setLoading(false);
      if (res.meta.requestStatus === 'fulfilled') {
        if (res.payload.relatedData != null) {
          const responseData = JSON.parse(res.payload.relatedData);
          setTotalPages(Math.ceil(res.payload.totalCount / PAGE_SIZE));
          const fetchedOptions: RecordData[] = responseData.map(
            (record: any) => ({
              recordId: record.recordId,
              fields: record.Fields.map((field: any) =>
                field?.relationType == 'Multiple' && field?.fieldTypeId == 7
                  ? {
                      entityFieldId: field.entityFieldId,
                      children: [],
                    }
                  : {
                      entityFieldId: field.entityFieldId,
                      value: field.formSectionFieldValue,
                    },
              ),
              fieldsExtra: record?.Fields.map((res: any) => ({
                ...res,
              })),
              data: record.Fields.filter((f: any) => f.showOnSearch).reduce(
                (acc: Record<string, string>, field: any) => {
                  const fieldName = field.formSectionFieldName.find(
                    (t: any) => t.langId === langId,
                  )?.value;
                  acc[fieldName] =
                    field.fieldTypeId === 3
                      ? moment(field.formSectionFieldValue).format(
                          'MMM DD, YYYY',
                        )
                      : field.fieldTypeId === 10
                      ? moment(field.formSectionFieldValue).format(
                          'DD/MM/YYYY hh:mm A',
                        )
                      : field.fieldTypeId === 5
                      ? field.lookupValues != undefined &&
                        parseJSON(field.lookupValues).find(
                          (t: any) => t.LanguageId === langId,
                        )?.Value
                      : field.formSectionFieldValue;
                  return acc;
                },
                {},
              ),
              dataMainShow: record.Fields.filter(
                (f: any) => f.showOnMainForm == 'Show',
              ).reduce((acc: Record<string, string>, field: any) => {
                const fieldName = field.formSectionFieldName.find(
                  (t: any) => t.langId === langId,
                )?.value;
                acc[fieldName] =
                  field.fieldTypeId === 3
                    ? moment(field.formSectionFieldValue).format('MMM DD, YYYY')
                    : field.fieldTypeId === 10
                    ? moment(field.formSectionFieldValue).format(
                        'DD/MM/YYYY hh:mm A',
                      )
                    : field.fieldTypeId === 5
                    ? field.lookupValues != undefined &&
                      parseJSON(field.lookupValues).find(
                        (t: any) => t.LanguageId === langId,
                      )?.Value
                    : field.formSectionFieldValue;
                return acc;
              }, {}),
            }),
          );
          setOptions(fetchedOptions);
          if (fetchedOptions.length > 0 && fieldSettings?.noPopup) {
            setChildDataNopopup(fetchedOptions[0]);
          }
        } else {
          setOptions([]);
          if (!!res.payload?.messageArabic && isArabic()) {
            setMessage(res.payload?.messageArabic);
          } else if (!!res.payload?.messageEnglish && !isArabic()) {
            setMessage(res.payload?.messageEnglish);
          } else {
            setMessage(t('Messages.NoRecord'));
          }
        }
      }
    });
  };

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage >= 2) pages.push(1);
      if (currentPage > 3) pages.push('...');

      if (currentPage - 1 > 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage + 1 < totalPages) pages.push(currentPage + 1);

      if (currentPage < totalPages - 2) pages.push('...');
      if (currentPage < totalPages) pages.push(totalPages);
    }

    return pages.map((page, index) =>
      typeof page === 'number' ? (
        <TouchableOpacity
          key={index}
          style={[style.pageButton, currentPage === page && style.activePage]}
          onPress={() => setCurrentPage(page)}
          disabled={currentPage === page}>
          <Text
            style={
              currentPage === page ? style.activePageText : style.pageText
            }>
            {page}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text key={index} style={style.pageText}>
          {page}
        </Text>
      ),
    );
  };

  const _select = (item: any) => {
    setSelectedRecordId(item.recordId), setselectedFields(item?.fields);
    setSelectedRecordIdProps(item.recordId);
    setSelectedData(item?.dataMainShow);
  };

  const [optionsMap, setOptionsMap]: any = useState('');

  const _getChildEntityFieldLookups = () => {
    dispatch(
      getChildEntityFieldLookups({
        FormSectionParentId: field.formSectionFieldid,
      }),
    ).then(res => {
      if (res.payload.networkSuccess) {
        const payloadArray = Object.values(res.payload);
        const lookupOptionsMap: Record<number, any[]> = {};
        payloadArray.forEach((fieldLookup: any) => {
          try {
            const parsedOptions = JSON.parse(
              fieldLookup.entityData || '[]',
            ).map((opt: any) => ({
              label: opt.lookupValue,
              value: opt.lookupValueId,
              lookupId: opt.lookupId,
            }));

            lookupOptionsMap[fieldLookup.entityFieldId] = parsedOptions;
          } catch (e) {}
        });
        setOptionsMap((prev: any) => ({
          ...prev,
          ...lookupOptionsMap,
        }));
      }
    });
  };

  const _getApplicationChildForm = () => {
    if (!!field?.formSectionFieldValue) {
      setLoading(true);
      dispatch(
        getApplicationChildForm({
          EntityId: field?.entityRelationships[0].ToEntityId,
          FormSectionFieldId: field?.formSectionFieldid,
          ServiceId: service?.serviceId,
          ApplicationId: applicationId,
          ItemIndex: field?.itemIndex ? field?.itemIndex : null,
          defaultValues: '',
        }),
      ).then((res: any) => {
        setLoading(false);
        _getChildEntityFieldLookups();
        if (res.meta.requestStatus === 'fulfilled') {
          let childFormFields = JSON.parse(res.payload[0]?.childFormFields);
          if (childFormFields != null && childFormFields?.length > 0) {
            let childData = childFormFields[0];
            const valuesMap: Record<number, string> = {};
            childData.Values?.[0]?.Fields?.forEach((v: any) => {
              valuesMap[v.entityFieldId] = v.formSectionFieldValue;
            });

            if (Object.keys(valuesMap).length > 0) {
              const fetchedOptions: any = {
                recordId: parseInt(field?.formSectionFieldValue),
                fields: childData.Fields.map((res: any) =>
                  // res?.relationType == 'Multiple' && res?.fieldTypeId == 7
                  //   ? {
                  //       entityFieldId: res.entityFieldId,
                  //       children: [],
                  //     }
                  //   :
                  ({
                    entityFieldId: res.entityFieldId,
                    value: valuesMap[res.entityFieldId] ?? '',
                  }),
                ),
                fieldsExtra: childData?.Fields.map((res: any) => ({
                  ...res,
                })),
                data: childData.Fields.filter(
                  (f: any) => f.showOnMainForm === 'Show',
                ).reduce((acc: Record<string, any>, field: any) => {
                  const fieldName = JSON.parse(field.formSectionFieldName).find(
                    (t: any) => t.langId === langId,
                  )?.value;
                  let shouldHide = false;

                  field?.constraints?.forEach((constraint: any) => {
                    if (
                      constraint.constraintTypeId === 4 &&
                      constraint?.Settings
                    ) {
                      const settings = JSON.parse(constraint.Settings);

                      settings?.ControlBy?.forEach((controlFieldId: number) => {
                        if (controlFieldId !== field.entityFieldId) {
                          const controlValue = valuesMap[controlFieldId];

                          const expectedValues = Array.isArray(settings.Values)
                            ? settings.Values
                            : JSON.parse(settings.Values.replace(/'/g, '"'));

                          if (
                            !expectedValues.includes(String(controlValue)) &&
                            !expectedValues.includes(`'${controlValue}'`)
                          ) {
                            shouldHide = true;
                          }
                        }
                      });
                    }
                  });

                  if (shouldHide) return acc;

                  acc[fieldName] = {
                    value: valuesMap[field.entityFieldId] ?? '',
                    fieldTypeId: field.fieldTypeId,
                    field: field,
                  };
                  return acc;
                }, {}),
              };
              setFormValues(prev => ({
                ...prev,
                [field.entityFieldId]: {
                  value: fetchedOptions?.recordId,
                  children: [{itemIndex: 1, fields: fetchedOptions?.fields}],
                  data: fetchedOptions?.data,
                  lookupId: fetchedOptions?.recordId,
                },
              }));
            }
          }
        }
      });
    }
  };

  useEffect(() => {
    _getApplicationChildForm();
  }, []);
  const [searchOptionsMap, setSearchOptionsMap] = useState<any>({});
  useEffect(() => {
    if (modalVisible || fieldSettings?.noPopup) _getSearchLookups();
  }, [searchFilters, modalVisible]);
  const previousFilterValues = useRef<Record<number, any>>({});

  const _getSearchLookups = () => {
    let parentField = field;
    if (!searchFields || searchFields.length === 0) return;
    let shouldFetch = false;

    searchFields?.forEach((field: any) => {
      let settings: any = {};
      try {
        settings = field.settings ? JSON.parse(field.settings) : {};
      } catch (err) {}
      if (
        field.fieldTypeId === FieldTypeEnum.Options ||
        !!settings?.CascadedBy
      ) {
        const cascadedBy = settings?.CascadedBy;

        if (Array.isArray(cascadedBy) && cascadedBy.length > 0) {
          const filterFieldValues = cascadedBy
            .map((controlFieldId: number) => {
              const value = searchFilters?.[controlFieldId];
              let controlField = searchFields?.find(
                (x: any) => x.entityFieldId == controlFieldId,
              );

              if (previousFilterValues.current[controlFieldId] !== value) {
                shouldFetch = true;
              }
              return value
                ? {
                    entityFieldId: controlFieldId,
                    value,
                    fieldTypeId: controlField?.fieldTypeId,
                  }
                : null;
            })
            .filter(Boolean);

          if (filterFieldValues?.length === cascadedBy.length && shouldFetch) {
            cascadedBy.forEach(id => {
              previousFilterValues.current[id] = searchFilters?.[id];
            });

            dispatch(
              getSearchLookups({
                entityFieldId: field.entityFieldId,
                formSectionFieldId:
                  parentField.formSectionFieldid || field.searchEntityFieldId,
                filterFieldValues: JSON.stringify(filterFieldValues),
                matchAnyCondition: false,
              }),
            ).then((res: any) => {
              if (res?.payload?.networkSuccess) {
                const raw = res.payload;
                const parsed = Object.values(raw).filter(
                  (v: any) => typeof v === 'object' && v.lookupId,
                );

                setSearchOptionsMap((prev: any) => ({
                  ...prev,
                  [field.entityFieldId]: parsed.map((opt: any) => ({
                    label: opt.lookupValue,
                    value: opt.lookupId,
                  })),
                }));
              }
            });
          }
        } else {
          if (field?.entityFieldLookups) {
            setSearchOptionsMap((prev: any) => ({
              ...prev,
              [field.entityFieldId]: field?.entityFieldLookups.map(
                (opt: any) => ({
                  label: opt.lookupValue,
                  value: opt.lookupId,
                }),
              ),
            }));
          } else {
            !searchOptionsMap[field.entityFieldId] &&
              dispatch(
                getSearchLookups({
                  entityFieldId: field.entityFieldId,
                  formSectionFieldId:
                    field.searchEntityFieldId || field.formSectionFieldId,
                  filterFieldValues: null,
                  matchAnyCondition: false,
                }),
              ).then((res: any) => {
                if (res?.payload?.networkSuccess) {
                  const raw = res.payload;
                  const parsed = Object.values(raw).filter(
                    (v: any) => typeof v === 'object' && v.lookupId,
                  );

                  setSearchOptionsMap((prev: any) => ({
                    ...prev,
                    [field.entityFieldId]: parsed.map((opt: any) => ({
                      label: opt.lookupValue,
                      value: opt.lookupId,
                    })),
                  }));
                }
              });
          }
        }
      }
    });
  };

  useEffect(() => {
    if (!modalVisible) {
      setSearchFilters('');
    }
  }, [modalVisible]);
  const getSearchFields = (searchFields: any) => {
    return (
      searchFields.length > 0 && (
        <>
          <View style={style.searchContainer}>
            {searchFields.map((field: any, index: number) => {
              let searchFieldOperator = '';
              let settings = field.settings ? JSON.parse(field.settings) : '';
              if (settings?.equalOnly) {
                searchFieldOperator = 'equal';
              } else if (settings?.containsOnly) {
                searchFieldOperator = 'contains';
              }
              return (
                <Fragment key={index}>
                  {(field?.fieldTypeId === FieldTypeEnum.Options ||
                    settings?.CascadedBy) && (
                    <Input
                      dropdown
                      viewStyle={{
                        width: '49%',
                        minWidth: '49%',
                        flex: 1,
                        marginTop: 0,
                      }}
                      styleInput={{
                        backgroundColor: colors.mainBackground,
                        borderColor: colors.border,
                        borderWidth: 1 * BW(),
                      }}
                      placeholder={
                        field.entityFieldTranslation.find(
                          (t: any) => t.langId === langId,
                        )?.value
                      }
                      value={searchFilters[field.entityFieldId] || ''}
                      items={searchOptionsMap[field.entityFieldId] || []}
                      search={[]?.length > 5}
                      onChangeValue={(item: any) => {
                        setSearchFilters((prev: any) => ({
                          ...prev,
                          [field.entityFieldId]: item.value,
                        }));
                      }}
                    />
                  )}
                  {field?.fieldTypeId === FieldTypeEnum.Text &&
                    !settings?.CascadedBy && (
                      <>
                        {!searchFieldOperator && (
                          <Input
                            dropdown
                            // dropdownPosition={'top'}
                            items={[
                              {label: 'Equals', value: 'equal'},
                              {label: 'Not Equal', value: 'notequal'},
                              {label: 'Start With', value: 'startswith'},
                              {label: 'End With', value: 'endswith'},
                              {label: 'Contains', value: 'contains'},
                            ]}
                            value={
                              searchFiltersOperator[field.entityFieldId] || ''
                            }
                            onChange={(item: any) =>
                              setSearchFiltersOperator((prev: any) => ({
                                ...prev,
                                [field.entityFieldId]: item.value,
                              }))
                            }
                            styleInput={{
                              backgroundColor: colors.mainBackground,
                              borderColor: colors.border,
                              borderWidth: 1 * BW(),
                            }}
                            viewStyle={{
                              width: '49%',
                              minWidth: '49%',
                              flex: 1,
                              marginTop: 0,
                            }}
                          />
                        )}
                        <Input
                          key={index}
                          viewStyle={{
                            width: '49%',
                            minWidth: '49%',
                            flex: 1,
                            marginTop: 0,
                          }}
                          styleInput={{
                            backgroundColor: colors.mainBackground,
                            borderColor: colors.border,
                            borderWidth: 1 * BW(),
                          }}
                          textInput
                          placeholder={
                            field.entityFieldTranslation.find(
                              (t: any) => t.langId === langId,
                            )?.value
                          }
                          placeholderTextColor={colors.textGray}
                          value={searchFilters[field.entityFieldId] || ''}
                          onChangeText={(value: any) =>
                            setSearchFilters((prev: any) => ({
                              ...prev,
                              [field.entityFieldId]: value,
                            }))
                          }
                        />
                      </>
                    )}
                </Fragment>
              );
            })}
            <View
              style={[
                style.searchBtnContainer,
                {
                  minWidth: searchFields?.length % 2 == 0 ? '100%' : '49%',
                  flex: 1,
                },
              ]}>
              <Button
                Entypo={'ccw'}
                onPress={() => {
                  !!searchFilters ? _getSearchRelatedRecords(true) : {};
                }}
                EntypoColor={colors.secondaryColor}
                style={{...style.searchBtn, marginEnd: 6 * BW()}}
              />
              <Button
                icon={require('../../../../../assets/header/search.png')}
                styleIcon={{tintColor: colors.secondaryColor}}
                loading={loading && !!fieldSettings?.noPopup}
                containerIcon={{width: 20 * BW(), height: 20 * BW()}}
                onPress={() =>
                  !!searchFilters ? _getSearchRelatedRecords(false) : {}
                }
                style={style.searchBtn}
              />
            </View>
          </View>
        </>
      )
    );
  };

  const setChildDataNopopup = (item: any) => {
    if (!fieldSettings?.mappings) return;

    let mappings = fieldSettings?.mappings ?? [];
    if (!Array.isArray(mappings)) {
      mappings = Object.entries(mappings).map(([fromId, toId]: any) => ({
        fromId: parseInt(fromId),
        toId: parseInt(toId),
        editable: true,
      }));
    }
    const mappedValues: Record<number, any> = {};

    item?.fields.forEach((f: any) => {
      const mapping = mappings?.find(
        (m: any) => Number(m.fromId) === Number(f.entityFieldId),
      );
      if (mapping?.toId?.efid) {
        mappedValues[mapping?.toId?.efid] = f.value;
      } else if (mapping) {
        mappedValues[mapping.toId] = f.value;
      }
    });

    let customFormValues = {};
    setFormValues(prev => ({
      ...prev,
      [field.entityFieldId]: {
        value: item.recordId,
        children: [{itemIndex: 1, fields: item.fields}],
        data: item.data,
        lookupId: item.recordId,
      },
      ...Object.entries(mappedValues).reduce((acc, [k, v]) => {
        const mapping = mappings?.find((m: any) =>
          m?.toId?.efid
            ? Number(m?.toId?.efid) === Number(k)
            : Number(m?.toId) === Number(k),
        );
        let customField =
          item?.fieldsExtra &&
          item?.fieldsExtra?.find(
            (f: any) => Number(f?.entityFieldId) === Number(mapping?.fromId),
          );
        acc[+k] = {
          value: v,
          formSectionFieldId: customField?.formSectionFieldId,
          fromId: mapping?.fromId,
        };
        return acc;
      }, {} as Record<number, any>),
    }));
    setTimeout(() => {
      Object.entries(mappedValues).forEach(([k, v]) => {
        if (
          formValues[+k]?.value != undefined ||
          (v != undefined && formValues[+k]?.value !== v)
        ) {
          customFormValues = {
            ...formValues,
            [+k]: {
              value: v,
            },
          };
          !!updateVisibility && updateVisibility(k, v, customFormValues);
        }
      });
    }, 0);
    setSelectedRecordIdProps(item.recordId);
  };

  const _setSelectedRecord = (selectedRecordId: any) => {
    dispatch(
      setSelectedRecord({
        serviceId: service?.serviceId,
        FormSectionFieldId: field?.formSectionFieldid,
        RecordId: selectedRecordId,
        ProfileRecordId: userData?.record?.RecordId || '',
        ApplicationId: applicationId,
        TempAppId: tempAppId,
        CurrentStageId: service?.stageId,
        DeleteAttachments: true,
      }),
    ).then(result => {
      if (result.payload?.networkSuccess) {
        const formSectionAttachments = JSON.parse(
          result.payload?.formSectionAttachments || '[]',
        );
        updateAttachmentsFromSelectedRecord(formSectionAttachments);
      }
    });
  };

  const getFieldsChild = (key: any, value: any) => {
    if (
      value?.fieldTypeId == 5 &&
      !!optionsMap &&
      optionsMap[value?.field?.entityFieldId]
    ) {
      return (
        <Input
          dropdown
          search={
            !!optionsMap && optionsMap[value?.field?.entityFieldId].length > 5
              ? true
              : false
          }
          label={key}
          items={!!optionsMap && optionsMap[value?.field?.entityFieldId]}
          placeholder={t('Select')}
          value={value.value || ''}
          disabled={true}
          viewStyle={{width: '100%'}}
          styleInput={{height: 40 * BW()}}
        />
      );
    }
    if (value?.fieldTypeId == 8) {
      return (
        <Input
          radio
          row
          radioGroup={[
            {label: t('true'), value: 'true'},
            {label: t('false'), value: 'false'},
          ]}
          title={key}
          value={value.value}
          disabled={true}
          viewStyle={{width: '100%'}}
        />
      );
    }
    return (
      <Input
        textInput
        label={key}
        value={value.value}
        viewStyle={{width: '100%'}}
        disabled
      />
    );
  };

  return (
    <View style={{marginTop: 8 * BW()}}>
      {title && (
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Text h4>{title}</Text>
          {requiredStar && (
            <Icon
              name="star-of-life"
              size={6 * BW()}
              color="#db2c43"
              style={{marginHorizontal: 4 * BW(), marginBottom: 4 * BW()}}
            />
          )}
        </View>
      )}

      {!isDisabled && fieldSettings?.noPopup && (
        <View style={style.searchMainContainer}>
          {getSearchFields(searchFields)}
          {message && (
            <Text h4 style={{width: '100%', ...style.requiredText}}>
              {message}
            </Text>
          )}

          <Text h4>{t('Messages.UseSearchButton') + title} </Text>
        </View>
      )}
      {!isDisabled && !fieldSettings?.noPopup && (
        <Button
          medium
          title={
            !!formValues[field.entityFieldId]?.data
              ? t('Edit') + ' ' + title
              : t('Select') + ' ' + title
          }
          onPress={() => {
            setCurrentPage(1);
            setModalVisible(true);
          }}
          style={style.btn}
          styleText={style.btnTitle}
        />
      )}
      {!!errors[field.entityFieldId] &&
        !formValues[field.entityFieldId]?.value && (
          <Text style={style.requiredText} h5>
            {errors[field.entityFieldId]}
          </Text>
        )}
      {!!formValues[field.entityFieldId]?.data && (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            borderWidth: 1 * BW(),
            borderColor: colors?.border,
            padding: 16 * BW(),
            marginTop: 8 * BW(),
            borderRadius: 8 * BW(),
          }}>
          {Object.entries(formValues[field.entityFieldId]?.data).map(
            ([key, value]: any) =>
              value.value ? (
                <Fragment key={key}>{getFieldsChild(key, value)}</Fragment>
              ) : (
                <Input
                  textInput
                  label={key}
                  value={value}
                  viewStyle={{width: '49%'}}
                  disabled
                />
              ),
          )}
        </View>
      )}
      {!formValues[field.entityFieldId]?.data && isDisabled && (
        <Loader isLoading={loading}>
          <Text h4 bold>
            {t('Messages.NoRecord')}
          </Text>
        </Loader>
      )}

      {/* {formValues[field.entityFieldId] && (
        <Text style={{marginTop: 8}}>{formValues[field.entityFieldId]}</Text>
      )} */}

      {/* نافذة البحث والاختيار */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={style.modalContainer}>
          <View style={style.modalView}>
            <Text h3 bold>
              {t('Select')} {title}
            </Text>
            {getSearchFields(searchFields)}

            {loading ? (
              <Loader isLoading={loading} />
            ) : (
              <>
                <FlatListComp
                  data={options}
                  noData
                  renderItem={({item}: any) => (
                    <TouchableOpacity
                      style={style.listItem}
                      onPress={() => _select(item)}>
                      <View style={style.listItemRow}>
                        <RadioButton
                          selected={selectedRecordId === item.recordId}
                          onPress={() => _select(item)}
                          color={colors.primary}
                        />

                        <View style={{gap: 4 * BW()}}>
                          {Object.entries(item.data).map(
                            ([key, value]: any) => (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 4 * BW(),
                                }}>
                                <Text h5 key={key}>
                                  {key}:
                                </Text>
                                <Text h5 bold style={{width: '75%'}}>
                                  {value}
                                </Text>
                              </View>
                            ),
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}
            {totalPages != 0 && (
              <View style={style.paginationContainer}>
                <Button
                  onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  containerIcon={style.imgContainer}
                  icon={require('../../../../../assets/icons/back.png')}
                  disabled={currentPage === 1}
                  styleIcon={{tintColor: colors.primary}}
                  style={{
                    ...style.paginationButton,
                    transform: [{scaleX: isArabic() ? -1 : 1}],
                  }}
                />

                {renderPagination()}

                <Button
                  onPress={() =>
                    setCurrentPage(prev => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  containerIcon={style.imgContainer}
                  icon={require('../../../../../assets/icons/back.png')}
                  styleIcon={{tintColor: colors.primary}}
                  style={{
                    ...style.paginationButton,
                    transform: [{scaleX: isArabic() ? 1 : -1}],
                  }}
                />
              </View>
            )}
            <View style={style.footerButtons}>
              <Button
                title={t('Close')}
                style={style.btnClose}
                styleText={{color: colors.secondaryColor}}
                onPress={() => {
                  setModalVisible(false);
                  !!formValues[field.entityFieldId]?.value &&
                    setSelectedRecordId(formValues[field.entityFieldId]?.value);
                }}
              />
              <Button
                title={t('Confirm')}
                style={style.btnConfirm}
                styleText={{color: colors.mainWhite}}
                onPress={() => {
                  if (selectedRecordId) {
                    setFormValues(prev => ({
                      ...prev,
                      [field.entityFieldId]: {
                        value: selectedRecordId,
                        children: [{itemIndex: 1, fields: selectedFields}],
                        data: selectedData,
                        lookupId: selectedRecordId,
                      },
                    }));

                    updateVisibility(field.entityFieldId, selectedRecordId, {
                      ...formValues,
                      [field.entityFieldId]: {
                        value: selectedRecordId,
                        children: [{itemIndex: 1, fields: selectedFields}],
                        data: selectedData,
                        lookupId: selectedRecordId,
                      },
                    });
                    setChildDataNopopup({
                      fields: selectedFields,
                      recordId: selectedRecordId,
                      data: selectedData,
                    });
                    _setSelectedRecord(selectedRecordId);

                    setModalVisible(false);
                  }
                }}
                backgroundColorDisabled={colors.secondaryColor}
                disabled={!selectedRecordId}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    btnConfirm: {
      width: 'auto',
      height: 'auto',
      backgroundColor: colors.secondaryColor,
      minWidth: '30%',
      padding: 6 * BW(),
    },
    btnClose: {
      width: 'auto',
      height: 'auto',
      backgroundColor: 'transparent',
      minWidth: '30%',
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
      backgroundColor: colors.white,
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
      gap: 4 * BW(),
    },
    searchMainContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      paddingHorizontal: 8 * BW(),
      paddingVertical: 8 * BW(),
      paddingBottom: 6 * BW(),

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
      marginTop: 0 * BW(),
    },
    requiredText: {
      color: '#db2c43',
      fontSize: 8 * BW(),
      lineHeight: 20 * BW(),
    },
  });

export default RelationField;
