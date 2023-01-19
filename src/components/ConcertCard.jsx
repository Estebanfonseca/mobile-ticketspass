import { Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Card, Divider, Paragraph, Title } from 'react-native-paper'
import dateFormatter from '../utils/dateFormatter'
import { useTranslation } from 'react-i18next'

export default function ConcertCard({item, navigation}) {
  const {t} = useTranslation()
  return (
    <Pressable onPress={() => navigation.navigate(t('concrt'), {id: item._id})}>
    <Card style={styles.card}>
      <Image style={styles.image} source={{uri: item.photo}} />
      <Card.Content>
      <Paragraph style={styles.text}>{item.venue.name} / <Text style={styles.purpleText}>{item.type}</Text></Paragraph>
      <Title style={styles.title}>{item.name}</Title>
      <Divider style={styles.divider} />
      <Paragraph style={styles.date}>{dateFormatter(item.date)}</Paragraph>
      </Card.Content>
    </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
  },
  image: {
    resizeMode: 'cover',
    height: 230,
    marginBottom: 5
  },
  text: {
    textTransform: 'capitalize'
  },
  purpleText: {
    color: 'purple',
    fontWeight: '800'
  },
  title: {
    textTransform: 'capitalize'
  },
  divider: {
    marginVertical: 5
  },
  date: {
    fontSize: 13,
    color: 'gray',
  }
})