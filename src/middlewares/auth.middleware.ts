import{Request, Response, NextFunction} from "express"
import { TokenExpiredError, verify } from "jsonwebtoken"
import { ENV } from "../config/env"

export function authMiddleware(req: Request, res: Response, next: NextFunction){
    
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

    try {
            const payload = verify(token, ENV.JWT_ACCESS_SECRET_KEY) 
            if(typeof(payload) == 'string'){
                res.status(401).json({message: "Error with token, try again"})
                return
            }
            res.locals.userId = payload.id
            next()
    }catch (error) {
            if (error instanceof TokenExpiredError) {
            
                    res.status(401).json({ message: "Token has expired!" })
                    return
                
            }
            res.status(500).json({ message: 'Server error. Try again later' })

        }  
}