import React, {useEffect, useRef, useState} from 'react';
import RenderHtml, {
  defaultSystemFonts,
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import theme, {BW} from '../../style/theme';
import {isArabic} from '../../locales';
import {useTheme} from '@react-navigation/native';
import Text from '../Text';
const RenderHtmlComponent = ({
  description,
  noAutoWidth,
  styleBody,
  styleSpan,
  ...props
}: {
  description?: any;
  noAutoWidth?: boolean;
  styleBody?: {};
  styleSpan?: any;
}): JSX.Element => {
  const systemFonts = [
    ...defaultSystemFonts,
    theme.themeObject.currentFontFamily.normal,
  ];
  const customHTMLElementModels = {
    font: HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.block,
    }),
  };
  let cleanedString = description
    .replace(/:&nbsp;/g, '')
    .replace(/&;/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace('<p></p>', '');
  let htmlContent = cleanedString
    .replace(/<td[^>]*>(.*?)<\/td>/g, '<div>$1</div>')
    .replace(/<tr[^>]*>(.*?)<\/tr>/g, '<div>$1</div>')
    .replace(/<\/?form[^>]*>/g, '')
    .replace(/<tbody[^>]*>(.*?)<\/tbody>/g, '<div>$1</div>')
    .replace(/<figure[^>]*>(.*?)<\/figure>/g, '<div>$1</div>')
    .replace(/<table[^>]*>(.*?)<\/table>/g, '<div>$1</div>')
    .replace(/<label[^>]*>(.*?)<\/label>/g, '<span>$1</span>')
    .replace(/<span[^>]*>(.*?)<\/span>/g, '<span>$1</span>')
    .replace(/<h5[^>]*>(.*?)<\/h5>/g, '<h5>$1</h5>');

  const {colors}: any = useTheme();

  const [showFull, setShowFull] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [measured, setMeasured] = useState(false);

  const contentRef: any = useRef(null);

  const maxHeight = 110 * BW();
  const readMoreHeight = 60 * BW();

  useEffect(() => {
    setTimeout(() => {
      if (contentRef.current) {
        contentRef?.current?.measure(
          (x: any, y: any, width: any, height: any) => {
            setContentHeight(height);
            setMeasured(true);
          },
        );
      }
    }, 500);
  }, [description]);

  return (
    <View>
      <View
        ref={contentRef}
        style={{
          maxHeight:
            showFull || contentHeight <= readMoreHeight ? undefined : maxHeight,
          overflow: 'hidden',
        }}>
        <RenderHtml
          source={{
            html: `
                          <div >
                          ${htmlContent}
                          </div>
                          `,
          }}
          customHTMLElementModels={customHTMLElementModels}
          contentWidth={Dimensions.get('screen').width - 10 * BW()}
          tagsStyles={{
            p: {
              fontFamily: theme.themeObject.currentFontFamily.normal,
              fontSize: theme.themeObject.currentFontSize.h4,
              color: colors.text,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              fontWeight: 'normal',
            },
            h3: {
              color: colors.text,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
            },
            u: {
              fontFamily: theme.themeObject.currentFontFamily.normal,
              fontSize: theme.themeObject.currentFontSize.h4,
              color: colors.text,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              fontWeight: 'normal',
            },
            font: {
              fontFamily: theme.themeObject.currentFontFamily.normal,
              fontSize: theme.themeObject.currentFontSize.h4,
              color: colors.text,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              fontWeight: 'normal',
            },
            div: {
              fontFamily: theme.themeObject.currentFontFamily.normal,
              fontSize: theme.themeObject.currentFontSize.h4,
              color: colors.text,
              marginBottom: 0,
              marginLeft: 0,
              marginTop: 0,
              marginRight: 0,
              fontWeight: 'normal',
            },
            span: {
              fontFamily: theme.themeObject.currentFontFamily.normal,
              fontSize: theme.themeObject.currentFontSize.h4,
              color: colors.text,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
            },

            i: {
              fontFamily: theme.themeObject.currentFontFamily.normal,
              fontSize: theme.themeObject.currentFontSize.h4,
              color: colors.text,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              fontWeight: 'normal',
            },
            b: {
              fontFamily: theme.themeObject.currentFontFamily.normal,
              fontSize: theme.themeObject.currentFontSize.h4,
              color: colors.text,
              marginBottom: 0,
              marginRight: 0,
              marginLeft: 0,
              marginTop: 0,
              fontWeight: 'normal',
            },
            strong: {
              fontFamily: theme.themeObject.currentFontFamily.normal,
              fontSize: theme.themeObject.currentFontSize.h4,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
            },
            li: {
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              fontSize: theme.themeObject.currentFontSize.h4,
              fontWeight: 'normal',
            },
            ul: {
              marginBottom: 0,
              marginRight: 0,
              marginLeft: 0,
              marginTop: 0,
              fontSize: theme.themeObject.currentFontSize.h4,
              fontWeight: 'normal',
            },
            body: {
              fontFamily: theme.themeObject.currentFontFamily.normal,
              fontSize: theme.themeObject.currentFontSize.h4,
              color: colors.text,
              direction: isArabic() ? 'rtl' : 'ltr',
              lineHeight: 25 * BW(),
              paddingHorizontal: 6 * BW(),
              writingDirection: isArabic() ? 'rtl' : 'ltr',
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              margin: 0,
              backgroundColor: 'transparent',
              fontWeight: 'normal',
              width: noAutoWidth
                ? Dimensions.get('screen').width - 40 * BW()
                : 'auto',
              ...styleBody,
            },
          }}
          systemFonts={systemFonts}
          baseStyle={{
            fontFamily: theme.themeObject.currentFontFamily.normal,
            alignItems: 'center',
            color: colors.text,
          }}
        />
      </View>

      {measured && contentHeight > readMoreHeight && (
        <TouchableOpacity
          style={{
            margin: 8 * BW(),
            alignSelf: 'flex-start',
            borderBottomWidth: 1 * BW(),
            borderBottomColor: colors.red,
          }}
          onPress={() => setShowFull(!showFull)}>
          <Text
            h4
            bold
            style={{
              color: colors.textPrimaryColor,
            }}>
            {showFull
              ? isArabic()
                ? 'عرض أقل'
                : 'Read Less'
              : isArabic()
              ? 'عرض المزيد'
              : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default RenderHtmlComponent;
