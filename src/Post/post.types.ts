import { Request, Response } from "express"

export interface Post {
    id: number
    name: string
    description: string
    image: string
}

export type CreatePostData = Omit<Post, "id" >
export type UpdatePostData = Partial<Omit<Post, "id">>

export interface PostServiceContract{
    getPostById: (id: number) => Post | undefined
    getAllPosts: (take?: number, skip?: number) => Post[]
    createPost:(body: CreatePostData) => Promise< Post | null>
    updatePost:(body: UpdatePostData, id: number) => Promise<Post | null>
    
}
//Request<p, resbody, reqbody, reqquery,locals>
//Response<resbody, locals>
export interface PostControllerContract{
    getPostById:(req: Request<{id: string}, Post | string, void, {}>,res: Response< Post | string>) => void
    getAllPosts:(req: Request<{}, Post[] | string, void, {take?: string, skip?: string}>, res: Response<Post[] | string>) => void
    createPost:(req: Request<{}, string, CreatePostData, {} >,res: Response<string>)=> Promise<void>
    updatePost:(req: Request<{id: string}, string, UpdatePostData, {}>, res:Response<string>)=> Promise<void>

}