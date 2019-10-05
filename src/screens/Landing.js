import React from 'react';
import {View, StatusBar, AsyncStorage, ActivityIndicator} from 'react-native';

class AuthLandingScreen extends React.Component {
  componentDidMount() {
    this._Async();
  }

  _Async = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLandingScreen;
