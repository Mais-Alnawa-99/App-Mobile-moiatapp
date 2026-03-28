import React, {useState, useEffect, Fragment, useRef} from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {FieldTypeEnum} from '../Constants';
import Location from '../../../../../component/Location';

const LocationField = ({
  service,
  formData,
  title,
  formValues,
  handleChange,
  field,
  requiredFields,
  isDisabled,
  isInitLocation,
}: any) => {
  const {colors}: any = useTheme();
  const style = getStyle(colors);
  const {t} = useTranslation();
  const [locationState, setLocationState] = useState({});

  const getLocation = () => {
    let location = {};
    let lcaTemp =
      !!formValues[field.entityFieldId]?.value &&
      formValues[field.entityFieldId]?.value != undefined
        ? formValues[field.entityFieldId]?.value.split(',')
        : [];

    if (lcaTemp.length > 0) {
      location = {
        latitude: parseFloat(lcaTemp[0]),
        longitude: parseFloat(lcaTemp[1]),
      };
    }

    setLocationState(location);
  };
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && formValues[field.entityFieldId]?.value) {
      getLocation();
      hasInitialized.current = true;
    }
  }, [formValues[field.entityFieldId]?.value]);

  return (
    <>
      <Location
        label={title}
        setLocationProps={(selectedAddress: {
          latitude: any;
          longitude: any;
        }) => {
          handleChange(
            field.entityFieldId,
            `${selectedAddress.latitude},${selectedAddress.longitude}`,
            field,
          );
        }}
        isDisabled={isDisabled}
        initLocation={locationState}
        isInitLocation={!!field.formSectionFieldValue || isInitLocation}
        requiredStar={requiredFields[field.entityFieldId]}
      />
    </>
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
  });

export default LocationField;
