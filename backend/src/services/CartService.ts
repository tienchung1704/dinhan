import { AppDataSource } from "@database/data-source";
import { User } from "@entities/User";
const userRepository = AppDataSource.getRepository(User);
class CartService {

  static async updateCartData(userId: any, cartData: Record<string,any>): Promise<any> {
    const [user] = await userRepository.find({ where: { id: userId } });
    if (user) {
      user.cartData = cartData.cartData;
      await userRepository.save(user);

    }
    return user;
  }

  static async getCartData(userId: string): Promise<any> {
    return await userRepository.find({
      where: {
        id: userId,
      },
    });
  }
}

export default CartService;
