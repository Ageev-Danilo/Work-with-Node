const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')
const express = require('express')
const { getPostById, getAllPosts, createPost } = require('./post.controller')
const app = express()
const HOST = 'localhost'
const PORT = 8000
app.use(express.json())

const postsPath = path.join(__dirname, "posts.json")
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'))

const PostService = {
    getPostById:  (id) => {
        const searchedPost = posts.find((somePost) => { 
            return somePost.id === id
        })
        return searchedPost
    },
    getAllPosts: (take, skip) => {
        if(take){
          if(skip){
                const slicedPosts = posts.slice(+skip, +take)
            }
        }
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
    }
}
module.exports = PostService;