import React from 'react';
import {
    TouchableOpacity,
    Text,
    Button,
    FlatList,
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
  } from 'react-native';

import { Entypo, Foundation , MaterialIcons} from '@expo/vector-icons';

import { TravelContext } from '../Context/TravelContext'
import COLORS from '../Colors'

export class TravelSlider extends React.Component{
    render(){
        return(
            <TravelContext.Consumer>
                {(Context)=> (
                        <ScrollView>
                            <View style = {styles.header}>

                            </View>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                            <Text>ff</Text>
                        </ScrollView>
                )}
            </TravelContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        height: 50,
        backgroundColor: '#CCC',
    }
});