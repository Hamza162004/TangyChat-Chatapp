import express from 'express'
import { connectMongoDB } from './utils/features.js';
import { defaultError } from './middlewares/error.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './config.js';
import routes from './routes/route.js'


connectMongoDB(config.mongoUri)
const app = express();
const port = config.port || 4000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials : true
}))
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/',routes)


app.use(defaultError)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})