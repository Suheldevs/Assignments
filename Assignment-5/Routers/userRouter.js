const express = require('express');
const { registerUser,getAllUsers ,getUsersByQuery,updateUserByQuery,registerUserByQuery,deleteUserByQuery,fileUploadByQuery} = require('../Controllers/userController');
const upload = require('../config/multer')
const router = express.Router();

router.post('/register', registerUser);
router.get('/register', registerUserByQuery);
router.get('/get/all', getAllUsers);
router.get('/get', getUsersByQuery);
router.get('/update/:id', updateUserByQuery);
router.get('/delete/:id', deleteUserByQuery);
router.post('/profilepic/update', upload.single('profilePic'), fileUploadByQuery);


module.exports = router;
