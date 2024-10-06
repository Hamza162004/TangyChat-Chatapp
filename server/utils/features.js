import mongoose from "mongoose"

const connectMongoDB = (uri)=>{
    mongoose.connect(uri,{dbName:'TangyChat'})
    .then((data)=> console.log(`Connected to DB ${data.connection.host}`))
    .catch((err)=>{
        throw err;
    })
}

export {connectMongoDB};