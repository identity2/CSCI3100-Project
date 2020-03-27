import React from 'react';
import {
    TouchableOpacity,
    Text,
    Animated,
    TextInput,
    StyleSheet,
    View,
  } from 'react-native';


import COLORS from '../Colors'

import { TravelContext } from '../Context/TravelContext'

import {Feather, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';

export class NavigationHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            start: 'Current location',
            end: '',
            rotate: new Animated.Value(0),
            animation:'',
        };
    }

    _onSwap =  () => {
        if (this.state.animation != 'entering'){
            this.setState({animation: 'entering'});
            Animated.timing(this.state.rotate,
              {
                toValue: 1,
                duration: 300,
              }).start()
            
        }
        else if (this.state.rotate != 'fading'){
            this.setState({animation: 'fading'});
            Animated.timing(this.state.rotate,
              {
                toValue: 0,
                duration: 300,
              }).start()
        }
        this.setState({start: this.state.end, end: this.state.start});
    }

    _onStInput = (start) => {
        this.setState({start: start});
    }

    _onEndInput = (end) => {
        this.setState({end: end});
    }

    render() {
        return(
            <TravelContext.Consumer>
                {({updateLocation, updateState}) => (
                <View style = {styles.navigationHeader}>
                    <TouchableOpacity style = {{justifyContent:'center',marginHorizontal: 3, marginRight: 5}} onPress = {this.props.onBack == null?() => {}: this.props.onBack}>
                        <Feather name = "arrow-left" color = {COLORS.tintcolor} size = {28} />
                    </TouchableOpacity>
                    <View style= {styles.locationContainer}>
                        <View style = {{flex: 1, marginRight: 5}}>
                            <View style = {styles.lineContainer}>
                                <MaterialCommunityIcons  name = "circle-medium" color = {COLORS.tintcolor} size = {25}/>
                                <TextInput 
                                maxLength={30}
                                style= {styles.textinputContainer}
                                placeholder = "From: location, station..."
                                placeholderTextColor = {COLORS.verydeepgrey}
                                onChangeText={this._onStInput}
                                value = {this.state.start}
                                onSubmitEditing = {() => {updateLocation(this.state.start, this.state.end); this._end.focus()}}
                                returnKeyType = "next"
                                />
                            </View>
                            <View style = {{marginLeft: 30,borderTopWidth: 0.6, height: 0, borderColor: COLORS.verydeepgrey}}/>
                            <View  style = {styles.lineContainer}>
                                <MaterialCommunityIcons  name = "circle-medium" color = "green" size = {25}/>
                                <TextInput 
                                ref = {(c) => {this._end = c}}
                                maxLength={30}
                                style= {styles.textinputContainer}
                                placeholder = "Destination: location, station..."
                                placeholderTextColor = {COLORS.verydeepgrey}
                                onChangeText={this._onEndInput}
                                value = {this.state.end}
                                returnKeyType = "search"
                                onSubmitEditing = {() => {updateLocation(this.state.start, this.state.end); updateState("searching")}}
                                />
                                </View>
                        </View>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity style = {{marginHorizontal: 3, marginRight: 5}} onPress ={() => {updateLocation(this.state.end, this.state.start); this._onSwap();}} >
                                <Animated.View style = {{transform: [{ 
                                    rotate: this.state.rotate.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-Math.PI / 2, Math.PI/2]
                                    }),}]}}>
                                    <AntDesign name = "swap" color = {COLORS.tintcolor} size = {28}/>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                )}
            </TravelContext.Consumer>
        );
    }
}

let radius = 15;

const styles = StyleSheet.create({
    navigationHeader:{
        height: 80,
        backgroundColor: "white",
        borderRadius: radius,
        borderWidth: 1,
        borderColor: COLORS.grey,
        padding: 5,
        flexDirection: 'row',
    },
    locationContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius,
        padding: 5,
        backgroundColor: COLORS.grey,
        flex : 1
    },
    tagContainer:{
        padding:-0,
        alignItems: 'center',
        backgroundColor: COLORS.tintcolor,
        borderRadius: radius,
        width: 50,
    },
    textinputContainer:{
        maxHeight: 24,
        paddingHorizontal: 5,
        fontSize: 15,
        justifyContent: 'center',
        flex: 1
    }
    ,
    lineContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    }
})