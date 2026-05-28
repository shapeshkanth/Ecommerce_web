import ErrorHandler from "../helper/ErrorHandler.js"
import User from "../models/userModel.js"
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
 const jwttoken = newUser.getjwtToken()
 return res.json({success : true, message : "user added",newUser,jwttoken})
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
res.json({
  success : true,
  user
})

}