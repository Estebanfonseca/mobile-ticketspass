import { ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Image , Alert } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import userAction from "../redux/actions/userAction";


export default function SignUp({navigation}) {
    let [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState(null);
    let [fName, setFName] = useState('')
    let [lName, setLName] = useState('')
    let [email, setEmail] = useState('')
    let [pass, setPass] = useState('')
    let dispatch = useDispatch()
    let {signUp} = userAction
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

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
    let dato = {
        name:fName,
        lastName:lName,
        birthDate:date,
        photo:image,
        email:email,
        password:pass
    }

    let submit = ()=>{
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
        <ScrollView style={{ backgroundColor: "#f5f5f5", flex: 1, padding: 10, paddingBottom: 50 }}>
            <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "900" }}  >SignUp</Text>
            <Text style={style.text1}>Name</Text>
            <TextInput placeholder="Your Name..." style={style.input} value={fName} onChangeText={(item)=>setFName(item)} ></TextInput>
            <Text style={style.text1}>Last Name</Text>
            <TextInput placeholder="Your LastName..." style={style.input} value={lName} onChangeText={item=>setLName(item)} ></TextInput>
            <Text style={style.text1}>BirthDate</Text>
            <TouchableOpacity style={style.input} onPress={() => setShow(true)}>
                <Text style={{textAlign:'center'}}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {show && <DateTimePicker mode="date" value={date} onChange={onChange} />}
            <Text style={style.text1}>Photo</Text>
            <TouchableOpacity onPress={pickImage} style={style.input}>
                <Text style={{ textAlign: "center" }}>Choose a photo</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 25, alignSelf: "center", marginTop: 25 }} />}
            <Text style={style.text1}>Email</Text>
            <TextInput placeholder="Enter your email..." style={style.input} value={email} onChangeText={(item)=>setEmail(item)} />
            <Text style={style.text1}>Password</Text>
            <TextInput style={style.input} placeholder="Enter your password..." value={pass} onChangeText={(item)=>setPass(item)} />
            <TouchableOpacity style={style.buton2} onPress={submit} >
                <Text style={style.textbtn}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={style.text2}>Do you have an Acount?</Text>
            <TouchableOpacity style={style.buton1} onPress={()=>navigation.navigate('Sign In')} >
                <Text style={style.textbtn}>Sign In Here!</Text>
            </TouchableOpacity>
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
