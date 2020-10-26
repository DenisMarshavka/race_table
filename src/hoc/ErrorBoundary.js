import React from 'react';
import * as Sentry from '@sentry/react-native';
import {SafeAreaView, View, Text} from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, 'Sentry Error Info: ', error);

    Sentry.captureException(error, errorInfo);
    Sentry.captureException(error);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {!this.state.hasError ? (
          this.props.children
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{flex: 1}}>Error</Text>
          </View>
        )}
      </View>
    );
  }
}

export default ErrorBoundary;
