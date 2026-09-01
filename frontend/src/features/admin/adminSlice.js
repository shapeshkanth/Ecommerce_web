import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//fetch all orders
export const getAllOrder = createAsyncThunk("admin/orders",async (_,{rejectWithValue})=>{
    try {
        const {data} = await axios.get("/api/v1/admin/allOrders");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch orders");
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
//fetch all user reviews
export const adminGetAllReviews = createAsyncThunk("admin/allReviews",async (_,{rejectWithValue})=>{
try {
    const {data} = await axios.get(`/api/v1/admin/all-reviews`);
    return data;
} catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch reviews by admin.")
}
})

export const createProduct = createAsyncThunk("admin/create/product",async (productData,{rejectWithValue})=>{
    try {
        const config={
            headers:{
                "Content-Type":"multipart/form-data",
            }
        }

        const {data} = await axios.post("/api/v1/addProduct",productData,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product creation failed");
    }

})


export const deleteProduct = createAsyncThunk("admin/deleteProduct",async (productId,{rejectWithValue})=>{
    try {
        const {data} = await axios.delete(`/api/v1/deleteProduct/${productId}`);
        return {productId};

    } catch (error) {
        return rejectWithValue(error.response?.data || "Product Deletion failed");
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
        product:{},
        deleting:{},

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

        builder.addCase(createProduct.pending,(state)=>{
          state.loading=true;
          state.success=false;
          state.error=null;
        }).addCase(createProduct.fulfilled,(state,action)=>{
          state.loading=false;
          state.error=null;
          state.success=action.payload.success;
          state.product= action.payload.product;

        }).addCase(createProduct.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.payload?.message || "Product creation failed";
        })


        builder.addCase(deleteProduct.pending,(state,action)=>{
          const productId = action.meta.arg;
          state.deleting[productId]=true;
        }).addCase(deleteProduct.fulfilled,(state,action)=>{
          const productId = action.payload.productId;
           state.deleting[productId]=false;
          state.products = state.products.filter((product)=>product._id !== productId);

        }).addCase(deleteProduct.rejected,(state,action)=>{
          const productId = action.meta.arg;
          state.deleting[productId]=false;
          state.error=action.payload?.message || "Product deletion failed";
        })

    }

})

export const {removeErrors,removeSuccess,clearMessage} = adminSlice.actions;
export default adminSlice.reducer;