import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Platform, ScrollView,
    FlatList, TouchableOpacity
} from 'react-native';
import * as SQLite from 'expo-sqlite'
// import { fetchAllData, createTable } from '../../Database/GetData';
import { useState, useEffect } from "react";

import { ListCSS } from '../Assigned/ListCSS';


const db = SQLite.openDatabase("User.db")



export default function Current(){

    const [todoList, setTodoList] = useState([{"todo":"current pakaman"}])
    const [fakeList, setFakeList] = useState([
        {"ID": 1, "todo": "I want to tell something 1"},
        {"ID": 3, "todo": "I want to tell something 2"},
        {"ID": 4, "todo": "I want to tell something 4"},
        {"ID": 5, "todo": "I want to tell something 5"},
        {"ID": 6, "todo": "I want to tell something 6"},
        {"ID": 7, "todo": "I want to tell something 7"},
        {"ID": 8, "todo": "I want to tell something 8"},
    ])
    const [indicator, setIndicator] = useState("skyblue");

    useEffect(()=>{
        // fetchAllData((items)=>{
        //     setTodoList(items);
        // })

        // createTable()
        db.transaction((tx)=>{
            tx.executeSql("select * from todos", [],
                (_, {rows})=>{
                    var a = []
                    for(let i=0; i<Object.keys(rows).length; i++){
                        a.push(rows[i])
                    }
                    setTodoList(a)
                }
            )
        })
    })

    const renderItem = ({item})=>{
        return(
            <TouchableOpacity
                onPress = {()=>{
                    const now = Date.now();
                    const delay = 300;
                    if(lastTap.current && (now-lastTap.current) < delay){
                        setIndicator("blue")
                    }else{
                        lastTap.current = now
                        setIndicator('red')
                    }
                }}   
                
                style = {styles.itemBtn} //color of every item changes 
            >
                {/* What todo */}
                <Text 
                    style={
                        [
                            styles.itemText, 
                            {backgroundColor: indicator}
                        ]
                    }
                >
                    {item['todo']}
                
                </Text>   

                
            </TouchableOpacity>
        )
    }

    return(
        <ScrollView>
            <Text>This is from Current</Text>
            <Text>{JSON.stringify(todoList)}</Text>
            <View>
                <FlatList 
                    data={fakeList}
                    renderItem={renderItem}
                
                />
            </View>

        </ScrollView>
    )

} 

const styles = ListCSS