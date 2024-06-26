const User = require('../models/User');
const asyncWrapper = require('../middleware/async');

const createUser = asyncWrapper( async (req, res) => {
    const user = await User.create(req.body)
    res.status(201).json({ user })
});

module.exports = {
    createUser
}