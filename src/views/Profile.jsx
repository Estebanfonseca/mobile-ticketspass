import { Alert, Text, ScrollView, Image, TouchableOpacity ,StyleSheet,TextInput,LogBox,ActivityIndicator,View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import userAction from "../redux/actions/userAction";
import { useTranslation } from "react-i18next";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uuidv4 } from "@firebase/util";


export default function Profile({ navigation }) {
    const {t} = useTranslation()
    let [age, setAge] = useState("");
    let [open,setOpen] = useState(false)
    let [show,setShow] = useState(false)
    let { user,id,token} = useSelector((store) => store.userReducer);
    const [date, setDate] = useState(new Date(user.birthDate));
    const [image, setImage] = useState(null);
    const [load,setLoad] = useState(false)
    let [fName, setFName] = useState(user.name)
    let [lName, setLName] = useState(user.lastName)
    let [email, setEmail] = useState(user.email)
    let dispatch = useDispatch()
    let {updateUser,signToken} = userAction

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

    function getEdad(dateString) {
        let hoy = new Date();
        let fechaNacimiento = new Date(dateString);
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        setAge(edad);
    }
    const pickImage = async () => {
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
    };
    let fecha = new Date(user.birthDate);
    fecha = fecha.toLocaleDateString();
    useEffect(() => {
        getEdad(fecha);
    }, []);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);

    };
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
    let dato = {}
    fName !== '' && (dato.name = fName)
    lName !== ''  && (dato.lastName = lName)
    date !== user.birthDate && (dato.birthDate = date)
    image !== null && (dato.photo = image)
    email !== '' && (dato.email = email)

    let submit= ()=>{
        let datos = {
            id,
            dato
        }
        dispatch(updateUser(datos))
        .catch(err=>console.log('hola'+ err))
        dispatch(signToken(token))
        Alert.alert('Was Edited')
        setOpen(false)
        navigation.navigate('Home')
      }

    

    return (
        <ScrollView style={{ backgroundColor: "#f5f5f5", flex: 1 ,padding:10}}>
            <Text style={{ fontSize: 40, fontWeight: "800", textAlign: "center", margin: 10 }}>{t('profile')}</Text>
            {open&&<TouchableOpacity onPress={pickImage} style={style.input}>
            <Text style={{ textAlign: "center" }}>{t('choose')}</Text>
            </TouchableOpacity>}
            {load  ? <View style={{backgroundColor: "rgba(0,0,0,0.4)",alignItems: "center",justifyContent: "center",width: 200, height: 200, borderRadius: 25, alignSelf: "center"}}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>: ''}
            <Image source={image?{uri:image}:{ uri: user.photo }} style={load ? {display:'none'}:{ width: 200, height: 200, alignSelf: "center",borderRadius:25 }} />
            <Text style={style.text1}>{t('name')} {open&&<Image style={{width:20,height:20}} source={require('../../assets/editar.png')}/>}</Text>
            {!open?<Text style={style.input}>{!open && user.name + " " + user.lastName}</Text>:
            <TextInput style={style.input} value={fName} onChangeText={(item)=>setFName(item)} />}
            {open&&<><Text style={style.text1}>{t('Lname')} {open&&<Image style={{width:20,height:20}} source={require('../../assets/editar.png')}/>}</Text>
            <TextInput style={style.input} value={lName} onChangeText={item=>setLName(item)} /></>}
            {!open&&(<><Text style={style.text1}>{t('age')}</Text>
            <Text style={style.input}>{age}</Text></>)}
            <Text style={style.text1}>{t('birth')} {open&&<Image style={{width:20,height:20}} source={require('../../assets/editar.png')}/>}</Text>
            {!open?<Text style={style.input}>{new Date(user.birthDate).toLocaleDateString()}</Text>:
            <TouchableOpacity style={style.input} onPress={() => setShow(true)}>
                <Text style={{textAlign:'center'}}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>}
            <Text style={style.text1}>{t('email')} {open&&<Image style={{width:20,height:20}} source={require('../../assets/editar.png')}/>}</Text>
            {!open ? <Text style={style.input}>{user.email}</Text> :
            <TextInput  style={style.input} value={email} onChangeText={(item)=>setEmail(item)} />}
            {show && <DateTimePicker mode="date" value={date} onChange={onChange} />}
            {open?<TouchableOpacity style={style.buton2} onPress={submit}><Text style={style.textbtn}>{t('edit')}</Text></TouchableOpacity>:
            <TouchableOpacity style={style.buton2} onPress={()=>setOpen(true)}><Text style={style.textbtn}>{t('edit_p')}</Text></TouchableOpacity>}
            {open?<TouchableOpacity style={style.buton1} onPress={() => setOpen(false)}><Text style={style.textbtn}>{t('cancel')}</Text></TouchableOpacity>:
            <TouchableOpacity style={style.buton1} onPress={() => navigation.navigate(t('home'))}><Text style={style.textbtn}>{t('go_b')}</Text></TouchableOpacity>}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    text1: {
        fontSize: 18,
        padding: 5,
        borderBottomWidth: 2,
        borderColor: "purple",
        marginBottom: 10,
    },
    input: {
        borderColor: "#000",
        borderWidth: 3,
        padding: 10,
        borderRadius: 25,
        backgroundColor: "#fff",
        textAlign:'center'
    },
    text2: {
        borderBottomColor: "purple",
        borderTopColor: "purple",
        borderBottomWidth: 3,
        borderTopWidth: 3,
        margin: 20,
        padding: 10,
        textAlign: "center",
        fontSize: 20,
    },
    textbtn: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "500",
        color: "#fff",
    },
    buton1: {
        backgroundColor: "purple",
        height: 60,
        width: 250,
        borderRadius: 25,
        alignSelf: "center",
        marginTop: 20,
        borderColor: "#aaa",
        borderWidth: 3,
        padding: 5,
        marginBottom: 100,
    },
    buton2: {
        backgroundColor: "purple",
        width: 200,
        height: 60,
        borderRadius: 25,
        alignSelf: "center",
        marginTop: 50,
        borderColor: "#aaa",
        borderWidth: 3,
        padding: 5,
        marginBottom: 10,
    },
});