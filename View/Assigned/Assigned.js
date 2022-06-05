import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Platform, ScrollView,
  TouchableOpacity, FlatList, Image
} from 'react-native';
import * as SQLite from 'expo-sqlite'
import { useState, useEffect, useLayoutEffect } from 'react';


import {AssignedCSS} from './AssignedCSS';
import List from './List';
import { ListCSS } from './ListCSS';

import InsertImage from '../../assets/insert.png'
import DeleteAll from "../../assets/deleteall.png"



const db = SQLite.openDatabase("user.db")


export default function Assigned(){

  const [todoList, setTodoList] = useState([{"todo":"assigned pakaman"}])
  const [a, setA] = useState(["a", "b", "c"])
  const [task, setTask] = useState(["", "", "", ""]) 
  const [showInsert, setShowInsert] = useState({display: "none"})
  const [inputStyle, setInputStyle] = useState([styles.inputStyle])


  const createTable=()=>{
    db.transaction((tx)=>{

      tx.executeSql(
        "create table if not exists todos"
        +"(ID integer primary key AUTOINCREMENT, todo text, status text, level integer, date text)",
        [],

        // (txObj, result)=>{
        //   console.log(result);
        // },

        (txObj, error)=>console.log(error)
      )

    })
  }

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

  const deleteData=()=>{
    db.transaction((tx)=>{
      tx.executeSql(
        "DELETE FROM todos",
        [],
        (txObj, result)=>{
          console.log("Delete log--------------");
          console.log(result);
          setTodoList([{"todo":"assigned pakaman"}])
          console.log("......................");
        },
        (txObj, error)=>console.log(error)
      )
    })
  }


  useEffect(()=>{
    console.log('using effect');
    // createTable();
    fetchData()
    
  }, [task])


  const insert=()=>{
      console.log("Doing insertion");

      let params = task
      console.log(params);

      // createTable()
      db.transaction(
        (tx) => {
          tx.executeSql(
            "insert into todos (todo, status,level, date) values (?, ?, ?, ?)",
            [ params[0], params[1], parseInt(params[2]), params[3] ],
            // [],
            (txObj, result)=>{console.log(result); fetchData()},

            (txObj, error)=>console.log(error)
          )
        },
      );

      setTask(["", "", "", ""])
  
      console.log("Insertion done");
  }


  const focus=()=>{
    console.log("focusing");
    setInputStyle(
          [
            inputStyle,
            {
              borderColor: "red", 
              borderWidth: 2,
              borderStyle: "solid",
              borderRadius: 10
            }
          ]
      )

      console.log(inputStyle);
  }

  const lostFocus=()=>{
    console.log("lost focus");
    setInputStyle(styles.inputStyle)
    console.log(inputStyle);
  }

  const InsertView =()=>{
    return(
      <View style={[styles.insertTodo, showInsert]}>
        <Text style={styles.textStyle} >Todo -</Text>
        <TextInput
          style={inputStyle}
          onFocus={focus}
          onBlur = {lostFocus}
          placeholder='WRITE TODO'
          onChangeText={(newText)=>{
            let a = task
            a[0] = newText
            setTask(a)
          }}
        />
  
        <Text style={styles.textStyle}>STATUS -</Text>
        <TextInput
          style={inputStyle}
          onFocus={focus}
          onBlur = {lostFocus}
          placeholder='Give STATUS'
          onChangeText={(newText)=>{
            let a = task
            a[1] = newText
            setTask(a)
          }}
        />
  
        <Text style={styles.textStyle}>LEVEL -</Text>
        <TextInput
          style={inputStyle}
          onFocus={focus}
          onBlur = {lostFocus}
          placeholder='GIVE LEVEL'
          onChangeText={(newText)=>{
            let a = task
            a[2] = newText
            setTask(a)
          }}
        />
  
        <Text style={styles.textStyle}>DATE -</Text>
        <TextInput
          style={inputStyle}
          onFocus={focus}
          onBlur = {lostFocus}
          placeholder='WRITE DATE'
          onChangeText={(newText)=>{
            let a = task
            a[3] = newText
            setTask(a)
          }}
        />
  
        <TouchableOpacity style={[styles.showInsertBtn, {width:100, height: 50, marginTop: 0}, styles.buttonShadow]} onPress={insert}>
          <Text>Submit</Text>          
        </TouchableOpacity>
  
        
  
      </View>
    )
  }

  const Options = ()=>(
    <View style={styles.optionsView}>
      <TouchableOpacity style={[styles.showInsertBtn, { backgroundColor:'green'}]} 
        onPress={()=>{
          if(showInsert["display"]=="none"){
            setShowInsert({display: "flex"})
          }else{
            setShowInsert({display: "none"})
          }
        }}
      >
        <Image source={InsertImage} resizeMode="contain" 
          style={{height: 50, width: 50, borderRadius: 10}} 
        />
        
      </TouchableOpacity>

      <TouchableOpacity 
      style={[styles.showInsertBtn, {backgroundColor: "white", borderColor: "#36a1ff"}]} 
        onPress={deleteData}
      >
        <Image source={DeleteAll} resizeMode="contain" style={{height: 50, width: 50, borderRadius: 10}} />
        
      </TouchableOpacity>
    </View>
  )

  const ViewList=()=>{
    if(todoList[0]["todo"] == 'assigned pakaman'){
      return(<Text>Pakaman is there</Text>)
    }else{
      return(<List />)
    }
  }



  return(
    <ScrollView contentContainerStyle={styles.container}>
      
        <Text>This is from Assigned</Text>
        
      <Options />
      {InsertView()}
      
      <View style={styles2.listcontainer}>
        {ViewList()}
        {/* <List /> */}
        
      </View>
      


    </ScrollView>
  )

} 


const styles = AssignedCSS
const styles2 = ListCSS