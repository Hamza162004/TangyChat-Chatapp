import express from 'express'
import { connectMongoDB } from './utils/features.js';
import dotenv from 'dotenv'
import { defaultError } from './middlewares/error.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import userRoutes from './routes/user.js'
import chatRoutes from './routes/chat.js'

dotenv.config({
    path:'./.env'
})

connectMongoDB(process.env.MONGO_URI)
const app = express();
const port = process.env.PORT || 5000
app.use(cors({
  credentials : true
}))
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)


app.use(defaultError)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})