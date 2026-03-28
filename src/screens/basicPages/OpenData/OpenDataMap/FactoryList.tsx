import React, {useState} from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import Accordion from '../../../../component/Accordion';
import Text from '../../../../component/Text';
import DashedLine from '../../../../component/DashedLine';
import {BW} from '../../../../style/theme';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';

export default function FactoryList({
  features,
  labels,
  colors,
  isArabic,
}: {
  features: any[];
  labels: Record<string, string>;
  colors: any;
  isArabic: () => boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const {t} = useTranslation();
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View>
      {features?.map((item, index) => {
        const p = item.properties;
        const coords = item.geometry?.coordinates;

        return (
          <Accordion
            key={p.ID}
            title={p.CompanyName?.trim() || 'Factory'}
            onPress={() => toggleAccordion(index)}
            expandedDefault={activeIndex === index}
            styleHeader={{backgroundColor: colors.mainWhite}}
            styleTilte={{color: colors.black}}
            styleIcon={{tintColor: colors.secondaryColor}}
            styleConatiner={{marginTop: 16 * BW()}}
            styleBody={{
              padding: 16 * BW(),
              backgroundColor: 'transparent',
              borderColor: colors.gray,
              borderWidth: 1 * BW(),
              borderTopWidth: 0,
            }}>
            <View style={{paddingBottom: 10 * BW()}}>
              <Row label={labels.Emirate || t('emirate')} value={p.Emirate} />
              <Row label={labels.Area} value={p.Area} />
              <Row label={labels.Address} value={p.Address} />
              <Row label={labels.Contact} value={p.ContactPhone} />
              {p.ContactEmail && (
                <Row
                  label={labels.ContactEmail || t('EmailLabel')}
                  value={p.ContactEmail}
                  isLink={true}
                  linkType="email"
                />
              )}
              {p.Website && (
                <Row
                  label={labels.Website}
                  value={p.Website}
                  isLink={true}
                  linkType="web"
                />
              )}
              {coords && (
                <Row
                  label={isArabic() ? 'الموقع على الخريطة' : 'Map Location'}
                  value={isArabic() ? 'عرض على الخريطة' : 'View on map'}
                  isLink={true}
                  linkType="map"
                  mapCoords={coords}
                  style={{marginBottom: 0}}
                />
              )}
            </View>
          </Accordion>
        );
      })}
    </View>
  );
}

function Row({
  label,
  value,
  isLink = false,
  linkType,
  mapCoords,
  style = {},
}: {
  label: string;
  value: string;
  isLink?: boolean;
  linkType?: 'web' | 'email' | 'map';
  mapCoords?: string[];
  style?: any;
}) {
  const {colors}: any = useTheme();
  const openLink = () => {
    if (!isLink) return;
    let url = '';

    switch (linkType) {
      case 'web':
        url = value.startsWith('http') ? value : `https://${value}`;
        break;
      case 'email':
        url = `mailto:${value}`;
        break;
      case 'map':
        url = `https://maps.google.com/?q=${mapCoords?.[1]},${mapCoords?.[0]}`;
        break;
    }

    if (url) Linking.openURL(url);
  };

  return (
    <View
      style={{
        marginBottom: 8 * BW(),
        flexDirection: 'row',
        gap: 8 * BW(),
        ...style,
      }}>
      <Text h4>
        {label}
        {':'}
      </Text>
      <TouchableOpacity
        style={{flex: 1}}
        disabled={!isLink}
        onPress={openLink}>
        <Text
          h4
          bold
          style={{
            color: isLink ? colors.secondaryColor : colors.darkGray,
            textDecorationLine: isLink ? 'underline' : 'none',
          }}>
          {value}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
