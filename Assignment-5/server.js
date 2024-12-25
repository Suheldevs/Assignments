const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const app = express()
const dotenv = require('dotenv')
const ejs = require('ejs')
dotenv.config();
app.use(express.json())
const mongodbUrl = process.env.MONGODB_URL
const port = process.env.PORT

app.set('view engine','ejs')
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const userRouter = require('./Routers/userRouter')
app.use('/users', userRouter)


app.get('/', (req, res) => {
    res.send(
        '<div align="center" style="color:black;"><h1 style="color:red;marginTop:30px;">Welcome to MERN Assignment5 - Mohd Suhel</h1><h3>Every thing is query base</h3><p>For users data use- /users/get/all </p> <p>For user register use- /users/register?fields &nbsp;  *email is required</p>For user update use- /users/update/user_id?fields <p><p>For user delete user- /users/delete/user_id</p></p><p><a href="https://github.com/Suheldevs/Assignments">Code</a></p><p>For user update profile pic user- /users/profilepic/update</p></div>');
});

app.get('/users/profilepic',(req,res)=>{
    res.render('profile')
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})
mongoose.connect(mongodbUrl).then(() => console.log('Db connected')).catch((err) => console.log('db not connected', err))