import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, 
    Platform, ScrollView, FlatList, TouchableOpacity
    } from 'react-native';
import {useEffect, useState, useLayoutEffect, useRef} from 'react'
import * as SQLite from 'expo-sqlite'
import {checkPermission, triggerNotifications} from "../notification.js"

import { DueCSS } from './DueCSS.js';
import DueList from './DueList';
import { DueListCSS } from './DueListCSS';


const db = SQLite.openDatabase("user.db")

export default function Due(){

    const [initialDate, setInitialDate] = useState(new Date(new Date().setSeconds(new Date().getSeconds() + 30) ) )
    const [currentDate, setCurrentDate] = useState(new Date())

    const [todoList, setTodoList] = useState([{"todo":"assigned pakaman"}])

    const fetchData=()=>{

        db.transaction((tx)=>{

            tx.executeSql(
            'SELECT * FROM todos where status="due"',
            [],

            (txObj, {rows})=>{
                console.log("-----------------");
                console.log(JSON.stringify(rows));

                if(rows['length'] != 0){
                    if(rows['length']>1) {setTodoList(rows._array)}
                    else {setTodoList(rows._array)}
                }

                console.log("-----------------");
            },

            (txObj, error)=>console.log(error)
            )
        })
        

    }

    useEffect(()=>{

        // console.log(initialDate.toLocaleString(), currentDate.toLocaleString());

        // let a = new Date()
        // const interval = setInterval(()=>{
        //     if(initialDate > a){
        //         a = new Date()
        //         console.log(a.toLocaleString());
        //     }else{
        //         console.log("Overcome");
        //         clearInterval(interval)
        //     }
        // }, 1000)
        fetchData()
        
    }, [])

    const ViewList=()=>{
        if(todoList[0]["todo"] == 'assigned pakaman'){
          return(<Text>Pakaman is there</Text>)
        }else{
          return(<DueList />)
        }
    }

    return(
        <View style = {styles.container}>

            <Text style={styles.title}>{todoList.length} DUE IS LEFT</Text>
            <View style={styles2.listcontainer}>
                {ViewList()}
            </View>

        </View>
    )


} 


const styles = DueCSS
const styles2 = DueListCSS