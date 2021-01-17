import React, { useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, ScrollView, Image, LayoutAnimation, FlatList, UIManager, TouchableOpacity } from 'react-native';
import { Card, Title, Subheading, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Indicator, Pages } from 'react-native-pages';

import { GetTemplates } from '../../services/appraiess/GetTemplates'
import { FetchKRADetails } from '../../services/appraiess/FetchKRADetails'
import KRADetail from '../../component/KRADetail';
import { SaveKRADetails } from '../../services/appraiess/SaveKRADetails'
import allAction from '../../redux/actions';
import CommentModel from '../../component/CommentModel';

var Weightage = 0
const PmsHome = (props) => {

    const { colors } = useTheme();
    const dispatch = useDispatch();

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };
    const userProps = useSelector(state => state.userReducer);
    // const [isExpanded, setIsExpanded] = React.useState(false)
    const [data, setdata] = React.useState({
        count: 0,
        isLoading: true,
        secLoader: false,
        isExpanded: false,
        templates: [],
        selectedTemplate: "",
        formId: "",
        templateId: null,
        kraDataVisible: false,
        kraData: [],
        kraDisplayData: [],
        detailExpanded: false,
        goalExpanded: false,
        midYearExpanded: false,
        annualExpanded: false,
        feedbackExpanded: false,
        attachments: false,
        appraisallog: false
    });

    useEffect(() => {
        // if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
        fetchData()
        // }
    }, [])

    const changeLayout = (value) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        value == 'isExpanded' ?
            setdata({ ...data, isExpanded: !data.isExpanded }) :
            value == 'userDetails' ?
                setdata({ ...data, detailExpanded: !data.detailExpanded }) :
                value == 'goalSetting' ?
                    setdata({ ...data, goalExpanded: !data.goalExpanded, midYearExpanded: false, annualExpanded: false, feedbackExpanded: false, attachments: false, appraisallog: false }) :
                    value == 'midYear' ?
                        setdata({ ...data, midYearExpanded: !data.midYearExpanded, goalExpanded: false, annualExpanded: false, feedbackExpanded: false, attachments: false, appraisallog: false }) :
                        value == 'annual' ?
                            setdata({ ...data, annualExpanded: !data.annualExpanded, midYearExpanded: false, goalExpanded: false, feedbackExpanded: false, attachments: false, appraisallog: false }) :
                            value == 'feedback' ?
                                setdata({ ...data, feedbackExpanded: !data.feedbackExpanded, midYearExpanded: false, annualExpanded: false, goalExpanded: false, attachments: false, appraisallog: false }) :
                                value == 'attachments' ?
                                    setdata({ ...data, attachments: !data.attachments, midYearExpanded: false, annualExpanded: false, feedbackExpanded: false, goalExpanded: false, appraisallog: false }) :
                                    value == 'appraisallog' ?
                                        setdata({ ...data, appraisallog: !data.appraisallog, midYearExpanded: false, annualExpanded: false, feedbackExpanded: false, attachments: false, goalExpanded: false }) :
                                        null
    }


    const fetchData = async () => {
        var response = await GetTemplates(userProps.userId, userProps.companyCode, userProps.userRole, userProps.baseUrl)
        setdata({ ...data, templates: response.Table, isLoading: false, secLoader: true })
    }

    useEffect(() => {
        data.templates.length !== 0 ? selectedTemplate(data.templates[0].col1) : null
    }, [data.templates])

    const selectedTemplate = (itemValue) => {
        Weightage = 0
        setdata({
            ...data,
            kraDataVisible: false,
            detailExpanded: false,
            goalExpanded: false,
            midYearExpanded: false,
            annualExpanded: false,
            feedbackExpanded: false,
            attachments: false,
            appraisallog: false,
            selectedTemplate: itemValue,
            formId: itemValue.split("~")[1].trim(),
            templateId: data.templates.find(({ col1 }) => col1 === itemValue).TemplateId,
        })
    }

    useEffect(() => {
        async function fetchData() {
            var response = await FetchKRADetails(userProps.userId, userProps.companyCode, userProps.userRole, data.formId, data.templateId, userProps.baseUrl)
            setdata({
                ...data,
                kraData: response,
                kraDisplayData: response.KRADetails[0],
                secLoader: false,
                kraDataVisible: true
            })
        }

        data.templateId != null ? fetchData() : null
    }, [data.templateId])

    useEffect(() => {
        // console.log("kraaaaaaa", data.kraData);
    }, [data.kraData])
    const swipeLeft = () => {

        if (data.count < data.kraData.KRADetails.length - 1 == true) {

            setdata({
                ...data,
                count: data.count + 1,
                kraDisplayData: data.kraData.KRADetails[data.count + 1]
            })
        }
    }

    const swipeRight = () => {
        if (data.count > 0) {
            setdata({
                ...data,
                count: data.count - 1,
                kraDisplayData: data.kraData.KRADetails[data.count - 1]
            })
        }
    }

    const SaveGoalSetting = async (Status) => {
        var goalSettingData = []
        var kraData = data.kraData.KRADetails
        var formData = data.kraData.FormDetails[0]
        var commentData = data.kraData.OverallComments[0]

        Object.keys(kraData).map((item, index) => {

            goalSettingData.push({
                "UserID": commentData.EmployeeID,
                "TemplateId": commentData.TemplateID,
                "FormID": commentData.FormID,
                "RowID": kraData[item].RowID,
                "AttributeId": kraData[item].AttributeId,
                "RowID1": kraData[item].RowID1,
                "AutoId": kraData[item].AutoId,
                "AspectId": kraData[item].AspectId,
                "AspectName": kraData[item].AspectName,
                "LongDesc": kraData[item].LongDesc,
                "ShortDesc": kraData[item].ShortDesc,
                "UOMName": kraData[item].UOMName,
                "TargetDate": kraData[item].TargetDate,
                "AchievementScale": kraData[item].AchievementScale,
                "Weightage": kraData[item].Weightage,
                "YearlyTarget": kraData[item].YearlyTarget,
                "Quaterly2Weightage": kraData[item].Quaterly2Weightage,
                "Quaterly2Target": kraData[item].Quaterly2Target,
                "Quaterly2TargetDate": kraData[item].Quaterly2TargetDate,
                "SelfAdded": kraData[item].SelfAdded,
                "MidAdded": kraData[item].MidAdded,
                "YearlyTargetByMgr": kraData[item].YearlyTargetByMgr,
                "YearlyTargetByReviewer": kraData[item].YearlyTargetByReviewer == null ? "" : kraData[item].YearlyTargetByReviewer,
                "TargetDateByMgr": kraData[item].TargetDateByMgr,
                "TargetDateByReviewer": kraData[item].TargetDateByReviewer,
                "KRAId": kraData[item].KRAId,
                "UOMId": kraData[item].UOMId,
                "BaseTarget": kraData[item].BaseTarget,
                "CommentsForKRA": kraData[item].CommentsForKRA,
                "CommentsForKRAByMgr": kraData[item].CommentsForKRAByMgr,
                "CommentsForKRAByHOD": kraData[item].CommentsForKRAByHOD,
                "MgrComments1": kraData[item].MgrComments1,
                "ReviwerComments1": kraData[item].ReviwerComments1,
                "Quaterly2EmpKRAComments": kraData[item].Quaterly2EmpKRAComments,
                "Quaterly2MgrKRAComments": kraData[item].Quaterly2MgrKRAComments,
                "Quaterly2ReviewerKRAComments": kraData[item].Quaterly2MgrKRAComments,
                "AchievedTargetBySelf": kraData[item].AchievedTargetBySelf == null ? "" : kraData[item].AchievedTargetBySelf,
                "AchievedPercentBySelf": kraData[item].AchievedPercentBySelf == null ? "" : kraData[item].AchievedPercentBySelf,
                "FinalScoreBySelf": kraData[item].FinalScoreBySelf == null ? "" : kraData[item].FinalScoreBySelf,
                "FinalSelfComments": kraData[item].FinalSelfComments,
                "FinalMgrComments": kraData[item].FinalMgrComments,
                "FinalReviwerComments": kraData[item].FinalReviwerComments,
                "CompeletionDate": kraData[item].CompeletionDate,
                "RatingScale": kraData[item].RatingScale == null ? "" : kraData[item].RatingScale,
                "ClassId": kraData[item].ClassId,
                "AchievedPercentBySystem": kraData[item].AchievedPercentBySystem == null ? "" : kraData[item].AchievedPercentBySystem,
                "TasksByEmpObjective": kraData[item].TasksByEmpObjective,
                "TasksByEmpMidyear": kraData[item].TasksByEmpMidyear,
                "EWeightage": kraData[item].EWeightage,
                "ETarget": kraData[item].ETarget,
                "ETargetDate": kraData[item].ETargetDate,
                "SubKRACnt": kraData[item].SubKRACnt,
                "AppraisalStartDate": formData.AppraisalStartDate,
                "AppraisalEndDate": formData.AppraisalEndDate,
                "FinalFrom": formData.FinalFrom,
                "FinalTo": formData.FinalTo,
                "EmployeeID": commentData.EmployeeID,
                "StartDate": commentData.StartDate,
                "EndDate": commentData.EndDate,
                "TemplateID": commentData.TemplateID,
                "ForYear": commentData.ForYear,
                "ObjAppraiseeComments": commentData.ObjAppraiseeComments,
                "ObjAppraiserComments": commentData.ObjAppraiserComments,
                "ObjReviewerComments": commentData.ObjReviewerComments,
                "ObjHODComments": commentData.ObjHODComments,
                "Quaterly2AppraiseeComments": commentData.Quaterly2AppraiseeComments,
                "Quaterly2AppraiserComments": commentData.Quaterly2AppraiserComments,
                "Quaterly2ReviewerComments": commentData.Quaterly2ReviewerComments,
                "FinalAppraiseeComments": commentData.FinalAppraiseeComments,
                "FinalAppraiserComments": commentData.FinalAppraiserComments,
                "FinalReviewerComments": commentData.FinalReviewerComments,
                "FinalHODComments": commentData.FinalHODComments,
                "FinalHRComments": commentData.FinalHRComments,
                "Quaterly3AppraiseeComments": commentData.Quaterly3AppraiseeComments,
                "Quaterly3AppraiserComments": commentData.Quaterly3AppraiserComments,
                "Quaterly3ReviewerComments": commentData.Quaterly3ReviewerComments,
                "MidAppraiseeComments": commentData.MidAppraiseeComments,
                "MidAppraiserComments": commentData.MidAppraiserComments,
                "MidReviewerComments": commentData.MidReviewerComments,
                "MidHODComments": commentData.MidHODComments,
                "Quaterly4AppraiseeComments": commentData.Quaterly4AppraiseeComments,
                "Quaterly4AppraiserComments": commentData.Quaterly4AppraiserComments,
                "Quaterly4ReviewerComments": commentData.Quaterly4ReviewerComments,
                "Id": formData.Id,
                "TemplateYear": formData.TemplateYear,
                "ObjPeriodFrom": formData.ObjPeriodFrom,
                "ObjPeriodTo": formData.ObjPeriodTo,
                "Quaterly2From": formData.Quaterly2From,
                "Quaterly2To": formData.Quaterly2To,
                "IsMidEditable": formData.IsMidEditable,
                "CompanyCodeNo": formData.CompanyCodeNo,
                "MinDate": formData.MinDate == null ? "" : formData.MinDate,
                "MaxDate": formData.MaxDate,
                "Quaterly3PeriodFrom": formData.Quaterly3PeriodFrom == null ? "" : formData.Quaterly3PeriodFrom,
                "Quaterly3PeriodTo": formData.Quaterly3PeriodTo == null ? "" : formData.Quaterly3PeriodTo,
                "Quaterly4PeriodFrom": formData.Quaterly4PeriodFrom == null ? "" : formData.Quaterly4PeriodFrom,
                "Quaterly4PeriodTo": formData.Quaterly4PeriodTo == null ? "" : formData.Quaterly4PeriodTo,
                "MidYearEvaluationFrom": formData.MidYearEvaluationFrom,
                "MidYearEvaluationTo": formData.MidYearEvaluationTo,
                "PMSCycleType": formData.PMSCycleType,
                "FormDisabled": formData.FormDisabled,
                "Mgr_Reviwer_Status": "",
                "Status": Status
            })

        })

        var response1 = await SaveKRADetails(userProps.userId, userProps.companyCode, userProps.userRole, goalSettingData, userProps.baseUrl)
        console.log("dattaaatt", response1);
    }




    return (
        <SafeAreaProvider style={{ flex: 1, }}>
            <ScrollView>
                <StatusBar backgroundColor={userProps.primaryColor} barStyle="light-content" />
                {
                    data.isLoading ?
                        <View style={{ margin: 10 }}>
                            <ActivityIndicator color={userProps.secColor} />
                        </View>
                        : null
                }
                <View style={styles.container}>
                    <Card style={[styles.btnTextHolder, { borderBottomColor: userProps.secColor, }]}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout("isExpanded") }} style={[styles.Btn, { backgroundColor: colors.background }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="check" size={25} color={colors.text} style={{ paddingRight: 10 }} />
                                <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>Select Form</Text>
                            </View>
                            <Icon name={data.isExpanded ? "minus" : "plus"} color={colors.text} size={25} />
                        </TouchableOpacity>
                        <View style={{ height: data.isExpanded ? null : 0, overflow: 'hidden' }}>
                            <Divider />
                            <Card style={{ margin: 20, padding: 10, borderWidth: .3, borderColor: colors.text, backgroundColor: "#ffff" }}>
                                {/* <Text>{data.templates.length !== 0 ? data.templates[0].col1 : null}</Text> */}
                                {
                                    data.templates.length !== 0 ?
                                        <Picker
                                            mode="dropdown"
                                            selectedValue={data.selectedTemplate}
                                            style={styles.pickers}
                                            onValueChange={(item) => selectedTemplate(item)}
                                        >
                                            {
                                                (data.templates).map((value) =>
                                                    <Picker.Item key={value.col1} label={value.col1} value={value.col1} />
                                                )
                                            }
                                        </Picker>
                                        : null
                                }
                            </Card>
                        </View>
                    </Card>

                    {/* {
                    data.secLoader ?
                        <View style={{ margin: 10 }}>
                            <ActivityIndicator color={userProps.secColor} />
                        </View>
                        : null
                } */}

                    {
                        data.kraDataVisible ?
                            <>
                                <Card style={[styles.btnTextHolder, { borderBottomColor: userProps.secColor }]}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout("userDetails") }} style={[styles.Btn, { backgroundColor: colors.background }]}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon name="account" color={colors.text} size={25} style={{ paddingRight: 10 }} />
                                            <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>Employee Details</Text>
                                        </View>
                                        <Icon name={data.detailExpanded ? "minus" : "plus"} color={colors.text} size={25} />
                                    </TouchableOpacity>
                                    <View style={{ height: data.detailExpanded ? null : 0, overflow: 'hidden' }}>
                                        <Divider />
                                        <Card style={{ margin: 20, }}>
                                            <View style={{ backgroundColor: userProps.primaryColor, borderRadius: 3, paddingBottom: 10 }}>
                                                <View style={{ flexDirection: 'row', borderRadius: 3 }}>
                                                    <View style={{ margin: 5, }}>
                                                        <Icon name="account" color={"white"} size={85} />
                                                    </View>
                                                    <View style={{ paddingTop: 35 }}>
                                                        <Text style={{ color: 'white', fontSize: userProps.F2 }}>{data.kraData.EmpDetails[0].EmpName}</Text>
                                                        <Text style={{ color: 'white', fontSize: userProps.F2, }}>{`(${data.kraData.EmpDetails[0].EmpNo})`}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ flexDirection: 'row', borderRadius: 3, paddingHorizontal: 20 }}>
                                                    <View style={{ width: '50%', padding: 5 }}>
                                                        <Text style={{ color: userProps.secColor, fontSize: userProps.F3 }}>{`Grade `}</Text>
                                                        <Text style={{ color: 'white', fontSize: userProps.F2, paddingLeft: 8 }}>{data.kraData.EmpDetails[0].Grade}</Text>
                                                    </View>
                                                    <View style={{ width: '50%', padding: 5 }}>
                                                        <Text style={{ color: userProps.secColor, fontSize: userProps.F3 }}>{`Date of Joining `}</Text>
                                                        <Text style={{ color: 'white', fontSize: userProps.F2, paddingLeft: 8 }}>{data.kraData.EmpDetails[0].DOJ}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', borderRadius: 3, paddingHorizontal: 20 }}>
                                                    <View style={{ width: '50%', padding: 5 }}>
                                                        <Text style={{ color: userProps.secColor, fontSize: userProps.F3 }}>{`Total Experience`}</Text>
                                                        <Text style={{ color: 'white', fontSize: userProps.F2, paddingLeft: 8 }}>{data.kraData.EmpDetails[0].SerumExp}</Text>
                                                    </View>
                                                    <View style={{ width: '50%', padding: 5 }}>
                                                        <Text style={{ color: userProps.secColor, fontSize: userProps.F3 }}>{`Education`}</Text>
                                                        <Text style={{ color: 'white', fontSize: userProps.F2, paddingLeft: 8 }}>{data.kraData.EmpDetails[0].Education}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', borderRadius: 3, paddingHorizontal: 20 }}>
                                                    <View style={{ width: '100%', padding: 5 }}>
                                                        <Text style={{ color: userProps.secColor, fontSize: userProps.F3 }}>{`Designation `}</Text>
                                                        <Text style={{ color: 'white', fontSize: userProps.F2, paddingLeft: 8 }}>{data.kraData.EmpDetails[0].Designation}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{ backgroundColor: colors.background, borderRadius: 3, paddingBottom: 10 }}>
                                                <View style={{ flexDirection: 'row', borderRadius: 3, paddingHorizontal: 20 }}>
                                                    <View style={{ width: '50%', padding: 5 }}>
                                                        <Text style={{ color: userProps.secColor, fontSize: userProps.F3 }}>{`Location `}</Text>
                                                        <Text style={{ color: colors.text, fontSize: userProps.F2, paddingLeft: 8 }}>{data.kraData.EmpDetails[0].PlaceOfWrok}</Text>
                                                    </View>
                                                    <View style={{ width: '50%', padding: 5 }}>
                                                        <Text style={{ color: userProps.secColor, fontSize: userProps.F3 }}>{`Department `}</Text>
                                                        <Text style={{ color: colors.text, fontSize: userProps.F2, paddingLeft: 8 }}>{data.kraData.EmpDetails[0].Department}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', borderRadius: 3, paddingHorizontal: 20 }}>
                                                    <View style={{ width: '50%', padding: 5 }}>
                                                        <Text style={{ color: userProps.secColor, fontSize: userProps.F3 }}>{`Appraiser 1`}</Text>
                                                        <Text style={{ color: colors.text, fontSize: userProps.F2, paddingLeft: 8 }}>{data.kraData.EmpDetails[0].DisplayMgr}</Text>
                                                    </View>
                                                    <View style={{ width: '50%', padding: 5 }}>
                                                        <Text style={{ color: userProps.secColor, fontSize: userProps.F3 }}>{`Appraiser 2`}</Text>
                                                        <Text style={{ color: colors.text, fontSize: userProps.F2, paddingLeft: 8 }}>{data.kraData.EmpDetails[0].DisplayAppraiser2}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', borderRadius: 3, paddingHorizontal: 20 }}>
                                                    <View style={{ width: '100%', padding: 5 }}>
                                                        <Text style={{ color: userProps.secColor, fontSize: userProps.F3 }}>{`HOD `}</Text>
                                                        <Text style={{ color: colors.text, fontSize: userProps.F2, paddingLeft: 8 }}>{data.kraData.EmpDetails[0].HODAdminName}</Text>
                                                    </View>
                                                </View>
                                            </View>

                                        </Card>
                                    </View>
                                </Card>

                                <Card style={[styles.btnTextHolder, { borderBottomColor: userProps.secColor }]}>
                                    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: 'gray', alignItems: 'center', marginBottom: 10 }}>
                                        <Icon name="account" size={25} color={'white'} style={{ paddingRight: 10 }} />
                                        <Text style={[styles.btnText, { fontSize: userProps.F1, color: 'white' }]}>Form: In Process </Text>
                                    </View>

                                    <View style={{ padding: 10 }}>

                                        <Card style={[{ borderTopColor: userProps.secColor, borderTopWidth: 2.5 }]}>
                                            <View style={{}}>
                                                <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout("goalSetting") }} style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>GOAL SETTING</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                {data.goalExpanded ?
                                                    <View style={{ overflow: 'hidden', backgroundColor: colors.background }}>
                                                        <Divider />
                                                        <View style={{ height: 390, backgroundColor: 'transparent' }}>
                                                            <Pages indicatorColor={'transparent'} >
                                                                {
                                                                    (data.kraData.KRADetails).map((item, index) => (
                                                                        Weightage = parseFloat(Weightage + item.Weightage),
                                                                        <KRADetail kraData={item} count={index} total={data.kraData.KRADetails.length} />
                                                                    ))
                                                                }
                                                            </Pages>
                                                        </View>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, }}>
                                                            <Button mode="contained" color={userProps.primaryColor} onPress={() => props.navigation.navigate("AddRemoveKRA",{FormData: 90})} style={{ width: '70%' }}>
                                                                ADD / Remove KRA
                                                            </Button>
                                                        </View>
                                                        <View style={{ padding: 10, backgroundColor: colors.background }}>
                                                            <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text, fontWeight: 'bold', marginBottom: 5 }]}>{`Total Weightage: ${Weightage}`}</Text>
                                                            <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text, fontWeight: 'bold', marginBottom: 3 }]}>{`OvarAll Comments`}</Text>
                                                            {
                                                                (data.kraData.OverallComments).map((item, index) => (
                                                                    <CommentModel data={item} header={"Appraisee"} />
                                                                ))
                                                            }
                                                        </View>
                                                        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                                                            <Button icon="content-save" mode="contained" color={userProps.primaryColor} onPress={() => SaveGoalSetting("appraisee - saved")} style={{ width: '40%',  }}>
                                                                SAVE
                                                            </Button>
                                                            {/* //icon="near-me" */}
                                                            <Button icon="near-me"  mode="contained" color={userProps.primaryColor} onPress={() => console.log(data.kraData.KRADetails)} style={{ width: '40%' }}>
                                                                SUBMIT
                                                            </Button>
                                                        </View>

                                                    </View>
                                                    : null
                                                }
                                            </View>
                                        </Card>

                                        <Card style={[{ borderTopColor: userProps.secColor, borderTopWidth: 2.5 }]}>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout('midYear') }} style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>MID YEAR REVIEW</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ height: data.midYearExpanded ? null : 0, overflow: 'hidden' }}>
                                                <Divider />
                                                <Card style={{ margin: 20, padding: 10, borderWidth: .3, borderColor: 'black', }}>

                                                </Card>
                                            </View>
                                        </Card>

                                        <Card style={[{ borderTopColor: userProps.secColor, borderTopWidth: 2.5 }]}>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout('annual') }} style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>ANNUAL EVALUATION</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ height: data.annualExpanded ? null : 0, overflow: 'hidden' }}>
                                                <Divider />
                                                <Card style={{ margin: 20, padding: 10, borderWidth: .3, borderColor: 'black' }}>

                                                </Card>
                                            </View>
                                        </Card>

                                        <Card style={[{ borderTopColor: userProps.secColor, borderTopWidth: 2.5 }]}>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout('feedback') }} style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>FEEDBACK FORM</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ height: data.feedbackExpanded ? null : 0, overflow: 'hidden' }}>
                                                <Divider />
                                                <Card style={{ margin: 20, padding: 10, borderWidth: .3, borderColor: 'black' }}>

                                                </Card>
                                            </View>
                                        </Card>

                                        <Card style={[{ borderTopColor: userProps.secColor, borderTopWidth: 2.5 }]}>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout('attachments') }} style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>ATTACHMENTS</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ height: data.attachments ? null : 0, overflow: 'hidden' }}>
                                                <Divider />
                                                <Card style={{ margin: 20, padding: 10, borderWidth: .3, borderColor: 'black' }}>

                                                </Card>
                                            </View>
                                        </Card>

                                        <Card style={[{ borderTopColor: userProps.secColor, borderTopWidth: 2.5 }]}>
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout('appraisallog') }} style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>VIEW APPRAISALLOG</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ height: data.appraisallog ? null : 0, overflow: 'hidden' }}>
                                                <Divider />
                                                <Card style={{ margin: 20, padding: 10, borderWidth: .3, borderColor: 'black' }}>

                                                </Card>
                                            </View>
                                        </Card>

                                    </View>
                                </Card>

                            </>
                            : null
                    }



                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}



export default (PmsHome)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        // justifyContent: 'center',
        paddingTop: 10
    },

    text: {
        fontSize: 17,
        color: 'black',
        padding: 10
    },

    btnText: {
        textAlign: 'left',
        color: 'black',
    },

    btnTextHolder: {
        borderBottomWidth: 2.5,
        elevation: 5,
        marginBottom: 15,
    },

    Btn: {
        padding: 10,
        backgroundColor: '#ffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    FormTabs: {
        padding: 15,
        backgroundColor: '#ffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    pickers: { height: 20, fontWeight: 'bold' },
    image: {
        width: null,
        height: null,
        resizeMode: 'cover',
        flex: 1,
    }

});