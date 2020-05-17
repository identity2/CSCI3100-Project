/*
  What: This is the homepage of mobile app
  Who: CHIU LIN FUNG 1155109993
  Where: homepage of mobile app
  Why: layout is needed for user-friendly design
  How: built with Safeview, SearchHeader, Busroute and Animated navigation button
*/


import React from 'react';
import {
  AsyncStorage,
  SafeAreaView,
  Button,
  ScrollView,
  Animated,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';


import { BusList } from '../Components/BusList'
import { SearchHeader } from '../Components/SearchHeader'
import String from '../String'

import { MaterialCommunityIcons} from '@expo/vector-icons';


import COLORS from '../Colors'
//update and store in liteSQL (phone)

const HEADER_MAX_HEIGHT = +20;
const HEADER_MIN_HEIGHT = -60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const url = String.SERVER_LINK + 'route';
const stationurl = String.SERVER_LINK + 'station';
export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            result: null,
            routes: null,
            station: null,
        };
    }

    componentDidMount(){
        fetch(url)
        .then(response => response.json())
        .then(responseJson =>{
            this.setState({
                routes : responseJson,
                result : responseJson
            })
        })
        .catch(error => console.log(error));

        fetch(stationurl)
        .then(response => response.json())
        .then(responseJson =>{
            this.setState({
                station : responseJson
            })
        })
        .catch(error => console.log(error));
    }

    _reset = () => {
        let json = this.state.routes;
        this.setState({result: json});
    }

    static navigationOptions = {
        headerShown: false,
    };
  
    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
      return (
        <SafeAreaView style = {{flex: 1, backgroundColor: COLORS.bgcolor}}>
            <SearchHeader onSearch = {this._onSearch} onMenu = {this._signOutAsync} onClear = {this._reset}/>
            {
            /*
            <View style = {{flexDirection: 'row'}}>
                <Button title="Detail" onPress={this._detail} />
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync}/>
            </View>
            */
            }
            {this.state.routes != null
                ?
                <View style = {styles.listContainer}>
                    <BusList
                    navigation = {this.props.navigation} 
                    data = {this.state.result.routes}  
                    onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                    )}/>
                </View>
                :
                <View/>
            }

            <Animated.View  
            style = {[
                styles.fixedButtonContainer, 
                {bottom: headerHeight}
            ]}
            >
                <TouchableOpacity activeOpacity= {0.6} style = {{flexDirection : 'row', alignItems:'center', padding:10, paddingHorizontal: 20,}} onPress={this._travel}>
                    <MaterialCommunityIcons size = {22} color ="#FFF" name ="map-marker-distance" style = {{marginRight: 5}}/>
                    <Text style = {{fontSize: 17, color: "#FFF"}}>
                        Navigation
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
      );
    }

    _onSearch = (searchKey) => {
        let jsonresult = {
            "routes" : []
        };
        this.state.routes.routes.forEach(element => {
            if (element.routeName!= null &&
                element.routeName.search(searchKey) != -1){
                //if routeName is matched
                if ( !( element in jsonresult.routes ) ) {
                    //if element doesnt exist in array
                    jsonresult.routes.push(element);
                }
            }
        });
        this.state.routes.routes.forEach(element =>{
            if (element.stations != null){
                element.stations.forEach(station =>{
                    if (station.stationName != null &&
                        station.stationName.search(searchKey) != -1){
                            //if station name is match && not null
                            if ( !( element in jsonresult.routes ) ) {
                                //if element doesnt exist in array
                                jsonresult.routes.push(element);
                            }
                        }
                });
            }
        });
        console.log(jsonresult)
        this.setState({result: jsonresult});
    }

    _onMenu = () => {
        
    }
  
    _detail = () => {
        this.props.navigation.navigate('Detail');
    }

    _travel = () => {
        this.props.navigation.navigate('Travel');
    };
  
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const styles = StyleSheet.create({
    headerContainer: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: COLORS.selected,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    listContainer:{
        flex: 1,
    },
    fixedButtonContainer:{
        backgroundColor: COLORS.themecolor,
        borderRadius: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
    }
})
