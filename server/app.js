import express from 'express'
import { connectMongoDB } from './utils/features.js';
import { defaultError } from './middlewares/error.js';
import cors from 'cors'
import config from './config.js';
import routes from './routes/route.js'
import {createServer} from 'http'
import { initializeSocket } from './socket.js';


connectMongoDB(config.mongoUri)
const app = express();
const server = createServer(app)
initializeSocket(server)

const port = config.port || 4000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials : true
}))
app.use(express.json())
app.use('/',routes)

app.use(defaultError)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})