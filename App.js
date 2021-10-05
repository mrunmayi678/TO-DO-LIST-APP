import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View,TextInput, TouchableOpacity, Keyboard ,ScrollView} from 'react-native';
import Task from './components/Task';
export default function App() {
  const [task,setTask]=useState();
  const [taskItems,setTaskItems] = useState([]);

  const handleAddTask=()=>{
    Keyboard.dismiss();
    setTaskItems([...taskItems,task])
    setTask(null);
  }

  const completeTask=(index)=>{
    let itemsCopy=[...taskItems]
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }


    return (
    <View style={styles.container}>

      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/*today's tasks*/}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {/*this is where the tasks will go */}
          {
            taskItems.map((item,index)=>{
            return (
              <TouchableOpacity key={index} onPress={() =>completeTask(index)}>
<               Task text={item}/>
              </TouchableOpacity>
            )
            
            })
          }
         
        </View>

      </View>
      </ScrollView>

    {/* Write A Task*/}
    <KeyboardAvoidingView 
    behaviour = {Platform.OS==="ios" ? "padding" : "height"}
    style={styles.writeTaskWrapper}
    >
      <TextInput style={styles.input} placeholder={"write a task"} value={task} onChangeText={text => setTask(text)}/>

      <TouchableOpacity onPress={()=> handleAddTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>

    </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    width:"100%",
        height:"100%",
        resizeMode:"cover",
        position:"absolute"
  },
  taskWrapper:{
    paddingTop:80,
    paddingHorizontal:20,
    
  },
  sectionTitle:{
    fontSize:24,
    fontWeight:"bold"
  },
  items:{
    marginTop:30
  },
  writeTaskWrapper:{
    position : "absolute",
    bottom:60,
    width:'100%',
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor:"#fff",
    borderRadius:60,
    borderColor:"grey",
    borderWidth:1,
    width:250
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:"#fff",
    borderRadius:60,
    justifyContent:"center",
    alignItems:"center",
    borderColor:"grey",
    borderWidth:1,
  },   
  addText:{},
});
