/*
  What: This is layout of timetable item
  Who: CHIU LIN FUNG 1155109993
  Where: schedule page
  Why: easy to manage if separate the layout of list item
  How: ...
*/

import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ScrollView,
    View,
  } from 'react-native';

import { Entypo, AntDesign ,  MaterialCommunityIcons} from '@expo/vector-icons';


import COLORS from '../Colors'

export class PeriodList extends React.Component {
    constructor(props){
        super(props);
    }



    render(){
        const resultable = [];
        var resulttime = [];
        this.props.data.forEach(element => {
            if (element != null){
                resulttime = [];
                resultable.push(
                    <View style = {styles.row}>
                        <View style = {styles.cell}><Text style ={styles.headerfont}>{element.title}</Text></View>
                        <View style = {{flex: 2}}><Text style ={styles.headerfont}>frequency(min)</Text></View>
                    </View>
                    )
                element.timetable.forEach(item => {
                    resulttime.push(
                        <View style = {[styles.row,styles.content]}>
                            <View style = {styles.cell}><Text style={styles.contentfont}>{item.period}</Text></View>
                            <View style = {{flex: 2}}><Text style={styles.contentfont}>{item.time}</Text></View>
                        </View>
                    )
                })
                resultable.push(resulttime);
                resultable.push(<View style={{height:25}}/>)
            }
        })
        return(
            <View style = {styles.container}>
                {resultable}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        padding: 20,
    },
    row :{
        flexDirection: "row",
    },
    cell:{
        flex : 3,
    },
    content:{
        paddingLeft: 25,
    },
    headerfont:{
        color: COLORS.tintcolor,
        fontSize: 16.5,
        fontWeight: "bold",
    },
    contentfont:{
        fontSize: 15,
    }
})
