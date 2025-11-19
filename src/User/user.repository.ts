import { PrismaClient } from "../client/prisma-client";
import { UserRepositoryContract } from "./user.types";
import { Prisma } from "../generated/prisma/client";

export const UserRepository: UserRepositoryContract = {
    async getUserByEmail(email){
        try {
            return await PrismaClient.user.findUnique({
            where: {email}
        })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async createUser(credentials){
        try {
            return await PrismaClient.user.create({
            data: credentials
        
        })
        } catch (error) {
            console.log(error)
            throw error
        }
        
    },
    async getUserWithoutPasswordById(id) {
        try {
            return await PrismaClient.user.findUnique({
                where:{id},
                omit:{password: true}
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
}