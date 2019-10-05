import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AntImage} from './AntImage';

export const ItemCalc = props => {
  return (
    <View style={style.container}>
      <View
        style={
          props.index === 0
            ? style.antImageContainerHigh
            : style.antImageContainer
        }>
        <AntImage
          size={props.item.length * 2 + 20}
          color={props.item.color.toLowerCase()}
        />
      </View>
      <View
        style={
          props.index === 0 ? style.infoContainerHigh : style.infoContainer
        }>
        <Text style={style.textStyle1}>{props.item.name}</Text>
        <Text>{'State: ' + props.calc}</Text>
        <Text style={style.textStyle2}>
          {'Odds of winning: ' + props.item.result.toFixed(4)}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1.5,
  },
  antImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    padding: 10,
  },
  antImageContainerHigh: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    padding: 10,
    backgroundColor: '#C4624C',
  },
  infoContainer: {
    paddingVertical: 5,
    flex: 1,
  },
  infoContainerHigh: {
    flex: 1,
    backgroundColor: '#C4624C',
    paddingVertical: 5,
  },
  textStyle1: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textStyle2: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
