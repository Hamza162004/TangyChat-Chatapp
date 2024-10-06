import express from 'express'
import userRoutes from './user.js'
import chatRoutes from './chat.js'

const app = express.Router()

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)

export default app