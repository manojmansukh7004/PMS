import React, { useEffect } from 'react';
import { ToastAndroid, Text, View, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { Card, Divider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dialog } from 'react-native-simple-dialogs';
import moment from 'moment';
import { Pages } from 'react-native-pages';
import { FetchKRAAspectMeasure } from '../../services/appraiess/FetchKRAAspectMeasure';
import { FetchSelfAddedKRA } from '../../services/appraiess/FetchSelfAddedKRA';
import { SaveSelfAddedKRA } from '../../services/appraiess/SaveSelfAddedKRA';
import { DeleteSelfAddedKRA } from '../../services/appraiess/DeleteSelfAddedKRA';
import { FetchStatusCustomAddedKRA } from '../../services/appraiess/FetchStatusCustomAddedKRA';
import { SaveCustomAddedKRA } from '../../services/appraiess/SaveCustomAddedKRA'
import SelfAddedKRADetail from '../../component/SelfAddedKRADetail';
import RecommendedKRAs from '../../component/RecommendedKRAs';

const showToast = (Msg) => {
    ToastAndroid.show(Msg, ToastAndroid.LONG);
};
var Weightage = 0

const AddKRA = (props) => {
    Weightage = 0
    const userProps = useSelector(state => state.userReducer);
    const { colors } = useTheme();
    const { startDate, endDate, templateId, formId } = props.route.params;
    var StartDate = startDate.split("/");
    var EndDate = endDate.split("/");

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
        aspectName: '',
        aspect: '',
        kra: '',
        measure: '',
        weightage: '',
        target: '',
        targetDate: '',
        kraStartDate: '',
        kraEndDate: '',
        kraDataVisible: false,
        aspectDataVisible: false,
        isDatePickerVisible: false,
        auth: false,
        selfAddedKRAVisible: false,
        update: false,
        selfAddedKRA: []
    })


    React.useEffect(() => {
        setData({ ...data, kraStartDate: startDate, kraEndDate: endDate })
        fetchMeasures()
    }, [])

    const fetchMeasures = async () => {
        const MeasureData = await FetchKRAAspectMeasure(userProps.userId, userProps.companyCode, userProps.userRole, userProps.baseUrl)
        const addedKRA = await FetchSelfAddedKRA(userProps.userId, userProps.companyCode, userProps.userRole, formId, templateId, userProps.baseUrl)
        // console.log("addedKRAaddedKRA",addedKRA);
        setData({
            ...data,
            aspectData: MeasureData.Aspect,
            KRAData: MeasureData.KRA,
            kraArrayHoldar: MeasureData.KRA,
            measureData: MeasureData.Measure,
            MeasureArrayHolder: MeasureData.Measure,
            selfAddedKRA: addedKRA.SelfAddedKRA

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
        console.log("tttttt", item);

        setData({ ...data, selectedAspect: item, aspect: item.AspectId, aspectName: item.AspectName, kraArrayHoldar: temp, selectedKRA: [], selectedMeasure: [], kra: '', measure: '', aspectDataVisible: false })
    }

    const handleKRAData = (item) => {
        var temp = [], temp1 = []
        Object.keys(data.measureData).map((value, index) => {
            if (data.measureData[index].UOMID === item.UOMId) {
                temp.push(data.measureData[index])
            }
        })
        Object.keys(data.aspectData).map((value, index) => {
            if (data.aspectData[index].AspectId === item.AspectId) {
                temp1.push(data.aspectData[index])
            }
        })

        console.log("tttttt", temp1);
        setData({ ...data, aspect: temp1[0].AspectId, aspectName: temp1[0].AspectName, selectedKRA: item, selectedMeasure: temp, kra: item.KRAID, measure: item.UOMId, kraDataVisible: false })
    }

    const hideDatePicker = () => {
        setData({ ...data, isDatePickerVisible: false })
    };

    const handleConfirm = (date) => {
        setData({ ...data, targetDate: moment(date).format('DD/MM/YYYY'), isDatePickerVisible: false })
    };

    const validation = () => {
        if (data.kra == '') { showToast("Please select a KRA.") }
        else if (data.weightage == '') { showToast("Weightage must be between 1 to 100.") }
        else if (data.weightage > 100 == true) { showToast("Weightage must be between 1 to 100.") }
        else if (data.weightage <= 0 == true) { showToast("Weightage must be between 1 to 100.") }
        else { handleAddKRA() }
    }

    const handleAddKRA = async () => {

        const response = await SaveSelfAddedKRA(userProps.userId, userProps.companyCode, userProps.userRole, templateId, formId, endDate, data.weightage,
            data.target == '' ? 0 : data.target, data.aspect, data.kra, data.measure, data.targetDate == '' ? endDate : data.target, userProps.baseUrl)
        if (response.ErrCode == 203) {
            showToast(response.ErrMsg)
        }
        else {
            setData({
                ...data,
                aspectName: '',
                aspect: '',
                kra: '',
                measure: '',
                weightage: '',
                target: '',
                targetDate: '',
                kraStartDate: '',
                kraEndDate: '',
                measureData: [],
                aspectData: [],
                KRAData: [],
                selectedAspect: [],
                selectedMeasure: [],
                selectedKRA: [],
                kraArrayHolder: [],
                MeasureArrayHolder: [],
                update: true
            })
            showToast(response)
        }
    }

    useEffect(() => {
        fetchMeasures()
    }, [data.update])

    const handleDelteKRA = async (AutoId) => {
        const response = await DeleteSelfAddedKRA(userProps.userId, userProps.companyCode, userProps.userRole, formId, templateId, AutoId, userProps.baseUrl)
        showToast(response)
        fetchMeasures()

    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
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
                    minimumDate={new Date(StartDate[2], StartDate[1] - 1, StartDate[0])}
                    maximumDate={new Date(EndDate[2], EndDate[1] - 1, EndDate[0])}
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
                                        <Text style={styles.cardLabel}>{data.aspect == '' ? "--Select--" : data.aspectName}</Text>
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
                                    <View style={{ borderWidth: .2, margin: 5, borderRadius: 3 }}>
                                        {

                                            <TextInput
                                                keyboardType={'decimal-pad'}
                                                value={data.weightage}
                                                // onChange={handleWeightage}
                                                onChangeText={text => setData({ ...data, weightage: text, auth: text > 100 ? true : false })}
                                            />
                                        }
                                    </View>
                                    {data.auth ? <Text style={{ color: 'red' }}>{"* Weightage should be less than 100%"}</Text> : null}
                                </View>
                            </Card>

                            <Card style={[styles.header]}>
                                <View>
                                    <Text style={[styles.cardLabel, { color: userProps.secColor }]}>TARGET</Text>
                                    <TextInput
                                        keyboardType={'decimal-pad'}
                                        value={data.target}
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
                                <Button mode="contained" color={userProps.primaryColor} onPress={validation} style={{ width: '70%' }}>
                                    ADD KRA
                                </Button>
                            </View>
                        </View>
                    </Card>
                </Card>

                <Card style={[{ borderBottomColor: userProps.secColor, borderBottomWidth: 2.5, marginTop: 10 }]}>
                    <View style={{}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { setData({ ...data, selfAddedKRAVisible: !data.selfAddedKRAVisible }) }}
                            style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="download-box-outline" size={25} color={colors.text} style={{ paddingRight: 10 }} />
                                <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>Self Added KRA List</Text>
                            </View>
                            <Icon name={data.selfAddedKRAVisible ? "minus" : "plus"} color={colors.text} size={25} />
                        </TouchableOpacity>
                        {data.selfAddedKRAVisible ?
                            <View style={{ overflow: 'hidden', backgroundColor: colors.background }}>
                                <Divider />
                                <View style={{ height: 390, backgroundColor: 'transparent' }}>
                                    {
                                        data.selfAddedKRA !== undefined ?
                                            <Pages indicatorColor={'transparent'} >
                                                {
                                                    Object.keys(data.selfAddedKRA).map((item, index) => (
                                                        Weightage = parseFloat(Weightage + data.selfAddedKRA[index].weightage),
                                                        <SelfAddedKRADetail
                                                            kraData={data.selfAddedKRA[index]}
                                                            handleDelteKRA={handleDelteKRA}
                                                            count={index} total={data.selfAddedKRA.length}
                                                        />
                                                    ))
                                                }
                                            </Pages>
                                            :
                                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <Icon name="alert" size={40} color={colors.text} style={{ paddingRight: 10, alignSelf: 'center', }} />
                                            </View>
                                    }
                                </View>

                                <View style={{ padding: 10, backgroundColor: colors.background }}>
                                    <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text, fontWeight: 'bold', marginBottom: 5 }]}>{`Total Weightage: ${Weightage}`}</Text>
                                </View>
                            </View>
                            : null
                        }
                    </View>
                </Card>
            </SafeAreaProvider>
        </ScrollView>

    );
}

