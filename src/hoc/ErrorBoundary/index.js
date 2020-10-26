import React from 'react';
import * as Sentry from '@sentry/react-native';
import {View, Text} from 'react-native';

import styles from './styles';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.warn(error, 'Sentry Error Info: ', error);

    Sentry.captureException(error, errorInfo);
    Sentry.captureException(error);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {!this.state.hasError ? (
          this.props.children
        ) : (
          <View style={styles.wrap}>
            <Text style={styles.text}>Oops, Something Went Wrong :(</Text>
          </View>
        )}
      </View>
    );
  }
}

export default ErrorBoundary;
