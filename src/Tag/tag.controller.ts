import{Request, Response} from "express"
import { TagService } from "./tag.service";
import { Tag, TagControllerContract } from "./tag.types"

export const TagController: TagControllerContract = {
    getTagById: (req, res) => {
        if (!req.params.id){
            res.status(400).json("Id is required")
            return
        }
        const id = +req.params.id
        if(isNaN(id)){
            res.status(400).json("Id is not a number")
        }
        const searchedTag = TagService.getTagById(id)
        if(!searchedTag){
            res.status(404).json("There is no tag")
            return
        }
        res.status(200).json(searchedTag)
    },
    getAllTags: (req, res) => {
        const take = req.query.take
        const skip = req.query.skip
        if(!take && !skip){
            res.status(200).json(TagService.getAllTags())
            return
        }
        if(take){
            if(isNaN(+take)){
                res.status(400).json("Take i not a number")
                return
            }
        }
        if(skip){
            if(isNaN(+skip)){
                res.status(400).json("SKip is not a number")
                return
            }
        }
        const slicedTags = TagService.getAllTags(take, skip)
        res.status(200).json(slicedTags)
    }
}