import{Request, Response} from "express"
import { UserService } from "./user.service";
import { User, UserControllerContract } from "./user.types"
import { verify } from "jsonwebtoken";
import { ENV } from "../config/env";

export const UserController: UserControllerContract = {
    login: async (req, res) =>{
        try {
            const data = req.body
            const user = await UserService.login(data)
            res.status(200).json({token:user})
        } catch (error) {
             if (error instanceof Error) {
                if (error.message === 'NOT_FOUND') {
                    res.status(404).json({message: "User with this email does not exist!"})
                    return
                } else if (error.message === 'WRONG_CREDENTIALS') {
                    res.status(401).json({message: "User with this email does not exist!"})
                    return
                }
            }
            res.status(500).json({message:'Server error'})
        }
    },
    register: async (req, res) =>{
        try {
            const data = req.body
            const newUser = await UserService.register(data)
            res.status(200).json({token:newUser})
        } catch (error) {
             console.log(error)
            if (error instanceof Error) {
                if (error.message === 'USER_EXISTS') {
                    res.status(409).json({message:"User with this email already exists!"})
                    return
                }
            }
            res.status(500).json({message:'Server error'})
            
        }

    },
    me: async (req, res) =>{
        try {
            res.status(200).json(await UserService.me(res.locals.userId))
        } catch (error) {
            if(error instanceof Error){
                if(error.message = 'NOT_FOUND'){
                    res.status(404).json({message:'User is not found!'})
                }
            }
            res.status(500).json({message:" Server error!"})
        }

    }
}