import ErrorHandler from "../helper/ErrorHandler.js"
import User from "../models/userModel.js"
import { sendToken } from "../helper/jwtToken.js"

export const createUser = async (req,res)=>{
 //console.log(req.body)
 const {name, email, password} = req.body
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
 sendToken(newUser,201,res)
}

export const userLogin = async (req,res,next)=>{
  const {email,password} = req.body
  
  if(!email || !password)
  {
    return next(new ErrorHandler(400,"Email or password can't be empty"))
  }
  const user = await User.findOne({email}).select("+password")

  if(!user)
  {
    return next(new ErrorHandler(401,"Invalid email or password.."))
  }
  const isvalidpassword = await user.verifyPassword(password)


    if(!isvalidpassword)
   {
    return next(new ErrorHandler(401,"Invalid email or password"))
   }
   sendToken(user,200,res);

}