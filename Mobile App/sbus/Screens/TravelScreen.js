import React from 'react';
import {
  Text,
  Button,
  View,
  ActivityIndicator,
  StatusBar,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {TravelSlider} from "../Components/TravelSlider"
import {NavigationHeader} from "../Components/NavigationHeader"
import Constants from 'expo-constants';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import COLORS from '../Colors';

import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from 'reanimated-bottom-sheet'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { TravelContext } from '../Context/TravelContext'
import { TouchableOpacity } from 'react-native-gesture-handler';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export class TravelScreen extends React.Component {
    constructor(props){
      super(props)

      this._updateLocation = (start, end) => {
        let json = this.state.Context;
        if (start != json.start){json.start = start; this.setState({Context: json})}
        if (end != json.end){json.end = end; this.setState({Context: json})}
      }

      this._updateState = (state) => {
        let json = this.state.Context;
        if (state != json.state){
          json.state = state;
          this.setState({Context: json});
        }
      }

      this.state = {
        loading: false,
        atCurrent: true,
        draggable: false,
        Context : {
          start: "Current location",
          startLocation: null,
          end: "",
          endLocation: null,
          currentRoute : "",
          currentLocation: null,
          updateLocation : this._updateLocation,
          updateState : this._updateState,
        }
      }
    }

    static navigationOptions = {

    };

    componentDidMount(){
      this._getLocationAsync();
      if (this.props.navigation.state.params != null){
        var currentRoute = this.props.navigation.state.params.currentRoute;
        if (currentRoute != null){
          let json = this.state.Context;
          json.currentRoute = currentRoute;
          this.setState({Context: json});
        }
      }
    }

    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
  
      let location = await Location.getCurrentPositionAsync({});
      let json = this.state.Context;
      json.currentLocation = location.coords;
      if (!this.state.atCurrent){
        let r = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        };
        this.mapView.animateToRegion(r, 1500);
      }
      this.setState({ Context: json, atCurrent: true });
    };
  
    animatedValue = new Animated.Value(0);

  
    renderHeader = () => {
      return (
      <View style = {[{height: 50, width: width}, styles.borderStyle, ]}/>
      );
    }
    renderContent = () => {
      return (
        <View style = {[{height: height, width : width,}, styles.borderStyle]}/>
      );
    }

    render() {
      return (
        <TravelContext.Provider value = {this.state.Context}>
          <SafeAreaView style = {styles.container}>
            {this.state.Context.currentLocation != null? 
            <MapView 
            ref = {(ref)=>this.mapView=ref}
            style = {styles.mapStyle}
            initialRegion={{
            latitude: this.state.Context.currentLocation.latitude,
            longitude: this.state.Context.currentLocation.longitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
            }}
            showsUserLocation = {true}
            loadingEnabled = {true}
            showsCompass = {false}
            showsMyLocationButton = {false}
            onPanDrag = {() => {this.setState({atCurrent: false})}}
            >
            </MapView>
            :
            <ActivityIndicator size={96} color= {COLORS.facebook} />
            }       
            <View style = {styles.contextContainer}>
              <View style = {[styles.headerContainer]}>
                <NavigationHeader onBack = {this._home}/> 
              </View>
              <View style = {styles.contentContainer}>
                <View style = {styles.itemContainer}>
                  <TouchableOpacity activeOpacity = {0.8} style = {[styles.iconButton,]} onPress = {this._getLocationAsync}>
                    <MaterialIcons name = "my-location" size = {25} color = { this.state.atCurrent? COLORS.markcolor :COLORS.verydeepgrey}/>
                  </TouchableOpacity>
                </View>
              </View>
              <SlidingUpPanel
              ref={c => (this._panel = c)}
              draggableRange={{top:height - 90, bottom: 75}}
              backdropOpacity={0.0}
              showBackdrop = {false}
              height = {height - 90}
              containerStyle = {[styles.borderStyle,]}
              >
                  <TravelSlider Panel = {this._panel}/>
              </SlidingUpPanel>
            </View>
          </SafeAreaView>
        </TravelContext.Provider>
      );
    }

    _home = () => {
        this.props.navigation.navigate('Home');
    };
}

let radius = 15;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  mapStyle: {
    flex: 1
  },
  contextContainer:{
    position: 'absolute',  
    top: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    width: width,
    height: height,
    alignSelf: 'center', 
    flexDirection : 'column',
  },
  itemContainer:{
    alignSelf: 'flex-end',
    backgroundColor: "#CCC",
    borderRadius: radius,
  },
  first: {
    borderTopRightRadius: radius,
    borderTopLeftRadius: radius,
  },
  last: {
    borderBottomRightRadius: radius,
    borderBottomLeftRadius: radius,
  },
  iconButton: {
    height: 40,
    width: 40,
    backgroundColor: "#FFF",
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: radius,
  },
  
  headerContainer:{
    padding: 5,
  },
  contentContainer:{
    flex: 1, 
    flexDirection:'column', 
    paddingHorizontal: 5,
  },
  borderStyle: {
    backgroundColor: "#FFF", 
    borderWidth:1, 
    borderColor: COLORS.grey,
    borderRadius: 15
  }

});