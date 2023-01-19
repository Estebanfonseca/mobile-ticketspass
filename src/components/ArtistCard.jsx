import { StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Card, Divider, Title } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

export default function ArtistCard({item, navigation}) {
  const {t} = useTranslation()
  return (
    <Pressable onPress={() => navigation.navigate(t('art'), {id: item._id})}>
    <Card style={styles.card}>
      <Image style={styles.image} source={{uri: item.photo}} />
      <Card.Content>
      <Title style={styles.title}>{item.name}</Title>
      </Card.Content>
    </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    border: 'none',
    backgroundColor: 'white',
    elevation: 0,
    shadowColor: 'transparent',
    color: 'white',
    surfaceColor: 'white',
  },
  image: {
    width: 200,
    resizeMode: 'cover',
    height: 200,
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 100,
    borderColor: 'darkviolet',
    borderStyle: 'double',
    borderWidth: 3,
  },
  title: {
    textTransform: 'capitalize',
    textAlign: 'center'
  },
})