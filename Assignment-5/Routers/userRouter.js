const express = require('express');
const { registerUser,getAllUsers ,getUsersByQuery,updateUserByQuery,registerUserByQuery,deleteUserByQuery} = require('../Controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.get('/register', registerUserByQuery);
router.get('/get/all', getAllUsers);
router.get('/get', getUsersByQuery);
router.get('/update/:id', updateUserByQuery);
router.get('/delete/:id', deleteUserByQuery);

module.exports = router;
