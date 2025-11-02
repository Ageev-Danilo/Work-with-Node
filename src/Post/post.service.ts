
import { Post, PostServiceContract } from "./post.types"
import { PostRepository } from "./post.repository";

export const PostService: PostServiceContract = {
    getPostById:  (id) => {
        return PostRepository.getPostById(id)
    },
    getAllPosts: (take, skip) => {
        return PostRepository.getAllPosts(take, skip)
    },
    
    createPost: async  (body) => {
        return PostRepository.createPost(body)
    },
    updatePost: async (body, id) =>{
        return PostRepository.updatePost(body, id)
    },
    deletePost: async (id) =>{
        return PostRepository.deletePost(id)
    }
}
