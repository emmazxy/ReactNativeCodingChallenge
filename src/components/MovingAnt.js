import React from 'react';
import {View, StyleSheet, Animated, Easing, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export class MovingAnt extends React.Component {
  constructor() {
    super();
    this.state = {
      xValue: new Animated.Value(0),
      duration: 7000 + Math.random() * 3000,
    };
  }

  _moveAnimation = () => {
    this.state.xValue.setValue(0);
    Animated.timing(this.state.xValue, {
      toValue: width,
      duration: this.state.duration,
      easing: Easing.linear,
    }).start(() => this._moveAnimation());
  };
  componentDidMount() {
    this._moveAnimation();
  }

  render() {
    return (
      <View style={style.container}>
        <Animated.Image
          style={[style.imageStyle, {left: this.state.xValue}]}
          source={require('../../assets/ant1.jpg')}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  imageStyle: {
    height: 30,
    width: 30,
  },
});
