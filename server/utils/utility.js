class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message),
        this.status = statusCode
    }
}

export {ErrorHandler}