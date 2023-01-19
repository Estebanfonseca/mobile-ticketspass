import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import userActions from '../redux/actions/userAction'

export default function SignOut({navigation}) {

    let {token} = useSelector(state => state.userReducer)
    let dispatch = useDispatch()
    let {signOut} = userActions

    useEffect(() => {
        dispatch(signOut(token))
        Alert.alert('Signed Out')
        navigation.navigate('Home')
    }, [])

  return (
    <View>
      <Text>SignOut</Text>
    </View>
  )
}