import fs from "fs";
import { Request, Response } from "express";
import ProductService from "@services/ProductService";

class ProductController {
  static async addProduct(req: any, res: Response): Promise<any> {
    let image_filename = `${req.file.filename}`;
    let imagePath = `/path/to/images/${image_filename}`;

    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(imagePath, () => {});
      }
    });
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    const isTrending = req.body.isTrending;
    const image = image_filename;
    try {
      await ProductService.addProduct({
        name,
        price,
        description,
        category,
        image,
        isTrending,
      });
      res.json({ success: true, message: "Added" });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error" });
    }
  }
  static async listProduct(_: any, res: Response): Promise<any> {
    try {
      const lists = await ProductService.getProduct();
      return res.json({ success: true, data: lists });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: "Error" });
    }
  }

  static async removeProduct(req: Request, res: Response): Promise<any> {
    try {
      const id = req.body.id;
      const product = await ProductService.getProductById(id);
      fs.unlink(`uploads/${product.image}`, () => {});
      await ProductService.removeProduct(id);
      res.json({ success: true, message: "Deleted" });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error123" });
    }
  }

  static async getProductDetail(req: Request, res: Response): Promise<any> {
    const id = req.params.id;
    try {
      const product = await ProductService.getProductById(id);
      res.json({ success: true, data: product });
    } catch (err) {
      res.json({ success: false, message: "Not found" });
    }
  }
  static async editProductById(req: Request, res: Response): Promise<any>{
    const { name , price , description , isTrending , category} = req.body
    const id: String = req.params.id;
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("Params:", req.params);    try{
      await ProductService.updateProductById({ id, name, price, description, isTrending, category })
      res.json({success: true , message : "successfully"})

    }catch(err){
      res.json({success: false , message : "cant update"})
    }
  }
}

export default ProductController;
