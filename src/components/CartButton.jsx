import React from 'react'
import { IconButton, Portal } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function CartButton() {
  const {t} = useTranslation()
  const navigation = useNavigation();
  return (
    <Portal>
      <IconButton icon="cart" size={30} mode="contained" iconColor='white' onPress={() => navigation.navigate(t('cart'))} style={styles.position}/>
    </Portal>
  )
}

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: "#1BA305"
  }
})