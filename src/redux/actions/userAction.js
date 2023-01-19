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
            response: {
                user: user.data.response,
                token
            }
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


const userAction = {
    signIn,
    signToken,
    signOut,
    signUp,
}

export default userAction