const PostService = require("./post.service");


const PostController = {
    getPostById:  (req, res) => {
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

    getAllPosts: (req, res) => {
        console.log(req.query)
        const take = req.query.take
        const skip = req.query.skip
        if(!take && !skip){
            res.status(200).json(PostService.getAllPosts())
            return
        }
        if(take){
            if(isNaN(+take)){
                res.status(400).json(typeof(take))
                return
            }
        }
        
        if(skip){
            if(isNaN(+skip)){
                res.status(400).json("Skip is not a Number")
                return
            }
        }
        
        const slicedPosts = PostService.getAllPosts(+skip, +take)
        res.status(200).json(slicedPosts)
    },
    
    createPost: async  (req, res) => {
        const body = req.body
        if(!body){
            res.status(422).json('There is no body!')
            return
        }
        const newPost = {...body, id: posts.length + 1}
        if(!newPost.name){
            res.status(422).json('There is no name!')
            return
        }
        if(!newPost.description){
            res.status(422).json('There is no description!')
            return
        }
        if(!newPost.image){
            res.status(422).json('There is no image!')
            return
        }
        
            posts.push(newPost)
            const newPost1 = await  PostService.createPost(body)
            if(!newPost1){
                res.status(500).json("Post creation has been failed!") 
                return   
            }
             res.status(201).json('The post is successfully created!')
    }
}

module.exports = PostController;














