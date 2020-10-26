import 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {TablesScreen} from '../screens';

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
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Table"
        screenOptions={{
          gestureEnabled: true,
        }}>
        <Stack.Screen
          name="Table"
          component={TablesScreen}
          options={{
            headerShown: false,
            headerLeft: null,
            visible: false,
            transitionSpec: {
              open: config,
              close: config,
            },
            ...TransitionPresets.SlideFromRightIOS,
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
