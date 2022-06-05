import {View, Text, FlatList, TouchableOpacity, Button, Animated, TextInput, Image} from 'react-native'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import * as SQLite from 'expo-sqlite'
import close from '../../assets/close.png'

import { ListCSS } from './ListCSS'


const db = SQLite.openDatabase("user.db")

export default function List(){

    const [todoList, setTodoList] = useState([{"todo":"assigned pakaman"}]);
    const [indicator, setIndicator] = useState("skyblue");
    const lastTap = useRef(0);
    const [colorList, setColorList] = useState([])
    const transAnim = useRef(new Animated.Value(0)).current
    const [showEditView, setShowEditView] = useState("none")
    const [editViewInfo, setEditViewInfo] = useState(null)
    const [task, setTask] = useState(["", "", "", ""]) 



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
            // console.log(todo['date']);
            let date = new Date(todo['date'].replace(" ", "T"))

            // console.log(date.toLocaleString());
            // console.log(current.toLocaleString());
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
        // console.log(item);
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
                    onPress={()=>animate(item)}
                >
                    <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>
                
            </TouchableOpacity>
            
            )
    }

    const animate=(item)=>{
        setShowEditView("flex");
        setEditViewInfo(item)
        console.log(item);

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

    const editHandle=()=>{
        console.log(editViewInfo);
        console.log(task);
        if(editViewInfo == null || task[0]=="" || task[1]=="" || task[2]=="" || task[3]==""){
            alert('Make sure a task is selected or any of the infomation is missing on edit view')
            return
        }
        db.transaction((tx)=>{
            tx.executeSql(
                "UPDATE todos set todo=?, status=?, level=?, date=? WHERE ID=?",
                [task[0], task[1], task[2], task[3], editViewInfo["ID"] ],
                (txObj, result)=>{
                    console.log("Update-----------------");
                    console.log(result)
                    alert("Todos has been updated")
                    setEditViewInfo(null)
                    setTask(["", "", "", ""])
                    fetchData()
                    console.log("......................");
                }
            );
        })
    }
    
    const EditInputView=()=>{

        if(editViewInfo != null){
            return(
                <View>
                    <TouchableOpacity
                        onPress={()=>{setShowEditView("none"); setEditViewInfo(null); setTask(["", "", "", ""]);}}
                        style={styles.editCloseBtn}
                    >
                        <Image source={close} 
                            style={{width: 50, height: 50}} resizeMode="contain"
                        />
                    </TouchableOpacity>

                    
                    <Text style={styles.textStyle} >Todo -</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder='WRITE TODO'
                        onChangeText={(newText)=>{
                            let a = task
                            a[0] = newText
                            setTask(a)
                    }}
                    />
            
                    <Text style={styles.textStyle}>STATUS -</Text>
                    <TextInput
                    style={styles.inputStyle}
                    placeholder='Give STATUS'
                    onChangeText={(newText)=>{
                        let a = task
                        a[1] = newText
                        setTask(a)
                    }}
                    />
            
                    <Text style={styles.textStyle}>LEVEL -</Text>
                    <TextInput
                    style={styles.inputStyle}
                    placeholder='GIVE LEVEL'
                    onChangeText={(newText)=>{
                        let a = task
                        a[2] = newText
                        setTask(a)
                    }}
                    />
            
                    <Text style={styles.textStyle}>DATE -</Text>
                    <TextInput
                    style={styles.inputStyle}
                    placeholder='WRITE DATE'
                    onChangeText={(newText)=>{
                        let a = task
                        a[3] = newText
                        setTask(a)
                    }}
                    />
            
                    <TouchableOpacity 
                        style={
                            [styles.showInsertBtn, {width:100, height: 50, marginTop: 0}, styles.buttonShadow]
                        }

                        onPress={editHandle}
                    >
                    <Text>Submit</Text>          
                    </TouchableOpacity>
            
                    
            
                </View>
                
            )
        }else{
            return(<Text>Choose a task to Edit</Text>)
        }
        
    }



    return(
        <View>

            {/* Edit View */}
            <Animated.View style={[styles.insertTodo, {marginTop: transAnim, display: showEditView}]}>

                {/* Edit inputes */}
                <EditInputView />

                {/* .............. */}
                
                
            </Animated.View>
            {/* .............. */}


            <TodoRendering />
        </View>
    )






}

const styles = ListCSS
