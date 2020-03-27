import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    AsyncStorage,
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native';

import { TextInput } from 'react-native-paper';

import COLORS from '../Colors'

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
                    onChangeText={(username) => this.setState({ username })}
                    style={styles.input}
                    />
                </View>

                <View style = {styles.rowContainer}>
                    <TextInput
                    mode='outlined'
                    label="Password"
                    theme={{ colors: { primary: COLORS.selected }}}
                    onChangeText={(password) => this.setState({ password })}
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
                    <TouchableOpacity onPress={this._signInAsync} style = {[styles.button, {backgroundColor: COLORS.facebook}]}>
                        <Text style={styles.buttontext}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._signInAsync} style = {[styles.button, {backgroundColor: COLORS.google}]}>
                        <Text style={styles.buttontext}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._signInAsync} style = {[styles.button, {backgroundColor: COLORS.guest}]}>
                        <Text style={styles.buttontext}>Guest</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
      );
    }

    _signup = () => {

    };
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    };
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
  