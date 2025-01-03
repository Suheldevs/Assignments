import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading:false,
    error:null,
    user:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state,action)=>{
            state.loading = true,
            state.error = null,
            state.user = null
        },
        loginSuccess:(state,action)=>{
            state.loading = false,
            state.error = null,
            state.user = action.payload
        },
        loginFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload,
            state.user = null
        },
    }
})
export const {loginStart,loginSuccess,loginFailure} = userSlice.actions

export default userSlice.reducer