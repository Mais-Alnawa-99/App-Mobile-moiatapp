import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Text from '../../component/Text';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../style/theme';
import Button from '../../component/Button';
import NavigationService from '../../navigation/NavigationService';
import {isArabic} from '../../locales';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {setFavouriteServices} from '../../redux/reducers/Services/slice/favouriteServices';
import {_updateUserFavouriteServices} from './FavouriteServices';

export default function ServiceCard({
  item,
  listView,
  index,
  styleCard,
  animation,
  numberOfTitleLines,
  fromDetails,
}: {
  item: any;
  listView: boolean;
  index: number;
  styleCard: {};
  animation?: string;
  numberOfTitleLines?: number;
  fromDetails?: boolean;
}): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const style = getStyle(colors);

  const {favouriteServices} = useAppSelector(state => state.favouriteServices);
  const {isLoggedIn} = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const isFavourite = favouriteServices.some((fav: any) => fav.Id === item.Id);
  const _setFavouriteServices = (item: any) => {
    _updateUserFavouriteServices(item, isFavourite);
  };

  return (
    <Animatable.View
      key={index}
      duration={700}
      delay={100 * index < 1600 ? 100 * index : 10 * index}
      animation={
        animation
          ? animation
          : index % 2 != 0
          ? isArabic()
            ? 'fadeInLeft'
            : 'fadeInRight'
          : isArabic()
          ? 'fadeInRight'
          : 'fadeInLeft'
      }
      style={[
        style.card,
        {
          minHeight: listView ? 100 * BW() : 120 * BW(),
          width: listView ? '100%' : '49%',
          ...styleCard,
        },
      ]}>
      <Text
        h4
        style={{color: colors?.textPrimaryColor}}
        numberOfLines={numberOfTitleLines ? numberOfTitleLines : 0}>
        {item?.FieldValues != undefined && item?.FieldValues?.Title}
      </Text>
      <View style={style.btnContainer}>
        <Button
          style={{
            ...style.startBtn,
            opacity:
              !!item?.relatedServiceId &&
              typeof item?.relatedServiceId == 'number'
                ? 1
                : 0,
          }}
          disabled={
            !!item?.relatedServiceId &&
            typeof item?.relatedServiceId == 'number'
              ? false
              : true
          }
          styleIcon={style.iconHeart}
          antDesignColor={colors?.iconPrimaryColor}
          onPress={() => {
            _setFavouriteServices(item);
          }}
          antDesign={isFavourite ? 'heart' : 'hearto'}
        />
        <Button
          title={t('start')}
          antDesign={'arrowright'}
          style={style.startBtn}
          styleText={style.startTxt}
          antDesignColor={style.secondaryColor.color}
          antDesignSize={14 * BW()}
          styleIcon={{transform: [{rotate: isArabic() ? '180deg' : '0deg'}]}}
          onPress={() => {
            fromDetails
              ? NavigationService.replace('ServiceDetails', {item})
              : NavigationService.navigate('ServiceDetails', {item});
            // !isLoggedIn &&
            //   dispatch(setWebviewUrl(item?.FieldValues?.StartServiceURL));
            // dispatch(setNeedRefreshToken(true));
            // NavigationService.navigate('WebViewScreen', {
            //   url: item?.FieldValues?.ServiceFullURL,
            //   hideDrawer: true,
            //   title: item?.FieldValues != undefined && item?.FieldValues?.Title,
            // });
          }}
        />
      </View>
    </Animatable.View>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    secondaryColor: {
      color: colors?.secondaryColor,
    },
    card: {
      minHeight: 120 * BW(),
      borderRadius: 10 * BW(),
      backgroundColor: colors.background,
      padding: 8 * BW(),
      paddingTop: 12 * BW(),
      paddingBottom: 8 * BW(),
      justifyContent: 'space-between',
    },
    iconHeart: {
      tintColor: colors?.iconPrimaryColor,
      width: 22 * BW(),
      height: 22 * BW(),
    },
    startBtn: {
      width: 'auto',
      height: 'auto',
      padding: 0,
      borderRadius: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20 * BW(),
    },
    startTxt: {
      color: colors?.secondaryColor,
      marginEnd: 6 * BW(),
    },
  });
