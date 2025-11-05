import { skip } from "node:test";
import { PrismaClient } from "../client/prisma-client";
import { PostRepositoryContract } from "./post.types";
import { Prisma } from "../generated/prisma/client";

export const PostRepository: PostRepositoryContract = {
    async getPostById(id){
        return await  PrismaClient.post.findUnique({
            where: {id}
        })
    },
    getAllPosts: async(take, skip) => {
        try {
            const posts = await PrismaClient.post.findMany({
                take: take,
                skip: skip
            })
            return posts
        } catch (error) {
            console.log(error)
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code  === 'P2003') {
                    console.log('Failed to create relation between Product and Category')
                    throw new Error("Failed to create relation between Product and Category") 
                }
            }
                
    throw error
        }
    },
    createPost: async (body) => {
        return await PrismaClient.post.create({
            data: body
        })
    },
    updatePost: async (body, id) => {
        return await PrismaClient.post.update({
            where:{id},
            data: body
        })
    },
    deletePost: async (id) => {
        return await PrismaClient.post.delete({
            where:{id}
        })
    }
 
}
