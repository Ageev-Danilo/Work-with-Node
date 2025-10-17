import{Request, Response} from "express"
import { PostService } from "./post.service";


export const PostController = {
    getPostById:  (req: Request, res: Response) => {
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
    },

    getAllPosts: (req: Request, res: Response) => {
        console.log(req.query)
        const take = req.query.take
        const skip = req.query.skip
        if(!take && !skip){
            res.status(200).json(PostService.getAllPosts())
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
        
        const slicedPosts = PostService.getAllPosts(take ?+take: undefined,skip? +skip: undefined)
        res.status(200).json(slicedPosts)
    },
    
    createPost: async  (req: Request, res: Response) => {
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
        
            
            const newPost1 = await  PostService.createPost(body)
            if(!newPost1){
                res.status(500).json("Post creation has been failed!") 
                return   
            }
             res.status(201).json('The post is successfully created!')
    },
    updatePost: async (req: Request, res: Response) => {
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
    }

}














