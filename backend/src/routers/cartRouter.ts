import CartController from "@controllers/CartController";
import express, { Router } from 'express';
import { checkAuth } from "src/middlewares/AuthMiddle";
const cartRouter: Router = express.Router();

cartRouter.post("/add", checkAuth,CartController.addToCart);
cartRouter.post("/remove", checkAuth,CartController.removeFromCart);
cartRouter.post("/get",checkAuth,CartController.getCartData);

export default cartRouter;
