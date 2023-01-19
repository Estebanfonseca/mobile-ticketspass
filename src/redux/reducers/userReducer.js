import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    user:'',
    photo:'',
    name:'',
    lastName:'',
    logged:false,
    role:'',
    id:'',
    token:'',
    load: false,
    error: false
}

const userReducer = createReducer(initialState,(item)=>{
    item
.addCase(userActions.signIn.fulfilled,(state,action)=>{
            const {success,response} = action.payload
            if (success){
                let {user,token} = response.response
                AsyncStorage.setItem('token',JSON.stringify({token:{
                    user:token
                }}))
                let newState = {
                    ...state,
                    user:user,
                    photo:user.photo,
                    name:user.name,
                    lastName:user.lastName,
                    logged:true,
                    role:user.role,
                    id: user.id,
                    token:token,
                    load:false,
                    error:false
                }
                return newState
            }else{
                let newState = {
                    ...state,
                    message:response
                }
                return newState
            }
        })

        .addCase(userActions.signToken.fulfilled, (state, action) => {
            const {success,response} = action.payload
            if (success){
                let {user} = response
                let newState = {
                    ...state,
                    user:user,
                    name:user.name ,
                    lastName:user.lastName,
                    photo:user.photo,
                    logged:true,
                    role:user.role,
                    id:user.id,
                    load:false,
                    error:false
                }
                return newState
            }else{
                let newState = {
                    ...state,
                    message:response
                }
                return newState
            }
        })
        


        .addCase(userActions.signOut.fulfilled, (state, action) => {
            const {success,response} = action.payload
            if(success){
                AsyncStorage.removeItem('token')
                let newState = {
                    ...state,
                    user:'',
                    id:'',
                    photo: '',
                    name: '',
                    lastName:'',
                    logged: false,
                    role: '',
                    token: '',
                    load: false,
                    error:false
                }
                return newState
            } else{
                let newState = {
                    ...state,
                    message: response
                }
                return newState
            }
        })
        .addCase(userActions.getUser.fulfilled,(state,action)=>{
            const {success,response} = action.payload
            if (success){
                let {user} = response
                let newState = {
                    ...state,
                    name:user.user.name ,
                    lastName:user.user.lastName ,
                    photo:user.user.photo,
                    logged:true,
                    role:user.user.role,
                    id:user.user.id,
                    load:false,
                    error:false,
                    user:user.user
                }
                return newState
            }else{
                let newState = {
                    ...state,
                    message:response
                }
                return newState
            }
        })
        .addCase(userActions.updateUser.fulfilled,(state,action)=>{
            const {success,response} = action.payload
            if (success){
                let {data} = response
                
                let newState = {
                    ...state,
                    user:data,
                    photo:data.photo,
                    name:data.name ,
                    lastName:data.lastName,
                }
                return newState
            }else{
                let newState = {
                    ...state,
                    message:response
                }
                return newState
            }
        })
        
})

export default userReducer