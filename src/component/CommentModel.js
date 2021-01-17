import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
const CommentModel = (props) => {

    const { colors } = useTheme()
    const userProps = useSelector(state => state.userReducer)
   
    return (
        <Card style={{ padding: 10, elevation: 3, marginVertical: 8, backgroundColor: colors.background, borderWidth: userProps.darkTheme ? .2 : null, borderColor: userProps.darkTheme ? colors.text :null}}>
        <Text style={{ fontSize: userProps.F2, color: colors.text }}> {props.header} </Text>
                <Card style={{ margin: 5, paddingHorizontal: 5, height: 150, borderWidth: .3, borderColor: colors.text, backgroundColor: colors.background }}>
                <ScrollView nestedScrollEnabled={true} style={{padding:5}}>
                    <Text style={{color: colors.text}}>{props.data.ObjAppraiseeComments}</Text>
                    </ScrollView>
                </Card>
        </Card>
    );
}

export default CommentModel
const style = StyleSheet.create({

})