import { Image, Text , TouchableOpacity , View } from 'react-native'
import React from 'react'
import { createDrawerNavigator , DrawerContentScrollView} from '@react-navigation/drawer'
import Home from '../views/Home'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import SignOut from '../views/SignOut'
import { useSelector } from 'react-redux'
import Profile from '../views/Profile'
import Stack from './Stack'


const DrawerNav = createDrawerNavigator()

export default function Drawer() {
    let {id} = useSelector(store => store.userReducer)

  return (
    <DrawerNav.Navigator  screenOptions={{headerStyle:{backgroundColor:'purple'},headerTintColor:'#fff'}}  name='root'  drawerContent = {(props)=><MenuItems {...props} />} >
        <DrawerNav.Screen  name='TicketsPass' component={Stack}/>
        <DrawerNav.Screen name='Profile' initialParams={{id: id}} component={Profile}/>
        <DrawerNav.Screen  name='Sign In' component={SignIn}/>
        <DrawerNav.Screen  name='Sign Up' component={SignUp}/>
        <DrawerNav.Screen  name='Sign Out' component={SignOut}/>
    </DrawerNav.Navigator>
  )
}

const MenuItems = ({navigation})=>{
    let { logged,photo,name} = useSelector(state => state.userReducer)
    return (
        <DrawerContentScrollView  style={{backgroundColor:'purple'}} >
        <View  style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'#252525',borderRadius:25,padding:5,margin:5}}>
            <Image source={require('../../assets/ticketlogorotado.png')} style={{width:50,height:50}}/>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#fff'}} >Ticket Pass  </Text>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('Home')} style={{flexDirection:'row',alignItems:'center',borderBottomColor:'#000',borderStyle:'solid',borderBottomWidth:4,borderRadius:25,padding:5,margin:5}}>
            <Image source={require('../../assets/hogar.png')} style={{width:30,height:30,marginLeft:10}}/>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#fff',marginLeft:10}} >Home </Text>
        </TouchableOpacity>
        {logged &&
        <TouchableOpacity onPress={()=> navigation.navigate('Profile')} style={{flexDirection:'row',alignItems:'center',borderBottomColor:'#000',borderStyle:'solid',borderBottomWidth:4,borderRadius:25,padding:5,margin:5}}>
            <Image source={{uri:photo}} style={{width:40,height:40,borderRadius:25}}/>
            <View>
                <Text style={{fontSize:25,fontWeight:'bold',color:'#fff',marginLeft:10}} >My Profile</Text>
                <Text style={{fontSize:20,color:'#fff',marginLeft:10}}>{name}</Text>
            </View>
        </TouchableOpacity>}
        <TouchableOpacity onPress={()=> navigation.navigate('Sign Up')} style={logged?{display:'none'}:{flexDirection:'row',alignItems:'center',borderBottomColor:'#000',borderStyle:'solid',borderBottomWidth:4,borderRadius:25,padding:5,margin:5}}>
            <Image source={require('../../assets/agregar-usuario.png')} style={{width:30,height:30,marginLeft:10}}/>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#fff',marginLeft:10}} >Sign Up  </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Sign In')} style={logged?{display:'none'}:{flexDirection:'row',alignItems:'center',borderBottomColor:'#000',borderStyle:'solid',borderBottomWidth:4,borderRadius:25,padding:5,margin:5}}>
            <Image source={require('../../assets/ingresar.png')} style={{width:30,height:30,marginLeft:10}}/>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#fff',marginLeft:10}} >Sign In </Text>
        </TouchableOpacity>
        {logged &&
        <TouchableOpacity onPress={()=> navigation.navigate('Sign Out')} style={{flexDirection:'row',alignItems:'center',borderBottomColor:'#000',borderStyle:'solid',borderBottomWidth:4,borderRadius:25,padding:5,margin:5}}>
            <Image source={require('../../assets/salida.png')} style={{width:30,height:30,marginLeft:10}}/>
            <Text style={{fontSize:25,fontWeight:'bold',color:'#fff',marginLeft:10}} >Sign Out  </Text>
        </TouchableOpacity>}
        
        
        
        
        </DrawerContentScrollView>
    )
}