import { View, Text, ImageBackground, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import CartButton from '../components/CartButton';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


export default function Home({navigation}) {
  const {logged} = useSelector(store => store.userReducer)
  const {t} = useTranslation()
  return (
    <View style={style.container}>
      <ImageBackground source={require('../../assets/background2.jpg')} style={{ flex: 1 }} resizeMode="cover">
        <View style={style.content}>
          <Button mode="contained" icon="account-music" style={style.button} onPress={() => navigation.navigate(t('artist'))}>
            <Text style={style.buttonText}>{t('artist')}</Text>
          </Button>
          <Button mode="contained" icon="music-note" style={style.button} onPress={() => navigation.navigate(t('concert'))}>
            <Text style={style.buttonText}>{t('concert')}</Text>
          </Button>
        </View>
        {logged && <CartButton />}
      </ImageBackground>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text: {
    fontSize: 40,
    color: '#FFFFFF',
    fontFamily: 'monospace',
    paddingHorizontal: 50,
    textShadowColor: '#fff',
    textShadowOffset: { width: 10, height: 10 },
    textShadowRadius: 40,
    borderColor: '#fff',
    borderWidth: 5,
    borderRadius: 25,
    textAlign: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    width: '40%',
    height: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  }
})