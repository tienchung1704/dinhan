import { Post } from "@entities/Post";
import { AppDataSource } from "@database/data-source";
import { Request, Response } from "express";
const postRepository = AppDataSource.getRepository(Post);

class PostService123{
    static async getPost(): Promise<any>{
        return await postRepository.find();
    }

    static async addPost(data: any): Promise<any>{
        const { title, description, detail, image } = data;
        return await postRepository.save({ title, description, detail, image });
    }

    static async removePost(id: any): Promise<any>{
        return await postRepository.delete({id});
    }

    static async getPostById(id: any): Promise<any>{
        return await postRepository.find({where:{
            id : id,
        }});
    }}

export default PostService123;