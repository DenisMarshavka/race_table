import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import Constans from './../../utils/constans';
import styles from './styles';

const Wrap = ({children = [], style = {}}) => (
  <View style={{...styles.wrap, ...style}}>{children}</View>
);

export default ({
  style = {},
  wrapStyle = {},
  textStyle = {},
  activityIndicatorProps = {},

  loading = true,
  children = null,
  error = null,
  errorInfo = 'Oh no! Error when fetching the Data :(',
}) => (
  <View style={{flex: 1, ...style}}>
    {loading ? (
      <Wrap style={{...wrapStyle}}>
        <ActivityIndicator
          size="large"
          color={Constans.THEME.colors.primary}
          {...activityIndicatorProps}
        />
      </Wrap>
    ) : !error && children ? (
      children
    ) : (
      <Wrap style={{...wrapStyle}}>
        <Text style={{...textStyle}}>{errorInfo}</Text>
      </Wrap>
    )}
  </View>
);
