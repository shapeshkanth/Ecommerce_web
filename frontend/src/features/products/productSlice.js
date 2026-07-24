import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
export const getProduct = createAsyncThunk("product/getProduct", async ({keyword,page=1},{ rejectWithValue })=>{
    try {
        const link = keyword? `/api/v1/allproduct?keyword=${encodeURIComponent(keyword)}&page=${page}` : `/api/v1/allproduct?page=${page}`
        const { data }= await axios.get(link)
        return data

        
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong.")
    }
})

export const getProductDetails = createAsyncThunk("product/productDetails", async (id, {rejectWithValue})=>{
try {
    const link = `/api/v1/singleProduct/${id}`;
    const { data } = await axios.get(link);
    return data
} catch (error) {
    return rejectWithValue(error.response?.data || "Something went wrong")
}
})

const productSlice = createSlice({
   name : "product",
   initialState:{
    products:[],
    Totalproduct:null,
    product:null,
    perPage:4,
    TotalPages:0,
    loading:false,
    error :null
   },
   reducers:{
    removeErrors: (state)=>{
      state.error = null
    }
   },
   extraReducers:(builder) =>{
       builder.addCase(getProduct.pending,(state)=>{
            state.loading = false,
            state.error = null
       }).addCase(getProduct.fulfilled,(state,action)=>{
         console.log("Fullfilled action payload", action.payload)
            state.loading = false,
            state.error = null,
            state.products = action.payload.products
            state.Totalproduct = action.payload.Totalproduct
            state.TotalPages = action.payload.TotalPages
            state.perPage = action.payload.perPage
         
       }).addCase(getProduct.rejected, (state,action)=>{
           state.loading = false,
           state.products = []
           state.error = action.payload || "Something went wrong.."
       })

       builder.addCase(getProductDetails.pending,(state)=>{
          state.loding=true;
          state.error = null;
       }).addCase(getProductDetails.fulfilled,(state,action)=>{
          state.loading = false;
          state.error = null;
          state.product = action.payload.singleproduct
       }).addCase(getProductDetails.rejected,(state,action)=>{
          state.loding=false;
          state.error = action.payload || "Something went wrong.."
       })
   }
}
 
);
export const { removeErrors } = productSlice.actions;
export default productSlice.reducer