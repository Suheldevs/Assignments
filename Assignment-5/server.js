const mongoose = require('mongoose')
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
app.use(express.json())
const mongodbUrl = process.env.MONGODB_URL
const port = process.env.PORT


const userRouter =require('./Routers/userRouter')
app.use('/',userRouter)

app.get('/',(req,res)=>{
    res.sent('<h1>Wellcome to MERN assignment-5   -Mohd Suhel</h1>')
})
app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})
mongoose.connect(mongodbUrl).then(() => console.log('Db connected')).catch((err) => console.log('db not connected', err))