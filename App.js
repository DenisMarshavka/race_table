/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import * as Sentry from '@sentry/react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {enableScreens} from 'react-native-screens';
enableScreens();

import AppNavigator from './navigation';
import configureStore from './reducers';
import ErrorBoundary from './hoc/ErrorBoundary';

Sentry.init({
  dsn:
    'https://89cc3cadf42f465491c11f2fdf305423@o466193.ingest.sentry.io/5480311',
  enableAutoSessionTracking: true,
});

const store = configureStore();

const App: () => React$Node = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
