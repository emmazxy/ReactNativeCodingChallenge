import React from 'react';
import {View, Image} from 'react-native';

export const AntImage = props => {
  return (
    <View
      style={{
        width: props.size,
        height: props.size,
        backgroundColor: props.color,
        borderRadius: props.size / 2,
      }}>
      <Image
        style={{
          width: props.size,
          height: props.size,
          backgroundColor: 'transparent',
          opacity: 0.5,
          borderRadius: props.size / 2,
        }}
        source={require('../../assets/ant8.png')}
      />
    </View>
  );
};
