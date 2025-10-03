const express= require('express')
const transcribeRoute= require('./routes/transcribe.routes')
const cors = require("cors")
const dotenv=require("dotenv")

dotenv.config();

const app=express()
const PORT=process.env.PORT
const allowedOrigin = [
    process.env.FRONTEND_URL_1, 
    process.env.FRONTEND_URL_2
]
app.use(
    cors({ 
        origin:allowedOrigin,
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
)

app.get('/',(req,res)=>{
    res.status(200).json({'message':'server is running'})
})


app.use('/api/v1/transcribe',transcribeRoute)

app.listen(PORT,()=>{
    console.log("server is running")
})