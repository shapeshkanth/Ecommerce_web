class ErrorHandler extends Error{
    constructor(statusCode,errorMessage){
        super(errorMessage);
        this.statusCode = statusCode;
        Error.captureStackTrace(this,ErrorHandler)

    }
}

export default ErrorHandler