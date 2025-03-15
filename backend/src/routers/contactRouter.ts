import ContactController from "@controllers/ContactController";
import express, { Router } from 'express';
import { checkAuth } from "src/middlewares/AuthMiddle";

const contactRouter: Router = express.Router();

contactRouter.post("/add" , checkAuth,ContactController.addContact);
contactRouter.get("/list", ContactController.listContact);
contactRouter.post("/remove", ContactController.removeContact);

export default contactRouter;