import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import theme, {BW} from '../style/theme';
import {useTheme} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Text from './Text';
import {isArabic} from '../locales';
import {useTranslation} from 'react-i18next';

type Props = {
  data?: any;
  CARD_WIDTH_SPACING?: any;
  renderItem?: any;
  horizontal?: boolean;
  onEndReached?: () => void;
  onRefresh?: any;
  onEndReachedThreshold?: number;
  moreLoading?: boolean;
  keyProps?: string;
  numColumns?: number;
  props?: any;
  style?: any;
  flatListRef?: any;
  contentContainerStyle?: {};
  scrollview?: boolean;
  scrollEnabled?: boolean;
  noData?: boolean;
  columnWrapperStyle?: object;
};
export default function FlatListComp({
  data,
  CARD_WIDTH_SPACING,
  renderItem,
  horizontal,
  onEndReached,
  onRefresh,
  onEndReachedThreshold,
  moreLoading,
  keyProps = '#',
  numColumns,
  flatListRef,
  contentContainerStyle,
  scrollview,
  noData,
  columnWrapperStyle,
  ...props
}: Props): JSX.Element {
  const {t} = useTranslation();
  const renderFooterComponent = () => {
    if (moreLoading) {
      return (
        <ActivityIndicator
          color={theme.themeObject.colors.primaryColor}
          size={10 * BW()}
          style={{
            marginVertical: 10 * BW(),
          }}
        />
      );
    }
    return null;
  };
  const {colors}: any = useTheme();
  if (scrollview) {
    return (
      <ScrollView
        contentContainerStyle={
          data?.length == 0 ? {flex: 1} : contentContainerStyle
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={horizontal}
        {...props}
        refreshControl={
          onRefresh && (
            <RefreshControl
              refreshing={false}
              tintColor={colors.primary}
              onRefresh={onRefresh}
            />
          )
        }>
        {data?.length != 0 &&
          data?.map((item: any, index: number) => (
            <React.Fragment key={index}>
              {renderItem({item, index})}
            </React.Fragment>
          ))}
        {moreLoading && (
          <View
            style={{
              padding: 8 * BW(),
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              width: '100%',
            }}>
            <ActivityIndicator size="small" />
          </View>
        )}
        {data?.length == 0 && noData && (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text h3 style={{color: colors.textPrimaryColor}}>
              {t('IL.EmptyData')}
            </Text>
          </View>
        )}
      </ScrollView>
    );
  } else {
    return (data?.length == 0 || data == null) && noData ? (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text h3 style={{color: colors.textPrimaryColor}}>
          {t('IL.EmptyData')}
        </Text>
      </View>
    ) : (
      <FlatList
        data={data}
        columnWrapperStyle={columnWrapperStyle}
        horizontal={horizontal}
        snapToInterval={CARD_WIDTH_SPACING}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        key={keyProps}
        ref={flatListRef}
        numColumns={numColumns ? numColumns : 1}
        keyExtractor={(i, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooterComponent}
        refreshControl={
          onRefresh && (
            <RefreshControl
              refreshing={false}
              tintColor={colors.primary}
              onRefresh={onRefresh}
            />
          )
        }
        contentContainerStyle={contentContainerStyle}
        {...props}
      />
    );
  }
}
