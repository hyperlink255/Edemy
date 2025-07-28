import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import { clerkWebhooks } from './controllers/Webhooks.js'

const app = express()

//Middlewares
app.use(cors())

//Routes
app.get('/', (req,res) => res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhooks)

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is Runnig on port ${PORT}`)
})
