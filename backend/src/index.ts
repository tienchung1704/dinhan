import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import "reflect-metadata";
import { AppDataSource } from "@database/data-source";
import session from "express-session";
import cors from "cors";
import userRouter from "@routers/userRouter";
import productRouter from "@routers/productRouter";
import cartRouter from "@routers/cartRouter";
import orderRouter from "@routers/orderRouter";
import contactRouter from "@routers/contactRouter";
import postRouter from "@routers/postRouter";
import axios from "axios";
import crypto from "crypto";
import userAdminRouter from "@routers/userAdminRouter";

const config = {
  verifyToken: process.env.VERIFY_TOKEN || "default_verify_token",
  appSecret: process.env.APP_SECRET || "default_app_secret",
};

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || "4000");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req: any, res: any, next: NextFunction) {
  res.locals.userLogin = req.session.userLogin;
  next();
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use("/api/user", userRouter);
app.use("/api/food", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactRouter);
app.use("/api/post", postRouter);
app.use("/api/admin", userAdminRouter);


app.use("/images", express.static("uploads")); //mount the folder at this endpoint. images can be accessed by /images/filename



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
