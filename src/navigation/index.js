import 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {TablesScreen, DriverProfileScreen} from '../screens';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: false,
  },
};

const AppNavigator = (props) => {
  const {hadleAppLoadingSet = () => {}} = props;

  console.log('onAppLoaded', hadleAppLoadingSet);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Table"
        screenOptions={{
          gestureEnabled: true,
        }}>
        <Stack.Screen
          name="Table"
          options={{
            headerShown: false,
            headerLeft: null,
            visible: false,
            transitionSpec: {
              open: config,
              close: config,
            },
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          {(propsScreen) => (
            <TablesScreen
              onAppLoadingSet={hadleAppLoadingSet}
              {...propsScreen}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="DriverProfile"
          component={DriverProfileScreen}
          options={{
            headerShown: false,
            headerLeft: null,
            visible: false,
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     currentUser: state.currentUser.currentUser,
//   };
// };

export default connect(/*mapStateToProps*/ null, null)(AppNavigator);
