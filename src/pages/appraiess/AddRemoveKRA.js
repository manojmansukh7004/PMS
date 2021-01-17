import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { Card, Divider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dialog } from 'react-native-simple-dialogs';
import moment from 'moment';
import { FetchKRAAspectMeasure } from '../../services/appraiess/FetchKRAAspectMeasure'

const AddKRA = (props) => {
    const userProps = useSelector(state => state.userReducer);
    const { colors } = useTheme();
    const [data, setData] = React.useState({
        addKraVisble: false,
        measureData: [],
        aspectData: [],
        KRAData: [],
        selectedAspect: [],
        selectedMeasure: [],
        selectedKRA: [],
        kraArrayHolder: [],
        MeasureArrayHolder: [],
        aspect: '',
        kra: '',
        measure: '',
        weightage: '',
        target: '',
        targetDate: '',
        kraDataVisible: false,
        aspectDataVisible: false,
        isDatePickerVisible: false,
    })

    React.useEffect(() => {
        console.log("datt",props.navigation.state.params.FormData);
        fetchMeasures()

    }, [])

    const fetchMeasures = async () => {
        const MeasureData = await FetchKRAAspectMeasure(userProps.userId, userProps.companyCode, userProps.userRole, userProps.baseUrl)
        setData({
            ...data,
            aspectData: MeasureData.Aspect,
            KRAData: MeasureData.KRA,
            kraArrayHoldar: MeasureData.KRA,
            measureData: MeasureData.Measure,
            MeasureArrayHolder: MeasureData.Measure
        })
    }

    const selectedTemplate = (itemValue) => {
        setData({
            ...data,
            selectedAspect: itemValue,
            // templateId: data.templates.find(({ col1 }) => col1 === itemValue).TemplateId,
        })
    }

    const searchFilterFunction = text => {
        const newData = data.KRAData.filter(item => {
            const itemData = `${item.ShortDesc.toUpperCase()} `;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        setData({ ...data, kraArrayHoldar: newData })
    };

    const handleAspectData = (item) => {
        var temp = []
        Object.keys(data.KRAData).map((value, index) => {
            if (data.KRAData[index].AspectId === item.AspectId) {
                temp.push(data.KRAData[index])
            }
        })
        setData({ ...data, selectedAspect: item, aspect: item.AspectId, kraArrayHoldar: temp, aspectDataVisible: false })
    }

    const handleKRAData = (item) => {
        var temp = []
        Object.keys(data.measureData).map((value, index) => {
            if (data.measureData[index].UOMID === item.UOMId) {
                temp.push(data.measureData[index])
            }
        })
        setData({ ...data, selectedKRA: item, selectedMeasure: temp, kra: item.KRAID, measure: item.UOMID, kraDataVisible: false })
    }

    const hideDatePicker = () => {
        setData({ ...data, isDatePickerVisible: false })
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date,moment(date).format('DD/MM/YYYY'));
        setData({ ...data, targetDate: moment(date).format('DD/MM/YYYY'), isDatePickerVisible: false })
    };

    return (
        <ScrollView>
            <SafeAreaProvider style={{ flex: 1, padding: 10 }}>
                <Dialog
                    visible={data.aspectDataVisible}
                    // title="Custom Dialog"
                    dialogStyle={{ height: '50%' }}
                    onTouchOutside={() => setData({ ...data, aspectDataVisible: false })} >
                    <View style={{ height: '100%' }}>
                        <FlatList
                            data={data.aspectData}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => handleAspectData(item)}>
                                    <Text numberOfLines={2} style={{ paddingVertical: 10 }}>{data.aspectData[index].AspectName}</Text>
                                    <Divider />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Dialog>

                <Dialog
                    visible={data.kraDataVisible}
                    // title="Custom Dialog"
                    dialogStyle={{ height: '50%' }}
                    onTouchOutside={() => setData({ ...data, kraDataVisible: false })} >
                    <View style={{ height: '100%' }}>
                        <View style={{ borderWidth: .3, borderRadius: 3, paddingHorizontal: 5, marginBottom: 5 }}>
                            <TextInput
                                placeholder="Search.."
                                onChangeText={text => searchFilterFunction(text)}
                            />
                        </View>
                        <FlatList
                            data={data.kraArrayHoldar}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => { handleKRAData(item); }}>
                                    <Text numberOfLines={2} style={{ paddingVertical: 10 }}>{data.kraArrayHoldar[index].ShortDesc}</Text>
                                    <Divider />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Dialog>

                <DateTimePickerModal
                    isVisible={data.isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date("2020-06-30T19:37:07.166Z")}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

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
                        <View style={{ height: data.addKraVisble ? null : 0, overflow: 'hidden', padding: 10 }}>
                            <Divider />

                            <Card style={styles.header} onPress={() => { setData({ ...data, aspectDataVisible: true }) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '90%', }} >
                                        <Text style={[styles.cardLabel, { color: userProps.secColor }]}>ASPECT</Text>
                                        <Text style={styles.cardLabel}>{data.selectedAspect.length == 0 ? "--Select--" : data.selectedAspect.AspectName}</Text>
                                    </View>
                                    <Icon
                                        name={'menu-down'}
                                        style={{ marginTop: 10 }}
                                        size={25}
                                    />
                                </View>
                            </Card>

                            <Card style={styles.header} onPress={() => { setData({ ...data, kraDataVisible: true }) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '90%', }} >
                                        <Text style={[styles.cardLabel, { color: userProps.secColor }]}>KRA</Text>
                                        <Text numberOfLines={2} style={styles.cardLabel}>{data.selectedKRA.length == 0 ? "--Select--" : data.selectedKRA.ShortDesc}</Text>
                                    </View>
                                    <Icon
                                        name={'menu-down'}
                                        style={{ marginTop: 10 }}
                                        size={25}
                                    />
                                </View>
                            </Card>

                            <Card style={[styles.header, { backgroundColor: '#EBEFED' }]}>
                                <View>
                                    <Text style={[styles.cardLabel, { color: userProps.secColor }]}>MEASURE</Text>
                                    <Text numberOfLines={2} style={styles.cardLabel}>{data.selectedMeasure.length == 0 ? "" : data.selectedMeasure[0].UOMName}</Text>
                                </View>
                            </Card>

                            <Card style={[styles.header]}>
                                <View>
                                    <Text style={[styles.cardLabel, { color: userProps.secColor }]}>WEIGHTAGE (%)</Text>
                                    <TextInput
                                        keyboardType={'decimal-pad'}
                                        style={{ borderWidth: .2, margin: 5, borderRadius: 3 }}
                                        onChangeText={text => setData({ ...data, weightage: text })}
                                    />
                                </View>
                            </Card>

                            <Card style={[styles.header]}>
                                <View>
                                    <Text style={[styles.cardLabel, { color: userProps.secColor }]}>TARGET</Text>
                                    <TextInput
                                        keyboardType={'decimal-pad'}
                                        style={{ borderWidth: .2, margin: 5, borderRadius: 3 }}
                                        onChangeText={text => setData({ ...data, target: text })}
                                    />
                                </View>
                            </Card>

                            <Card style={styles.header} onPress={() => { setData({ ...data, isDatePickerVisible: true }) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '90%', }} >
                                        <Text style={[styles.cardLabel, { color: userProps.secColor }]}>TARGET DATE</Text>
                                        <Text numberOfLines={2} style={styles.cardLabel}>{data.targetDate == "" ? "--Select--" : data.targetDate}</Text>
                                    </View>
                                    <Icon
                                        name={'calendar-today'}
                                        style={{ marginTop: 10 }}
                                        size={25}
                                    />
                                </View>
                            </Card>

                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30, }}>
                                <Button mode="contained" color={userProps.primaryColor} onPress={() => props.navigation.navigate("AddRemoveKRA")} style={{ width: '70%' }}>
                                    ADD KRA
                                </Button>
                            </View>
                        </View>
                    </Card>
                </Card>
            </SafeAreaProvider>
        </ScrollView>

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
    pickers: {
        height: 20,
        fontWeight: 'bold',

    },
    cardLabel: {
        fontSize: 14,
        paddingStart: 8
    },
    header: {
        marginTop: 10,
        padding: 10,
        paddingBottom: 10,
        elevation: 3,
        backgroundColor: "#ffff"
    }
})