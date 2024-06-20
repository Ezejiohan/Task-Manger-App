const express = require('express');
const route = express.Router();

const { getAllTask, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask 
} = require('../controllers/task');

route.get('/api/tasks', (getAllTask)); 
route.post('/api/tasks', (createTask));
route.get('/api/tasks/:id', (getTask));
route.patch('/api/tasks/:id', (updateTask));
route.delete('/api/tasks/:id', (deleteTask));

module.exports = route;