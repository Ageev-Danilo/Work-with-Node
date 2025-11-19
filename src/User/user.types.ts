import { Request, Response } from "express"
import { Prisma, PrismaClient } from "../generated/prisma/client";
import { UserUncheckedCreateInput } from "../generated/prisma/models";


export type User = Prisma.UserGetPayload<{}>
export type UserWithoutPassword = Prisma.UserGetPayload<{omit: {password: true}}>

export type LoginCredentials = {
    email: string
    password: string
}

export type RegisterCredentials = {
    firstName: string
    secondName: string
    email: string
    password: string
    avatar?: string
}

export type UserCreate = Prisma.UserUncheckedCreateInput
export interface UserAuthenticationResponse{
    token: string
}
export interface ErrorResponse{
    message: string
}


export interface UserServiceContract{
    login:(credentials: LoginCredentials) => Promise<string>
    register:(credentials: RegisterCredentials) => Promise <string>
    me:(userId: number) => Promise<UserWithoutPassword>

}

export interface UserControllerContract{
    login:(req: Request<object, ErrorResponse | UserAuthenticationResponse, LoginCredentials>, res: Response<ErrorResponse | UserAuthenticationResponse>) => void
    register:(req: Request<object, ErrorResponse | UserAuthenticationResponse, RegisterCredentials>, res: Response<ErrorResponse | UserAuthenticationResponse>) => void
    me:(req: Request<object, ErrorResponse | UserWithoutPassword>, res: Response<ErrorResponse | UserWithoutPassword>) => void
}

export interface UserRepositoryContract{
    getUserByEmail: (email: string) => Promise<User | null>
    createUser: (credentials: RegisterCredentials) => Promise<User>
    getUserWithoutPasswordById:(id: number) => Promise<UserWithoutPassword | null>
}



