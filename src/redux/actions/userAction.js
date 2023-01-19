import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../api/url";

const signIn = createAsyncThunk('signIn',async(datos)=>{
    let url = `${apiUrl}/auth/sign-in`
    try{
        let res = await axios.post(url,datos)
        return {
            success:res.data.success,
            response:res.data,
            message:res.data.message
        }
    }catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})

const signUp = createAsyncThunk('signUp',async(datos)=>{
    let url = `${apiUrl}/auth/sign-up`
    try{
        let res = await axios.post(url,datos)
        return {
            success:res.data.success,
            response:res.data,
        }
    }catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})

const signToken = createAsyncThunk('signToken', async(token) => {
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let user = await axios.post(`${apiUrl}/auth/token`, null, headers)
        return {
            success:user.data.success,
            response: res.data
        }
    } catch (error) {
        return {
            success: false,
            response: error.response.data
        }
    }
})

const signOut = createAsyncThunk('signOut', async(token) => {
    let headers = {headers: {'Authorization': `Bearer ${token}`}}
    try {
        let res = await axios.post(`${apiUrl}/auth/sign-out`, null, headers)
        return {
            success: res.data.success,
            response: res.data.message
        }
    } catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})
const getUser = createAsyncThunk ('getUser',async(id)=>{
    try {
        let res = await axios.get(`${apiUrl}/auth/me/${id}`)
        return {
            success:res.data.success,
            response:res.data,
        }
    }catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})

const updateUser = createAsyncThunk('updateUser',async(datos)=>{
    let dato = datos.dato
    try {
        let res = await axios.patch(`${apiUrl}/auth/me/${datos.id}`,dato)
        
        return {
            success:res.data.success,
            response:res.data,
        }
    }catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})


const userAction = {
    signIn,
    signToken,
    signOut,
    signUp,
    getUser,
    updateUser
}

export default userAction