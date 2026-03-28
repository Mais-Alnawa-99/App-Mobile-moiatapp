import React from 'react';
import {Animated, LayoutAnimation, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch} from '../../../../redux/store';
import {BW} from '../../../../style/theme';
import Button from '../../../../component/Button';
import Input from '../../../../component/input/Input';

export default function SearchContainer({
  search,
  searchParams,
  setSearchParams,
  standardTypes,
  _getStandardAndVersionsList,
  setSearch,
  _resetSearch,
  toggleAccordion,
}: {
  search: any;
  searchParams: any;
  setSearchParams: any;
  standardTypes: any;
  _getStandardAndVersionsList: any;
  setSearch: any;
  _resetSearch: any;
  toggleAccordion: any;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);

  const dispatch = useAppDispatch();

  return (
    <>
      <View style={styles.searchBtnContainer}>
        <Button
          icon={require('../../../../assets/header/search.png')}
          styleIcon={{tintColor: colors.secondaryColor}}
          containerIcon={{width: 20 * BW(), height: 20 * BW()}}
          onPress={() => {
            // _getStandardAndVersionsList(1, true);
            setSearch((prev: any) => !prev);
            toggleAccordion();
          }}
          style={styles.searchBtn}
        />
        <Button
          Entypo={'ccw'}
          onPress={() => {
            _resetSearch();
          }}
          EntypoColor={colors.secondaryColor}
          style={{...styles.searchBtn, marginEnd: 0 * BW()}}
        />
      </View>
      {search && (
        <Animated.View
          style={{
            marginBottom: 12 * BW(),
            marginTop: -8 * BW(),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Input
              textInput
              label={t('Custom_Labels.StandardName')}
              value={searchParams.StandardName}
              onChangeText={(text: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  StandardName: text,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />

            <Input
              textInput
              label={t('Custom_Labels.StandardNumber')}
              value={searchParams.StandardNumber}
              onChangeText={(text: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  StandardNumber: text,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Input
              textInput
              label={t('Custom_Labels.StandardYear')}
              value={searchParams.StandardYear}
              onChangeText={(text: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  StandardYear: text,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />
            <Input
              textInput
              label={t('Custom_Labels.StandardICS')}
              value={searchParams.StandardICS}
              onChangeText={(text: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  StandardICS: text,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Input
              dropdown
              label={t('Custom_Labels.StandardType')}
              items={standardTypes || []}
              value={searchParams.StandardType}
              onChange={(item: any) =>
                setSearchParams((prev: any) => ({
                  ...prev,
                  StandardType: item?.value,
                }))
              }
              styleInput={{minWidth: '49%'}}
            />
          </View>
          <Button
            title={t('Search')}
            onPress={() => {
              _getStandardAndVersionsList(1, true);
            }}
            style={styles.searchBtnTitle}
            styleText={{color: colors.mainWhite}}
          />
        </Animated.View>
      )}
    </>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4 * BW(),
      flex: 1,
    },
    card: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 8 * BW(),
      marginBottom: 8 * BW(),
      borderRadius: 8 * BW(),
      borderColor: colors.border,
      borderWidth: 0.4 * BW(),
    },
    image: {
      width: '40%',
      height: 120 * BW(),
      borderRadius: 8 * BW(),
      borderColor: colors.border,
      borderWidth: 0.4 * BW(),
    },
    imagePlaceholder: {
      width: '100%',
      height: 120 * BW(),
      backgroundColor: '#e0e0e0',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8 * BW(),
    },
    searchBtn: {
      width: 'auto',
      height: 'auto',
      borderColor: colors.border,
      borderWidth: 1 * BW(),
      padding: 8 * BW(),
      marginEnd: 6 * BW(),
    },
    searchBtnTitle: {
      width: 80 * BW(),
      height: 'auto',
      padding: 8 * BW(),
      marginEnd: 6 * BW(),
      marginTop: 8 * BW(),
      backgroundColor: colors.secondaryColor,
    },
    searchBtnContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      marginBottom: 8 * BW(),
    },
    versionActions: {
      flexDirection: 'row',
      marginTop: 4 * BW(),
    },
    actionBtn: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 24 * BW(),
      marginEnd: 6 * BW(),
      padding: 4 * BW(),
      backgroundColor: colors.secondaryColor,
    },
    previewBtn: {
      width: 'auto',
      height: 'auto',
      paddingHorizontal: 24 * BW(),
      marginEnd: 6 * BW(),
      padding: 4 * BW(),
      backgroundColor: colors.white,
      borderColor: colors.textPrimaryColor,
      borderWidth: 1 * BW(),
    },
  });
