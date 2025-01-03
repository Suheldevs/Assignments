const express = require('express')
const {login,addUser} = require('../controller/userController')
const router = express.Router()

router.post('/addUser',addUser)
router.post('/login',login)

module.exports = router