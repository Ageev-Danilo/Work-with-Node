import { PrismaClient } from "../client/prisma-client";
import { Prisma } from "../generated/prisma/client";
import { TagRepositoryContract } from "./tag.types";

export const TagRepository: TagRepositoryContract = {
    getTagById(id) {
        return PrismaClient.tag.findUnique({
            where:{id}
        })
    },
    getAllTags: async (take, skip) => {
           try {
            const tags = await PrismaClient.tag.findMany({
                take: take,
                skip: skip
            })
            return tags
        } catch (error) {
            console.log(error)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    console.log('Failed to create relation between Product and Category')
                    throw new Error("Failed to create relation between Product and Category") 
                }
    throw error
        }
    }
}