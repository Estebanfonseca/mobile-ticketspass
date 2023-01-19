import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Alert, LogBox, ActivityIndicator, ImageBackground } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import userAction from "../redux/actions/userAction";
import { useTranslation } from "react-i18next";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { Input, Icon } from '@rneui/themed'

export default function SignUp({ navigation }) {
    let [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState(null)
    const [load, setLoad] = useState(false)
    let [fName, setFName] = useState('')
    let [lName, setLName] = useState('')
    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')
    let dispatch = useDispatch()
    let { signUp } = userAction
    const { t } = useTranslation()

    const firebaseConfig = {
        apiKey: "AIzaSyDq1DascG1WxTIe9s9Lzef73wXeIwrUb1E",
        authDomain: "photos-app-ticketspasss.firebaseapp.com",
        databaseURL: "https://photos-app-ticketspasss-default-rtdb.firebaseio.com",
        projectId: "photos-app-ticketspasss",
        storageBucket: "photos-app-ticketspasss.appspot.com",
        messagingSenderId: "318770758454",
        appId: "1:318770758454:web:17394e505a19a5c6452997"
    };
    if (!getApps().length) {
        initializeApp(firebaseConfig);
    }
    LogBox.ignoreLogs([`Setting a timer for a long period`]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const pickImage = async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(t('permission'))
            }
        }
        setLoad(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.canceled) {
            const uploadUrl = await uploadImageAsync(result.assets[0].uri);
            setImage(uploadUrl)
        }
        setLoad(false)
    }

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const fileRef = ref(getStorage(), uuidv4());
        const result = await uploadBytes(fileRef, blob);
        blob.close();
        return await getDownloadURL(fileRef);
    }

    let dato = {
        name: fName,
        lastName: lName,
        birthDate: date,
        photo: image,
        email: email,
        password: pass
    }

    let submit = () => {
        dispatch(signUp(dato))
        Alert.alert('success')
        navigation.navigate('Home')
        setDate(new Date())
        setImage(null)
        setFName('')
        setLName('')
        setEmail('')
        setPass('')
    }

    return (

        <ImageBackground source={require("../../assets/sss.jpg")} style={{ flex: 1, resizeMode: 'cover', padding: 20 }}>
            <ScrollView >
            <View style={style.signUpContainer}>
            <Text style={{ fontSize: 40, textAlign: 'center', fontWeight: 'bold', color: 'white', paddingVertical: 30 }} >{t('sign_up')}</Text>
                <Input placeholder={t('user_n')} value={fName} onChangeText={(item) => setFName(item)} placeholderTextColor="#ffffff"
                    inputContainerStyle={{ borderBottomColor: '#ffffff' }} inputStyle={{ color: '#ffffff' }} />
                <Input placeholder={t('user_l')} value={lName} onChangeText={(item) => setLName(item)} placeholderTextColor="#ffffff"
                    inputContainerStyle={{ borderBottomColor: '#ffffff' }} inputStyle={{ color: '#ffffff' }} />
                <TouchableOpacity style={style.input} onPress={() => setShow(true)}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {show && <DateTimePicker mode="date" value={date} onChange={onChange} />}
                <TouchableOpacity style={style.input} onPress={pickImage}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>{t('choose')}</Text>
                </TouchableOpacity>
                {load ? <View style={{ backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center", width: 200, height: 200, borderRadius: 25, alignSelf: "center", marginTop: 25 }}>
                    <ActivityIndicator color="#fff" animating size="large" />
                </View> : ''}
                {image && <Image source={{ uri: image }} style={load ? { display: 'none' } : { width: 200, height: 200, borderRadius: 25, alignSelf: "center", marginTop: 25 }} />}
                <Input placeholder={t('user_e')} value={email} onChangeText={item => setEmail(item)} placeholderTextColor="#ffffff"
                    inputContainerStyle={{ borderBottomColor: '#ffffff' }} inputStyle={{ color: '#ffffff' }} />
                <Input placeholder={t('user_pas')} secureTextEntry={true} value={pass} onChangeText={item => setPass(item)} placeholderTextColor="#ffffff"
                    inputContainerStyle={{ borderBottomColor: '#ffffff'}} inputStyle={{ color: '#ffffff' }} />
                <TouchableOpacity onPress={submit} style={style.button} activeOpacity={.8} >
                    <Text style={{ color: 'black', textAlign: 'center', fontSize: 25, padding: 10 }}>{t('register')}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, height: 3, backgroundColor: 'white' }} />
                    <View>
                        <Text style={{ width: 70, textAlign: 'center', fontSize: 30, color: 'white', paddingHorizontal: 5 }}>OR</Text>
                    </View>
                    <View style={{ flex: 1, height: 3, backgroundColor: 'white' }} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Sign in')} style={style.buttonFace} activeOpacity={.8}>
                    <Icon name='user' type='entypo' color='white' size={30} />
                    <Text style={{ color: 'white', fontSize: 25, marginLeft: 10 }}>Sign In with a account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </ImageBackground>
    );
}

const style = StyleSheet.create({
    signUpContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    text1: {
        fontSize: 16,
        padding: 5,
        marginTop: 10,
    },
    input: {
        borderColor: '#ffffff',
        borderBottomWidth: 1,
        marginBottom: 30,
        paddingBottom: 5,
        marginHorizontal: 10,
    },
    text2: {
        borderBottomColor: "white",
        borderTopColor: "white",
        borderBottomWidth: 3,
        borderTopWidth: 3,
        margin: 20,
        padding: 10,
        textAlign: "center",
        fontSize: 20,
        color: 'white'
    },
    textbtn: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "500",
        color: "#fff",
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
        backgroundColor: '#28547c',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        color: 'black',
    },
    buttonSignIn: {
        backgroundColor: 'white'
    },
    blackText: {
        color: 'black'
    }

});
