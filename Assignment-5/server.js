const mongoose = require('mongoose')
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
app.use(express.json())
const mongodbUrl = process.env.MONGODB_URL
const port = process.env.PORT


const userRouter = require('./Routers/userRouter')
app.use('/', userRouter)

app.get('/', (req, res) => {
    res.send(
        '<div align="center" style="color:black;"><h1 style="color:red;">Welcome to MERN Assignment5 - Mohd Suhel</h1><h3>Every thing is query base</h3> <p>For user register use- /register?fields &nbsp;  *email is required</p>For user update use- /update/user_id?fields <p><p>For user delete user- /delete/user_id</p></p></div>');
});

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})
mongoose.connect(mongodbUrl).then(() => console.log('Db connected')).catch((err) => console.log('db not connected', err))