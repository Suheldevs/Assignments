const express = require('express')
const {addTask,getTask,getYourTask} = require('../controller/taskController')
const {verifyToken,roleCheck} = require('../middleware/tokenverify')
const router = express.Router()

router.post('/addtask',verifyToken,roleCheck(['admin']),addTask)
router.get('/getall',verifyToken,roleCheck(['admin']),getTask)
router.post('/get',verifyToken,roleCheck(['user']),getYourTask)

module.exports = router