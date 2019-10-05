import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AntImage} from './AntImage';
import {generateAntWinLikelihoodCalculator} from '../utils';

export class Item extends React.Component {
  constructor() {
    super();
    this.state = {
      caclResult: null,
      generate: 0,
    };
  }
  componentDidUpdate() {
    if (this.props.calc === 'in progress' && this.state.generate === 0) {
      this.setState({generate: 1});
      const generate = generateAntWinLikelihoodCalculator();
      const cb = num => {
        this.setState({caclResult: num});
        const newItem = {...this.props.item, result: this.state.caclResult};
        this.props.handleCalResult(newItem);
      };
      generate(cb);
    }
  }

  render() {
    const {item, calc} = this.props;

    return (
      <View style={style.container}>
        <View style={style.antImageContainer}>
          <AntImage
            size={item.length * 2 + 20}
            color={item.color.toLowerCase()}
          />
        </View>
        <View style={style.infoContainer}>
          <Text style={style.textStyle}>{item.name}</Text>
          <Text>{'Length: ' + item.length}</Text>
          <Text>{'Color: ' + item.color}</Text>
          <Text>{'Weight: ' + item.weight}</Text>
          <Text>{'State: ' + calc}</Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1.5,
  },
  antImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    margin: 10,
  },
  infoContainer: {
    marginVertical: 5,
    flex: 1,
  },
  textStyle: {
    fontWeight: 'bold',
  },
});
