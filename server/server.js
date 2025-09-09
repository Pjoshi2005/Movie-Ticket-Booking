import express from 'express'
import "dotenv/config"
import cors from 'cors'
import connectDb from './config/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"


const app = express()
const PORT = process.env.PORT || 5000




app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

app.get("/" , (req , res) => {
    res.send('Server is live')
});
app.use("/api/inngest", serve({ client: inngest, functions }));

await connectDb()

app.listen(PORT , () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})


