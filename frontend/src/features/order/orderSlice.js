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

// get all orders
export const AllOrders = createAsyncThunk("user/AllOrders",async (_,{rejectWithValue})=>{
  try {
    const {data}=await axios.get("/api/v1/allOrder/user");
    return data;
    
  } catch (error) {
    return rejectWithValue(error.response?.message || "An error occurred while fetching orders");
  }
})

//get sindle order details

export const sindleOrderDetails = createAsyncThunk("order/details",async (orderId,{rejectWithValue})=>{
  try {

    const {data} = await axios.get(`/api/v1/getOrderDetails/${orderId}`);
    return data;
    
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch single order details");
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

     builder.addCase(AllOrders.pending,(state)=>{
      state.loading=true;
      state.error=null;
      state.success=false;

     }).addCase(AllOrders.fulfilled,(state,action)=>{
       state.error=null;
       state.loading=false;
       state.orders=action.payload.orders;
       state.success=action.payload.success;
     }).addCase(AllOrders.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload?.message || "Failed to fetch order details";

     })

     builder.addCase(sindleOrderDetails.pending,(state)=>{
        state.loading=true;
        state.error=null;
        state.success=false;
     }).addCase(sindleOrderDetails.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.success=action.payload.success;
        state.order=action.payload.order;

     }).addCase(sindleOrderDetails.rejected,(state,action)=>{
        state.loading=false;
        state.success=false;
        state.error=action.payload?.message || "Failed to fetch single order details";
     })
    }

});

export const {removeErrors,removeSuccess} = orderSlice.actions;
export default orderSlice.reducer;