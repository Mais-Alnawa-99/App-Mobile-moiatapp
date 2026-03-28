import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getLookupValues} from '../../redux/reducers/Lookup/thunk/lookup';
import {BH, BW} from '../../style/theme';
import Button from '../../component/Button';
import {setActiveCat} from '../../redux/reducers/Services/slice/services';
import {isArabic} from '../../locales';
import {getIcon} from '../home/ServiceCatalogSection';

export default function SideBar(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const dispatch = useAppDispatch();
  const {servicesCat, isLoading}: any = useAppSelector(
    state => state.lookupsData.lookupsValues,
  );

  const [isCloased, setIsCloased] = useState(false);

  const serviceCatalogCards = [
    {
      Id: 'allServices',
      title: t('AllServices'),
      icon: require('../../assets/services/AllServices.png'),
    },

    {
      Id: 'favourite',
      title: t('FavouriteServices'),
      icon: require('../../assets/services/Heart.png'),
    },
  ];
  const [services, setSerivces] = useState(serviceCatalogCards);

  useEffect(() => {
    _getLookupValues();
  }, []);
  const _getLookupValues = () => {
    dispatch(getLookupValues(5));
  };

  useEffect(() => {
    if (!!servicesCat && !isLoading && servicesCat?.value !== undefined) {
      const excludedCats = ['0a7acf8b-0383-4942-bca7-a086eac3c29c', ,];

      const filtered = servicesCat.value.filter(
        s => !excludedCats.includes(s.Id),
      );

      setSerivces([...serviceCatalogCards, ...filtered]);
    }
  }, [servicesCat]);

  const _onPressServiceCat = (item: any, index: number) => {
    dispatch(
      setActiveCat({
        activeType: item.Id,
        activeBtn: index,
      }),
    );
  };

  return (
    <View style={style.mainConatiner}>
      {isCloased && (
        <Button
          onPress={() => setIsCloased(!isCloased)}
          icon={require('../../assets/icons/back.png')}
          style={isCloased ? style.btnCloased : style.btn}
          styleIcon={{
            width: isCloased ? 16 * BW() : 16 * BW(),
            height: isCloased ? 16 * BW() : 16 * BW(),
            tintColor: colors.mainWhite,
            resizeMode: 'contain',
            marginStart: isCloased ? 0 : 0 * BW(),
            transform: [{rotate: !isCloased ? '180deg' : '0deg'}],
          }}
        />
      )}
      <Animatable.View
        style={style.conatiner}
        duration={700}
        delay={0}
        animation={{
          from: {
            width: isCloased ? 85 * BW() : 0,
            opacity: isCloased ? 1 : 0,
          },
          to: {
            width: isCloased ? 0 * BW() : 85 * BW(),
            opacity: isCloased ? 0 : 1,
          },
        }}>
        {!isCloased && (
          <Button
            onPress={() => setIsCloased(!isCloased)}
            icon={require('../../assets/icons/close.png')}
            style={isCloased ? style.btnCloased : style.btn}
            styleIcon={{
              width: 13 * BW(),
              height: 13 * BW(),
              tintColor: colors.mainWhite,
              resizeMode: 'contain',
              marginStart: isCloased ? 0 : 0 * BW(),
              transform: [{rotate: !isCloased ? '180deg' : '0deg'}],
            }}
          />
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          {services?.map((item: any, index) => {
            return (
              <Button
                style={{
                  ...style.card,
                  ...{
                    backgroundColor: 'transparent',
                    paddingTop: index === 0 ? 0 : 6 * BW(),
                  },
                }}
                key={index}
                onPress={() => {
                  _onPressServiceCat(item, index);
                }}
                h5
                medium
                // speakable
                title={item.title || item?.FieldValues?.Title}
                styleText={style.title}
                containerIcon={{
                  backgroundColor:
                    props?.activeBtn == index
                      ? colors.secondaryColor
                      : 'transparent',

                  ...style.containerIcon,
                }}
                icon={item?.icon ? item?.icon : getIcon(item?.Name)}
                styleIcon={style.icon}
              />
            );
          })}
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    mainConatiner: {},
    conatiner: {
      width: 85 * BW(),
      borderTopEndRadius: 20 * BW(),
      borderBottomEndRadius: 20 * BW(),
      overflow: 'hidden',
      minHeight: 500 * BH(),
      maxHeight: 600 * BH(),
      paddingVertical: 6 * BW(),
      backgroundColor: colors.primaryColor,
    },
    card: {
      backgroundColor: 'transparent',
      width: 'auto',
      flex: 1,
      borderRadius: 0,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 8 * BW(),
      height: 'auto',
      minHeight: 60 * BW(),
      gap: 2 * BW(),
    },
    containerIcon: {
      width: 32 * BW(),
      height: 32 * BW(),
      borderRadius: 30 * BW(),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 2 * BW(),
    },
    title: {
      color: colors.mainWhite,
      textAlign: 'center',
      lineHeight: 14 * BW(),
    },
    icon: {
      tintColor: colors?.mainWhite,
      width: 26 * BH(),
      height: 26 * BH(),
    },
    btn: {
      // position: 'absolute',
      alignSelf: 'center',
      zIndex: 999,
      width: 32 * BW(),
      height: 32 * BW(),
      borderRadius: 0 * BW(),
      // borderBottomStartRadius: 30 * BW(),
      // borderTopEndRadius: 20 * BW(),
      // backgroundColor: colors.secondaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      right: 0,
    },
    btnCloased: {
      // position: 'absolute',
      top: 0 * BW(),
      // start: 20 * BW(),
      zIndex: 999,
      width: 30 * BW(),
      height: 30 * BW(),
      borderRadius: 0,
      borderTopLeftRadius: 0 * BW(),
      // borderBottomLeftRadius: 30 * BW(),
      backgroundColor: colors.secondaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopEndRadius: 20 * BW(),
      borderBottomEndRadius: 20 * BW(),
    },
  });
