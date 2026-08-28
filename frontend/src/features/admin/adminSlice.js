import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//fetch all orders
export const getAllOrder = createAsyncThunk("admin/orders",async (_,{rejectWithValue})=>{
    try {
        const {data} = await axios.get("/api/v1/admin/allOrders");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.message || "Failed to fetch orders");
    }

})

//fetch all products
export const adminGetProducts = createAsyncThunk("admin/adminProducts",async (page=1,{rejectWithValue})=>{
try {
    const {data} = await axios.get(`/api/v1/adminViewProducts?page=${page}`);
   
    return data;
} catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch product by admin.")
}
})
//fetch all users
export const adminGetUsers = createAsyncThunk("admin/Users",async (_,{rejectWithValue})=>{
try {
    const {data} = await axios.get(`/api/v1/admin/user`);
    return data;
} catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch Users by admin.")
}
})

export const adminGetAllReviews = createAsyncThunk("admin/allReviews",async (_,{rejectWithValue})=>{
try {
    const {data} = await axios.get(`/api/v1/admin/all-reviews`);
    return data;
} catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch reviews by admin.")
}
})

const adminSlice = createSlice({
    name:"admin",
    initialState:{
        totalAmount:0,
        orders:[],
        products:[],
        productCount:0,
        resultPerPage:0,
        users:[],
        outOfStock:0,
        reviews:[],
        
        success:false,
        loading:false,
        error:null,
        message:null,


    },
    reducers:{
        removeErrors:(state)=>{
           state.error=null;
        },
        removeSuccess:(state)=>{
           state.success=false;
        },
        clearMessage:(state)=>{
           state.message=null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllOrder.pending,(state)=>{
            state.loading=true;
            state.success=false;
            state.error=null;

        }).addCase(getAllOrder.fulfilled,(state,action)=>{
            state.error=null;
            state.loading=false;
            state.success=action.payload.success;
            state.orders=action.payload.orders;
            state.totalAmount = action.payload.totalamount;

        }).addCase(getAllOrder.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to fetch orders"

        })
      
        builder.addCase(adminGetProducts.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.success=false;

        }).addCase(adminGetProducts.fulfilled,(state,action)=>{
            state.error=null;
            state.loading=false;
            state.success=action.payload.success;
            state.products=action.payload.Product;
            state.resultPerPage=action.payload.resultPerPage;
            state.outOfStock = action.payload.outOfStock;
            state.productCount=action.payload.productCount;

        }).addCase(adminGetProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to fetch product by admin.";

        })
        
        builder.addCase(adminGetUsers.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.success=false;

        }).addCase(adminGetUsers.fulfilled,(state,action)=>{
           state.error=null;
           state.loading=false;
           state.success=action.payload.success;
           state.users=action.payload.user;
        }).addCase(adminGetUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to fetch users by admin.";
        })

        builder.addCase(adminGetAllReviews.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.success=false;

        }).addCase(adminGetAllReviews.fulfilled,(state,action)=>{
           state.error=null;
           state.loading=false;
           state.success=action.payload.success;
           state.reviews=action.payload.reviews;
        }).addCase(adminGetAllReviews.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to fetch users by admin.";
        })

    }

})

export const {removeErrors,removeSuccess,clearMessage} = adminSlice.actions;
export default adminSlice.reducer;