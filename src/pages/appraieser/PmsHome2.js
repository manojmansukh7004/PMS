import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class PmsHome2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
      <Button title="Go to About Screen" onPress={() => this.props.navigation.navigate("ProbationConfirmation")} />
      </View>
    );
  }
}
