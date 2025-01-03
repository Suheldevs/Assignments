const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    assignBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type:String,
        enum:['pending','in-progress','completed'],
        default:'pending'
    },
    assingTo: [{ type: String, Required: true }]
})
const taskModel = new mongoose.model('task', taskSchema)

module.exports = taskModel