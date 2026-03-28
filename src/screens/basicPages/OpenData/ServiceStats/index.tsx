import React, {Fragment, useEffect, useState} from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {parseDocument} from 'htmlparser2';
import {DomUtils} from 'htmlparser2';

import {BW} from '../../../../style/theme';
import {isArabic} from '../../../../locales';
import RenderHtmlComponent from '../../../../component/renderHtml/RenderHtml';
import {getServiceHighlightsCards} from '../../../../redux/reducers/OpenData/thunk/openData';
import {useAppDispatch} from '../../../../redux/store';
import MostUsedServicesStats from './MostUsedServicesStats';
import ServicesStats from './ServicesStats';
import Loader from '../../../../component/Loader';

const extractStatsFromHtml = (html: string) => {
  const doc = parseDocument(html);
  const paragraphs = DomUtils.findAll(elem => elem.name === 'p', doc.children);

  const results = [];
  for (let i = 0; i < paragraphs.length; i += 2) {
    const number = DomUtils.getText(paragraphs[i]);
    const label = DomUtils.getText(paragraphs[i + 1]);
    results.push({label, value: number});
  }
  return results;
};

export default function ServiceStats(): JSX.Element {
  const {t} = useTranslation();
  const {colors}: any = useTheme();
  const styles = getStyle(colors);
  const dispatch = useAppDispatch();
  const [serviceHighlightsCardsHTML, setServiceHighlightsCardsHTML] =
    useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [servicesStats, setServicesStats]: any = useState([]);
  const [mostUsedServicesStats, setMostUsedServicesStats]: any = useState([]);

  const [accordionActive, setAccordionActive] = useState({
    1: true,
    2: false,
  });

  const _getServiceHighlightsCards = () => {
    setIsLoading(true);
    dispatch(getServiceHighlightsCards()).then((res: any) => {
      if (res?.payload?.networkSuccess) {
        setServiceHighlightsCardsHTML(res.payload?.data);

        const stats = extractStatsFromHtml(String(res.payload?.data));
        setServicesStats(stats);

        const regexUsage =
          /<div class="w-10[^>]*?text-end">([\d.%]+)<\/div>[\s\S]*?<div class="text-sm[^>]*?">(.*?)<\/div>/g;

        const usageStats = [];
        let match;
        while ((match = regexUsage.exec(String(res.payload?.data))) !== null) {
          usageStats.push({
            percentage: match[1].trim(),
            service: match[2].trim(),
          });
        }
        setMostUsedServicesStats(usageStats || []);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    _getServiceHighlightsCards();
  }, []);
  return (
    <Loader isLoading={isLoading}>
      {servicesStats.length > 0 && mostUsedServicesStats.length > 0 ? (
        <>
          {servicesStats.length > 0 && (
            <ServicesStats
              data={servicesStats}
              isExpanded={accordionActive[1]}
              onToggle={() =>
                setAccordionActive({1: !accordionActive[1], 2: false})
              }
              colors={colors}
              isArabic={isArabic}
            />
          )}

          {mostUsedServicesStats.length > 0 && (
            <MostUsedServicesStats
              data={mostUsedServicesStats}
              isExpanded={accordionActive[2]}
              onToggle={() =>
                setAccordionActive({1: false, 2: !accordionActive[2]})
              }
              colors={colors}
              isArabic={isArabic}
            />
          )}
        </>
      ) : (
        <RenderHtmlComponent
          description={serviceHighlightsCardsHTML?.toString?.()}
          noAutoWidth
        />
      )}
    </Loader>
  );
}

const getStyle = (colors: any) =>
  StyleSheet.create({
    container: {},
    title: {
      marginTop: 16 * BW(),
    },
    subtitle: {
      color: colors.textColor,
      marginBottom: 8 * BW(),
    },

    submit: {
      marginTop: 20 * BW(),
      backgroundColor: colors.secondaryColor,
      minHeight: 40 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
    },
  });
