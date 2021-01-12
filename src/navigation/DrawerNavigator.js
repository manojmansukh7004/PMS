import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Example from '../pages/Example'
import PmsHome from '../pages/appraiess/PmsHome';
import KraDetails from '../pages/appraiess/KraDetails';
import PmsHome2 from '../pages/appraieser/PmsHome2';
import ProbationConfirmation from '../pages/appraieser/ProbationConfirmation';
import DrawerContent from '../navigation/DrawerContent'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector} from 'react-redux'
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const PMS = (props) => {
  const userProps = useSelector(state => state.userReducer)

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
      backgroundColor: userProps.primaryColor,
      borderBottomColor:'#f27024',
      borderBottomWidth:3
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold'
      }
  }}>
          {/* <Stack.Screen name="Example" component={Example} /> */}

      <Stack.Screen name="PmsHome"
        component={PmsHome}
        options={{ 
          title: "PMS",
          headerLeft: ()=>(
            <Icon.Button name="menu" size={25} backgroundColor={'transparent'} onPress={() => props.navigation.openDrawer()}></Icon.Button>
          ) 
         }}
      />

      <Stack.Screen name="KraDetails" component={KraDetails} />
    </Stack.Navigator>
  );
}

const PMS2 = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PmsHome2"  component={PmsHome2} />
      <Stack.Screen name="ProbationConfirmation" component={ProbationConfirmation} />
    </Stack.Navigator>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="PMS" component={PMS} />
      <Drawer.Screen name="PMS2" component={PMS2} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;