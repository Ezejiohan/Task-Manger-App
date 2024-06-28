const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  name: {
    type: String,
    required: [true, 'must provide a name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
