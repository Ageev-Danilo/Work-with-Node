import { authMiddleware } from '../middlewares/auth.middleware'
import { UserController } from './user.controller'
import { Router } from 'express'

export const UserRouter = Router()

UserRouter.post('/users/login', UserController.login)
UserRouter.post('/users/register', UserController.register)
UserRouter.post('users/me', authMiddleware, UserController.me)
