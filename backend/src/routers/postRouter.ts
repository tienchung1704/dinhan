import PostController from "@controllers/PostController";
import express, { Router } from 'express';
import multer from "multer";

const postRouter:Router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (_, file, cb) =>{
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

postRouter.post("/postadd", upload.single("image"),PostController.addPost);
postRouter.get("/list", PostController.listPost);
postRouter.post("/remove", PostController.removeProduct);

export default postRouter;