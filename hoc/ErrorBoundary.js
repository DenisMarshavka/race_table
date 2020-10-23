import React from 'react';
import * as Sentry from '@sentry/react-native';
import {SafeAreaView} from 'react-native';

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
    return <SafeAreaView style={{flex: 1}}>{this.props.children}</SafeAreaView>;
  }
}

export default ErrorBoundary;
