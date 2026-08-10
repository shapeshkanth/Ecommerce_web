import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCartItem = createAsyncThunk("cart/add",async({id,quantity},{rejectWithValue})=>{

    try {
        const {data}=await axios.get(`/api/v1/singleProduct/${id}`);
        return {
            product:data.singleproduct._id,
            name:data.singleproduct.name,
            image:data.singleproduct.image[0].url,
            stock:data.singleproduct.stock,
            quantity
        }
        
    } catch (error) {
        return rejectWithValue(error.response?.data || "An Error Occurred while add to cart");
    }
})

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:JSON.parse(localStorage.getItem("cartItems")) || [],
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
    extraReducers:(builder)=>{
        builder.addCase(addToCartItem.pending,(state)=>{
             state.error=null;
             state.loading=true;
        }).addCase(addToCartItem.fulfilled,(state,action)=>{
             const item= action.payload;

             const existingItem=state.cartItems.find((i)=>i.product===item.product)
             if(existingItem)
             {
               existingItem.quantity = item.quantity;
               state.message=`Updated ${item.name} quantity in the cart`;
             }else{
                state.cartItems.push(item);
                state.message=`${action.payload.name} added to cart`;
             }
             
             state.loading=false;
             state.error=null;
             state.success=true;
             localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
             

        }).addCase(addToCartItem.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || "somthing went wrong"
        })
    }
})

export const {removeErrors,removeSuccess}=cartSlice.actions;
export default cartSlice.reducer;