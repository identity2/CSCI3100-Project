import React from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { Header } from 'react-native-elements'
import {Feather} from '@expo/vector-icons';
 
import COLORS from '../Colors'

export class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
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
    </SafeAreaView>
  );
}

_home = () => {
    this.props.navigation.navigate('Home');
};
}

const styles = StyleSheet.create({
headerContainer: {
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: COLORS.selected,        
  padding: 0,
}
})