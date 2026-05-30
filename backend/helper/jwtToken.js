export const sendToken = (user,statuscode,res)=>{
const jwttoken = user.getjwtToken()
 return res.status(statuscode).cookie("token",jwttoken,{
    expires : new Date(Date.now()+process.env.EXPIRE_COOKIE*24*60*60*1000),
    httpOnly : true,
    secure : true

 }).json({
    success : true,
     user,
   // jwttoken
})
}
