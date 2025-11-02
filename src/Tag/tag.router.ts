import express from "express"
import { TagController } from "./tag.controller"
import { Router } from "express"

export const TagRouter = Router()

TagRouter.get('/posts/:id', TagController.getTagById)
TagRouter.get('/posts', TagController.getAllTags)