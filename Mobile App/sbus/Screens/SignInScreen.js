/*
  What: This is sign in screen of mobile app
  Who: CHIU LIN FUNG 1155109993
  Where: sign in screen
  Why: to construct the layout of sign in screen
  How: ...
*/


import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    AsyncStorage,
    View,
    SafeAreaView,
    StyleSheet,
    Alert
} from 'react-native';

import { TextInput } from 'react-native-paper';

import COLORS from '../Colors'
import String from '../String'


const url = String.SERVER_LINK + 'login'
export class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
        };
    }

    static navigationOptions = {
        headerShown: false,
    };

    render() {
      return (
        <SafeAreaView style = {{flex : 1}}>                
            <View style={[styles.container,{justifyContent: 'center'}]}>
                <Image style={{ width: 150, height: 150, marginVertical: 30}} source={require('../Image/icon.png')} />

                <View style = {styles.rowContainer}>
                    <TextInput
                    mode='outlined'
                    label="Username"
                    theme={{ colors: { primary: COLORS.selected }}}
                    onChangeText={(username) => this.setState({ username: username })}
                    style={styles.input}
                    />
                </View>

                <View style = {styles.rowContainer}>
                    <TextInput
                    mode='outlined'
                    label="Password"
                    theme={{ colors: { primary: COLORS.selected }}}
                    onChangeText={(password) => this.setState({ password: password })}
                    secureTextEntry={true}
                    style={styles.input}
                    />
                </View>

                <View style = {styles.rowContainer}>
                    <TouchableOpacity onPress={this._signInAsync} style = {[styles.button, {backgroundColor: COLORS.selected, marginTop:10}]}>
                        <Text style={styles.buttontext}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.rowContainer}>
                    <Text style = {[styles.hinttext, {textAlign: 'center', flex: 1}]} onPress={this._signup}>No account? Sign up an account.</Text>
                </View>

                <View style = {styles.rowContainer}>
                    <TouchableOpacity onPress={this._forcesignin} style = {[styles.button, {backgroundColor: COLORS.facebook}]}>
                        <Text style={styles.buttontext}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._forcesignin} style = {[styles.button, {backgroundColor: COLORS.google}]}>
                        <Text style={styles.buttontext}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._forcesignin} style = {[styles.button, {backgroundColor: COLORS.guest}]}>
                        <Text style={styles.buttontext}>Guest</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
      );
    }

    _signup = () => {
        this.props.navigation.navigate('SignUp');
    };

    _emptyInput = () =>{
        Alert.alert(
            'Empty Information',
            'Username and Password cannot be empty',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          );
    }

    _longUsername = () => {
        Alert.alert(
            'Wrong Username format',
            'length of Username cannot be larger than 20',
            [
              { text: 'OK', onPress: () => {} },
            ],
            { cancelable: false }
          );
    }

    _wrongPasswordFormat = () => {
        Alert.alert(
            'Wrong Password format',
            'length of Password must be between 6 and 20',
            [
              { text: 'OK', onPress: () => {} },
            ],
            { cancelable: false }
          );
    }

    _wronginfo = () => {
        Alert.alert(
            'Wrong Account or Password',
            'Account information is not correct',
            [
              { text: 'OK', onPress: () => {} },
            ],
            { cancelable: false }
          );
    }
  

    _signInAsync = async () => {
        if (this.state.username == '' || this.state.password == '')
        {
            this._emptyInput();
            return;
        }

        if (this.state.username.length > 20)
        {
            this._longUsername();
            return;
        }

        if (this.state.password.length < 6 || this.state.password.length > 20){
            this._wrongPasswordFormat();
            return;
        }
        var loginjson = {
            "username": this.state.username,
            "password": this.state.password
        }

        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginjson),})
            .then(res => res.json())
            .then(async response =>
                { 
                    if (response.error ==null){
                        //sucess
                        await AsyncStorage.setItem(String.USERINFO,  JSON.stringify(loginjson));
                        this.props.navigation.navigate('App');
                    }
                    else{
                        //fail
                        this._wronginfo();
                    }
                }
            )
            .catch(error => console.error('Error:', error));

        //await AsyncStorage.setItem('userToken', 'abc');
    };

    _forcesignin = () => {
        this.props.navigation.navigate('App');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: COLORS.bgcolor,
    },
    rowContainer:{
        flexDirection: 'row',
    },
    input: {
        flex: 1, 
        fontSize: 15,
        height: 40,
        margin:5,
    },
    hinttext: {
        color: COLORS.guest,
        fontSize: 13,
        margin: 5,
    },
    button:{
        flex : 1,
        height: 40,
        margin:5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttontext:{
        textAlign: 'center',
        color: '#FFF',        
        fontSize: 15,
        fontWeight: "bold",
    }
})
  
