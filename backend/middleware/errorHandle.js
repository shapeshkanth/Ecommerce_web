const errorHandle = (err,req,res,next) =>{

    err.statuscode = err.statusCode || 500
    err.message = err.message || "Internal server error"


    return res.status(err.statusCode).json({
        success : false,
        message : err.message
    })

}

export default errorHandle