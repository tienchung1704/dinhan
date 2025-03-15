import { Product } from "@entities/Product";
import { AppDataSource } from "@database/data-source";
const productRepository = AppDataSource.getRepository(Product);

class ProductService {
  static async addProduct(data: any): Promise<any> {
    const { name, price, description, category, image, isTrending } = data;
    return await productRepository.save({
      name,
      price,
      description,
      category,
      image,
      isTrending,
    });
  }
  static async getProduct(): Promise<any> {
    return await productRepository.find();
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
}

export default ProductService;
