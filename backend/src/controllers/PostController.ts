import PostService from "@services/PostService";
import { Request, Response } from "express";
import fs from "fs";

class PostController {
  static async listPost(req: Request, res: Response): Promise<any> {
    try {
      const lists = await PostService.getPost();
      return res.json({ success: true, data: lists });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: "Error" });
    }
  }

  static async addPost(req: any, res: Response): Promise<any> {
    let image_filename = `${req.file.filename}`;
    let imagePath = `/path/to/images/${image_filename}`;

    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(imagePath, () => {});
      }
    });
    const title = req.body.title;
    const detail = req.body.detail;
    const description = req.body.description;
    const image = image_filename;
    try {
      await PostService.addPost({
        title,
        description,
        detail,
        image,
      });
      res.json({ success: true, message: "Added" });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error" });
    }
  }
  static async removeProduct(req: Request, res: Response): Promise<any> {
    try {
      const id = req.body.id;
      const product = await PostService.getPostById(id);
      fs.unlink(`uploads/${product.image}`, () => {});
      await PostService.removePost(id);
      res.json({ success: true, message: "Deleted" });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error123" });
    }
  }
}


export default PostController;