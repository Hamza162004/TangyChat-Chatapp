import mongoose from "mongoose"

const connectMongoDB = (uri)=>{
    mongoose.connect(uri,{dbName:'TangyChat'})
    .then((data)=> console.log(`Connected to DB ${data.connection.host}`))
    .catch((err)=>{
        throw err;
    })
}

const emitEvent=(req,event,members,message)=>{
    console.log(event)
}

export {connectMongoDB , emitEvent};