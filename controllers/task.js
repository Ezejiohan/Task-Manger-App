const Task = require('../models/Task');

// const getAllTask = (req, res) => {
//     res.send('get all task')
// }

const createTask = async (req, res) => {
    console.log(req.body)
    const task = await Task.create(req.body)
    res.status(201).json({ task })
}

/*const getTask = (req, res) => {
    res.json({id: req.params.id})
}
 
const updateTask = (req, res) => {
    res.send('Update task')
}

const deleteTask = (req, res) => {
    res.send('delete task')
}*/


module.exports = {
    // getAllTask, 
    createTask, 
    // getTask, 
    // updateTask, 
    // deleteTask
} 