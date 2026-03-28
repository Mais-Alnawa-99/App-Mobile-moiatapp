import React, {Fragment} from 'react';
import {View} from 'react-native';
import Accordion from '../../../../component/Accordion';
import Text from '../../../../component/Text';
import DashedLine from '../../../../component/DashedLine';
import {BW} from '../../../../style/theme';

export default function MostUsedServicesStats({
  data,
  isExpanded,
  onToggle,
  colors,
  isArabic,
}: {
  data: any[];
  isExpanded: boolean;
  onToggle: () => void;
  colors: any;
  isArabic: () => boolean;
}) {
  return (
    <Accordion
      title={isArabic() ? 'أكثر الخدمات استخداماً' : 'Most Used Services'}
      bold
      onPress={onToggle}
      expandedDefault={isExpanded}
      styleHeader={{
        backgroundColor: colors.white,
      }}
      styleTilte={{color: colors.text}}
      styleIcon={{tintColor: colors.secondaryColor}}
      styleBody={{
        padding: 16 * BW(),
        backgroundColor: 'transparent',
        borderColor: colors.gray,
        borderWidth: 1 * BW(),
        borderTopWidth: 0,
      }}>
      {data.map((item: any, index: number) => (
        <Fragment key={index}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text h4>{item.service}</Text>
            <Text h4 bold style={{color: colors.secondaryColor}}>
              {item.percentage}
            </Text>
          </View>
          {index !== data.length - 1 && <DashedLine />}
        </Fragment>
      ))}
    </Accordion>
  );
}
