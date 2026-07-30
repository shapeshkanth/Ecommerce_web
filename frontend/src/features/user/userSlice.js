import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const register = createAsyncThunk("user/register",async (userDate,{rejectWithValue})=>{
try {

    const config = {
        headers:{
            "Content-Type" : "multipart/form-data"
        },
    };
     const { data } = await axios.post("api/v1/adduser",userDate,config)

     return data

} catch (error) {
    return rejectWithValue(error.response?.data || "Registration faild. Please try agin")
}
}) 

export const getProfile = createAsyncThunk("user/profile",async (_,{rejectWithValue})=>{

  try {
    
    const {data} =await axios.get("api/v1/profile");
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to load user profile")
  }
})


const userSlice = createSlice({
    name:"user",
    initialState:{
        user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")) : null,
        loading:false,
        error:null,
        success :false,
        isAuthenticated : localStorage.getItem("isAuthenticated")==="true",
        message:null

    },
    reducers:{
      removeErrors:(state)=>{
        state.error=null
      },
      removeSuccess:(state)=>{
        state.success=null
      }
    },
    extraReducers:(builder)=>{
     builder.addCase(register.pending,(state)=>{
       state.loading=true;
       state.error=null;
     }).addCase(register.fulfilled,(state,action)=>{
       state.error=null;
       state.loading=false;
       state.success=action.payload.success;
       state.user = action.payload?.user || null;
       state.isAuthenticated = Boolean(action.payload?.user);

       localStorage.setItem("user",JSON.stringify(state.user))
       localStorage.setItem("isAuthenticated",JSON.stringify(state.isAuthenticated))

     }).addCase(register.rejected,(state,action)=>{
       state.loading = false;
       state.error = action.payload?.message || "Registration faild. Please try agin";
       state.user = null;
       state.isAuthenticated = false;
     })

     builder.addCase(getProfile.pending,(state)=>{
         state.loading=true;
         state.error=null;
     }).addCase(getProfile.fulfilled,(state,action)=>{
        state.loading=false;
        state.error = null;
        state.isAuthenticated = Boolean(action.payload?.data);
        state.user = action.payload?.user || null;

        localStorage.setItem("user",JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated",JSON.stringify(state.isAuthenticated));
        
     }).addCase(getProfile.rejected,(state,action)=>{
       state.loading=false;
       state.error=action.payload?.message || "Failed to load user profile";
       state.user=null;
       state.isAuthenticated=false;

       if(action.payload?.satatusCode===401)
       {
          
          state.isAuthenticated=false;
          state.user=null;
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");

       }
     })
    }

})

export const {removeErrors, removeSuccess} = userSlice.actions
export default userSlice.reducer