const RecommendedKRA = (props) => {

    const userProps = useSelector(state => state.userReducer);
    const { colors } = useTheme();
    const { templateId } = props.route.params
    const [data, setData] = React.useState({
        KRA: '',
        longDesc: '',
        customAddesData: [],
        recommendedKRAVisibility: false,
        kraVisibility: false,
        update: false
    })

    useEffect(() => {
        fetchCustomAddedData()
    }, [])

    const fetchCustomAddedData = async () => {
        const response = await FetchStatusCustomAddedKRA(userProps.userId, userProps.companyCode, userProps.userRole, templateId, userProps.baseUrl)
        setData({ ...data, customAddesData: response.StatusCustomAddetudKRA })
    }

    const handleValidation = () => {
        if (data.KRA == '') { showToast("Please enter the KRA text. ") }
        else { submitRecomendedKRA() }
    }

    const submitRecomendedKRA = async () => {
        const response = await SaveCustomAddedKRA(userProps.userId, userProps.companyCode, userProps.userRole, templateId, data.KRA, data.longDesc, userProps.baseUrl)
        showToast(response)
        setData({ ...data, KRA: '', longDesc: '', update: true })
    }

    useEffect(() => {
        fetchCustomAddedData()
    }, [data.update])

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <SafeAreaProvider style={{ flex: 1, padding: 10 }}>

                <Card>
                    <Card style={[{ borderBottomColor: userProps.secColor, borderBottomWidth: 2.5 }]}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { setData({ ...data, kraVisibility: !data.kraVisibility }) }}
                            style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="bullhorn" size={25} color={colors.text} style={{ paddingRight: 10 }} />
                                <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>Recommend KRA</Text>
                            </View>
                            <Icon name={data.kraVisibility ? "minus" : "plus"} color={colors.text} size={25} />
                        </TouchableOpacity>
                        <View style={{ height: data.kraVisibility ? null : 0, overflow: 'hidden', padding: 10 }}>
                            <Divider />

                            <Card style={[styles.header]}>
                                <View>
                                    <Text style={[styles.cardLabel, { color: userProps.secColor }]}>KRA</Text>
                                    <View style={{ borderWidth: .2, margin: 5, borderRadius: 3 }}>
                                        <TextInput
                                            value={data.KRA}
                                            onChangeText={text => setData({ ...data, KRA: text })}
                                        />
                                    </View>
                                </View>
                            </Card>

                            <Card style={[styles.header]}>
                                <View>
                                    <Text style={[styles.cardLabel, { color: userProps.secColor }]}>KRA Description</Text>
                                    <View style={{ borderWidth: .2, margin: 5, borderRadius: 3 }}>
                                        {

                                            <TextInput
                                                value={data.longDesc}
                                                multiline={true}
                                                onChangeText={text => setData({ ...data, longDesc: text })}
                                            />
                                        }
                                    </View>
                                </View>
                            </Card>
                            <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                                <Button icon="reload" mode="contained" color={userProps.primaryColor} onPress={() => { setData({ ...data, KRA: "", longDesc: '' }) }} style={{ width: '40%', }}>
                                    Reset
                                </Button>
                                <Button icon="near-me" mode="contained" color={userProps.primaryColor} onPress={handleValidation} style={{ width: '40%' }}>
                                    SUBMIT
                                </Button>
                            </View>
                        </View>
                    </Card>
                </Card>

                <Card style={[{ borderBottomColor: userProps.secColor, borderBottomWidth: 2.5, marginTop: 10 }]}>
                    <View style={{}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { setData({ ...data, recommendedKRAVisibility: !data.recommendedKRAVisibility }) }}
                            style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="alert-circle-outline" size={25} color={colors.text} style={{ paddingRight: 10 }} />
                                <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>Status of Recommended KRAs </Text>
                            </View>
                            <Icon name={data.recommendedKRAVisibility ? "minus" : "plus"} color={colors.text} size={25} />
                        </TouchableOpacity>
                        {data.recommendedKRAVisibility ?
                            <View style={{ overflow: 'hidden', backgroundColor: colors.background }}>
                                <Divider />
                                <View style={{ height: 450, backgroundColor: 'transparent' }}>
                                    {
                                        data.customAddesData !== undefined ?
                                            <Pages indicatorColor={'transparent'} >
                                                {
                                                    Object.keys(data.customAddesData).map((item, index) => (
                                                        <RecommendedKRAs
                                                            kraData={data.customAddesData[index]}
                                                            count={index} total={data.customAddesData.length}
                                                        />
                                                    ))
                                                }
                                            </Pages>
                                            :
                                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <Icon name="alert" size={40} color={colors.text} style={{ paddingRight: 10, alignSelf: 'center', }} />
                                            </View>
                                    }
                                </View>
                            </View>
                            : null
                        }
                    </View>
                </Card>
            </SafeAreaProvider>
        </ScrollView>
    );
}

const Tab = createMaterialTopTabNavigator();

const AddRemoveKRA = (props) => {

    const userProps = useSelector(state => state.userReducer);
    const { FormData, FormId } = props.route.params;
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#ffff',
                indicatorStyle: { backgroundColor: userProps.secColor, height: 3 },
                labelStyle: { fontSize: userProps.F2, borderBottomColor: 'red' },
                style: { backgroundColor: userProps.primaryColor }

            }}>
            <Tab.Screen name="SELECT FROM KRA BANK" component={AddKRA} initialParams={{ startDate: FormData.AppraisalStartDate, endDate: FormData.AppraisalEndDate, templateId: FormData.TemplateID, formId: FormId }} />
            <Tab.Screen name="RECOMMEND KRA / VIEW STATUS" component={RecommendedKRA} initialParams={{ templateId: FormData.TemplateID }} />
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