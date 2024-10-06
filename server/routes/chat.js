import express from 'express'
import { isLoggedIn } from '../middlewares/auth.js'
import { addGroupMember, createGroup, getGroupChats, getMyChats } from '../controllers/chat.js';


const app = express.Router()

app.use(isLoggedIn);
app.post('/createGroup',createGroup)
app.get('/getMyChats',getMyChats)
app.get('/getGroupChats',getGroupChats)
app.put('/addGroupMember',addGroupMember)


export default app