import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    user:'',
    photo:'',
    name:'',
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
                    name:user.name + ' '+ user.lastName,
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
                let {user,token} = response
                let newState = {
                    ...state,
                    name:user.user.name ,
                    photo:user.user.photo,
                    logged:true,
                    role:user.user.role,
                    id:user.user.id,
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
        


        .addCase(userActions.signOut.fulfilled, (state, action) => {
            const {success,response} = action.payload
            if(success){
                AsyncStorage.removeItem('token')
                let newState = {
                    ...state,
                    id:'',
                    photo: '',
                    name: '',
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
        
})

export default userReducer