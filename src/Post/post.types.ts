import { Request, Response } from "express"
import { Prisma, PrismaClient } from "../generated/prisma/client";

export type Post = Prisma.PostGetPayload<{}> // стандартные поля модели, можно передать select, omit, include
export type PostWithTags = Prisma.PostGetPayload<{include:{tags: true}}>
export type CreatePost = Prisma.PostUncheckedCreateInput
export type UpdatePost = Prisma.PostUncheckedUpdateInput
export type CreatePostChecked = Prisma.PostCreateInput
export type UpdatePostChecked = Prisma.PostUpdateInput



export interface PostServiceContract{
    getPostById: (id: number) => Post | null
    getAllPosts: (take?: number, skip?: number) => Post[]
    createPost:(body: CreatePost) => Promise< Post | null>
    updatePost:(body: UpdatePost, id: number) => Promise<Post | null>
    deletePost: (id: number) => Promise<Post | null>
    
}
//Request<p, resbody, reqbody, reqquery,locals>
//Response<resbody, locals>
export interface PostControllerContract{
    getPostById:(req: Request<{id: string}, Post | string, void, {}>,res: Response< Post | string>) => void
    getAllPosts:(req: Request<{}, Post[] | string, void, {take?: string, skip?: string}>, res: Response<Post[] | string>) => void
    createPost:(req: Request<{}, string, CreatePost, {} >,res: Response<string>)=> Promise<void>
    updatePost:(req: Request<{id: string}, string, UpdatePost, {}>, res:Response<string>)=> Promise<void>
    deletePost:(req: Request<{id: string}, string, Post, {}>, res: Response<string>) => Promise<void>

}

export interface PostRepositoryContract{
    getPostById: (id: number) => Promise<Post | null>
    getAllPosts: (take?: number, skip?: number) => Promise<Post[]>
    createPost: (body: CreatePost) => Promise<Post>
    updatePost: (body: UpdatePost, id: number) => Promise<Post>
    deletePost: (id: number) => Promise<Post | null>
}