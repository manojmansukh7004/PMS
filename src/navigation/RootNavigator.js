import React from 'react';
import SplashScreen from '../pages/Login/SplashScreen';
import Login from '../pages/Login/Login'
import { createStackNavigator} from '@react-navigation/stack'

const Stack =createStackNavigator();

 const RootNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen}  />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  export default RootNavigator