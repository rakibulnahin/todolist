import { StyleSheet } from "react-native"


export const AssignedCSS = StyleSheet.create({
  container:{
    backgroundColor: "#86d0f7",
    flex: 1,
    alignItems: "center",
  },

  insertTodo:{
    backgroundColor: "#5695fc",
    width: 300,
    margin: 10,
    justifyContent: "space-around",
    alignItems: "center",
    height: 280,
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

  optionsView:{
    // backgroundColor: 'white',
    // flex: 0.5,
    flexWrap: 'wrap',
    flexDirection: "row",
    position: "relative",
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    margin: 10,
  }

  

    
  
  })