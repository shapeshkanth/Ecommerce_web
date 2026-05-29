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

   const decodeDate = jwt.verify(token,process.env.SECRET_KEY)
   //console.log(decodeDate)
   req.user = await User.findById(decodeDate.id)
   next()
}