import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Item} from '../components/Item';
import {ItemCalc} from '../components/ItemCalc';
import {MovingAnt} from '../components/MovingAnt';
import {fetchData} from '../action';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the Ants Racing!',
  };
  constructor() {
    super();
    this.state = {
      calc: 'not yet run',
      initialData: [],
      newData: [],
    };
  }

  componentDidMount() {
    fetchData().then(data => this.setState({initialData: data.data}));
  }

  _handleCalResult = newItem => {
    if (this.state.newData.length < 5) {
      const prevData = this.state.newData;
      this.setState({newData: [...prevData, newItem]});
    }
    if (this.state.newData.length === 5) {
      const sortData = [...this.state.newData];
      sortData.sort((a, b) => b.result - a.result);
      this.setState({newData: sortData, calc: 'calculated'});
    }
  };

  _handleRunCalc = () => {
    this.setState({calc: 'in progress'});
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  _goBack = () => {
    this.setState({calc: 'not yet run', newData: []});
  };

  render() {
    const {newData, calc, initialData} = this.state;
    if (initialData.length === 0) {
      return (
        <View style={style.activitycontainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <SafeAreaView style={style.container}>
        <View style={style.mainContainer}>
          <View style={style.listContainer}>
            {newData.length === 5 && calc === 'calculated' ? (
              <FlatList
                data={newData}
                renderItem={({item, index}) => (
                  <ItemCalc item={item} calc={this.state.calc} index={index} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <FlatList
                data={initialData.ants}
                renderItem={({item}) => (
                  <Item
                    item={item}
                    calc={this.state.calc}
                    handleCalResult={this._handleCalResult}
                    handleStopCalc={this._handleStopCalc}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </View>
        </View>
        <View style={style.footercontainer}>
          <View style={style.buttonOutcontainer}>
            <TouchableOpacity
              style={style.buttonContainer}
              onPress={this._handleRunCalc}>
              <Text style={style.buttonText}>Run Calcaulate</Text>
            </TouchableOpacity>
            {calc === 'calculated' ? (
              <TouchableOpacity
                style={style.buttonContainer}
                onPress={this._goBack}>
                <Text style={style.buttonText}>Go Back</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.buttonContainer}
                onPress={this._signOutAsync}>
                <Text style={style.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            )}
          </View>
          <MovingAnt />
          <MovingAnt />
          <MovingAnt />
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;

const style = StyleSheet.create({
  activitycontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 0.75,
  },
  listContainer: {
    borderBottomWidth: 1.5,
  },
  buttonOutcontainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    backgroundColor: '#9EA4AF',
    borderColor: 'rgba(119, 136, 153, 0.25)',
    borderWidth: 0.5,
    paddingVertical: 10,
    width: 120,
    borderRadius: 2,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'whitesmoke',
    fontWeight: 'bold',
  },
  footercontainer: {
    flex: 0.25,
  },
});
