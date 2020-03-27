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

export class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._updateDatebase();
    this._bootstrapAsync();
  }

  _updateDatebase = () => {
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
  }

  _bootstrapAsync = async () => {
    //Getting the user information
    const userToken = await AsyncStorage.getItem('userToken');

    //we can use the information to login and get the return
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
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