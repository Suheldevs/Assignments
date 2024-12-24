const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    gender:{
        type:String,
    },
    hobbies:{
        type:Array,
    },
    mobileNumber:{
        type:String,
    },
    city:{
        type:String,
    },
    dob:{
        type:String,
    },
    address:{
        type:String,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
});

const users = new mongoose.model('user',userSchema);

module.exports = users