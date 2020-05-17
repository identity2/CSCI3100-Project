/*
  What: This is the sign up page of mobile app
  Who: CHIU LIN FUNG 1155109993
  Where: sign up screen
  Why: to construct the sign up layout of mobile app
  How: ...
*/


import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
    AsyncStorage,
    Alert,
    View,
    SafeAreaView,
    StyleSheet
} from 'react-native';

import { TextInput } from 'react-native-paper';
import { Header } from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import Constants from '../String';
import COLORS from '../Colors'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const url = Constants.SERVER_LINK + 'register';

export class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
          email:'',
        };
    }

    static navigationOptions = {
        headerShown: false,
    };
    _backButton = () => {
        return(
          <TouchableOpacity onPress= {this._back} style = {{flexDirection: 'row', alignItems: 'center'}}>
            <Feather name='chevron-left' size= {26} color = {COLORS.themecolor}/>
            <Text style = {{color: COLORS.themecolor, fontSize: 16, fontWeight: "bold"}}>return</Text>
          </TouchableOpacity>
        );
      }
    _back = () => {
        this.props.navigation.goBack();
    }
    _formatcheck = () => {
        if (this.state.username == '' || this.state.password == '' || this.state.email == ''){
            Alert.alert(
                'Empty Information',
                'Input Field cannot be empty',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
              );
              return false;
        }

        if (this.state.username.length > 20){
            Alert.alert(
                'Wrong Username format',
                'length of Username cannot be larger than 20',
                [
                  { text: 'OK', onPress: () => {} },
                ],
                { cancelable: false }
              );
              return false;
        }

        if (this.state.password.length < 6 || this.state.password.length > 20){
            Alert.alert(
                'Wrong Password format',
                'length of Password must be between 6 and 20',
                [
                  { text: 'OK', onPress: () => {} },
                ],
                { cancelable: false }
              );
            return false;
        }
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!this.state.email.match(mailformat))
        {
            Alert.alert(
                'Wrong email format',
                'The format of email is not correct',
                [
                  { text: 'OK', onPress: () => {} },
                ],
                { cancelable: false }
              );
            return false;
        }
        return true;
    }
    _signUpAsync = () => {
        if (this._formatcheck()){
            let registerjson = {
                "username": this.state.username,
                "isAdmin": 0,
                "password": this.state.password,
                "email": this.state.email,
            }
            fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerjson),})
                .then(res => res.json())
                .then(async response =>
                    { 
                        if (response.error ==null){
                            //sucess
                            await AsyncStorage.setItem(Constants.USERINFO,  JSON.stringify(registerjson));
                            Alert.alert(
                                'Sucess',
                                'Your Account is ready',
                                [
                                  { text: 'OK', onPress: () => {} },
                                ],
                                { cancelable: false }
                              );
                            this.props.navigation.goBack();
                        }
                        else{
                            //fail
                            Alert.alert(
                                'Fail',
                                response.error,
                                [
                                  { text: 'OK', onPress: () => {} },
                                ],
                                { cancelable: false }
                              );
                            console.log(response.error);
                        }
                    }
                )
                .catch(error => console.error('Error:', error));
        }
        else{
            return;
        }
    }
    render() {
      return (
        <SafeAreaView style = {{flex : 1}}>            
            <Header
             containerStyle = {styles.headerContainer}
             leftContainerStyle = {{flex: 0}}
             leftComponent = {this._backButton}
             rightContainerStyle = {{flex: 0,}}/>    
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
                    <TextInput
                    mode='outlined'
                    label="Email"
                    theme={{ colors: { primary: COLORS.selected }}}
                    onChangeText={(email) => this.setState({ email: email })}
                    style={styles.input}
                    />
                </View>

                <View style = {styles.rowContainer}>
                    <TouchableOpacity onPress={this._signUpAsync} style = {[styles.button, {backgroundColor: COLORS.selected, marginTop:10}]}>
                        <Text style={styles.buttontext}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: COLORS.bgcolor,        
        padding: 0,
    },
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
  
