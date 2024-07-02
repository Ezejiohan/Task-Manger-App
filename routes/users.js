const express = require('express');
const { createUsers, 
    loginUsers, 
    verifyUsers, 
    updateUsers, 
    getUser, 
    getAllUsers
} = require('../controllers/user');
const {authMiddleware} = require('../middleware/authMiddleware')

const userRoute = express.Router();
// userRoute.get('/', (req, res) => {
//     res.send('Task-Manager')
// })

userRoute.post('/users', (createUsers));
userRoute.post('/users', (loginUsers));
userRoute.get('/users/:id', (verifyUsers));
userRoute.patch('/users/:id', authMiddleware, (updateUsers));
userRoute.get('/users/:id', authMiddleware, (getUser));
userRoute.get('/users', authMiddleware, (getAllUsers))

module.exports = { userRoute }