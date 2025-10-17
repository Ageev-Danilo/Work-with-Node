
import express from "express"
import { PostController } from "./post.controller";
import { Router } from "express";

export const PostRouter = Router()

PostRouter.get('/posts/:id', PostController.getPostById)
PostRouter.get('/posts', PostController.getAllPosts)
PostRouter.post('/posts', PostController.createPost)
PostRouter.patch('/posts/:id', PostController.updatePost)
