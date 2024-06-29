const express = require('express');
const { getAllTask, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask, 
    editTask
} = require('../controllers/task');

const {authMiddleware} = require('../middleware/authMiddleware')

const route = express.Router();

route.get('/tasks', (getAllTask)); 
route.post('/tasks', authMiddleware, (createTask));
route.get('/tasks/:id', (getTask));
route.patch('/tasks/:id', (updateTask));
route.delete('/tasks/:id', (deleteTask));
route.put('/tasks/:id', (editTask));

module.exports = { route };