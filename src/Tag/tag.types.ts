import { Request, Response } from "express"
import { Prisma, PrismaClient } from "../generated/prisma/client";

export type Tag = Prisma.TagGetPayload<{}>

export interface TagServiceContract{
    getTagById: (id: number) => Tag | null
    getAllTags: (take?: number, skip?: number) => Tag[]
}

export interface TagControllerContract{
    getTagById: (req: Request<{id: string}, Tag | string, void, {}>, res: Response<Tag | string>) => void
    getAllTags: (req: Request<{}, Tag[] | string, void, {take?: string, skip?: string}>, res: Response <Tag[] | string>) => void

}

export interface TagRepositoryContract{
    getTagById: (id: number) => Promise<Tag | null>
    getAllTags: (take?: number, skip?: number) => Promise<Tag[]>
}