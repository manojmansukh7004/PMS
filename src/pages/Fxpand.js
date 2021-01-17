import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { Card, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function AddKRA() {
    const userProps = useSelector(state => state.userReducer);
    const { colors } = useTheme();
    const [data, setData] = React.useState({
        addKraVisble: false
    })
    return (
        <SafeAreaProvider style={{ flex: 1, padding: 10 }}>
            <Card>
                <Card style={[{ borderBottomColor: userProps.secColor, borderBottomWidth: 2.5 }]}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { setData({ ...data, addKraVisble: !data.addKraVisble }) }}
                     style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                         <View style={{ flexDirection: 'row' }}>
                                <Icon name="clipboard-plus-outline" size={25} color={colors.text} style={{ paddingRight: 10 }} />
                                <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>Add New KRA</Text>
                            </View>
                            <Icon name={data.addKraVisble ? "minus" : "plus"} color={colors.text} size={25} />
                    </TouchableOpacity>
                    <View style={{ height: data.addKraVisble ? null : 0, overflow: 'hidden' }}>
                        <Divider />
                        <Card style={{ margin: 20, padding: 10, borderWidth: .3, borderColor: 'black', }}>

                        </Card>
                    </View>
                </Card>
            </Card>
        </SafeAreaProvider>
    );
}

function RecommendedKRA() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

const AddRemoveKRA = (props) => {

    const userProps = useSelector(state => state.userReducer);

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#ffff',
                indicatorStyle: { backgroundColor: userProps.secColor, height: 3 },
                labelStyle: { fontSize: userProps.F2, borderBottomColor: 'red' },
                style: { backgroundColor: userProps.primaryColor }

            }}>
            <Tab.Screen name="SELECT FROM KRA BANK" component={AddKRA} />
            <Tab.Screen name="RECOMMEND KRA / VIEW STATUS" component={RecommendedKRA} />
        </Tab.Navigator>
    );
}

export default AddRemoveKRA

const styles = StyleSheet.create({
    FormTabs: {
        padding: 15,
        backgroundColor: '#ffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})