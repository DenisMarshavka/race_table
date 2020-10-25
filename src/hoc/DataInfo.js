import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const Wrap = ({children = [], style = {}}) => (
  <View
    style={{flex: 1, justifyContent: 'center', alignItems: 'center', ...style}}>
    {children}
  </View>
);

export default ({
  style = {},
  wrapStyle = {},
  textStyle = {},
  activityIndicatorProps = {},

  loading = true,
  children = null,
  error = null,
  errorInfo = 'Error when fetched the Data :(',
}) => (
  <View style={{flex: 1, ...style}}>
    {loading ? (
      <Wrap style={{...wrapStyle}}>
        <ActivityIndicator
          size="large"
          color="red"
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
