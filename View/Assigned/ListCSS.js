import { StyleSheet } from "react-native"


export const ListCSS=StyleSheet.create({
    listcontainer: {
        backgroundColor: '#926af7',
        margin: 20,
        borderRadius: 10,
        width: 300,
        height: 350,
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
        flexWrap: 'wrap'
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
        // margin: 10,
        position: 'absolute',
        zIndex: 3,
        // marginTop: 0,
    },





})