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


import COLORS from '../Colors'

//update and store in liteSQL (phone)
const stationData = [
    {
        SID: 1,
        CH: '天水圍',
        EN: 'Tin Shui Wai Station',
    },
    {
        SID: 2,
        CH: '旺角',
        EN: 'Mong Kok',
    },
    {
        SID: 3,
        CH: '沙田',
        EN: 'Sha Tin',
    },
    {
        SID: 4,
        CH: '尖沙咀',
        EN: 'Tsim Sha Tsui station',
    }
]

export class BusList extends React.Component {
    constructor(props){
        super(props);
    }

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
        let stpt = item.routePath[0];
        let endpt = item.routePath[item.routePath.length - 1];
        let nearStation = stationData.find(stationData => stationData.SID == item.nearStation);
        return (
            <View style = {[styles.itemContainer]}>
                <TouchableOpacity activeOpacity= {0.6} onPress = {() => {this._detail(item)}} style = {[styles.infoContainer, {backgroundColor: index % 2 == 0 ? COLORS.grey : COLORS.deepgrey}]}>
                    <View style = {{flexDirection: 'column', marginLeft :5, flex: 1}}>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style = {styles.routeText}>
                                {item.routeName}
                            </Text>
                            <View style = {{marginHorizontal:5}}/>
                            <Text style = {[styles.routeText, {fontSize: routeTextSize}]}>
                                {stpt.busStopName}
                            </Text>
                            <Entypo name = "arrow-long-right" size = {24} color = {COLORS.tintcolor} style = {{marginHorizontal:5}}/>
                            <Text style = {[styles.routeText, {fontSize: routeTextSize}]}>
                                {endpt.busStopName}
                            </Text>
                        </View>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <Text  style = {[styles.infoText, {fontSize: infoTextSize, flex: 1}]}>
                                Nearby: {}
                            </Text>
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
                                    {item.price}
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
                            {item.waitingTime}
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