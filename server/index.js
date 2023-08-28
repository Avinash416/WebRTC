import express from  "express"
import cors from "cors"
import Router from './Routes/router.js'
import dotenv from  "dotenv"
import Connection from "./DatabaseConnect/connection.js"
import cookieparser from "cookie-parser"
dotenv.config()
const app=express()
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // This allows cookies and other credentials to be included in the request
  }));
app.use(cookieparser())
app.use(express.json())
app.use("/",Router)

Connection(process.env.URL);

const PORT=5000;

app.listen(PORT,()=>{
    try {
        console.log(`Running Successfully on ${PORT}`)
    } catch (error) {
        console.log("Error",error.massage)
    }
})