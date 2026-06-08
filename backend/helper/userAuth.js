import ErrorHandler from "./ErrorHandler.js"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js" 

export const verifytoken = async  (req,res,next)=>{
    const  { token }  = req.cookies
    //console.log(token)
   if(!token)
   {
    return next(new ErrorHandler(401,"Please login to access this resource"))
   }

   const decodeData = jwt.verify(token,process.env.SECRET_KEY)
   //console.log(decodeData)
   req.user = await User.findById(decodeData.id)
   next()
}

export const roleBasedAccess = (...roles)=>{

    return (req,res,next)=>{
         const role = req.user.role
        if(!roles.includes(role))
        {
           return next(new ErrorHandler(403, `Role ${role} is not allowed to access this resource`))
        }
        next()
    }

}