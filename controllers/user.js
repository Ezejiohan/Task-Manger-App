const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../middleware/async');
const { createCustomError} = require('../errors/custom_error');

const createUser = asyncWrapper( async (req, res) => {
    const {fullname, email, password } = req.body;
    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, saltPassword)
    
    const user = await User.create({
       fullname,
       email,
       password: hashPassword, 
    })
    res.status(201).json({ user })
});

const loginUser = asyncWrapper( async (req, res) => {
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
            }, secretKey, {expiresIn: '1h'})
        }
    }
    
})

module.exports = {
    createUser,
    loginUser
}