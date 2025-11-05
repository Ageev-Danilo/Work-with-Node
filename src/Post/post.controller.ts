import{Request, Response} from "express"
import { PostService } from "./post.service";
import { Post, PostControllerContract } from "./post.types"


export const PostController: PostControllerContract = {

    getPostById: async (req, res) => {
        try {
            if (!req.params.id){
            res.status(400).json("Id is required")
            return;
        }
        const id = +req.params.id
        if (isNaN(id)){
            res.status(400).json("Id is not Number")
            return
        }
        const searchedPost = PostService.getPostById(id)
        if (!searchedPost) {
            res.status(404).json("There is no post")
            return
        }
        res.status(200).json(searchedPost)
        } catch (error) {
            console.log(error)
            res.status(500).json('Server error')
        }
        
    },

    getAllPosts: async (req, res) => {
        try {
            console.log(req.query)
        const take = req.query.take
        const skip = req.query.skip
        if(!take && !skip){
            res.status(200).json(await PostService.getAllPosts())
            return
        }
        if(take){
            if(isNaN(+take)){
                res.status(400).json("Take is not a Number")
                return
            }
        }
        
        if(skip){
            if(isNaN(+skip)){
                res.status(400).json("Skip is not a Number")
                return
            }
        }
        
        const slicedPosts = await PostService.getAllPosts(take ?+take: undefined,skip? +skip: undefined)
        res.status(200).json(slicedPosts)
        } catch (error) {
            console.log(error)
            res.status(500).json('Server error')
        }
        
    },
    
    createPost: async  (req, res) => {
        try {
            const body = req.body
        if(!body){
            res.status(422).json('There is no body!')
            return
        }

        if(!body.name){
            res.status(422).json('There is no name!')
            return
        }
        if(!body.description){
            res.status(422).json('There is no description!')
            return
        }
        if(!body.image){
            res.status(422).json('There is no image!')
            return
        }
        
            
            const newPost1 = await PostService.createPost(body)
            if(!newPost1){
                res.status(500).json("Post creation has been failed!") 
                return   
            }
             res.status(201).json('The post is successfully created!')
        } catch (error) {
            console.log(error)
            res.status(500).json('Server error')
        }
        
    },
    updatePost: async (req, res) => {
        try {
            if(!req.params.id){
            res.status(400).json("There is no id!")
            return
        }
        const id = +req.params.id
        if(isNaN(id)){
            res.status(400).json("Id must be a number!")
            return
        }
        const body = req.body
        if(!body){
            res.status(400).json("There is no body!")
            return
        }
        const updatedPost = await PostService.updatePost(body, id)
        if(!updatedPost){
                res.status(500).json("Post update has been failed!") 
                return   
            }
            res.status(201).json('The post is successfully updated!')
        } catch (error) {
            console.log(error)
            res.status(500).json('Server error')
        }
        
    },
    deletePost: async (req, res) => {
        try {
            if(!req.params.id){
            res.status(400).json("There is no id!")
            return
        }
        const id = +req.params.id
        if(isNaN(id)){
            res.status(400).json("Id must be a number!")
            return
        }
        const deletedPost = await PostService.deletePost(id)
        if(!deletedPost){
                res.status(500).json("Post deleting has been failed!") 
                return   
            }
            res.status(201).json('The post is successfully deleted!')
        } catch (error) {
            console.log(error)
            res.status(500).json('Server error')
        }
        
    }

}














