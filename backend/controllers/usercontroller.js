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