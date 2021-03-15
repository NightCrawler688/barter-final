import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import db from '../config'
import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{
  constructor(){
    super();
    this.state = {
      image:'#',
      name:'',
      docId:'',
      userId:firebase.auth().currentUser.email
    }
  }
  getUserProfile(){
    db.collection('users').where('email_id','==',this.state.userId)
    .onSnapshot((snapshot)=>{
      snapshot.forEach((doc)=>{
        this.setState({
          name:doc.data().first_name + ' ' + doc.data().last_name
        })
      })
    })
  }
  fetchImage=(imageName)=>{
    var storageRef = firebase.storage().ref().child('user_profiles/' + imageName)
    storageRef.getDownloadURL().then((url)=>{
      this.setState({
        image:url
      })
    })
    .catch(()=>{
      this.setState({
        image:'#'
      })
    })
  }
  uploadImage=async(uri,imageName)=>{
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase.storage().ref().child('user_profiles/' + imageName)
    return(
      ref.put(blob).then((snapshot)=>{
        this.fetchImage(imageName)
      })
    )
  }
 selectPicture=async()=>{
  const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:ImagePicker.MediaTypeOptions.All,
    allowsEditing:true,
    aspect:[4,3],
    quality:1
  });
  if(!cancelled){
    this.setState({
      image:uri
    })
    this.uploadImage(uri,this.state.userId);
  }
 }
 componentDidMount(){
   this.getUserProfile();
   this.fetchImage(this.state.userId);
 }
  render(){
    return(
      <View style={{flex:1}}>
        <View style = {{flex:0.5,alignItems:'center',backgroundColor:'orange'}}>
          <Avatar 
          rounded
          source = {{
            uri:this.state.image
          }}
          size = {'medium'}
          onPress = {()=>{
            this.selectPicture();
          }}
          containerStyle = {styles.imageContainer}
          showEditButton
          />
          <Text style = {{fontWeight:100,fontSize:20,paddingTop:20}}>
            {this.state.name}
          </Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Text style = {styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container : {
    flex:1
  },
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  imageContainer: {
    flex: 0.75,
    width: "40%",
    height: "20%",
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  }
})
