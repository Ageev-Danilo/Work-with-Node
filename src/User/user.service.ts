import { User, UserServiceContract } from "./user.types"
import { UserRepository } from "./user.repository";
import { sign } from "jsonwebtoken";
import { ENV } from "../config/env";
import { StringValue } from "ms";


export const UserService: UserServiceContract = {
  login: async (credentials) =>{
      const user =  await UserRepository.getUserByEmail(credentials.email)
      if (!user){
        throw new Error('NOT_FOUND')
      }
      if(user.password != credentials.password){
        throw new Error('WRONG_CREDENTIALS')
      }
      const token = sign({ id: user.id }, ENV.JWT_ACCESS_SECRET_KEY, { expiresIn: ENV.JWT_EXPIRES_IN as StringValue })
      return token
  },
  register: async (credentials) =>{
    const user = await UserRepository.getUserByEmail(credentials.email)
    if(user){
        throw new Error('USER_EXISTS')
    }
    const newUser = await UserRepository.createUser(credentials)
      const token = sign({ id: newUser.id }, ENV.JWT_ACCESS_SECRET_KEY, { expiresIn: ENV.JWT_EXPIRES_IN as StringValue })
      return token
  },
  me: async (userId) =>{
    const user = await UserRepository.getUserWithoutPasswordById(userId)
    if (!user){
        throw new Error('NOT_FOUND')
      }
    return user
  }
}