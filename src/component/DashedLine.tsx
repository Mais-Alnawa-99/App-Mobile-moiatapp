import React from 'react';

import {View} from 'react-native';
import {BW} from '../style/theme';
const DashedLine = ({
  dashLength = 6,
  dashSpacing = 6,
  dashColor = '#D4DDEA',
  dashCount = 30,
  column = false,
  style = {},
}) => {
  dashCount = dashCount * BW();
  dashSpacing = dashSpacing * BW();
  const dashes = Array.from({length: dashCount});

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flexDirection: column ? 'column' : 'row',
        justifyContent: 'space-between',
        marginVertical: 8 * BW(),
        ...style,
      }}>
      {dashes.map(
        (_, index) =>
          index < dashCount - 6 && (
            <View
              key={index}
              // eslint-disable-next-line react-native/no-inline-styles
              style={
                column
                  ? {
                      width: 0.6 * BW(),
                      height: dashLength,
                      backgroundColor: dashColor,
                      marginTop: index !== dashCount - 1 ? dashSpacing : 0,
                    }
                  : {
                      width: dashLength,
                      height: 0.6 * BW(),
                      backgroundColor: dashColor,
                      marginRight: index !== dashCount - 1 ? dashSpacing : 0,
                    }
              }
            />
          ),
      )}
    </View>
  );
};

export default DashedLine;
