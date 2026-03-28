import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Input from '../../../../component/input/Input';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW, BH} from '../../../../style/theme';
import Text from '../../../../component/Text';
import {GetHSCodes} from '../../../../redux/reducers/I-Services/thunk/HSCodes';
import {useAppDispatch} from '../../../../redux/store';
import {isArabic} from '../../../../locales';
import FlatListComp from '../../../../component/FlatList';
import {useFormikContext} from 'formik';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DashedLine from '../../../../component/DashedLine';
const DEBOUNCE_MS = 500;

const HsCodes = ({
  fieldName,
  title,
  required,
  editValue,
  licenseId,
  error,
}: any) => {
  const {values, setFieldValue} = useFormikContext();
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const isFetchingMore = useRef(false);
  let language = isArabic() ? 2 : 1;
  const [valueInput, setValueInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showList, setShowList] = useState(false);
  const [totalCount, setTotalCount] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [hscodes, setHscodes] = useState([]);
  const [disableInput, setDisableInput] = useState(false);
  const suppressNextSearchRef = useRef(false);
  const handleLoadMore = () => {
    if (hscodes.length < totalCount && !isLoading) {
      setIsLoading(true);

      isFetchingMore.current = true;
      dispatch(
        GetHSCodes({
          language,
          pageNumber,
          pageSize,
          searchText: valueInput,
          licenseId: licenseId,
        }),
      ).then(res => {
        setIsLoading(false);
        if (res?.payload?.result?.HSCodes?.length > 0) {
          setTotalCount(res?.payload?.result?.TotalCount);
          let newCodes = [...hscodes, ...res?.payload?.result?.HSCodes];
          setHscodes(newCodes);
        }
      });
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
    }
  };

  const searchHsCode = value => {
    setIsSearching(true);
    dispatch(
      GetHSCodes({
        language,
        pageNumber: 1,
        pageSize,
        searchText: value,
        licenseId,
      }),
    ).then(res => {
      setIsSearching(false);
      if (res?.payload?.result?.HSCodes?.length > 0) {
        setTotalCount(res?.payload?.result?.TotalCount);
        setHscodes(res?.payload?.result?.HSCodes);

        setPageNumber(2);
      } else {
        setTotalCount(res?.payload?.result?.TotalCount);
        setPageNumber(1);
        setHscodes([]);
      }
    });
  };

  useEffect(() => {
    searchHsCode('');

    if (Object.keys(editValue).length > 0) {
      suppressNextSearchRef.current = true;
      setFieldValue(fieldName, editValue);
      setValueInput(editValue.Code + ' | ' + editValue.Title);
      setDisableInput(true);
    }
  }, []);
  useEffect(() => {
    if (suppressNextSearchRef.current) {
      suppressNextSearchRef.current = false;
      return;
    }
    const handler = setTimeout(() => {
      if (valueInput?.length > 2) {
        searchHsCode(valueInput);
      } else {
        searchHsCode('');
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(handler);
  }, [valueInput]);
  const isItemPressedRef = useRef(false);
  return (
    <View style={styles.container}>
      <View>
        <Input
          requiredStar={required}
          textInput
          label={title}
          value={valueInput}
          // placeholder={t('Search')}
          onFocus={() => {
            setShowList(true);
          }}
          onChangeText={value => {
            setValueInput(value);
            // if (value?.length > 2) {
            //   searchHsCode(value);
            // } else searchHsCode('');
          }}
          placeholder={t('IL.SearchForCode')}
          error={error}
          disabled={disableInput}
          //selection={{start: 0}}
        />
        {valueInput.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setValueInput('');
              setFieldValue(fieldName, '');
              setDisableInput(false);
            }}
            style={[
              {
                backgroundColor: colors.white,
                width: 30 * BW(),
                height: 42 * BW(),
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                borderRadius: 8 * BW(),
                bottom: 0,
              },
              isArabic() ? {right: 0} : {left: 0},
            ]}>
            <MaterialIcons
              name={'close'}
              size={18 * BW()}
              color={colors.lightPrimaryTextColor}
            />
          </TouchableOpacity>
        )}
      </View>
      {showList &&
        (hscodes.length != 0 || isSearching ? (
          <View
            style={{
              zIndex: 99999999,
              height: isLoading && hscodes.length == 0 ? 100 : 300,
              backgroundColor: colors.white,
              padding: 3 * BW(),
              borderBottomLeftRadius: 8 * BW(),
              borderBottomRightRadius: 8 * BW(),
              paddingBottom: 20 * BW(),
              borderColor: colors.gray,
              borderWidth: 1 * BW(),
            }}>
            {isSearching ? (
              <View
                style={{
                  padding: 8 * BW(),
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: '100%',
                }}>
                <ActivityIndicator size="small" />
              </View>
            ) : (
              <FlatListComp
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                data={hscodes}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                keyExtractor={(_, index) => `custom_key_${index}`}
                renderItem={({item}) => {
                  return (
                    <Fragment>
                      <TouchableOpacity
                        style={{
                          padding: 0 * BW(),
                          flexDirection: 'row',
                          zIndex: 222222222,
                          gap: 4 * BW(),
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onPressIn={() => {
                          isItemPressedRef.current = true;
                        }}
                        onPressOut={() => {
                          isItemPressedRef.current = false;
                        }}
                        onPress={() => {
                          setFieldValue(fieldName, item);
                          suppressNextSearchRef.current = true;
                          setValueInput(item.Code + ' | ' + item.Title);
                          setDisableInput(true);
                          setTimeout(() => setShowList(false), 200);
                        }}>
                        {values?.[fieldName]?.Code == item.Code && (
                          <View
                            style={{
                              backgroundColor: colors.secondaryColor,
                              //width: 10 * BW(),
                              height: 10 * BW(),
                              borderRadius: 20 * BW(),
                            }}
                          />
                        )}
                        <Text>{item.Code}</Text>
                        <Text>{' | '}</Text>
                        <Text h4 style={{flex: 1}}>
                          {item.Title}
                        </Text>
                      </TouchableOpacity>
                      <DashedLine />
                    </Fragment>
                  );
                }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.01}
                //  contentContainerStyle={{ height: '100%' }}
                showsVerticalScrollIndicator={true}
                moreLoading={isLoading}
              />
            )}
          </View>
        ) : (
          <Text
            style={{
              backgroundColor: colors.white,
              borderRadius: 8 * BW(),
              padding: 3 * BW(),
            }}>
            {t('IL.EmptyData')}
          </Text>
        ))}
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    btn: {
      backgroundColor: '#5fb634',
      height: 50 * BH(),
      marginTop: 10 * BW(),
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

export default HsCodes;
