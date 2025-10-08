const express = require('express');
const PostController = require('./post.controller')

const PostRouter = express.Router()

PostRouter.get('/posts/:id', PostController.getPostById)
PostRouter.get('/products', PostController.getAllPosts)
PostRouter.post('/products', PostController.createPost)

module.exports = PostRouter;