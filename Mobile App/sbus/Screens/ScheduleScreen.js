/*
  What: the schedule of bus route
  Who: CHIU LIN FUNG 1155109993
  Where: schedule screen
  Why: to display the schedule of bus route in a better look
  How: the schedule require the json date structure of {["title", "timetable"]...}. title is name of section and timetable is the period and waiting time in that section
*/


import React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { Header } from 'react-native-elements'
import {Feather} from '@expo/vector-icons';
 
import COLORS from '../Colors'
import { PeriodList } from '../Components/PeriodList';

const testData = [
  {
    "title" : "Monday to Friday",
    "timetable" :[
      {
        "period" : "05:30 - 06:00",
        "time":  "15" 
      },
      {
        "period" : "06:00 - 07:37",
        "time":  "5-8" 
      },
      {
        "period" : "07:37 - 18:20",
        "time":  "10-15"
      },
      {
        "period" : "18:20 - 23:45",
        "time":  "25" 
      },
      
    ],
  },
  {
    "title" : "Saturday",
    "timetable" :[
      {
        "period" : "05:30 - 06:00",
        "time":  "15" 
      },
      {
        "period" : "06:00 - 07:37",
        "time":  "5-8" 
      },
      {
        "period" : "07:37 - 18:20",
        "time":  "10-15"
      },
      {
        "period" : "18:20 - 23:45",
        "time":  "25" 
      },
      
    ],
  },
  {
    "title" : "Sunday and Holidays",
    "timetable" :[
      {
        "period" : "05:30 - 06:00",
        "time":  "15" 
      },
      {
        "period" : "06:00 - 07:37",
        "time":  "5-8" 
      },
      {
        "period" : "07:37 - 18:20",
        "time":  "10-15"
      },
      {
        "period" : "18:20 - 23:45",
        "time":  "25" 
      },
      
    ],
  },
]

export class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {schedule : testData};
}


_backButton = () => {
  return(
    <TouchableOpacity onPress= {this._home}>
      <Feather name='chevron-left' size= {26} color = {"#FFF"}/>
    </TouchableOpacity>
  );
}

render() {
  return (
    <SafeAreaView style={{flex : 1}}>
        <Header
         containerStyle = {styles.headerContainer}
         leftContainerStyle = {{flex: 0}}
         leftComponent = {this._backButton}
         rightContainerStyle = {{flex: 0,}}/>
         <View style = {styles.container}>
                <View style = {styles.tabContainer}>
                  <Text style = {styles.tabText}>
                    Schedule
                  </Text>
                </View>
                <ScrollView style = {styles.listContainer}>
                  {
                    this.state.schedule != null 
                    ?
                      <PeriodList data = {this.state.schedule}/>
                    :
                    <ActivityIndicator size={80} color={COLORS.verydeepgrey} style = {{flex: 1}}/>
                  }
                </ScrollView>
             </View>
    </SafeAreaView>
  );
}

_home = () => {
    this.props.navigation.navigate('Home');
};
}

let radius = 10;

const styles = StyleSheet.create({
  headerContainer: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: COLORS.selected,        
      padding: 0,
  },
  container :{
      flex: 1,
      padding: 15,
      paddingBottom: 10,
  },
  tabText: {
    color : "#FFF",
    fontSize : 17,
  },
  tabContainer: {
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      padding: 5,
      paddingHorizontal: 10,
      backgroundColor: COLORS.themecolor
  },
  listContainer :{
      backgroundColor: COLORS.grey,
      flex: 1,
      height: 100,
      paddingVertical: 10,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
  }
})
