import ErrorHandler from "../helper/ErrorHandler.js"
import User from "../models/userModel.js"
export const createUser = async (req,res,next)=>{
 //console.log(req.body)
 const {name, email, password} = req.body
 if(!name)
 {
   return next(new ErrorHandler(400,"User name can't be empty"));
 }
 if(!email)
 {
   return next(new ErrorHandler(400,"Email can't be empty"));
 }
 if(!password)
 {
   return next(new ErrorHandler(400,"password can't be empty"));
 }


 const newUser = await User.create({
    name,
    email,
    password,
    avatar :{
         public_id :"temp_id" ,
         url : "temp_url"
    },
    role : "admin"
 })
 const jwttoken = newUser.getjwtToken()
 return res.json({success : true, message : "user added",newUser,jwttoken})
}