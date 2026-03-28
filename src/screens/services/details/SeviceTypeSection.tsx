import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BW} from '../../../style/theme';
import Text from '../../../component/Text';
import FlatListComp from '../../../component/FlatList';

export default function SeviceTypeDetails(props: any): JSX.Element {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const style = getStyle(colors);

  const details = props.details;
  const data = props.data;

  let detailsData = [
    {
      icon: require('../../../assets/services/details/Folders.png'),
      title: t('ServiceSubCategory'),

      description:
        (details?.FieldValues?.ServiceSubCategories &&
          details?.FieldValues?.ServiceSubCategories[0]?.FieldValues.Title) ||
        data?.FieldValues?.ServiceSubCategories?.[0]?.FieldValues?.Title,
    },
    {
      icon: require('../../../assets/services/details/File.png'),
      title: t('ServiceType'),
      description:
        details?.FieldValues?.ServiceTypes[0]?.FieldValues?.Title ||
        data?.FieldValues?.ServiceTypes?.[0]?.FieldValues?.Title,
    },
    {
      icon: require('../../../assets/services/details/Hourglass.png'),
      title: t('ServiceTime'),
      description: data?.FieldValues.ServiceTime,
    },
    {
      icon: require('../../../assets/services/details/UsersThree.png'),
      title: t('TargetAudience'),
      description:
        details?.FieldValues?.ServiceTargetAudience[0]?.FieldValues.Title ||
        data?.FieldValues?.ServiceTargetAudience?.[0]?.FieldValues?.Title,
    },
    {
      icon: require('../../../assets/services/details/Clock.png'),
      title: t('ServiceAvailability'),
      description: t('alwaysAvailable'),
    },
    {
      icon: require('../../../assets/services/details/CreditCard.png'),
      title: t('PaymentChannels'),
      description: [t('MasterCard'), t('VisaCard')],
    },
    {
      icon: require('../../../assets/services/details/TelevisionSimple.png'),
      title: t('ServiceChannels'),
      description: [t('MOIATWebsite'), t('MOIATMobileApp')],
    },
  ];

  return (
    <View style={{flexDirection: 'row'}}>
      {detailsData?.length != 0 && (
        <FlatListComp
          data={detailsData}
          scrollview
          horizontal
          contentContainerStyle={{
            gap: 8 * BW(),
          }}
          renderItem={({item, index}: any) => (
            <Card key={index} item={item} index={index} style={style} />
          )}
        />
      )}
    </View>
  );
}

const Card = ({item, index, style}: {item: any; index: any; style: any}) => {
  return (
    <View key={index} style={style.card}>
      <Image source={item.icon} style={style.icon} />
      <Text h4 style={style.title}>
        {item.title}:
      </Text>
      {!!Array.isArray(item.description) ? (
        item.description.map((item: any, index: number) => (
          <View
            key={index}
            style={[style.row, {marginTop: index == 0 ? 2 * BW() : 0}]}>
            <Text h4 key={index} style={style.itemDesc}>
              {item}
            </Text>
          </View>
        ))
      ) : (
        <Text h4 numberOfLines={3} style={style.itemDesc}>
          {item.description}
        </Text>
      )}
    </View>
  );
};

const getStyle = (colors: any) =>
  StyleSheet.create({
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: {
      width: 30 * BW(),
      height: 30 * BW(),
      tintColor: colors.iconPrimaryColor,
      resizeMode: 'center',
    },
    desc: {
      marginTop: 2 * BW(),
      color: colors.primaryColor + '99',
    },
    itemDesc: {
      color: colors.textPrimaryColor + '99',
      marginStart: 6 * BW(),
    },
    dot: {
      width: 4 * BW(),
      height: 4 * BW(),
      borderRadius: 10 * BW(),
      backgroundColor: colors.primaryColor + '99',
    },
    title: {
      marginTop: 6 * BW(),
      color: colors.textPrimaryColor,
    },
    card: {
      backgroundColor: colors.white + '76',
      padding: 12 * BW(),
      borderRadius: 10 * BW(),
      width: 140 * BW(),
    },
  });
