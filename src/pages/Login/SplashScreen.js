import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const SplashScreen =(props) =>{
  
    const { colors } = useTheme();
    const themeColor = useSelector(state => state.userReducer)
    return (
      <View style={[styles.container,{backgroundColor: themeColor.primaryColor}]}>
        <StatusBar backgroundColor= {themeColor.primaryColor} barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={require('../../assets/pms.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View
          style={[styles.footer, {
            backgroundColor: colors.background
          }]}
          animation="fadeInUpBig"
        >
          <Text style={[styles.title, {
            color: colors.text
          }]}>Performance Management System!</Text>
          <Text style={styles.text}>Sign in with account</Text>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <LinearGradient
                colors={['#061e47', '#061e47']}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons
                  name="navigate-next"
                  color="#fff"
                  size={20}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
}

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // backgroundColor: '#061e47'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo,
      // tintColor: 'white'
  },
  title: {
      color: '#05375a',
      fontSize: 29,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});
