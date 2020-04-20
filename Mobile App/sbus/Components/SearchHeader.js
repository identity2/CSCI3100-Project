import React from 'react';
import {
    TouchableOpacity,
    Text,
    Animated,
    TextInput,
    StyleSheet,
    View,
  } from 'react-native';

import { Header } from 'react-native-elements'
import {Feather} from '@expo/vector-icons';

import COLORS from '../Colors'



export class SearchHeader extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchKey : '',
            opacity: new Animated.Value(0),
            animation: '',
        }
    }

    _onInput = (text) => {
        if (text == ''){
            if (this.state.animation != 'fading'){
                Animated.timing(this.state.opacity,{
                    toValue: 0,
                    duration: 300,
                }).start();
                this.setState({searchKey: '', animation: 'fading'});
            }
        }
        else {
            if (this.state.animation != 'entering'){
                Animated.timing(this.state.opacity,{
                    toValue: 1,
                    duration: 300,
                }).start();
                this.setState({searchKey: text, animation: 'entering'});
            }          
        }
    }

    _searchBar = () => {
        return(
            <View style = {styles.searchBarContainer}>
                <Feather name='search' size= {24} color = {COLORS.notselected}/>
                <TextInput 
                maxLength={40}
                style= {styles.textinputContainer}
                placeholder = "Destination: location, station..."
                placeholderTextColor = {COLORS.notselected}
                onChangeText={this._onInput}
                returnKeyType = "search"
                onSubmitEditing = {() => {}}
                />
                <Animated.View 
                style = {{
                    opacity:this.state.opacity,
                    transform: [{
                        translateX: this.state.opacity.interpolate({
                          inputRange: [0, 0.25],
                          outputRange: [50, 0],  // 0 : 150, 0.5 : 75, 1 : 0
                          extrapolate: 'clamp',
                        }),
                      }],
                    }}>
                    <TouchableOpacity 
                    style = {[styles.buttonContainer,{backgroundColor: COLORS.tintcolor}]} 
                    activeOpacity = {0.6}
                    disabled={this.state.searchKey == '' ?true: false}
                    onPress={this.props.onSearch != null ? this.props.onSearch : () => {}}
                    >
                        <Text style = {{color: "#FFF"}}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </Animated.View>      
            </View>
        );
    }

    _menuButton = () => {
        return(
            <TouchableOpacity 
            activeOpacity = {0.5}
            onPress={this.props.onMenu != null ? this.props.onMenu : () => {}}>
                <Feather name = "menu" size = {24} color = "#FFF"/>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <Header
                containerStyle = {styles.headerContainer}
                leftContainerStyle = {{flex: 0}}
                leftComponent = {this._menuButton}
                centerContainerStyle = {{flexDirection: 'row', flex: 1}}
                centerComponent = {this._searchBar}
                rightContainerStyle = {{flex: 0,}}
            />
        );
    }
}

let radius = 25;

const styles = StyleSheet.create({
    headerContainer: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: COLORS.selected,        
        padding: 0,
    },
    searchBarContainer:{
        flex: 1,
        flexDirection : 'row',
        marginLeft:10,
        alignItems: 'center',
        backgroundColor: "#FFF",
        paddingLeft: 5,
        borderRadius: radius,
    },
    textinputContainer:{
        flex: 1,
        height: 24,
        paddingHorizontal: 5,
    },
    buttonContainer:{
        borderRadius: radius,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        height: 34,
    }
})