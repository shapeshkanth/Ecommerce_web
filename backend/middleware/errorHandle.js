import ErrorHandler from "../helper/ErrorHandler.js"

const errorHandle = (err,req,res,next) =>{

    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

if(err.code === 11000)
{
    //console.log(err.keyValue)
    //console.log(Object.keys(err.keyValue))
    const message = `This ${Object.keys(err.keyValue)} is already registered `
    err = new ErrorHandler(400,message)
}


    return res.status(err.statusCode).json({
        success : false,
        message : err.message
    })

}

export default errorHandle