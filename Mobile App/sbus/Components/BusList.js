/*
  What: the layout of Busroute item
  Who: CHIU LIN FUNG 1155109993
  Where: Busroute list at home page
  Why: separate the layout of item could be easy to manage
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

import { Entypo, AntDesign , MaterialIcons} from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import COLORS from '../Colors'

/*
  What: This is algorithmn to calculate the distance between two locations
  Who: CHIU LIN FUNG 1155109993
  Where: nearby station
  Why: calculating and distance of nearby station
  How: take 2 Geodata and a unit of 'M', 'K' as input and return distance in corresponding unit 
*/

function distance(loc1, loc2, unit) {
	if ((loc1.latitude == loc2.latitude) && (loc1.longitude == loc2.longitude)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * loc1.latitude/180;
		var radlat2 = Math.PI * loc2.latitude/180;
		var theta = loc1.longitude-loc2.longitude;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

function ISNULL(object){
    return object == null;
}

export class BusList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentlocation: null
        }
    }

    componentDidMount(){
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({currentlocation: location.coords});
    };

    _separator = () => {
        return (
            <View style = {{height: 10}}/>
        );
    }

    _detail = (route) => {
        this.props.navigation.navigate('Detail',{ targetRoute: route});
    }

    _travel = (route) => {
        this.props.navigation.navigate('Travel',{ currentRoute: route});
    };

    _busItem = ({index, item}) => {
        var min, nearpt, stpt, edpt, nextbus, busdistance, waitingtime;
        if (item.stations != null){
            stpt = item.stations[0]
            edpt = item.stations[item.stations.length - 1]
            if (item.stations[0].longitude != null && item.stations[0].latitude != null && this.state.currentlocation != null){
                min = distance(item.stations[0], this.state.currentlocation, 'K');
                nearpt = item.stations[0];
                item.stations.forEach(element => {
                    if (element.longitude != null && element.latitude != null){
                        let temp = distance(element, this.state.currentlocation, 'K');
                        if (min > temp){
                            min = temp;
                            nearpt = element;
                        }
                    }
                });
                min = Math.round(min);
            }
        }
        if (item.buses != null){
            nextbus = item.buses[0]
            if (item.buses[0].longitude != null && item.buses[0].latitude != null && nearpt != null){
                busdistance =  distance(item.buses[0], nearpt, 'K');
                item.buses.forEach(element => {
                    if (element.longitude != null && element.latitude != null){
                        let temp = distance(element, nearpt, 'K');
                        if (busdistance > temp){
                            busdistance = temp;
                            nextbus = element;
                        }
                    }
                });
                waitingtime = busdistance / 80 * 60;
                waitingtime = Math.round(waitingtime);
            }
        }
        return (
            <View style = {[styles.itemContainer]}>
                <TouchableOpacity activeOpacity= {0.6} onPress = {() => {this._detail(item)}} style = {[styles.infoContainer, {backgroundColor: index % 2 == 0 ? COLORS.grey : COLORS.deepgrey}]}>
                    <View style = {{flexDirection: 'column', marginLeft :5, flex: 1}}>
                        <View style = {{flexDirection: 'row', alignItems: 'center', overflow: "hidden"}}>
                            <Text style = {styles.routeText}>
                                {item.routeName}
                            </Text>
                            <View style = {{marginHorizontal:5}}/>
                            <Text style = {[styles.routeText, {fontSize: routeTextSize}]}>
                                {stpt != null ? stpt.stationName : null}
                            </Text>
                            <Entypo name = "arrow-long-right" size = {24} color = {COLORS.tintcolor} style = {{marginHorizontal:5}}/>
                            <Text style = {[styles.routeText, {fontSize: routeTextSize}]}>
                                {edpt != null ? edpt.stationName : null}
                            </Text>
                        </View>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <View style = {{flexDirection: 'column', flex: 1}}>
                                <Text  style = {[styles.infoText, {fontSize: infoTextSize, flex: 1}]}>
                                    Nearby: {nearpt != null ? nearpt.stationName : null} 
                                </Text>
                                <Text  style = {[styles.infoText, {fontSize: infoTextSize, flex: 1}]}>
                                    Distance: {min != null ? min : null} Km
                                </Text>
                            </View>
                            {/*
                            <View style = {{flexDirection:'row', paddingHorizontal: 5, justifyContent: 'center'}}>
                                <Foundation name="foot" size = {17} color = {infoTextColor}/>                 
                                <Text  style = {[styles.infoText, {fontSize: infoTextSize, marginLeft:6}]}>
                                    {item.distance} m
                                </Text>
                            </View> 
                            */}
                            <View style = {{flexDirection:'row',alignItems : 'center', justifyContent: 'center', width: 60}}>
                                <MaterialIcons name="attach-money" size = {20} color = {infoTextColor}/>                 
                                <Text  style = {[styles.infoText, {fontSize: infoTextSize+ 3}]}>
                                    {waitingtime * 1.5 + 3}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Image/>
                </TouchableOpacity>
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity activeOpacity= {0.6} onPress= {() => {this._travel(item)}} style= {styles.buttonItem}>
                        <AntDesign name = "swapright" size={32} style = {{margin: -10, marginBottom: -10}} color = {COLORS.tintcolor}/>
                        <Text style = {[styles.routeText, {fontSize: routeTextSize + 3}]}>
                            {waitingtime}
                        </Text>
                        <Text style={styles.itemText}>
                            min
                        </Text>
                    </TouchableOpacity>
                    {/** 
                    <View style = {{borderColor: COLORS.tintcolor, borderWidth: 0.3}}/>
                    <TouchableOpacity activeOpacity= {0.6} style= {styles.buttonItem}>
                        <MaterialCommunityIcons name= "information" color = {COLORS.tintcolor} size = {32} style = {{marginBottom: -2}}/>
                        <Text style={styles.itemText}>
                            Info
                        </Text>
                    </TouchableOpacity>
                    */}
                </View>
            </View>
        );
    }

    render(){
        return(
            <FlatList
            scrollEventThrottle={16}
            onScroll={this.props.onScroll}
            data={this.props.data}
            renderItem={this._busItem}
            keyExtractor={(item, index)=> index.toString()}
            extraData={this.props.update}
            ItemSeparatorComponent={ this._separator}
            style = {{paddingTop : 10}}
            />
        );
    }
}

let radius = 15;
let routeTextSize = 17;
let infoTextSize = 15;
let infoTextColor = "#3d3d3d";

const styles = StyleSheet.create({
    itemContainer:{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#FFF',
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
        marginRight: 5,
        borderColor: "#BdBdBd",
        borderWidth: 1,
    },
    infoContainer:{
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderTopRightRadius: radius,
    },
    buttonContainer:{
        backgroundColor: "#FFF",
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
    },
    buttonItem:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        marginHorizontal:10,
    },
    itemText :{
        fontSize: 13,
        fontWeight: '300',
        textAlignVertical: 'center',
        color : COLORS.tintcolor,
    },
    routeText:{
        fontSize: 26,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        color : COLORS.tintcolor,
    },
    infoText :{
        textAlignVertical: 'center',
        fontWeight: '500',
        color : infoTextColor, 
    }
})
