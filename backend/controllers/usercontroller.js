import ErrorHandler from "../helper/ErrorHandler.js"
import User from "../models/userModel.js"
import product from "../models/productModel.js"
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

//const textMessage = `Reset Password link ${resetPasswordURL}`
const messageHtml = `<div style="max-width:600px;margin:auto;padding:20px;font-family:Arial,sans-serif;border:1px solid #ddd;border-radius:10px;">
    
    <h2 style="color:#333;text-align:center;">
        Password Reset Request
    </h2>

    <p style="font-size:16px;color:#555;">
        You requested to reset your password.
    </p>

    <div style="text-align:center;margin:30px 0;">
        <a
            href="${resetPasswordURL}"
            style="
                background:#007bff;
                color:white;
                padding:12px 24px;
                text-decoration:none;
                border-radius:5px;
                display:inline-block;
            "
        >
            Reset Password
        </a>
    </div>

    <p style="color:#555;">
        This link will expire in <strong>30 minutes</strong>.
    </p>

    <p style="color:#777;font-size:14px;">
        If you did not request this, please ignore this email.
    </p>

</div>`
//console.log(textMessage)
const subject = "Password Reset Request"

try {
  await sendEmail({email:user.email,subject:subject,htmlMessage:messageHtml})
  res.json({success:true,meaage:"Please check your mail"})
  console.log(resetTkn)
} catch (error) {
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save({validateBeforeSave : false})

  return next(new ErrorHandler(500,"Email could not be send Try again"))
 
   }
}

export const resetPassword = async (req,res,next)=>{
 const  resettoken = req.params.token
 const { password, confirmpassword } = req.body
 const resetPasswordToken = crypto.createHash("sha256").update(resettoken).digest("hex")
//console.log(resetPasswordToken)
  const user = await User.findOne({
  resetPasswordToken,
  resetPasswordExpire : {$gt:Date.now()}
 })
 if(!user)
 {
  return next(new ErrorHandler(400,"Invalid or Reset link expired"))
 }

 if(password!==confirmpassword)
 {
  return next(new ErrorHandler(401,"Password does not match"))
 }
  user.password = password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()
  sendToken(user,200,res);
}

export const profile = async (req,res,next) =>{
  
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success : true,
    user
  })
}
export const updateProfile = async (req,res,next)=>{
  const { name, email } = req.body
  const updatefields = { name, email }
  const user = await User.findByIdAndUpdate(req.user.id,updatefields,{new:true,runValidators:true})
res.status(200).json({
  success:true,
  message:"profile details successfully updated"
})
}

export const updatePassword = async (req,res,next)=>{
  const {oldPassword,newPassword,confirmPassword} = req.body
  const user = await User.findById(req.user.id).select("+password")
  const isCorrect = await user.verifyPassword(oldPassword)
  if(!isCorrect)
  {
    return next(new ErrorHandler(400,"Incorrect Old Password.."))
  }
if(newPassword!==confirmPassword)
  {
    return next(new ErrorHandler(400,"Please check new and confirm password"))
  }
  user.password = newPassword
  await user.save()
  sendToken(user,200,res);
}

export const getAllUser = async (req,res)=>{
  const user = await User.find()
  res.status(200).json({
    success:true,
    user
  })

}

export const getSingleUser = async (req,res,next)=>{
  const id = req.params.id
  const user = await User.findById(id)
  if(!user)
  {
    return next(new ErrorHandler(400,"user doesn't exist"))
  }
  res.status(200).json({
    success:true,
    user
  })
}

export const deleteSingleUser = async (req,res,next)=>{
  const id = req.params.id
  const DeleteObject = await User.findById(id)
  if(!DeleteObject)
  {
    return next(new ErrorHandler(400,"user doesn't exist"))
  }
  await User.findByIdAndDelete(id)
  res.status(200).json({
    success:true,
    message:"user deleted successfully"
  })
}

export const userRoleUpdate = async (req,res,next)=>{
  const  { role } = req.body
  const userRole = { role } 
  const updateUserId = req.params.id
  const user = await User.findByIdAndUpdate(updateUserId,userRole,{new:true})
  if(!user)
  {
    return next(new ErrorHandler(400,"user doesn't exist"))
  }
  res.status(200).json({
    success:true,
    user
  })

}

export const userReview = async (req,res,next)=>{
  const {rating,comment,productId} = req.body
  const review = {
   user:req.user.id,
   name:req.user.name,
   rating:Number(rating),
   comment
  }

  const Product = await product.findById(productId)
  
  if(!Product)
  {
    return next(new ErrorHandler(400,"Product not found"))
  }

  const reviewExists = Product.reviews.find((review)=>review.user.toString() == req.user.id)
  
  if(reviewExists)
  {
   Product.reviews.forEach((review)=>{
    if(review.user.toString()===req.user.id)
    {
     review.rating=Number(rating),
     review.comment=comment
    }
   })

  }else{
    Product.reviews.push(review)
  }
  //add total reviews
  Product.numOfReviews = Product.reviews.length
  //add average rating
  let sum=0
  Product.reviews.forEach((review)=>{
    sum = sum + review.rating
  })
Product.rating = Product.reviews.length > 0 ? (sum/Product.reviews.length).toFixed(2) : 0

await Product.save({validateBeforeSave:false})
res.json({
  success:true,
  Product
})
 
}

export const viewUserReview = async (req,res,next)=>{
  const id = req.params.id
  const user = await product.findById(id)
  if(!user)
  {
    return next(new ErrorHandler(400,"Product doesn't exist"))
  }
  if(!user.reviews)
  {
    return next(new ErrorHandler(400,"Review doesn't exist"))
  }
  const reviews = user.reviews
  res.json({
    success:true,
    reviews
  })
}

export const adminViewAllProduct = async (req,res,next)=>{
  const Product = await product.find()
  if(!Product)
  {
    return next(new ErrorHandler(400,"Product doesn't exits"))
  }
  res.json({
    success :true,
    Product
  })
}

export const deleteUserReview = async (req,res,next)=>{
  const productId = req.query.productID
  const reviewId = req.query.reviewID
  const Product = await product.findById(productId)

  if(!Product)
  {
    return next(new ErrorHandler(400,"Product doesn't exist"))
  }
  if(!Product.reviews)
  {
    return next(new ErrorHandler(400,"reviews doesn't exist"))
  }
  const reviews = Product.reviews.filter((review) => review.id.toString() !== req.query.reviewID)
  
  let sum=0
  reviews.forEach((review)=>{
    sum=sum+review.rating
  })

  const numOfReviews = reviews.length;
  const rating = reviews.length > 0 ? (sum/reviews.length).toFixed(2) : 0 

  console.log(numOfReviews)
  console.log(rating)
  await product.findByIdAndUpdate(productId,{
  reviews,
  rating,
  numOfReviews

  },{
 new:true,
 runValidators:true
  })
res.json({
  success:true,
  message : "user rereview successfully deleted"
})

}