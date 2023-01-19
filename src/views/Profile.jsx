import { Alert, Text, ScrollView, Image, TouchableOpacity ,StyleSheet,TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import apiUrl from "../api/url";
import { useDispatch } from "react-redux";
import userAction from "../redux/actions/userAction";



export default function Profile({ navigation }) {
    let [age, setAge] = useState("");
    let [open,setOpen] = useState(false)
    let [show,setShow] = useState(false)
    let { user,token} = useSelector((store) => store.userReducer);
    const [date, setDate] = useState(new Date(user.birthDate));
    const [image, setImage] = useState(null);
    let [fName, setFName] = useState(user.name)
    let [lName, setLName] = useState(user.lastName)
    let [email, setEmail] = useState(user.email)


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
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    useEffect(() => {
        getEdad(fecha);
    }, []);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    let dato = {
    }
    fName !== user.name || '' && (dato.name = fName)
    lName !== user.lastName || '' && (dato.lastName = lName)
    date !== user.birthDate && (dato.birthDate = date)
    image !== null && (dato.photo = image)
    email !== user.email ||'' && (dato.email = email)

    console.log(dato)

    let submit= ()=>{
        axios.patch(`${apiUrl}/auth/me/${id}`, dato)
        Alert.alert('Was Edited')
        
        setOpen(false)
        setFName('')
        setLName('')
        setEmail('')
        navigation.navigate('Home')
      }

    let fecha = new Date(user.birthDate);
    fecha = fecha.toLocaleDateString();

    return (
        <ScrollView style={{ backgroundColor: "#f5f5f5", flex: 1 ,padding:10}}>
            <Text style={{ fontSize: 40, fontWeight: "800", textAlign: "center", margin: 10 }}>My Profile </Text>
            {open&&<TouchableOpacity onPress={pickImage} style={style.input}>
                <Text style={{ textAlign: "center" }}>Choose a photo</Text>
            </TouchableOpacity>}
            <Image source={image?{uri:image}:{ uri: user.photo }} style={{ width: 200, height: 200, alignSelf: "center",borderRadius:25 }} />
            <Text style={style.text1}>Name {open&&<Image style={{width:20,height:20}} source={require('../../assets/editar.png')}/>}</Text>
            {!open?<Text style={style.input}>{!open && user.name + " " + user.lastName}</Text>:
            <TextInput style={style.input} value={fName} onChangeText={(item)=>setFName(item)} />}
            {open&&<><Text style={style.text1}>Last Name {open&&<Image style={{width:20,height:20}} source={require('../../assets/editar.png')}/>}</Text>
            <TextInput style={style.input} value={lName} onChangeText={item=>setLName(item)} /></>}
            {!open&&(<><Text style={style.text1}>Age</Text>
            <Text style={style.input}>{age}</Text></>)}
            <Text style={style.text1}>BirthDate {open&&<Image style={{width:20,height:20}} source={require('../../assets/editar.png')}/>}</Text>
            {!open?<Text style={style.input}>{new Date(user.birthDate).toLocaleDateString()}</Text>:
            <TouchableOpacity style={style.input} onPress={() => setShow(true)}>
                <Text style={{textAlign:'center'}}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>}
            <Text style={style.text1}>Email {open&&<Image style={{width:20,height:20}} source={require('../../assets/editar.png')}/>}</Text>
            {!open ? <Text style={style.input}>{user.email}</Text> :
            <TextInput  style={style.input} value={email} onChangeText={(item)=>setEmail(item)} />}
            {show && <DateTimePicker mode="date" value={date} onChange={onChange} />}
            {open?<TouchableOpacity style={style.buton2} onPress={submit}><Text style={style.textbtn}>Edit</Text></TouchableOpacity>:
            <TouchableOpacity style={style.buton2} onPress={()=>setOpen(true)}><Text style={style.textbtn}>Edit Profile</Text></TouchableOpacity>}
            {open?<TouchableOpacity style={style.buton1} onPress={() => setOpen(false)}><Text style={style.textbtn}>Cancel</Text></TouchableOpacity>:
            <TouchableOpacity style={style.buton1} onPress={() => navigation.navigate("Home")}><Text style={style.textbtn}>Go Back</Text></TouchableOpacity>}
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