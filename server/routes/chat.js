import express from 'express'
import { isLoggedIn } from '../middlewares/auth.js'

const app = express.Router()

app.use(isLoggedIn);

export default app