export interface Post {
    id: number
    name: string
    description: string
    image: string
}

export type CreatePostData = Omit<Post, "id" >
export type UpdatePostData = Partial<Omit<Post, "id">>

export interface PostContract{
    getPostById: (id: number) => Post | undefined
    getAllPosts: (take?: number, skip?: number) => Post[]
    createPost:(body: CreatePostData) => Promise< Post | null>
    updatePost:(body: UpdatePostData, id: number) => Promise<Post | null>
    
}