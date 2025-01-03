const Task = require('../model/taskModel')
const addTask  = async(req,res)=>{
    try{
        const {assignBy,title,description,assingTo} = req.body;
        if(!assignBy || !title || !description || !assingTo){
            return res.status(400).json({message:'all filed is required'})
        }
        const newTask = new Task({assignBy,title,description,assingTo})
        const taskData = await newTask.save();
        res.status(200).json({message:'Sign in successfully',taskData})
    }
    catch(err){
        res.status(500).json({message:'internal server error',err})
    }
}

const getTask = async(req,res)=>{
    try{
        const tasks = await Task.find();
        if(tasks.length == 0){
            return res.status(404).json({message:'Task not found'})
        }
        res.status(201).json(tasks)
    }
    catch(err){
        res.status(500).json({message:'Internal serval Error',err})
    }
}
const getYourTask = async(req,res)=>{
    try{
        const {user} = req.body
        const tasks = await Task.find({assingTo:user});
        if(tasks.length == 0){
            return res.status(404).json({message:'Task not found'})
        }
        res.status(201).json(tasks)
    }
    catch(err){
        res.status(500).json({message:'Internal serval Error',err})
    }
}

module.exports = {addTask,getTask,getYourTask}