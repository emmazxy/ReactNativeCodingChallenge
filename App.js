import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './src/screens/Login';
import AuthLandingScreen from './src/screens/Landing';
import HomeScreen from './src/screens/Home';

const AppStack = createStackNavigator({Home: HomeScreen});
const AuthStack = createStackNavigator({Login: LoginScreen});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLanding: AuthLandingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLanding',
    },
  ),
);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
