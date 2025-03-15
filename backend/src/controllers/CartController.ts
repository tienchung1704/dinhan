import CartService from '@services/CartService';
import UserService from '@services/UserService';
import { Request, Response } from 'express';
class CartController{
    static async addToCart(req: Request, res: Response): Promise<any>{
        try{
            const userId = req.body.userId;
            let userData = await CartService.getCartData(userId);
            let cartData = userData[0].cartData || {};
            if(!cartData[req.body.itemId]){
                cartData[req.body.itemId] = 1;
            }else{
                cartData[req.body.itemId] += 1;
            }
            await CartService.updateCartData(userId, {cartData: cartData});
            res.json({ success: true, message: "Added to cart" });
        }catch(err){
            console.log(err);
            res.json({ success: false, message: "Error" });
        }
    }

    static async removeFromCart(req: any, res: Response): Promise<any>{
        try{
            const userId = req.body.userId;
            let userData = await CartService.getCartData(userId);
            let cartData = userData[0].cartData || {};
            if(cartData[req.body.itemId] > 0){
                cartData[req.body.itemId] -= 1;
                await CartService.updateCartData(userId, {cartData: cartData});
                res.json({ success: true, message: "Removed from cart" });
            } else {
                res.json({ success: false, message: "Item not in cart" });
            }
        }catch(err){
            console.log(err);
            res.json({ success: false, message: "Error" });
        }
    }

    static async getCartData(req: any, res: any): Promise<any>{
        try{
            const userId = req.body.userId;
            let userData = await CartService.getCartData(userId);
            let cartData = userData[0].cartData || {};
            res.json({ success: true, cartData });    
        }catch(err){
            console.log(err);
            res.json({ success: false, message: err });
        }
    }


}

export default CartController;