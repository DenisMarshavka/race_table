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
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
enableScreens();

import AppNavigator from './src/navigation';
import configureStore from './src/reducers';
import ErrorBoundary from './src/hoc/ErrorBoundary';

import {getAllDrivers} from './src/actions/drivers';

Sentry.init({
  dsn:
    'https://89cc3cadf42f465491c11f2fdf305423@o466193.ingest.sentry.io/5480311',
  enableAutoSessionTracking: true,
});

const store = configureStore();

const theme = {
  ...DefaultTheme,
};

const App: () => React$Node = () => {
  const [apploading, setAppLoading] = React.useState(true);
  const [
    upproveToChangeLoadingStatus,
    setUpproveToChangeLoadingStatus,
  ] = React.useState(true);

  React.useEffect(() => {
    store.dispatch(getAllDrivers());

    () => {
      setUpproveToChangeLoadingStatus(false);
    };
  }, []);

  React.useEffect(() => {
    if (!apploading && upproveToChangeLoadingStatus) SplashScreen.hide();
  }, [apploading, upproveToChangeLoadingStatus]);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AppNavigator hadleAppLoadingSet={setAppLoading} />
        </PaperProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
