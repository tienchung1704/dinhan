import OrderController from "@controllers/OrderController";
import express, { Router } from 'express';
import { checkAuth } from "src/middlewares/AuthMiddle";

const orderRouter: Router = express.Router();

orderRouter.post("/place/stripe", checkAuth, OrderController.placeOrder);
orderRouter.post("/place/paypal", checkAuth, OrderController.placeOrderPaypal);
orderRouter.post("/verify", OrderController.verifyOrder);
orderRouter.post("/userorders", checkAuth, OrderController.userOrder);
orderRouter.get("/list",  OrderController.listOrder);
orderRouter.post("/status", OrderController.updateStatus);

export default orderRouter;