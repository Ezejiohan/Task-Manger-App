const express = require('express');
const { createUser, loginUser } = require('../controllers/user');

const userRoute = express.Router();
// userRoute.get('/', (req, res) => {
//     res.send('Task-Manager')
// })

userRoute.post('/users', (createUser));
userRoute.post('/users', (loginUser));

module.exports = { userRoute }