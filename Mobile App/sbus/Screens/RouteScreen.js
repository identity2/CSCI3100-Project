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
import {RouteList} from '../Components/RouteList'


import COLORS from '../Colors' 

export class RouteScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          route: null
        }
    }

    componentDidMount(){
      if (this.props.navigation.state.params != null){
        var targetRoute = this.props.navigation.state.params.targetRoute;
        if (targetRoute != null){
          this.setState({route: targetRoute});
        }
      }
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
        <SafeAreaView style = {{flex :1}}>
            <Header
             containerStyle = {styles.headerContainer}
             leftContainerStyle = {{flex: 0}}
             leftComponent = {this._backButton}
             rightContainerStyle = {{flex: 0,}}/>
             <View style = {styles.container}>
                <View style = {styles.tabContainer}>
                  <Text style = {styles.tabText}>
                    車程
                  </Text>
                </View>
                <View style = {styles.listContainer}>
                  {
                    this.state.route != null 
                    ?
                    <RouteList
                    data = {this.state.route.routePath}  
                    />
                    :
                    <ActivityIndicator size={80} color={COLORS.verydeepgrey} style = {{flex: 1}}/>
                  }
                </View>
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