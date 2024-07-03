const express = require('express');
const { createComment, editComment } = require('../controllers/comment');
const { authMiddleware } = require('../middleware/authMiddleware');

const commentRoute = express.Router();

commentRoute.post('/comments', authMiddleware, (createComment));
commentRoute.patch('/comments/:id', authMiddleware, (editComment));


module.exports = {commentRoute}