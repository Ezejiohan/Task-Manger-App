const express = require('express');
const { getAllTask, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask, 
    editTask
} = require('../controllers/task');

const route = express.Router();

route.get('/tasks', (getAllTask)); 
route.post('/tasks', createTask);
route.get('/tasks/:id', (getTask));
route.patch('/tasks/:id', (updateTask));
route.delete('/tasks/:id', (deleteTask));
route.put('/tasks/:id', (editTask));

module.exports = { route };