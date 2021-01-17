import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const KRADetail = (props) => {
    const { colors } = useTheme();
   

    return (
        <ScrollView nestedScrollEnabled={true}        >
        <Card style={[styles.Container,{backgroundColor: colors.background}]}>
            <Text style={{paddingBottom: 8, color: colors.text}}>{`Showing ${props.count  + 1} of ${props.total}`}</Text>
            <View style={[styles.table,{borderColor: colors.text, }]}>
                <View style={[styles.shortView,{ borderRightColor: colors.text}]}>
                    <Text style={[styles.text,{color: colors.text}]}> Sr. No. </Text>
                </View>
                <View style={styles.longView}>
                    <Text style={{color: colors.text}}> {props.count + 1} </Text>
                </View>
            </View>
            <View style={[styles.table,{borderColor: colors.text}]}>
            <View style={[styles.shortView,{ borderRightColor: colors.text}]}>
                <Text style={[styles.text,{color: colors.text}]}> Aspect </Text>
                </View>
                <View style={styles.longView}>
                    <Text style={{color: colors.text}}> {props.kraData.AspectName} </Text>
                </View>
            </View> 
            <View style={[styles.table,{borderColor: colors.text}]}>
            <View style={[styles.shortView,{ borderRightColor: colors.text}]}>
                <Text style={[styles.text,{color: colors.text}]}> Key Result Area </Text>
                </View>
                <View style={styles.longView}>
                    <Text style={{color: colors.text}} > {props.kraData.LongDesc} </Text>
                </View>
            </View>
            <View style={[styles.table,{borderColor: colors.text}]}>
            <View style={[styles.shortView,{ borderRightColor: colors.text}]}>
                <Text style={[styles.text,{color: colors.text}]}> Measure </Text>
                </View>
                <View style={styles.longView}>
                    <Text style={{color: colors.text}}> {props.kraData.UOMName} </Text>
                </View>
            </View>
            <View style={[styles.table,{borderColor: colors.text}]}>
            <View style={[styles.shortView,{ borderRightColor: colors.text}]}>
                <Text style={[styles.text,{color: colors.text}]}> Weightage (%) </Text>
                </View>
                <View style={styles.longView}>
                    <Text style={{color: colors.text}}> {props.kraData.Weightage} </Text>
                </View>
            </View>
            <View style={[styles.table,{borderColor: colors.text}]}>
            <View style={[styles.shortView,{ borderRightColor: colors.text}]}>
                <Text style={[styles.text,{color: colors.text}]}> Target </Text>
                </View>
                <View style={styles.longView}>
                    <Text style={{color: colors.text}}> {props.kraData.YearlyTarget} </Text>
                </View>
            </View> 
            <View style={[styles.table,{borderColor: colors.text}]}>
            <View style={[styles.shortView,{ borderRightColor: colors.text}]}>
                <Text style={[styles.text,{color: colors.text}]}> Target Date </Text>
                </View>
                <View style={styles.longView}>
                    <Text style={{color: colors.text}}> {props.kraData.TargetDate} </Text>
                </View>
            </View>
            <View style={[styles.table,{borderColor: colors.text}]}>
            <View style={[styles.shortView,{ borderRightColor: colors.text}]}>
                <Text style={[styles.text,{color: colors.text}]}> Comments </Text>
                </View>
                <View style={styles.longView}>
                    <Icon name={'chat'} size= {25} color={colors.text}/>
                </View>
            </View>
        </Card>
        </ScrollView>

    );
}

export default KRADetail

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
    table:{
        flexDirection: 'row',
         borderWidth: .2,
    },
    shortView:{
        width: '35%', 
        borderRightWidth: .3, 
        padding: 10
    },
    longView:{
        width: '65%', 
        padding: 10
    },
    text:{
        fontWeight: 'bold'
    }
})