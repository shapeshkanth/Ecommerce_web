import mongoose from "mongoose"
import validator from "validator"

const userModel = new mongoose.Schema({
name : {
    type : String,
    required : [true, "Please enter your name"]
},
email : {
    type : String,
    required : [true, "Please enter your email"],
    unique : true,
    validate : [validator.isEmail, "Please enter valid email"]
},
password : {
    type : String,
    required : [true , "Please Enter your password"],
    minlength : [8 ,  "password should be greater than 8 characters"],
    select : false
},
avatar :{
    public_id : {
        type : String,
        required : true
        },
    url : {
        type : String,
        required : true
            }
},
role : {
    type : String,
    default : "user"
},
resetPasswordToken : String,
resetPasswordExpire : Date

},
{
timestamps : true
})

export default mongoose.model("User",userModel)