/*
  What: This is the auth page of mobile app
  Who: CHIU LIN FUNG 1155109993
  Where: the automatical authorization part 
  Why: to simipfy the process of login
  How: once user lanuch app, this will be the first page to loaded with which authorizing account information from local storage
*/


import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

import * as SQLite from 'expo-sqlite';
import Constants from '../String';

const db = SQLite.openDatabase(Constants.database_name);

const url = Constants.SERVER_LINK + 'login';

export class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._updateDatebase();
    this._bootstrapAsync();
  }

  _updateDatebase = () => {
    /*
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS BUSCATEGORY(' +
        'cid INTEGER,' +
        'cname varchar,'+
        'slid INTEGER,' +
        'PRIMARY KEY (cid));'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS STATIONLIST(' +
        'slid INTEGER,' +
        'sid INTEGER,'+
        'order INTEGER,' +
        'UNIQUE (slid, sid));'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS STATION(' +
        'sid INTEGER,' +
        'sname varchar,'+
        'PRIMARY KEY(sid));'
      );
    });
    */
  }

  _bootstrapAsync = async () => {
    //Getting the user information
    const loginjson = await AsyncStorage.getItem(Constants.USERINFO);
    if (loginjson != null){
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
                    this.props.navigation.navigate('App');
                }
                else{
                    //fail
                    this.props.navigation.navigate('Auth');
                }
            }
        )
        .catch(error =>  this.props.navigation.navigate('Auth'));
    }
    this.props.navigation.navigate('Auth');
    //we can use the information to login and get the return

  };


  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
