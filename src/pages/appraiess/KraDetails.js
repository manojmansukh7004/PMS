import React, { Component } from 'react';
import { View, Button } from 'react-native';

class KraDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
      <Button title="Go to About Screen" onPress={() => this.props.navigation.navigate("KRADetails")} />
      </View>
    );
  }
}

export default KraDetails;
