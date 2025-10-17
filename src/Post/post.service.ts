import path from "path"
import fs from "fs"
import fsPromises from "fs/promises"
import { Post, PostContract } from "./post.types"


import express from "express"
const { getPostById, getAllPosts, createPost } = require('./post.controller')
const app = express()
const HOST = 'localhost'
const PORT = 8000
app.use(express.json())

const postsPath = path.join(__dirname, "posts.json")
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

export const PostService: PostContract = {
    getPostById:  (id: number) => {
        const searchedPost = posts.find((somePost: {id: number,name: string, description: string, image: string, likes: number }) => { 
            return somePost.id === id
        })
        return searchedPost
    },
    getAllPosts: (take, skip) => {
        if(take){
          if(skip){
                const slicedPosts = posts.slice(skip, take)
                return slicedPosts
            }
        }
        const slicedPosts = posts.slice(0, take)
        return slicedPosts 
    },
    
    createPost: async  (body) => {
        try {
            const newPost = {...body, id: posts.length + 1}
            posts.push(newPost)
            await fsPromises.writeFile(postsPath, JSON.stringify(posts, null, 4))
            return newPost
        } catch (error) {
            return null
        }
    },
    updatePost: async (body, id) =>{
        const updatingPost = PostService.getPostById(id)
        if(!updatingPost){
            console.log("no post")
            return null
            
        }
        try {
            const updatedPost = {...updatingPost, ...body}
            posts.splice(id - 1, 1, updatedPost)
            await fsPromises.writeFile(postsPath,JSON.stringify(posts, null, 4))
            return updatedPost
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
