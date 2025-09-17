import Stripe from "stripe";
import OrderService from "@services/OrderService";
import CartService from "@services/CartService";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
class OrderController {
  static async placeOrder(req: any, res: any): Promise<any> {
    const frontend_url = "http://localhost:5173";
    try {
      const userId = req.body.userId;
      const items = req.body.items;
      const amount = req.body.amount;
      const address = req.body.address;
      const newOrder = await OrderService.addOrder({
        userId,
        items,
        amount,
        address,
      });
      await CartService.updateCartData(userId, { cartData: {} });
      const line_items = req.body.items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
          },
          unit_amount: 2 * 100,
        },
        quantity: 1,
      });
      const stripe = new Stripe(
        "sk_test_51Q6ERgGDpM7jIlouCtAk51N5usgV6scOfZReaPzc7Q8HGR1TNmhzDSHVJeczBYWqMZSkhTgq7vG1dv1W9hYdE0ns007cfqRkoj"
      );
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder.id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder.id}`,
      });
      res.json({ success: true, session_url: session.url });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error" });
    }
  }

  static async verifyOrder(req: any, res: any): Promise<any> {
    const { orderId, success } = req.body;
    try {
      if (success === "true") {
        await OrderService.verifyPayment(req, res, orderId);
        await OrderController.sendMail(req, res);
        res.json({ success: true, message: "Payment successful" });
      } else {
        await OrderService.deleteOrder(orderId);
        res.json({ success: false, message: "Payment failed" });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error" });
    }
  }

  static async userOrder(req: any, res: any): Promise<any> {
    try {
      const userId = req.body.userId;
      const orders = await OrderService.getUserOrder(req, userId);
      res.json({ success: true, data: orders });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error" });
    }
  }

  static async listOrder(req: any, res: any): Promise<any> {
    try {
      const orders = await OrderService.listOrder({});
      res.json({ success: true, data: orders });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error" });
    }
  }

  static async updateStatus(req: any, res: any): Promise<any> {
    try {
      const orderId = req.body.orderId;
      const newStatus = req.body.status;
      await OrderService.updateStatus(orderId, newStatus);
      res.json({ success: true, message: "Updated" });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error" });
    }
  }

  static async sendMail(req: any, res: any): Promise<any> {
    try {
      const orderId = req.body.orderId;
      const success = req.body.success;

      const order = await OrderService.getAdress({ orderId });
      if (success === "true") {
        const htmlPath = path.resolve(__dirname, "../sendmail/send2.html");
        const htmlContent = fs.readFileSync(htmlPath, "utf8");
        const orderData = await OrderService.getOrder({orderId});
        const template = handlebars.compile(htmlContent);

        const itemsWithTotalPrice = orderData.items.map((item : any) => ({
          ...item,
          totalPrice: ((parseFloat(item.price) * item.quantity) + 2).toFixed(2) // Chuyển sang số và làm tròn 2 số thập phân
        }));

        const emailContent = template({
          items: itemsWithTotalPrice,
          firstName: orderData.address.firstName,
          lastName: orderData.address.lastName,
          email: orderData.address.email,
          street: orderData.address.street,
          city: orderData.address.city,
          state: orderData.address.state, 
          zipcode: orderData.address.ipcode,
          country: orderData.address.country,
          phone: orderData.address.phone,
        });

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "binnguyen09112003@gmail.com",
            pass: process.env.EMAIL_APP_PASSWORD,
          },
        });

        const mailOptions = {
          from: '"Dinh An Store" <binnguyen09112003@gmail.com>',
          to: order,
          subject: "Thank you for your purchase",
          html: emailContent, 
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }
}

export default OrderController;
