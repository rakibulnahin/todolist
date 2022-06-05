import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase("user.db")

const createTable=()=>{
    console.log("creating table");
    db.transaction((tx)=>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS todos"
            +"(ID integer primary key AUTOINCREMENT, todo text, status text, level integer)",
            [],
            (txOBj, result)=>{console.log("result", result);},
            (txObj, error) => console.log('Error', error)
        )
    })
}

const fetchAllData =(callback)=>{
    console.log("Fetching All data");
    db.transaction((tx)=>{
        tx.executeSql("select * from todos", [],
            (_, {rows})=>{
                console.log("-------------------");
                console.log("from fetch all data");
                var a = []
                for(let i=0; i<Object.keys(rows).length; i++){
                    a.push(rows[i])
                }
                
                console.log("-------------------");
                callback(a)
            },
            

            (txObj, error) => console.log('Error', error)
        )
    })
}

const fetchWithCurrent =()=>{
    console.log("Fetching Current");
    db.transaction((tx)=>{
        tx.executeSql("select * from todos where status=current", [],
            (_, {rows})=>{
                return rows
            },
            ()=>{},
            (txObj, error) => console.log('Error', error)
        )
    })
}

const fetchWithAssigned = (callback)=>{
    console.log("Fetching assigned");
    let a = ""

    createTable()
    db.transaction((tx)=>{
        
        tx.executeSql("select * from todos where status='assigned'", [],
            (_, {rows})=>{
                console.log("-------------------");
                console.log("from fetch with assigned");
                console.log(JSON.stringify(rows));
                var a = []
                for(let i=0; i<Object.keys(rows).length; i++){
                    a.push(rows[i])
                }
                
                console.log("-------------------");
                callback(a)
            },
            ()=>{},
            (txObj, error) => console.log('Error', error)
        )
    })

    
    // console.log("Out hello");
    return ("Out hello")
}

const fetchWithDue =()=>{
    console.log("Fetching due");
    db.transaction((tx)=>{
        tx.executeSql("select * from todos where status=due", [],
            (_, {rows})=>{
                return rows
            },
            ()=>{},
            (txObj, error) => console.log('Error', error)
        )
    })
}

export {
    fetchAllData, createTable,
    fetchWithCurrent, fetchWithAssigned,
    fetchWithDue 
}