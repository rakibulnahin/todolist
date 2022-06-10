import { StyleSheet } from "react-native"
// import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes"W


export const DueListCSS=StyleSheet.create({
    listcontainer: {
        // backgroundColor: '#926af7',
        margin: 20,
        borderRadius: 10,
        width: 300,
        height: 480,
        alignContent: 'center',
        alignItems: 'center',

        
    },

    itemBtn:{
        backgroundColor: 'yellow',
        width: 250,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        height: 150,
        position: 'relative',
        flexWrap: 'wrap',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset:{
            width: -5,
            height: 5,
        },
        shadowRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
    },

    itemText: {
        // position: 'absolute',
        color: "white",
        width: 150,
        margin: 5,
        marginLeft: 10,
        fontSize: 20,
        fontFamily: "Cochin-Italic",   
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowOffset:{
            width: -5,
            height: 5,
        },
        shadowRadius: 2,
        
    },

    editBtn:{
        position: 'absolute',
        zIndex: 2,
        backgroundColor: '#0e08bd',
        width: 70,
        height: 120,
        margin: 15,
        flex: 1,
        right: 0,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset:{
            width: -5,
            height: 5,
        },
        shadowRadius: 2,
    },

    editBtnText:{
        fontFamily: "Arial-BoldMT", 
        fontSize: 30, 
        color: 'white'
    },

    editView:{
        backgroundColor: "#07e358",
        height: 250,
        width: 250,
        alignItems: "center",
        position: 'absolute',
        zIndex: 3,
        display: 'flex',
        justifyContent: 'space-between',
    },

    // editInputView:{
    //     backgroundColor: "white",
    //     width: 180,
    //     height: 30,
    //     borderRadius: 10,
    //     margin: 5,
    // },

    editCloseBtn:{
        marginLeft: 150, 
        marginTop: -30, 
        borderRadius:50, 
        position: 'absolute', 
        shadowColor: "black",
        shadowOffset:{
            height: 3,
            width: -5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },

    insertTodo:{
        position: 'absolute',
        zIndex: 3,
        backgroundColor: "#5695fc",
        width: 250,
        margin: 10,
        justifyContent: "space-around",
        alignItems: "center",
        height: 310,
        borderRadius: 7,
        shadowColor: "#0c0d0c",
        shadowOpacity: 0.4,
        shadowOffset:{
          height: 7,
          width: -8,
        },
        shadowRadius: 3
        
    },
    
    textStyle:{
        fontSize: 20,
        fontFamily: "Baskerville-SemiBold",
        fontWeight: "500",
        color: '#fafcff'
    },
    
    inputStyle:{
        backgroundColor: "white",
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "#32a852",
        borderWidth: 3,
        width: 150,
        height: 35,
        // height:
    padding: 5
    },

    showInsertBtn:{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#36a1ff',
        borderRadius: 10,
        margin: 5,
    },

    buttonShadow:{
        shadowColor: '#055df5',
        shadowOpacity: 0.5,
        shadowOffset:{width: -5, height: 5},
        shadowRadius: 2
    },




})