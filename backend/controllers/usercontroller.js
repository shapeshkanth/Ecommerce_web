export const createUser = (req,res)=>{
 console.log(req.body)
 return res.json({success : true, message : "user added"})
}