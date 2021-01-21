import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const RecommendedKRAs = (props) => {
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
                        <Text style={[styles.text, { color: colors.text }]}> Orignal KRA </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.kraData.KRA} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Replaced KRA </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }} > {props.kraData.Measure} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Action By Appraiser 1 </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.kraData.RejectReason} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Comments By Appraiser 1 </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.kraData.Status} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Action By Admin </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.kraData.ReasonByManager} </Text>
                    </View>
                </View>
                <View style={[styles.table, { borderColor: colors.text }]}>
                    <View style={[styles.shortView, { borderRightColor: colors.text }]}>
                        <Text style={[styles.text, { color: colors.text }]}> Comments By Admin </Text>
                    </View>
                    <View style={styles.longView}>
                        <Text style={{ color: colors.text }}> {props.kraData.StatusByManager} </Text>
                    </View>
                </View>
            </Card>
        </ScrollView>

    );
}

export default RecommendedKRAs

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