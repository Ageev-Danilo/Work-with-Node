
import express from "express"
import { PostController } from "./post.controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

export const PostRouter = Router()

PostRouter.get('/posts/:id', PostController.getPostById)
PostRouter.get('/posts', PostController.getAllPosts)
PostRouter.post('/posts', authMiddleware, PostController.createPost)
PostRouter.patch('/posts/:id', authMiddleware, PostController.updatePost)
PostRouter.delete('/post/:id',authMiddleware, PostController.deletePost)

