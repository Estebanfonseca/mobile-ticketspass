import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import userActions from '../redux/actions/userAction'
import { useTranslation } from 'react-i18next'
import { Input, Icon} from '@rneui/themed'

export default function SignIn({ navigation }) {
    const { t } = useTranslation()
    let dispatch = useDispatch()
    let { signIn } = userActions
    let [email, setEmail] = useState([])
    let [pass, setPass] = useState([])
    let dato = {
        email: email,
        password: pass
    }

    let submit = () => {
        dispatch(signIn(dato))
            .then(res => {
                if (res.payload.success) {
                    setEmail('')
                    setPass('')
                    Alert.alert(res.payload.message)
                    navigation.navigate('TicketsPass')
                } else {
                    if (Array.isArray(res.payload.response)) {
                        let text = res.payload.response.join('\n')
                        Alert.alert(text)
                    } else {
                        Alert.alert(res.payload.response[0])
                    }
                }
            })
            .catch(err => Alert.alert(err.message))
    }

    return (
        <ImageBackground source={require("../../assets/sss.jpg")} style={{ flex: 1, resizeMode: 'cover' }}>
            <View style={style.signInContainer}>
                <Text style={{ fontSize: 50, textAlign: 'center', fontWeight: 'bold', color: 'white', paddingVertical: 80 }} >{t('sign_in')}</Text>
                <Input
                    placeholder={t('user_e')}
                    keyboardType='email-address'
                    onChangeText={item => setEmail(item)}
                    leftIcon={<Icon
                        name='user'
                        size={40}
                        color='white'
                        type='evilicon'
                    />}
                    placeholderTextColor="#ffffff"
                    inputContainerStyle={{ borderBottomColor: '#ffffff' }}
                    inputStyle={{ color: '#ffffff' }}
                />
                <Input
                    placeholder={t('user_pas')}
                    secureTextEntry={true}
                    passwordRules={true}
                    onChangeText={item => setPass(item)}
                    leftIcon={<Icon
                        name='unlock'
                        size={40}
                        color='white'
                        type='evilicon'
                    />}
                    placeholderTextColor="#ffffff"
                    inputContainerStyle={{ borderBottomColor: '#ffffff' }}
                    inputStyle={{ color: '#ffffff' }}
                />
                <TouchableOpacity onPress={submit} style={style.button} activeOpacity={.8} >
                    <Text style={{ color: 'black', textAlign: 'center', fontSize: 25, padding: 10 }}>{t('sign_in')}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 3, backgroundColor: 'white' }} />
                    <View>
                        <Text style={{ width: 70, textAlign: 'center', fontSize: 30, color: 'white', paddingHorizontal: 5 }}>OR</Text>
                    </View>
                    <View style={{ flex: 1, height: 3, backgroundColor: 'white' }} />
                </View>
                <TouchableOpacity style={style.buttonFace} activeOpacity={.8}>
                    <Icon name='sc-facebook' type='evilicon' color='white' size={30} />
                    <Text style={{ color: 'white', fontSize: 25, marginLeft: 10 }}>Sign in with Facebook
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 , flexDirection: 'row', alignItems: 'space-around', justifyContent: 'space-around', marginBottom: 40}}>
                <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('Sign up')} >
                    <Text style={{ color: 'white', fontSize: 20 }}>Create an account</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} >
                    <Text style={{ color: 'white', fontSize: 20 }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const style = StyleSheet.create({
    signInContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    text1: {
        fontSize: 16,
        padding: 5,
        marginTop: 10
    },
    text2: {
        borderBottomColor: 'white',
        borderTopColor: 'white',
        borderBottomWidth: 3,
        borderTopWidth: 3,
        margin: 20,
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 50
    },
    button: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 30,
        padding: 5,
        fontSize: 40,
        color: 'black',
    },
    buttonFace: {
        marginVertical: 30,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#3b5998',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        color: 'black',
    },
    buttonSignUp: {
        backgroundColor: 'white',
        marginBottom: 80
    },
    ImageBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: 'flex-end',
        resizeMode: 'cover'
    },
    blackText: {
        color: 'black'
    }
})