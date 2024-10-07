import express from 'express'
import userRoutes from './user.js'
import chatRoutes from './chat.js'
import requestRoutes from './request.js'

const app = express.Router()

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)
app.use('/request', requestRoutes)

export default app