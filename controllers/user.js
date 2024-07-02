const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/async');
const { createCustomError} = require('../errors/custom_error');

const createUsers = asyncWrapper( async (req, res) => {
    const {fullname, email, password } = req.body;
    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, saltPassword)
    
    const user = await User.create({
       fullname,
       email,
       password: hashPassword, 
    })
    res.status(201).json({ user });
});

const loginUsers = asyncWrapper( async (req, res) => {
    const loginRequest = { email:req.body.email,
        password: req.body.password }
    const user = await User.findOne({ email: req.body.email});
    if (!user) {
        return next(createCustomError("User not found", 404))
    } else {
        const correctPassword = await bcrypt.compare(loginRequest.password, user.password);
        if (correctPassword === false) {
            return next(createCustomError('Invaild email or password', 404)) 
        } else {
            const generatedToken = jwt.sign({
                id: user._id,
                email: user.email,
            }, process.env.TOKEN, {expiresIn: '1h'})
            const result = {
                id: user._id,
                email: user.email,
                token: generatedToken
            }
            return res.status(200).json({result});
        }
    }
    
});

const verifyUsers = asyncWrapper( async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(createCustomError("User not found", 404))
    }
    if (user.verified === true) {
        return res.status(400).json({msg: "User already verified"})
    }
    user.verified = true;
    await user.save();
    res.status(200).json({user});
});

const updateUsers = asyncWrapper(async(req, res) => {
    const { id:userID } = req.params;
    const user = await User.findByIdAndUpdate({ _id:userID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(createCustomError("User not found", 404)) 
    }
    res.status(200).json({user});
});

const getUser = asyncWrapper(async (req, res) => {
    const {id:userID} = req.params;
    const user = await User.findOne({ _id:userID});
    if (!user) {
        return next(createCustomError("User not found", 404));   
    }
    res.status(200).json({user});
});

const getAllUsers = asyncWrapper(async(req, res) => {
    const users = await User.find({});
    res.status(200).json({users});
});

const changePassword = asyncWrapper(async(req, res) => {
    const { oldPassword, newPassword } = req.body;
})

module.exports = {
    createUsers,
    loginUsers,
    verifyUsers,
    updateUsers,
    getUser,
    getAllUsers
}