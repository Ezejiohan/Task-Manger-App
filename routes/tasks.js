const express = require('express');
const { getAllTask, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask 
} = require('../controllers/task');

const route = express.Router();


// route.get('/api/tasks', (getAllTask)); 
route.post('/tasks', createTask);
// route.get('/api/tasks/:id', (getTask));
// route.patch('/api/tasks/:id', (updateTask));
// route.delete('/api/tasks/:id', (deleteTask));

module.exports = { route };