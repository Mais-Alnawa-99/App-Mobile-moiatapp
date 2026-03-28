import React from 'react';
import RenderHtml, {
  defaultSystemFonts,
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import {Dimensions} from 'react-native';
import theme, {BW} from '../../style/theme';
import {isArabic} from '../../locales';
import {useTheme} from '@react-navigation/native';
const RenderHtmlComponent = ({
  description,
  noAutoWidth,
  styleBody,
  styleSpan,
  baseStyle,
  textColor,
  ...props
}: {
  description?: any;
  noAutoWidth?: boolean;
  styleBody?: {};
  styleSpan?: any;
  baseStyle?: any;
  textColor?: any;
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
    .replace(/<tbody[^>]*>(.*?)<\/tbody>/g, '<div>$1</div>')
    .replace(/<figure[^>]*>(.*?)<\/figure>/g, '<div>$1</div>')
    .replace(/<table[^>]*>(.*?)<\/table>/g, '<div>$1</div>')
    .replace(/<label[^>]*>(.*?)<\/label>/g, '<span>$1</span>')
    .replace(/<span[^>]*>(.*?)<\/span>/g, '<span>$1</span>');

  const {colors} = useTheme();
  return (
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
          color: textColor ? textColor : colors.text,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          fontWeight: 'normal',
        },
        h3: {
          color: textColor ? textColor : colors.text,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
        },
        u: {
          fontFamily: theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
          color: textColor ? textColor : colors.text,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          fontWeight: 'normal',
        },
        font: {
          fontFamily: theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
          color: textColor ? textColor : colors.text,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          fontWeight: 'normal',
        },
        div: {
          fontFamily: theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
          color: textColor ? textColor : colors.text,
          marginBottom: 0,
          marginLeft: 0,
          marginTop: 0,
          marginRight: 0,
          fontWeight: 'normal',
        },
        span: {
          fontFamily: theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
          color: textColor ? textColor : colors.text,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
        },

        i: {
          fontFamily: theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
          color: textColor ? textColor : colors.text,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          fontWeight: 'normal',
        },
        b: {
          fontFamily: theme.themeObject.currentFontFamily.normal,
          fontSize: theme.themeObject.currentFontSize.h4,
          color: textColor ? textColor : colors.text,
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
          color: textColor ? textColor : colors.text,
          direction: isArabic() ? 'rtl' : 'ltr',
          lineHeight: 25 * BW(),
          paddingHorizontal: 16 * BW(),
          writingDirection: isArabic() ? 'rtl' : 'ltr',
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          margin: 0,
          backgroundColor: 'transparent',
          fontWeight: 'normal',
          width: noAutoWidth ? Dimensions.get('screen').width : 'auto',
          ...styleBody,
        },
      }}
      systemFonts={systemFonts}
      baseStyle={{
        fontFamily: theme.themeObject.currentFontFamily.normal,
        alignItems: 'center',
        color: textColor ? textColor : colors.text,
        ...baseStyle,
      }}
    />
  );
};
export default RenderHtmlComponent;
