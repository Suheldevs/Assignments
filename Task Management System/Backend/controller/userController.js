const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const addUser  = async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:'all filed is required'})
        }
        const pass = bcrypt.hashSync(password,8)
        const newUser = new User({
            username,
            email,
            password:pass
        })
        const userData = await newUser.save();
        const {password:pss, ...rest} = userData._doc
        res.status(200).json({message:'Sign in successfully',user:rest})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'internal server error',err})
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:'all filed is required'})
        }
        const existedUser = await User.findOne({email})
        if(!existedUser){
            return res.status(400).json({message:'User not found'})
        } 
        const decodedPass = bcrypt.compareSync(password,existedUser.password)
        if(!decodedPass){
            return res.status(400).json({message:'Invalid credentials'})
        }
        const {password:pss,...rest} = existedUser._doc
        const token = jwt.sign({rest},'Suhel',{expiresIn:'5m'})
        res.status(201).cookie('token',token,{httpOnly:false,secure:true,sameSite: "none",maxAge:300000}).json({message:'Login successfull',rest})
    }
    catch(err){
        res.status(500).json({message:'internal servar error',err})
    }
}

module.exports ={addUser,login}