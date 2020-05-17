/*
  What: This is the layour of RouteList item
  Who: CHIU LIN FUNG 1155109993
  Where: Route Screen
  Why: easy to manange if separate component out of screen
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


export class RouteList extends React.Component {
    constructor(props){
        super(props);
    }

    _travel = ()=>{
        this.props.navigation.navigate('Travel');
    }

    _routeItem = ({index, item}) => {
        var next, nextnext;
        if (this.props.data.buses != null && item != null){
            next = {
                bus : this.props.data.buses[0],
                value :distance(this.props.data.buses[0], item, 'K') / 80 * 60 + 2
            };
            nextnext = {
                bus : this.props.data.buses[0],
                value :distance(this.props.data.buses[0], item, 'K') / 80 * 60 + 2
            };
            this.props.data.buses.forEach(element => {
                let temp = distance(element, item, 'K') / 80 * 60 + 2
                if (temp < next.value){
                    next = {
                        bus: element,
                        value: temp
                    }
                }
                else if (temp < nextnext.value){
                    nextnext = {
                        bus: element,
                        value: temp
                    }
                }
            });
            next.value = Math.round(next.value);
            nextnext.value = Math.round(nextnext.value);
        }
        return(
            <View style= {styles.itemContainer}>
                <View style = {styles.leftContainer}>
                    <View style = {styles.iconContainer}>
                        <MaterialCommunityIcons name ="map-marker" size = {30} color = {COLORS.google}/>
                    </View>
                    {<View style = {styles.verticalLine}/>}
                </View>
                <TouchableOpacity style = {[styles.rightContainer,styles.bottomLine]} onPress={this._travel}>
                    <View style = {styles.contextContainer}>
                        <View style = {styles.busStopContainer}>
                            <Text style = {styles.busStopText}>
                                {item.stationName}
                            </Text>
                        </View>
                        {this.props.data.buses.length >= 2
                            ?
                            <View style = {styles.tagContainer}>
                                <Text style = {styles.tagText}>
                                    {nextnext.value} min
                                </Text>
                            </View>
                            :
                            <View/>
                        }
                        <View style = {styles.tagContainer}>
                            <Text style = {styles.tagText}>
                                {next.value} min
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render(){
        return(
            <FlatList
            scrollEventThrottle={16}
            data={this.props.data.stations}
            renderItem={this._routeItem}
            keyExtractor={(item, index)=> index.toString()}
            extraData={this.props.update}
            style = {{paddingTop : 10}}
            />
        );
    }
}

const styles = StyleSheet.create({
    itemContainer:{
        flexDirection: 'row',
        paddingBottom: 10,
    },
    iconContainer:{
        paddingHorizontal: 5,
    },
    verticalLine:{
        borderLeftWidth: 1,
        borderLeftColor: COLORS.themecolor,
        borderStyle: "dotted",
        marginTop: -5,
        flex: 1,
    },
    leftContainer:{
        flexDirection: 'column',
        //height : 100,
        alignItems: 'center',
    },
    bottomLine:{
        //marginBottom: 10, 
        borderBottomWidth: 2,
        borderBottomColor: COLORS.deepgrey,
    },
    contextContainer:{
        flex: 1,
    },
    busStopContainer:{
        padding: 5
    },
    busStopText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.tintcolor,
    },
    tagContainer:{
        marginVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 15,
        borderColor: "#FFF",
        borderWidth: 2,
        alignSelf: 'flex-start',
    },
    tagText:{
        fontSize: 12,
        fontWeight: '100',
    },
    rightContainer:{
        flexDirection: 'column',
        flex:1,
        paddingHorizontal: 5,
        paddingBottom: 15,
        marginRight: 15,
        //backgroundColor: "#000",
    }
})
