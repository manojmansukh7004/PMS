import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Drawer, Title, Caption, List, Divider, Text, Switch, TouchableRipple, } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import allAction from '../redux/actions'
import AsyncStorage from '@react-native-community/async-storage'
import { useEffect } from 'react';
import RNRestart from 'react-native-restart';
const DrawerContent = (props) => {

    const paperTheme = useTheme();

    const dispatch = useDispatch();

    const userProps = useSelector(state => state.userReducer)

    const [darkTheme, setDarkTheme] = React.useState(false)

    const signOut = async () => {
        await AsyncStorage.setItem("isAuthenticated", "false")
        await AsyncStorage.setItem('userDetails', '')
        dispatch(allAction.userActions.isAuthenticated("false"))
        RNRestart.Restart();

    }

    const toggleTheme = () => {
        setDarkTheme(!darkTheme)
        dispatch(allAction.userActions.setDarkTheme(darkTheme))
    }
    useEffect(() => {
        // const obj = JSON.parse(userProps.userData);
        toggleTheme()
    },[])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.userInfoSection}>
                <View style={{ marginTop: 15, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                        name="account-circle"
                        color={userProps.darkTheme ? "white" : 'black'}
                        size={80}
                    />
                    <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        <Title style={styles.title}>{userProps.userData.EmpName}</Title>
                        <Caption style={styles.caption}>{userProps.userData.EmpEmailId}</Caption>
                    </View>
                </View>
            </View>
            <Divider style={{ margin: 5, height: 1, backgroundColor: userProps.secColor }} />

            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    <List.Accordion
                        title="Appraisee"
                        left={props => <List.Icon {...props} icon="account" />}>
                        <List.Item
                            titleNumberOfLines={3}
                            left={props => <List.Icon {...props} icon="cog" />}
                            onPress={() => { props.navigation.navigate('PmsHome') }}
                            title={"Performance Management System"} />
                    </List.Accordion>

                    <List.Accordion
                        title="Appraiser"
                        left={props => <List.Icon {...props} icon="account" />}>
                        <List.Item
                            titleNumberOfLines={3}
                            left={props => <List.Icon {...props} icon="cog" />}
                            // onPress={() => { props.navigation.navigate('PmsHome2') }}
                            title={"Performance Management System"} />

                        <List.Item
                            titleNumberOfLines={3}
                            left={props => <List.Icon {...props} icon="bullhorn" />}
                            // onPress={() => { props.navigation.navigate('KraDetails') }}
                            title={"Recommended KRA"} />

                        <List.Item
                            titleNumberOfLines={3}
                            left={props => <List.Icon {...props} icon="account" />}
                            // onPress={() => { props.navigation.navigate('KraDetails') }}
                            title={"Probation  Confirmation"} />
                    </List.Accordion>

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="account"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Admin Panel"
                        // onPress={() => { props.navigation.navigate('KraDetails') }}
                    />

                    <Divider />

                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    );
}
export default DrawerContent
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        // marginBottom: 10,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});