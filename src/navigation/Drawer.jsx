import { Image, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import { useSelector, useDispatch } from 'react-redux'
import Profile from '../views/Profile'
import Stack from './Stack'
import { useTranslation } from 'react-i18next'
import { Icon } from '@rneui/themed'
import userActions from '../redux/actions/userAction'

const DrawerNav = createDrawerNavigator()

export default function Drawer() {
    let { id } = useSelector(store => store.userReducer)

    return (
        <DrawerNav.Navigator screenOptions={{ headerStyle: { backgroundColor: 'black' }, headerTintColor: '#fff' }} name='root' drawerContent={(props) => <MenuItems {...props} />} >
            <DrawerNav.Screen name='TicketsPass' component={Stack} />
            <DrawerNav.Screen name='profile' initialParams={{ id: id }} component={Profile} />
            <DrawerNav.Screen name='Sign in' component={SignIn} />
            <DrawerNav.Screen name='Sign up' component={SignUp} />
        </DrawerNav.Navigator>
    )
}

const MenuItems = ({ navigation }) => {
    let { logged, photo, name, lastName } = useSelector(state => state.userReducer)
    const { i18n, t } = useTranslation()
    let [open, setOpen] = useState(false)
    let [lan, setLan] = useState(false)

    let { token } = useSelector(state => state.userReducer)
    let dispatch = useDispatch()
    let { signOut } = userActions
    return (
        <DrawerContentScrollView style={{ backgroundColor: 'black', padding: 2 }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', padding: 5, margin: 5 }}>
                <Image source={require('../../assets/ticketlogorotado.png')} style={{ width: 50, height: 50 }} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(t('home'))} style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 20 }}>
                <Icon name='home' size={30} color='#fff' />
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('home')} </Text>
            </TouchableOpacity>
            {logged &&
                <TouchableOpacity onPress={() => navigation.navigate('profile')} style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 20 }}>
                    <Image source={{ uri: photo }} style={{ width: 40, height: 40, borderRadius: 25 }} />
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('profile')}</Text>
                        <Text style={{ fontSize: 20, color: '#fff', marginLeft: 10 }}>{name + ' ' + lastName}</Text>
                    </View>
                </TouchableOpacity>}
            <TouchableOpacity onPress={() => navigation.navigate('Sign up')} style={logged ? { display: 'none' } : { flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 20 }}>
                <Icon name='adduser' type='antdesign' size={30} color='#fff' />
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('sign_up')}  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Sign in')} style={logged ? { display: 'none' } : { flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 20 }}>
                <Icon name='log-in' type='feather' size={30} color='#fff' />
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('sign_in')} </Text>
            </TouchableOpacity>
            {logged &&
                <TouchableOpacity onPress={() => {
                    dispatch(signOut(token))
                    Alert.alert('Signed Out')
                }
                } style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 20 }}>
                    <Icon name='log-out' type='feather' size={30} color='#fff' />
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('log_out')}  </Text>
                </TouchableOpacity>}
            <TouchableOpacity onPress={() => { setOpen(!open); setLan(false) }} style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 20 }}>
                <Icon name='settings' type='feather' size={30} color='#fff' />
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '90%' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('settin')}</Text>
                    {!open ? <Icon name='chevron-right' type='feather' size={30} color='#fff' /> :
                        <Icon name='chevron-down' type='feather' size={30} color='#fff' />}
                </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLan(!lan)} style={!open ? { display: 'none' } : { flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 20 }}>
                <Icon name='globe' type='feather' size={30} color='#fff' />
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '90%' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('lang')}</Text>
                    {!lan ? <Icon name='chevron-right' type='feather' size={30} color='#fff' /> :
                        <Icon name='chevron-down' type='feather' size={30} color='#fff' />}
                </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => { i18n.changeLanguage('es'); setOpen(false); setLan(false) }} style={!lan || !open ? { display: 'none' } : { flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 40 }}>
                <Image source={require('../../assets/espana.png')} style={{ width: 30, height: 30 }} />
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('español')} </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { i18n.changeLanguage('en'); setOpen(false); setLan(false) }} style={!lan || !open ? { display: 'none' } : { flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 40 }}>
                <Image source={require('../../assets/reino-unido.png')} style={{ width: 30, height: 30 }} />
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('ingles')} </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { i18n.changeLanguage('fr'); setOpen(false); setLan(false) }} style={!lan || !open ? { display: 'none' } : { flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 40 }}>
                <Image source={require('../../assets/francia.png')} style={{ width: 30, height: 30 }} />
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('french')} </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { i18n.changeLanguage('de'); setOpen(false); setLan(false) }} style={!lan || !open ? { display: 'none' } : { flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 40 }}>
                <Image source={require('../../assets/alemania.png')} style={{ width: 30, height: 30 }} />
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('german')} </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { i18n.changeLanguage('pt'); setOpen(false); setLan(false) }} style={!lan || !open ? { display: 'none' } : { flexDirection: 'row', alignItems: 'center', borderBottomColor: '#fff', borderStyle: 'solid', borderBottomWidth: 4, borderRadius: 25, padding: 5, margin: 5, paddingLeft: 40 }}>
                <Image source={require('../../assets/portugal.png')} style={{ width: 30, height: 30 }} />
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff', marginLeft: 10 }} >{t('portugues')} </Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    )
}