const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncWrapper = require('./async');
const { createCustomError } = require('../errors/custom_error');


const authMiddleware = asyncWrapper (async (req, res, next) => {
    const hasAuthorization = req.headers.authorization;
    if (!hasAuthorization) {
        return res.status(400).json({
            msg: "Authorization token not found"
        })
    }
    const token = hasAuthorization.split(' ') [1];
    const decoded = jwt.verify(token, process.env.TOKEN);
    const user = await User.findById(decoded.id);
    if (!user) {
        return next(createCustomError(`Authorization Failed: User not found`, 404))
    }
    req.user = user;
    req.userId = user._id;
    next();
    if (error instanceof jwt.JsonWebTokenError) {
        return res.json({
            msg: 'Session Timeout'
        })
    }
})

module.exports = { authMiddleware }