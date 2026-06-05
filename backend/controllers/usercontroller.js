import ErrorHandler from "../helper/ErrorHandler.js"
import User from "../models/userModel.js"
import { sendToken } from "../helper/jwtToken.js"
import { sendEmail } from "../helper/sendEmail.js"
import crypto from "crypto"
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

export const logout = (req,res)=>{
  res.cookie("token",null,{
    expires : new Date(Date.now()),
    httpOnly : true
  })
  res.status(200).json({success : true, meaage : "successfuly logged out"})
  
}

export const forgetPassword = async (req,res,next)=>{
const { email } = req.body

const user = await User.findOne({email})
if(!user)
{
  return next(new ErrorHandler(400,"Invalid email, Please enter valid email"))
}

let resetTkn
try {
  resetTkn = user.resetPassToken()
  await user.save()
} catch (error) {
  return next(new ErrorHandler(500,"Please try again later"))
}

const resetPasswordURL = `${req.protocol}://${req.host}/reset/${resetTkn}`

const textMessage = `Reset Password link ${resetPasswordURL}`
//console.log(textMessage)
const subject = "Password Reset Request"

try {
  await sendEmail({email:user.email,subject:subject,message:textMessage})
} catch (error) {
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save({validateBeforeSave : false})

  return next(new ErrorHandler(500,"Email could not be send Try again"))
 
   }
}