const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;