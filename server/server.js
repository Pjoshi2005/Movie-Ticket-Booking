import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

dotenv.config()
console.log("Length:", process.env.INNGEST_SIGNING_KEY.length);
console.log("Ends with:", process.env.INNGEST_SIGNING_KEY.slice(-5));
const app = express()
const PORT = process.env.PORT || 5000



app.use("/api/inngest", serve({ client: inngest, functions }));
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

app.get("/" , (req , res) => {
    res.send('Server is live')
});


await connectDb()

app.listen(PORT , () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})


