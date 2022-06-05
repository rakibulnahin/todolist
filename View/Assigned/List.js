import {View, Text, FlatList, TouchableOpacity, Button, Animated, TextInput} from 'react-native'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import * as SQLite from 'expo-sqlite'

import { ListCSS } from './ListCSS'


const db = SQLite.openDatabase("user.db")

export default function List(){

    const [todoList, setTodoList] = useState([{"todo":"assigned pakaman"}]);
    const [indicator, setIndicator] = useState("skyblue");
    const lastTap = useRef(0);
    const [colorList, setColorList] = useState([])
    const transAnim = useRef(new Animated.Value(0)).current
    const [showEditView, setShowEditView] = useState("flex")



    const fetchData=()=>{

        db.transaction((tx)=>{

            tx.executeSql(
            'SELECT * FROM todos where status="assigned"',
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

    const colorCode=()=>{
        let color_list = []
        let current = new Date();

        todoList.map((todo)=>{
            console.log(todo['date']);
            let date = new Date(todo['date'].replace(" ", "T"))

            console.log(date.toLocaleString());
            console.log(current.toLocaleString());
            if(date>current){
                let diff = Math.floor((date-current)/(60*60*1000))
                if(diff <24){
                    console.log("date is greater ", Math.floor((date-current)/(60*60*1000)));
                    color_list.push('red')
                }else if(diff<36){
                    console.log("date is greater ", Math.floor((date-current)/(60*60*1000)));
                    color_list.push('#584ef2')
                }else{
                    console.log("date is greater ", Math.floor((date-current)/(60*60*1000)));
                    color_list.push('green')
                }
                
            }else{
                console.log("DUE ", Math.floor((current-date)/(60*60*1000)));
                color_list.push("pink")
            }

        })
        setColorList(color_list)


        // let date = new Date(todoList[0]['date'])
        // let a = new Date(parseInt(date[2]), parseInt(date[1]), parseInt(date[0]), parseInt(date[3]), parseInt(date[4]))
        // console.log(date.a.toLocaleString());
        // console.log("color cod
    }

    useEffect(()=>{
        console.log('using effect');
        // createTable();
        fetchData()

    }, [])

    useEffect(()=>{
        if(todoList[0]['todo'] != "assigned pakaman"){
            colorCode()
        }
        
    },[todoList])

    const deleteTodo=(item)=>{
        console.log("Delete Todo");
        if(typeof(item) == undefined){
            alert("No item to delete")
            return
        }
        console.log(item);

        db.transaction((tx)=>{
            tx.executeSql(
                "DELETE FROM todos where ID=?",
                [item['ID']],
                (txObj, result)=>{
                    console.log("Delete log -------------------");
                    console.log(result);
                    fetchData()
                    console.log(".....................");
                },
                (txObj, error)=>{console.log("delete error "+error);}
            )
        })
    }


    const renderItem=({item, index})=>{
        // console.log("index "+index);
        return (
            // Details
            <TouchableOpacity
                onPress = {()=>{
                    const now = Date.now();
                    const delay = 300;
                    if(lastTap.current && (now-lastTap.current) < delay){
                        setIndicator("blue")
                        deleteTodo(item)
                    }else{
                        lastTap.current = now;
                    }
                }}   
                
                style = {[styles.itemBtn, {backgroundColor: colorList[index]} ]} //color of every item changes 
            >
                {/* What todo */}
                <Text 
                    style={
                        [
                            styles.itemText, 
                            // {backgroundColor: indicator},
                        ]
                    }
                >
                    {item['todo']}
                
                </Text>   

                {/*Todo deadline  */}
                <Text 
                    style={
                        [
                            styles.itemText, 
                            // {backgroundColor: indicator, fontSize: 20}
                        ]
                    }
                >
                    {item['date']}
                
                </Text>   

                {/* Importance */}
                <Text 
                    style={
                        [
                            styles.itemText, 
                            {fontSize: 15}
                        ]
                    }
                >
                    Importance level - {item['level']}
                
                </Text> 

                <TouchableOpacity
                    style={styles.editBtn}
                    onPress={animate}
                >
                    <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
                
            </TouchableOpacity>
            
            )
    }

    const animate=()=>{
        setShowEditView("flex");

        Animated.sequence([
            Animated.timing(transAnim, {
                toValue: -50,
                duration: 1000,
                useNativeDriver: false
            }),
            // Animated.timing(transAnim, {
            //     toValue: 0,
            //     duration: 1000,
            //     useNativeDriver: false
            // })
        ]).start()
    }
        
    
    const TodoRendering=()=>{
        return(
            <View>

            <FlatList 
                keyExtractor={(item)=>item['ID']}
                data={todoList}
                renderItem={renderItem}      
            
            />

            </View>
        )
    
    }
    



    return(
        <View>

            <Animated.View style={[styles.editView, {marginTop: transAnim, display: showEditView}]}>
                <TouchableOpacity
                    onPress={()=>{setShowEditView("none")}}
                    style={{marginLeft: 180, marginTop: 10}}
                >
                    <Text style={{fontSize: "20"}}>Close</Text>
                </TouchableOpacity>

                {/*  */}

                
                
                {/*  */}
                
            </Animated.View>
            <TodoRendering />
        </View>
    )






}

const styles = ListCSS
