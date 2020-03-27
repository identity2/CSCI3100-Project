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

export class RouteList extends React.Component {
    constructor(props){
        super(props);
    }

    _routeItem = ({index, item}) => {
        return(
            <View style= {styles.itemContainer}>
                <View style = {styles.leftContainer}>
                    <View style = {styles.iconContainer}>
                        <MaterialCommunityIcons name ="map-marker" size = {38} color = {COLORS.google}/>
                    </View>
                    {<View style = {styles.verticalLine}/>}
                </View>
                <View style = {[styles.rightContainer,styles.bottomLine]}>
                    <View style = {styles.contextContainer}>
                        <View style = {styles.busStopContainer}>
                            <Text style = {styles.busStopText}>
                                {item.busStopName}
                            </Text>
                        </View>
                        <View style = {styles.tagContainer}>
                            <Text style = {styles.tagText}>
                                {item.busStopName}
                            </Text>
                        </View>
                        <View style = {styles.tagContainer}>
                            <Text style = {styles.tagText}>
                                {item.busStopName}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    render(){
        return(
            <FlatList
            scrollEventThrottle={16}
            data={this.props.data}
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
        fontSize: 20,
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
        marginRight: 50,
        //backgroundColor: "#000",
    }
})