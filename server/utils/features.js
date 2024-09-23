import mongoose from "mongoose"
import jwt from 'jsonwebtoken'

const cookieOption = {
    maxAge : 15 * 24 * 60 * 60 * 1000,
    httpOnly : true,
    sameSite : 'none',
    secure: false
}


const connectMongoDB = (uri)=>{
    mongoose.connect(uri,{dbName:'TangyChat'})
    .then((data)=> console.log(`Connected to DB ${data.connection.host}`))
    .catch((err)=>{
        throw err;
    })
}

const sendToken = (res,user,code,message)=>{
    let token = jwt.sign({_id : user._id},process.env.JWT_SECRET)
    res.status(code).cookie("Tangy-token",token,cookieOption).json({
        success:true,
        message,
    })
}

export {connectMongoDB , sendToken , cookieOption};