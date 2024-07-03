const express = require('express');
const { createComment, editComment, getAllComment, getComment, deleteComment } = require('../controllers/comment');
const { authMiddleware } = require('../middleware/authMiddleware');

const commentRoute = express.Router();

commentRoute.post('/comments', authMiddleware, (createComment));
commentRoute.patch('/comments/:id', authMiddleware, (editComment));
commentRoute.get('/comments/', authMiddleware, (getAllComment));
commentRoute.get('/comments/:id', authMiddleware, (getComment));
commentRoute.delete('/comments/:id', authMiddleware, (deleteComment));

module.exports = {commentRoute}