import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from './Text';
import Button from './Button';
import {BW} from '../style/theme';
import {isArabic} from '../locales';
import {useTheme} from '@react-navigation/native';
import {opacity} from 'react-native-reanimated/lib/typescript/Colors';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage >= 2) pages.push(1);
      if (currentPage > 3) pages.push('...');

      if (currentPage - 1 > 1) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage + 1 < totalPages) pages.push(currentPage + 1);

      if (currentPage < totalPages - 2) pages.push('...');
      if (currentPage < totalPages) pages.push(totalPages);
    }

    return pages;
  };
  if (totalCount == 0) {
    return null;
  }
  return (
    <View style={styles.paginationContainer}>
      <Button
        onPress={() => onPageChange(Math.max(currentPage - 1, 1))}
        containerIcon={styles.imgContainer}
        icon={require('../assets/icons/back.png')}
        disabled={currentPage === 1}
        styleIcon={{tintColor: colors.primary}}
        style={{
          ...styles.paginationButton,
          transform: [{scaleX: isArabic() ? -1 : 1}],
          opacity: currentPage === 1 ? 0 : 1,
        }}
      />

      {getPages().map((page, index) =>
        typeof page === 'number' ? (
          <TouchableOpacity
            key={index}
            style={[
              styles.pageButton,
              currentPage === page && styles.activePage,
            ]}
            onPress={() => onPageChange(page)}
            disabled={currentPage === page}>
            <Text
              style={
                currentPage === page ? styles.activePageText : styles.pageText
              }>
              {page}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text key={index} style={styles.pageText}>
            {page}
          </Text>
        ),
      )}

      <Button
        onPress={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        containerIcon={styles.imgContainer}
        icon={require('../assets/icons/back.png')}
        disabled={currentPage === totalPages}
        styleIcon={{tintColor: colors.primary}}
        style={{
          ...styles.paginationButton,
          transform: [{scaleX: isArabic() ? 1 : -1}],
          opacity: currentPage === totalPages ? 0 : 1,
        }}
      />
    </View>
  );
};

export default Pagination;

const getStyles = (colors: any) =>
  StyleSheet.create({
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 8 * BW(),
    },
    paginationButton: {
      width: 'auto',
      height: 'auto',
    },
    imgContainer: {
      width: 16 * BW(),
      height: 16 * BW(),
    },
    pageButton: {
      width: 35 * BW(),
      height: 35 * BW(),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5 * BW(),
      borderWidth: 1 * BW(),
      borderColor: colors.border,
      marginHorizontal: 5 * BW(),
      backgroundColor: colors.white,
    },
    activePage: {
      backgroundColor: colors.textPrimaryColor,
      borderColor: colors.primary,
    },
    pageText: {
      fontSize: 14 * BW(),
      color: colors.text,
    },
    activePageText: {
      fontSize: 14 * BW(),
      color: colors.white,
      fontWeight: 'bold',
    },
  });
