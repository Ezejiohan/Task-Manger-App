const Comment = require('../models/comment');
const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom_error');

const createComment = asyncWrapper(async(req, res) => {
    const {comments} =  req.body;
    const { id:taskID } = req.params;
    const task = await Task.findById({_id:taskID});
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    const comment = await Comment.create({
        comments,
        user: userId,
        task: taskID
    });
    res.status(201).json({comment});
});

const editComment = asyncWrapper(async(req, res) => {
    const { id:commentID} = req.params;
    const comment = await Comment.findById({_id:commentID})
    if (!comment) {
        return next(createCustomError(`No comment with id : ${commentID}`, 404))  
    }
    const user = req.user;
    if (comment.user === true) {
        return next(createCustomError(`You are not authorised to edit comment`, 404)); 
    }
    const editedComment = await Comment.findByIdAndUpdate({ _id:commentID}, req.body, {
        new: true,
        runValidators: true, 
    });
    res.status(200).json({editedComment});
    await comment.save();
});

const getAllComment = asyncWrapper(async(req,res) => {
    const {id:taskID} = req.params;
    const task = await Task.findById({_id:taskID});
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404)); 
    }
    const comments = await Comment.find({});
    res.status(200).json({comments});
});

const getComment = asyncWrapper(async(req, res) => {
    const {id:commentID} = req.params;
    const comment = await Comment.findOne({_id:commentID});
    if (!comment) {
        return next(createCustomError(`no comment with id : ${commentID}`, 404));  
    }
    res.status(200).json({comment})
});

const deleteComment = asyncWrapper(async(req, res) => {
    const {id:commentID} = req.params;
    const comment = await Comment.findOneAndDelete({_id:commentID});
    if (!comment) {
        return next(createCustomError(`no comment with id : ${commentID}`, 404)); 
    }
    const user = req.user;
    if (comment.user === true) {
        return next(createCustomError(`You are not authorised to delete comment`, 404)); 
    }
    res.status(200).json({comment});
})

module.exports = { createComment, 
    editComment,
    getAllComment,
    getComment,
    deleteComment
}