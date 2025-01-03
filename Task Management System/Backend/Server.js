const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const cors = require('cors')
app.use(cors(
    {
        origin:'https://taskmaster-suhel1.netlify.app',
        credentials:true
    }
))
app.use(express.json())
const cookieParser = require('cookie-parser')
app.use(cookieParser())


//routes

const userRoutes = require('./routes/userRoute')
app.use('/',userRoutes);

const taskRoutes = require('./routes/taskRoute')
app.use('/task',taskRoutes);


const backendUrl = process.env.BACKEND_URL
const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

mongoose.connect(backendUrl).then(()=>console.log('Db connected!')).catch((err)=>{console.log(err)})