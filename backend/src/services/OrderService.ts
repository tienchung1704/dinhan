import { Order } from "@entities/Order";
import { AppDataSource } from "@database/data-source";
import { Request, Response } from "express";
const orderRepository = AppDataSource.getRepository(Order);

class OrderService {
  static async addOrder(data: any): Promise<any> {
    const userId = data.userId;
    const items = data.items;
    const amount = data.amount;
    const address = data.address;
    return orderRepository.save({ userId, items, amount, address });
  }
  static async verifyPayment(
    req: Request,
    res: Response,
    orderId: any
  ): Promise<any> {
    const paymentUpdate = await orderRepository.find({
      where: { id: orderId },
    });
    if (paymentUpdate) {
      paymentUpdate[0].payment = true;
      await orderRepository.save(paymentUpdate);
    }
  }
  static async deleteOrder(orderId: any): Promise<any> {
    return await orderRepository.delete({ id: orderId });
  }
  static async getUserOrder(req: Request, userId: any): Promise<any> {
    return await orderRepository.find({
      where: {
        userId: userId,
      },
    });
  }
  static async updateStatus(orderId: any, newStatus: any): Promise<any> {
    const statisUpdate = await orderRepository.find({ where: { id: orderId } });
    if (statisUpdate) {
      statisUpdate[0].status = newStatus;
      await orderRepository.save(statisUpdate);
    }
  }

  static async listOrder(data: any): Promise<any> {
    return await orderRepository.find();
  }
  static async getAdress(data: any): Promise<any> {
    const orderId = data.orderId;
    const order = await orderRepository.findOne({
      where: {
        id: orderId,
      },
      select: ["address"],
    });
    return order?.address?.email ?? null;
  }
  static async getOrder(data: any): Promise<any> {
    const orderId = data.orderId;
    const order = await orderRepository.findOne({
      where: {
        id: orderId,
      },
      select: ["address", "items"],
    });
      return order;
  }
}

export default OrderService;
