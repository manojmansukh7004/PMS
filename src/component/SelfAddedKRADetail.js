import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const SelfAddedKRADetail = (props) => {
    const { colors } = useTheme();
    const userProps = useSelector(state => state.userReducer);


    return (
        <ScrollView nestedScrollEnabled={true}        >
            <Card style={[styles.Container, { backgroundColor: colors.background }]}>
                <Text style={{ paddingBottom: 8, color: colors.text }}>{`Showing ${props.count + 1} of ${props.total}`}</Text>
                <View style={[styles.table, { borderColor: colors.text, }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Sr. No. </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.count + 1} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Aspect </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.kraData.AspectName} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> KRA </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }} > {props.kraData.LongDesc} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Measure </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.kraData.UOMName} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Weightage (%) </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.kraData.weightage} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Target </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.kraData.YearlyTarget} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Target Date </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.kraData.TargetDate} </Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, }}>
                    <Button mode="contained" color={userProps.primaryColor} onPress={() => { props.handleDelteKRA(props.kraData.AutoId) }} style={{ width: '70%' }}>
                        DELETE
                    </Button>
                </View>
            </Card>
        </ScrollView>

    );
}

export default SelfAddedKRADetail

const styles = StyleSheet.create({
    Container: {
        // flex:1,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        elevation: 3,
        // margin: 8,
        width: "100%",

    },
    table: {
        flexDirection: 'row',
        borderWidth: .2,
    },
    shortView: {
        width: '35%',
        borderRightWidth: .3,
        padding: 10
    },
    longView: {
        width: '65%',
        padding: 10
    },
    text: {
        fontWeight: 'bold'
    }
})