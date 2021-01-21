import React from 'react';
import { View, Button, Text, ScrollView, LayoutAnimation, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-paper'
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pages } from 'react-native-pages';

const SubKraDetails = (props) => {
  const { item } = props.route.params;
  const { colors } = useTheme();
  const userProps = useSelector(state => state.userReducer)
  console.log(item);
  const [data, setData] = React.useState({
    detailVisible: false,
    subKRA: false,
    resource: false,
    actionPlan: false,
  })

  const changeLayout = (value) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    value == 'subKRA' ?
      setData({ ...data, subKRA: !data.subKRA, actionPlan: false, resource: false }) :
    value == 'actionPlan' ?
      setData({ ...data, actionPlan: !data.actionPlan, subKRA: false, resource: false }) :
    value == 'resource' ?
      setData({ ...data, resource: !data.resource, subKRA: false, actionPlan: false, }) :
    null
}


  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaProvider style={{ flex: 1, padding: 10 }}>
        <Card>
          <Card style={[{ borderBottomColor: userProps.secColor, borderBottomWidth: 2.5 }]}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => { setData({ ...data, detailVisible: !data.detailVisible }) }}
              style={[styles.FormTabs, { backgroundColor: colors.background }]}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="account" size={25} color={colors.text} style={{ paddingRight: 10 }} />
                <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>KRA Basic Details</Text>
              </View>
              <Icon name={data.detailVisible ? "minus" : "plus"} color={colors.text} size={25} />
            </TouchableOpacity>
            <View style={{ height: data.detailVisible ? null : 0, overflow: 'hidden', padding: 10 }}>
              <Divider />

              <Card style={styles.header} onPress={() => { setData({ ...data, aspectDataVisible: true }) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '90%', }} >
                    <Text style={[styles.cardLabel, { color: userProps.secColor }]}>KRA</Text>
                    <Text style={styles.cardLabel}>{item.ShortDesc}</Text>
                  </View>
                </View>
              </Card>

              <Card style={styles.header} onPress={() => { setData({ ...data, kraDataVisible: true }) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '90%', }} >
                    <Text style={[styles.cardLabel, { color: userProps.secColor }]}>KRA Description</Text>
                    <Text numberOfLines={2} style={styles.cardLabel}>{item.LongDesc}</Text>
                  </View>
                </View>
              </Card>

              <Card style={styles.header} onPress={() => { setData({ ...data, aspectDataVisible: true }) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '90%', }} >
                    <Text style={[styles.cardLabel, { color: userProps.secColor }]}>KRA</Text>
                    <Text style={styles.cardLabel}>{item.AspectName}</Text>
                  </View>
                </View>
              </Card>

              <Card style={styles.header} onPress={() => { setData({ ...data, kraDataVisible: true }) }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '90%', }} >
                    <Text style={[styles.cardLabel, { color: userProps.secColor }]}>KRA Description</Text>
                    <Text numberOfLines={2} style={styles.cardLabel}>{item.UOMName}</Text>
                  </View>
                </View>
              </Card>



              {/* <Card style={[styles.header]}>
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
                            </Card> */}
            </View>
          </Card>
        </Card>

        <Card style={[styles.btnTextHolder, { borderBottomColor: userProps.secColor, marginTop: 10 }]}>
          <View style={{ flexDirection: 'row', padding: 10, backgroundColor: 'gray', alignItems: 'center', marginBottom: 10 }}>
            <Icon name="account" size={25} color={'white'} style={{ paddingRight: 10 }} />
            <Text style={[styles.btnText, { fontSize: userProps.F1, color: 'white' }]}>{`KRA: ${item.ShortDesc}`}</Text>
          </View>

          <View style={{ padding: 10 }}>

            <Card style={[{ borderTopColor: userProps.secColor, borderTopWidth: 2.5 }]}>
              <View style={{}}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout("subKRA") }} style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>SUB KRA</Text>
                  </View>
                </TouchableOpacity>
                {data.subKRA ?
                  <View style={{ overflow: 'hidden', backgroundColor: colors.background }}>
                    <Divider />
                    <View style={{ height: 390, backgroundColor: 'transparent' }}>
                      <Pages indicatorColor={'transparent'} >
                        {
                          (data.kraData.KRADetails).map((item, index) => (
                            // Weightage = parseFloat(Weightage + item.Weightage),
                            <KRADetail props={props} kraData={item} count={index} total={data.kraData.KRADetails.length} />
                          ))
                        }
                      </Pages>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, }}>
                      <Button mode="contained" color={userProps.primaryColor} onPress={() => props.navigation.navigate("AddRemoveKRA", { "FormData": data.kraData.FormDetails[0], "FormId": data.kraData.OverallComments[0].FormID })} style={{ width: '70%' }}>
                        ADD / Remove KRA
                    </Button>
                    </View>
                   

                  </View>
                  : null
                }
              </View>
            </Card>

            <Card style={[{ borderTopColor: userProps.secColor, borderTopWidth: 2.5 }]}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout('actionPlan') }} style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>ACTION PLAN</Text>
                </View>
              </TouchableOpacity>
              <View style={{ height: data.midYearExpanded ? null : 0, overflow: 'hidden' }}>
                <Divider />
                <Card style={{ margin: 20, padding: 10, borderWidth: .3, borderColor: 'black', }}>

                </Card>
              </View>
            </Card>

            <Card style={[{ borderTopColor: userProps.secColor, borderTopWidth: 2.5 }]}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => { changeLayout('resource') }} style={[styles.FormTabs, { backgroundColor: colors.background }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.btnText, { fontSize: userProps.F2, color: colors.text }]}>RESOURCE</Text>
                </View>
              </TouchableOpacity>
              <View style={{ height: data.annualExpanded ? null : 0, overflow: 'hidden' }}>
                <Divider />
                <Card style={{ margin: 20, padding: 10, borderWidth: .3, borderColor: 'black' }}>

                </Card>
              </View>
            </Card>
          </View>
        </Card>



      </SafeAreaProvider>
    </ScrollView>
  );
}


export default SubKraDetails;
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