import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    Dimensions,

} from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { attemptLogin } from '../../services/LoginService'
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../../redux/actions'
import AsyncStorage from '@react-native-community/async-storage';
const Login = (props) => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const themeColor = useSelector(state => state.userReducer)
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const textInputChange = (val) => {
        // if (val.trim().length >= 4) {
        setData({
            ...data,
            username: val,
            check_textInputChange: true,
            // isValidUser: true
        });
        // }else {
        //     setData({
        //         ...data,
        //         username: val,
        //         check_textInputChange: false,
        //         isValidUser: false
        //     });
        // }
    }

    const handlePasswordChange = (val) => {
        // if (val.trim().length >= 8) {
        setData({
            ...data,
            password: val,
            // isValidPassword: true
        });
        // } else {
        //     setData({
        //         ...data,
        //         password: val,
        //         isValidPassword: false
        //     });
        // }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const loginHandle = (userName, password) => {

        // const foundUser = Users.filter(item => {
        //     return userName == item.username && password == item.password;
        // });

        if (userName.length !== 0 || password.length !== 0) {
            login(userName, password, 12)
        }
        else {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }
    }

    const login = async (userName, password, action) => {
        setIsLoading(true)
        var baseUrl = "https://itm.orgtix.com/Timesheet/WebAPI"
        AsyncStorage.setItem("baseUrl", "https://itm.orgtix.com/pms/pms_Api")
        const payload = {
            "loginDetails":
            {
                Action: action,
                LoginEmpID: userName,
                Password: password
            }
        };
        //   var baseUrl = `${this.state.baseUrl}`;
        const response = await attemptLogin(payload, baseUrl);
        if (response != null && response != "") {

            if (response.ErrorList != null && response.ErrorList != "") {
                // var error = data.ErrorList[0].split("$")[1] ==undefined ? 'You are not authorised to login' : data.ExceptionList[0].split("$")[1]
                alert('Entered User Id or Password is not correct');
            }
            else if (response.SuccessList != undefined || response.ErrorList != undefined || response.ExceptionList != undefined) {
                alert(response.ErrorList[0].split("$")[1]);
            }
            else if (response.EmployeeDetails[0] != "") {
                dispatch(allActions.userActions.setUserData(response.EmployeeDetails[0]))

                AsyncStorage.setItem('isAuthenticated', "true")
                if (response.EmployeeDetails[0][0].RedirectPage == "") {
                    alert("Unauthorised Access!!!");
                    props.navigation.navigate('Login')

                }
                else {
                    setTimeout(async () => {
                        dispatch(allActions.userActions.setUserData(response.EmployeeDetails[0][0]))
                        await AsyncStorage.setItem("userDetails", JSON.stringify(response.EmployeeDetails[0][0]))
                        await AsyncStorage.setItem("userName", response.EmployeeDetails[0][0].LoginEmpName)
                        await AsyncStorage.setItem("userRole", 'appraisee')
                        await AsyncStorage.setItem("userId", response.EmployeeDetails[0][0].LoginEmpID)
                        await AsyncStorage.setItem("companyCode", "1000")
                        // props.navigation.navigate('SplashScreen')
                        dispatch(allActions.userActions.isAuthenticated("true"))
                        // setIsLoading(false)
                    }, 1000)


                }
            }
        }

        else {
            var error = response.responseText;
            alert(error);
        }
    }
    // if (foundUser.length == 0) {
    //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //         { text: 'Okay' }
    //     ]);
    //     return;
    // }
    // signIn(foundUser);


    return (
        <View style={[styles.container, { backgroundColor: themeColor.primaryColor }]}>
            <StatusBar backgroundColor={themeColor.primaryColor} barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <View style={{ paddingBottom: 30 }}>
                    {isLoading == true ?
                        <ProgressBar styleAttr="Horizontal" color={themeColor.secColor} />
                        : null}
                </View>

                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {/* {data.isValidUser ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                </Animatable.View>
            } */}


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {/* {data.isValidPassword ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                </Animatable.View>
            } */}


                <TouchableOpacity>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle(data.username, data.password) }}
                    >
                        <LinearGradient
                            colors={['#061e47', '#061e47']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>

    );
}
export default Login;
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    imgHeader: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        // paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
