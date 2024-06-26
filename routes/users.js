const express = require('express');
const { createUser } = require('../controllers/user');

const userRoute = express.Router();
// userRoute.get('/', (req, res) => {
//     res.send('Task-Manager')
// })

userRoute.post('/users', (createUser));


module.exports = { userRoute }