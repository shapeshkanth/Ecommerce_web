export const sendToken = (user,statuscode,res)=>{
const jwttoken = user.getjwtToken()
 return res.status(statuscode).json({
    success : true,
    user,
    jwttoken
})
}
