const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncWrapper = require('./async');
const { createCustomError } = require('../errors/custom_error');


const authenticate = asyncWrapper (async (req, res, next) => {
    const hasAuthorization = req.headers.authorization;
    if (!hasAuthorization) {
        return res.status(400).json({
            msg: "Authorization token not found"
        })
    }
    const token = hasAuthorization.split(' ') [1];
    const decodedToken = jwt.verify(token, secretKey);
    const user = await User.findById(decodedToken.id);
    if (!user) {
        return next(createCustomError(`Authorization Failed: User not found`, 404))
    }
    req.user = decodedToken;
    next();
    if (error instanceof jwt.JsonWebTokenError) {
        return res.json({
            msg: 'Session Timeout'
        })
    }
})

module.exports = { authenticate }