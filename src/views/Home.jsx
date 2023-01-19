import { View, Text, ImageBackground ,Image,StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home({navigation}) {
  return (
    <View style={style.container}>
    <ImageBackground source={{uri:'https://media4.giphy.com/media/lmjzmEcZLkcMLtVrWi/giphy.gif'}} style={style.imageContainer} >
      <Image  source={require('../../assets/ticketlogorotado.png')} style={style.logo} />
      <LinearGradient end={{x: 0.7, y: 0.5 }} style={style.gradient}  colors={['#647DEE','#B621FE']}>
    <Text style={style.text} >Tickets Pass</Text>
      </LinearGradient>
    </ImageBackground>
    <View style={style.content}>
      <Pressable style={style.button} onPress={() => navigation.navigate("Artists")}>
        <Text style={style.buttonText}>Artists</Text>
      </Pressable>
      <Pressable style={style.button} onPress={() => navigation.navigate("Concerts")}>
        <Text style={style.buttonText}>Concerts</Text>
      </Pressable>
    </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems:'center'
  },
  logo: {
    width:150,
    height:150
  },
  gradient: {
    borderRadius:25,
    transform:[{rotate:'10deg'}],
    padding:5
  },
  text:{
    fontSize:40,
    color:'#FFFFFF',
    fontFamily:'monospace',
    paddingHorizontal:50,
    textShadowColor:'#fff',
    textShadowOffset:{width: 10, height: 10},
    textShadowRadius:40,
    borderColor: '#fff',
    borderWidth: 5,
    borderRadius:25,
    textAlign:'center'
  },
  content: {
    flex:  1,
    backgroundColor: '#000',
    justifyContent: 'space-around',
    padding: 20
  },
  button: {
    width: '100%',
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  }
})