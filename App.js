import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native';
import React, {useState, useEffect} from 'react'
import * as SQLite from 'expo-sqlite'
import styles from './Style';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Assigned from './View/Assigned/Assigned';
import Current from './View/Current/Current';
import Due from './View/Due/Due';

import {createTable, fetchAllData} from "./Database/GetData"



const db = SQLite.openDatabase("user.db");
const Tab = createBottomTabNavigator();


export default function App() {

  // create table
  useEffect(() => {
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "drop table todos;"
    //   );
    // });

    // createTable()
    // fetchAllData()
  }, []);

  

  return (

    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name='Assigned' component={Assigned} />
        <Tab.Screen name='Current' component={Current} />
        
        <Tab.Screen name='Due' component={Due} />

      </Tab.Navigator>
    </NavigationContainer>





    
  );
}


