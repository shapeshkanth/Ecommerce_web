import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



//Create Order

export const createOrder = createAsyncThunk("create/order",async(orderData,{rejectWithValue})=>{
try {
 const config = {
headers:{
    "Content-type":"application/json"
}}

const {data}=await axios.post("/api/v1/new/order",orderData,config);
console.log(data);
return data;
} catch (error) {
    return rejectWithValue(error.response?.data || "An error occurred while creating order")
}
})

const orderSlice = createSlice({
    name:"order",
    initialState:{
    success:false,
    loading:false,
    error:null,
    message:null,
    orders:[],
    order:{}
    },
    reducers:{
        removeErrors:(state)=>{
        state.error=null;
        },
        removeSuccess:(state)=>{
        state.success=false;
        }
    },
    extraReducers:(builder)=>{
     builder.addCase(createOrder.pending,(state)=>{
       state.error=null;
       state.loading=true;
       state.success=false;
     }).addCase(createOrder.fulfilled,(state,action)=>{
       state.error=null;
       state.loading=false;
       state.success=action.payload.success;
       state.order=action.payload.order;
     }).addCase(createOrder.rejected,(state,action)=>{
       state.loading=false;
       state.error=action.payload?.message || "Order creation failed";
     })
    }

});

export const {removeErrors,removeSuccess} = orderSlice.actions;
export default orderSlice.reducer;