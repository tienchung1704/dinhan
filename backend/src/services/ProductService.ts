import { Product } from "@entities/Product";
import { AppDataSource } from "@database/data-source";
const productRepository = AppDataSource.getRepository(Product);

class ProductService {
  static async addProduct(data: any): Promise<any> {
    const { name, price, description, category, image, title, isTrending } = data;
    return await productRepository.save({
      name,
      price,
      description,
      category,
      image,
      title,
      isTrending,
    });
  }
  static async getProduct(): Promise<any> {
    return await productRepository.find();
  }
  static async getProductByCateAndByName(category: string, title: string): Promise<any> {
    const product = await productRepository.find({
      where: {
        category: category,
        title: title,
      }
    })
    return product;
  }

  static async getProductById(id: string): Promise<any> {
    const product = await productRepository.findOne({
      where: {
        id: id,
      },
    });
    return product;
  }
  static async removeProduct(id: any): Promise<any> {
    return await productRepository.delete({ id: id });
  }
  static async updateProductById(data: any): Promise<any> {
    const { id, name, price, isTrending, description,title, category } = data;
    console.log("1111111111",data);
    try {
      const product = await productRepository.findOne({
        where: {
          id: id,
        },
      });
      if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;
        product.isTrending = isTrending;
        product.title = title;
        await productRepository.save(product);
      }
      return product;
    } catch (err) {
      console.log("Error Update Product:", err);
    }
  }
}

export default ProductService;
