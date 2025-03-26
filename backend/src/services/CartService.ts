import { AppDataSource } from "@database/data-source";
import { Cart } from "@entities/Cart";
import { User } from "@entities/User";
const userRepository = AppDataSource.getRepository(User);
const cartRepository = AppDataSource.getRepository(Cart);
class CartService {
  static async updateCartData(
    userId: any,
    cartData: Record<string, any>
  ): Promise<any> {
    const user: any = await cartRepository.find({
      where: {
        user: { id: userId },
      },
    });
    if (user.length > 0) { 
      let cart = user[0];
      cart.cartData = cartData.cartData;
      await cartRepository.save(cart);
    }
    return user;
  }

  static async getCartData(userId: string): Promise<any> {
    const user: any = await cartRepository.find({
      where: {
        user: { id: userId },
      },
    });
    console.log("user", user);
    if (user.length === 0) {
      await cartRepository.save({ user: { id: userId } });
    }
    return user;
  }
}

export default CartService;
