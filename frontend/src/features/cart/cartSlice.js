import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:[],
        loading:false,
        error:null,
        success:false,
        message:null
    },
    reducers:{
        removeErrors:(state)=>{
          state.error=null;
        },
        removeSuccess:(state)=>{
         state.success=false;
        }
    },
    extraReducers:(builder)=>{}
})

export const {removeErrors,removeSuccess}=cartSlice.actions;
export default cartSlice.reducer;