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
            const authorization = req.headers.authorization
            if(!authorization){
                res.status(401).json({message:"There is no authorization!"})
                return
            }
            const [type, token] = authorization.split(' ')
            if(!type || type != 'Bearer' || !token){
                res.status(401).json({message:'Authorization is invalid!'})
                return
            }
            const payload = verify(token, ENV.JWT_ACCESS_SECRET_KEY) 
            if(typeof(payload) == 'string'){
                res.status(401).json({message: "Error with token, try again"})
                return
            }
         
    }catch (error) {
            if (error instanceof Error) {
                if (error.message === 'NOT_FOUND') {
                    res.status(404).json({ message: "User not found!" })
                    return
                }
            }
            res.status(500).json({ message: 'Server error. Try again later' })

        }  

    }
}