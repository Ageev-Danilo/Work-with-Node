import { TagServiceContract } from "./tag.types";
import { TagRepository } from "./tag.repository";

export const TagService: TagServiceContract = {
    getTagById: (id) => {
        return TagRepository.getTagById(id)
    },
    getAllTags:(take, skip) => {
        return TagRepository.getAllTags(take,skip)
    }
}