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


import { MaterialCommunityIcons} from '@expo/vector-icons';


import COLORS from '../Colors'
//update and store in liteSQL (phone)
const busRouteData = [
    {
        routeID: 0,
        routeName : '276A',
        price: 6.1,
        routePath : [
            {
                busStopID: 0,
                busStopName: 'Tin Shui Wai', 
                location: 
                {
                    lat: 0.0,
                    long: 0.0
                },
                busRouteIDs: 
                []
            },
            {
                busStopID: 0,
                busStopName: 'Tin Shui Wai', 
                location: 
                {
                    lat: 0.0,
                    long: 0.0
                },
                busRouteIDs: 
                []
            },
            {
                busStopID: 0,
                busStopName: 'Tin Shui Wai', 
                location: 
                {
                    lat: 0.0,
                    long: 0.0
                },
                busRouteIDs: 
                []
            }
        ],
        schudule : [

        ]
    }
]
    

const HEADER_MAX_HEIGHT = +20;
const HEADER_MIN_HEIGHT = -60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
        };
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
            <SearchHeader onSearch = {this._onSearch} onMenu = {this._onMenu}/>
            {
            /*
            <View style = {{flexDirection: 'row'}}>
                <Button title="Detail" onPress={this._detail} />
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync}/>
            </View>
            */
            }

            <View style = {styles.listContainer}>
                <BusList
                navigation = {this.props.navigation} 
                data = {busRouteData}  
                onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                )}/>
            </View>

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