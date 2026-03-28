import React, {useMemo, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import theme, {BW} from '../../style/theme';
import Text from '../Text';
import {MultiSelect} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isArabic} from '../../locales';

export default function MultiSelectCom(allProps: any): JSX.Element {
  const {
    renderSelectedItem: _omitRSI,
    renderRightIcon: _omitRRI,
    renderLeftIcon: _omitRLI,
    items,
    value,
    onChangeValue,
    extraValue,
    storeObjects,
    disabled,
    search,
    placeholder,
    required,
    error,
    styleInput,
    ...rest
  } = allProps;

  const {colors}: any = useTheme();
  const styles = getStyles(colors);
  const {t} = useTranslation();

  const selectedItems = useMemo(() => {
    if (!Array.isArray(value)) return [];
    return (items || []).filter((opt: any) => value.includes(opt.value));
  }, [value, items]);

  const handleChange = useCallback(
    (vals: any[]) => {
      const selectedObjs = (items || []).filter((o: any) =>
        vals.includes(o.value),
      );
      if (onChangeValue) {
        extraValue
          ? onChangeValue(selectedObjs.map((o: any) => ({...o})))
          : onChangeValue(vals);
      }
      storeObjects && storeObjects(selectedObjs);
    },
    [items, onChangeValue, extraValue, storeObjects],
  );

  const handleRemoveOne = useCallback(
    (itemToRemove: any) => {
      const newValues = (value || []).filter(
        (v: any) => v !== itemToRemove.value,
      );
      handleChange(newValues);
    },
    [value, handleChange],
  );

  return (
    <View style={{zIndex: 2000}}>
      {!!selectedItems.length && (
        <View style={styles.selectedChipsWrap}>
          {selectedItems.map((it: any) => (
            <View key={it.value} style={styles.selectedStyle}>
              <Text h5 numberOfLines={1}>
                {it.label}
              </Text>
              {!disabled && (
                <TouchableOpacity onPress={() => handleRemoveOne(it)}>
                  <AntDesign
                    color={colors.secondaryColor}
                    name="delete"
                    size={16 * BW()}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}

      <MultiSelect
        {...rest}
        disable={disabled}
        search={search}
        value={value}
        data={items}
        placeholder={placeholder || t('Select')}
        labelField="label"
        valueField="value"
        onChange={
          onChangeValue ? (vals: any[]) => handleChange(vals) : () => {}
        }
        searchPlaceholder={t('Search')}
        inputSearchStyle={{
          fontFamily: theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
          backgroundColor: colors.backgroundColorInput,
          color: colors.text,
        }}
        placeholderStyle={{
          fontFamily: theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
          color: disabled ? colors.gray : colors.text,
        }}
        itemTextStyle={{
          fontFamily: theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
        }}
        selectedTextStyle={{
          fontFamily: theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
          color: disabled ? colors.text + 'aa' : colors.text,
        }}
        style={[
          disabled ? styles.inputDisable : styles.input,
          {
            zIndex: 2000,
            borderColor: required || error ? 'red' : '#cccccc88',
            borderWidth: required || error ? 0.5 * BW() : 0,
            paddingVertical: 5 * BW(),
            borderRadius: 8 * BW(),
            marginTop: selectedItems.length ? 4 * BW() : 2 * BW(),
            padding: 8 * BW(),
            minHeight: 40 * BW(),
            ...styleInput,
          },
        ]}
        dropdownPosition="auto"
        renderItem={(item: any) => {
          const isSelected = !!value && value?.includes(item.value);
          return (
            <View style={styles.renderItem}>
              {isSelected && (
                <AntDesign name="check" size={14 * BW()} color={colors.green} />
              )}
              <Text>{item.label}</Text>
            </View>
          );
        }}
        renderSelectedItem={() => <View />}
        renderRightIcon={
          isArabic()
            ? () => {}
            : () => (
                <AntDesign
                  name={'down'}
                  size={15 * BW()}
                  color={disabled ? colors.gray : colors.text}
                />
              )
        }
        renderLeftIcon={
          isArabic()
            ? () => (
                <AntDesign
                  name={'down'}
                  size={15 * BW()}
                  color={disabled ? colors.gray : colors.text}
                />
              )
            : () => {}
        }
      />
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    inputDisable: {
      color: colors.textColor + 'aa',
      backgroundColor: '#ffffff80',
    },
    input: {
      color: colors.textColor,
      backgroundColor: colors.backgroundColorInput,
    },
    renderItem: {
      paddingHorizontal: 10 * BW(),
      paddingVertical: 8 * BW(),
      backgroundColor: colors.backgroundColorInput,
      color: colors.text,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * BW(),
    },
    selectedChipsWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6 * BW(),
      marginBottom: 6 * BW(),
    },
    selectedStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8 * BW(),
      backgroundColor: colors.backgroundColorInput,
      shadowColor: '#000',
      gap: 4 * BW(),
      marginTop: 2 * BW(),
      marginRight: 4 * BW(),
      paddingHorizontal: 12 * BW(),
      paddingVertical: 8 * BW(),
      maxWidth: '98%',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
  });
