import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from '@react-native-community/async-storage'

export const USER_KEY = "isauthenticated";

export const onSignIn = () => AsyncStorage.setItem("isauthenticated", "true");

export const onSignOut = () => AsyncStorage.removeItem("isauthenticated");

export const isSignedIn = () => {

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};