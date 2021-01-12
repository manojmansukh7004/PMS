import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'
import allActions from '../redux/actions';
import DrawerNavigator from './DrawerNavigator';
import RootNavigator from './RootNavigator';
import { GetEmpDetails } from '../services/GetEmpDetails';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

const NavigationContainers = () => {

  const dispatch = useDispatch();
  const userProps = useSelector(state => state.userReducer);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = userProps.darkTheme ? CustomDarkTheme : CustomDefaultTheme

  const [isLoading, setIsLoading] = React.useState(true);
  const [isDbVisible, setDbVisible] = React.useState(false);
  const [fetchData, setFetchData] = React.useState(false);

  const userAuthentication = () => {
    setTimeout(async () => {
      const userId = await AsyncStorage.getItem('userId');
      const companyCode = await AsyncStorage.getItem('companyCode')
      const userRole = await AsyncStorage.getItem('userRole')
      const baseUrl = await AsyncStorage.getItem('baseUrl');
      const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
      dispatch(allActions.userActions.setUserId(userId));
      dispatch(allActions.userActions.setCompanyCode(companyCode));
      dispatch(allActions.userActions.setUserRole(userRole));
      dispatch(allActions.userActions.setBaseUrl(baseUrl));
      const payload = {
        "loginDetails":
        {
          "loginEmpID": userId,
          "loginEmpCompanyCodeNo": companyCode
        }
      };
      const data = await GetEmpDetails(payload, baseUrl);
      dispatch(allActions.userActions.setUserData(data.Table[0]))
      setIsLoading(false)
      dispatch(allActions.userActions.isAuthenticated(isAuthenticated))
      setDbVisible(true)

    }, 1000)
  }

  const freshLogin = () => {
    setIsLoading(false)
    setDbVisible(false)
  }

  useEffect(() => {
    userProps.isAuthenticated == "null" ?
      fetchAsyncData() :
      userProps.isAuthenticated == "true" ?
        setFetchData(true) :
        userProps.isAuthenticated == "false" ?
          freshLogin() :
          null
  })

  useEffect(() => {
    fetchData == true ?
      userAuthentication() : freshLogin()

  }, [fetchData])

  const fetchAsyncData = async () => {
    setIsLoading(true)
    const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
    isAuthenticated == null ?
      (await AsyncStorage.setItem('isAuthenticated', 'false'),
        dispatch(allActions.userActions.isAuthenticated("false")))
      :
        dispatch(allActions.userActions.isAuthenticated(isAuthenticated))
  }

  if (isLoading == true) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ActivityIndicator size={30} />
      </View>
    )
  }


  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {
          isDbVisible == true ?
            <DrawerNavigator />
            :
            <RootNavigator />
        }
      </NavigationContainer>
    </PaperProvider>

  );

}


export default (NavigationContainers)