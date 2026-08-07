import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Register
export const register = createAsyncThunk("user/register",async (userDate,{rejectWithValue})=>{
try {

    const config = {
        headers:{
            "Content-Type" : "multipart/form-data"
        },
    };
     const { data } = await axios.post("/api/v1/adduser",userDate,config)

     return data

} catch (error) {
    return rejectWithValue(error.response?.data || "Registration faild. Please try agin")
}
}) 
//Get Profile
export const getProfile = createAsyncThunk("user/profile",async (_,{rejectWithValue})=>{

  try {
    
    const {data} =await axios.get("/api/v1/profile");
    return data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to load user profile")
  }
})
//Login
export const login =createAsyncThunk("user/login",async ({email,password},{rejectWithValue})=>{

  try {

    const config={
      headers:{
        "Content-type":"application/json"
      }
    }
    const { data } = await axios.post("/api/v1/loginUser",{ email,password },config);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.message || "Login failed Please try again..")
    
  }
})

//Logout
export const logout =createAsyncThunk("user/logout",async (_,{rejectWithValue})=>{
  try {
    const { data } = await axios.post("/api/v1/logout");
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.message || "Logout Failed");
  }

})

//update profile
export const updateProfile = createAsyncThunk("user/profile/update",async(userData,{rejectWithValue})=>{

  try {
    const config={
          headers:{
        "Content-Type":"multipart/form-data"
        }
    }
    const { data } = await axios.put("/api/v1/profile/update",userData,config)

   return data;
    
  } catch (error) {
    
    return rejectWithValue(error.response?.data || "Profile update failed.")
  }

})

//update password
export const updatePassword = createAsyncThunk("user/password/update",async (userPassword,{rejectWithValue})=>{

  try {
    const config={
      headers:{
        "Content-Type":"application/json"
      }
    }
    const {data}=await axios.put("/api/v1/password/update",userPassword,config);
    return data;
    
  } catch (error) {
    return rejectWithValue(error.response?.data || "Password update failed")
  }
}) 

//Forget password
export const forgetPassword = createAsyncThunk("Forget/password",async ({email},{rejectWithValue})=>{

  try {
    config={
      headers:{
        "Content-Type":"application/json"
      }
    }
    const {data}=await axios.post("/api/v1/forgetPassword",{email},config);
    return data;

  } catch (error) {
    return rejectWithValue(error.response?.data || "Forget password failed")
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
        state.success=false
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
        state.isAuthenticated = Boolean(action.payload?.user);
        state.user = action.payload?.user || null;

        localStorage.setItem("user",JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated",JSON.stringify(state.isAuthenticated));
        
     }).addCase(getProfile.rejected,(state,action)=>{
       state.loading=false;
       state.error=action.payload?.message || "Failed to load user profile";
       state.user=null;
       state.isAuthenticated=false;

       if(action.payload?.statusCode===401)
       {
     
          state.isAuthenticated=false;
          state.user=null;
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");

       }
     })

     builder.addCase(login.pending,(state)=>{
      state.loading=true;
      state.error=null;
     }).addCase(login.fulfilled,(state,action)=>{
      state.loading=false;
      state.error=null;
      state.user=action.payload?.user || null;
      state.success = action.payload.success;
      state.isAuthenticated = Boolean(action.payload?.user);


      localStorage.setItem("user",JSON.stringify(state.user));
      localStorage.setItem("isAuthenticated",JSON.stringify(state.isAuthenticated))

     }).addCase(login.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload?.message || "Login failed Please try again..";
      state.user=null;
      state.isAuthenticated = false;
     
     })

     builder.addCase(logout.pending,(state)=>{
      state.loading=true;
      state.error=null;

     }).addCase(logout.fulfilled,(state,action)=>{
      state.error=null;
      state.loading=false;
      state.user=null;
      state.success=false;
      state.isAuthenticated=false;
    
      localStorage.removeItem("user")
      localStorage.removeItem("isAuthenticated")


     }).addCase(logout.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload?.message || "Logout failed"

     })

     builder.addCase(updateProfile.pending,(state)=>{
      state.loading=true;
      state.error=null;

     }).addCase(updateProfile.fulfilled,(state,action)=>{
      state.error=null;
      state.loading=false;
      state.success=action.payload.success;
      state.user=action.payload?.user || state.user;
      localStorage.setItem("user",JSON.stringify(state.user));

     }).addCase(updateProfile.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload?.message || "Profile update failed";

     })

     builder.addCase(updatePassword.pending,(state)=>{
         state.loading=true;
         state.error=null;
     }).addCase(updatePassword.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.success=action.payload.success;

     }).addCase(updatePassword.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Password update failed";
  
     })

     builder.addCase(forgetPassword.pending,(state)=>{
       state.loading=true;
       state.error=null;
     }).addCase(forgetPassword.fulfilled,(state,action)=>{
       state.loading=false;
       state.error=null;
       state.success=action.payload.success;
       state.message=action.payload.message;

     }).addCase(forgetPassword.rejected,(state,action)=>{
       state.loading=false;
       state.error=action.payload?.message || "Forget password failed";
     })
    }

    

})

export const {removeErrors, removeSuccess} = userSlice.actions
export default userSlice.reducer