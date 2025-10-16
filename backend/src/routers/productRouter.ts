import ProductController from "@controllers/ProductController";
import express, { Router } from 'express';
import { checkAuth } from "src/middlewares/AuthMiddle";
import multer from "multer";

const productRouter: Router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (_, file, cb) =>{
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

productRouter.post("/add", upload.single("image"), ProductController.addProduct);
productRouter.get("/list", ProductController.listProduct);
productRouter.post("/remove", ProductController.removeProduct);
productRouter.get("/:id",ProductController.getProductDetail);
productRouter.post("/edit/:id", ProductController.editProductById);
productRouter.post("/:category/:title", ProductController.searchProduct);

export default productRouter;