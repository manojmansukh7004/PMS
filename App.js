import 'react-native-gesture-handler';
import React, { Component } from 'react';
import NavigationContainers from './src/navigation/NavigationContainers';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import Example from './src/pages/Example'
import { Provider } from 'react-redux'
import Store from './src/redux/Store/index'

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
          <NavigationContainers />
      </Provider>
    );
  }
}
