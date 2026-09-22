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
export const adminGetUsers = createAsyncThunk("admin/Users",async (page=1,{rejectWithValue})=>{
try {
    const {data} = await axios.get(`/api/v1/admin/user?page=${page}`);
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
//create product
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
//Update product

export const updateProduct = createAsyncThunk("admin/update/product",async ({id,formData},{rejectWithValue})=>{
    try {
        const config={
            headers:{
                "Content-Type":"multipart/form-data",
            }
        }

        const {data} = await axios.put(`/api/v1/updateProduct/${id}`,formData,config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product update failed ....");
         
    }

})

//delete product

export const deleteProduct = createAsyncThunk("admin/deleteProduct",async (productId,{rejectWithValue})=>{
    try {
        const {data} = await axios.delete(`/api/v1/deleteProduct/${productId}`);
        return {productId};

    } catch (error) {
        return rejectWithValue(error.response?.data || "Product Deletion failed");
    }
})
//delete user
export const deleteUser = createAsyncThunk("admin/deleteUser",async (UserId,{rejectWithValue})=>{
    try {
        const {data} = await axios.delete(`/api/v1/admin/deleteUser/${UserId}`);
        return data;

    } catch (error) {
        return rejectWithValue(error.response?.data || "User Deletion failed");
    }
})

//update user role

export const updateUserRole = createAsyncThunk("admin/updateUser",async ({UserId,role},{rejectWithValue})=>{
    try {
        const {data} = await axios.put(`/api/v1/admin/userRole/${UserId}`,{ role });
        return data;

    } catch (error) {
        return rejectWithValue(error.response?.data || "User UpdateRole failed");
    }
})

//all orders
export const allOrders = createAsyncThunk("admin/Orders",async (page=1,{rejectWithValue})=>{
try {
    const {data} = await axios.get(`/api/v1/admin/allOrders?page=${page}`);
    return data;
} catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch all orders by admin.")
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
        userCount: 0,
        userResultPerPage: 0,
        userTotalPages: 0,
        outOfStock:0,
        reviews:[],
        product:{},
        deleting:{},
        deletingUsers: {},
        user:null,
        orderResultPerPage:5,
        orderTotalPages:0,


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
           state.users=action.payload.user;
           state.userCount = action.payload.TotalUsers;
           state.userResultPerPage = action.payload.perPage;
           state.userTotalPages = action.payload.TotalPages;
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

         builder.addCase(updateProduct.pending,(state)=>{
          state.loading=true;
          state.error=null;
        }).addCase(updateProduct.fulfilled,(state,action)=>{
          state.loading=false;
          state.error=null;
          state.success=action.payload.success;
          state.product= action.payload.product_Details;

        }).addCase(updateProduct.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.payload?.message || "Product update failed";
        })
        
        
        builder.addCase(deleteUser.pending,(state,action)=>{
         const userId = action.meta.arg;
         state.deletingUsers[userId] = true;
        }).addCase(deleteUser.fulfilled,(state,action)=>{
         const userId = action.payload.userId;
         state.deletingUsers[userId] = false;
         state.users = state.users.filter(
              (user) => user._id !== userId
          );
         state.message = action.payload.message;

        }).addCase(deleteUser.rejected,(state,action)=>{
          const userId = action.meta.arg;
          state.deletingUsers[userId] = false;     
          state.error=action.payload?.message || "User deletion failed";
        })

         builder.addCase(updateUserRole.pending,(state)=>{
          state.loading=true;
          state.error=null;
         
        }).addCase(updateUserRole.fulfilled,(state,action)=>{
          state.loading=false;
          state.error=null;
          state.success=action.payload.success;
          state.user=action.payload.user;

        }).addCase(updateUserRole.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.payload?.message || "UserRole update failed";
        })
        
        builder.addCase(allOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.success=false;

        }).addCase(allOrders.fulfilled,(state,action)=>{
           state.error=null;
           state.loading=false;
           state.orders=action.payload.orders;
           state.orderResultPerPage = action.payload.perPage;
           state.orderTotalPages = action.payload.TotalPages;
        }).addCase(allOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || "Failed to fetch all orders by admin.";
        })

    }

})

export const {removeErrors,removeSuccess,clearMessage} = adminSlice.actions;
export default adminSlice.reducer;