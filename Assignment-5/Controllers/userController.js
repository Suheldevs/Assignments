const users = require('../Models/userModel');

// User Registration
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, gender, hobbies, mobileNumber, city, Dob, address } = req.body;
        if(!firstName || !lastName || !email || !password || !gender || !hobbies || !mobileNumber || !city || !Dob || !address){
            return res.json({message:'All field is required'})
        }
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new users({
            firstName,
            lastName,
            email,
            password,
            gender,
            hobbies,
            mobileNumber,
            city,
            Dob,
            address
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};
// User Registration by query
const registerUserByQuery = async (req, res) => {
    try {
        const query = req.query
        if(!query.email){
            return res.json({message:'email is required for registation'})
        }
        const existingUser = await users.findOne({email:query.email});
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new users(
            query
);
        const userData = await newUser.save();
        res.status(201).json({ message: 'User registered successfully',userData});
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};


// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const user = await users.find({isDeleted:false}); 
        res.status(200).json({message:'Successfully users get',user});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

//serch by query 

const getUsersByQuery = async (req, res) => {
    try {
        const query = req.query; 
        // console.log(Object.keys(query))
        // console.log(query)
        const user = await users.find({ ...query, isDeleted: false });
        if (user.length === 0) {
            return res.status(404).json({ message: 'No users found matching the query.' });
        }
        res.status(200).json({message:'successfully get',user});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

//update user

const updateUserByQuery = async (req, res) => {
    try {
        const {id} = req.params
        const query = req.query;
        console.log(query)
        const userExists  = await users.findById(id)
        if(!userExists){
            return res.status(404).json({ message: 'No users found matching this Id' });
        }
        const updatedUser  = await users.findByIdAndUpdate(id, query,{new:true});

        res.status(200).json({message:'successfully updated',user:updatedUser});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};
//update user

const deleteUserByQuery = async (req, res) => {
    try {
        const {id} = req.params
        const userExists  = await users.findById(id)
        if(!userExists){
            return res.status(404).json({ message: 'No users found matching this Id' });
        }
        const deletedUser  = await users.findByIdAndDelete(id);
        res.status(200).json({message:'successfully Deleted',user:deletedUser});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

module.exports = { registerUser ,getAllUsers,getUsersByQuery,updateUserByQuery,registerUserByQuery ,deleteUserByQuery};
