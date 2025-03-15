import UserController from '@controllers/UserController';
import express, { Router } from 'express';
import { checkAuth } from 'src/middlewares/AuthMiddle';

const userRouter: Router = express.Router();

userRouter.post('/login', UserController.loginUser);
userRouter.post('/register', UserController.resgisterUser);
userRouter.post('/edit', checkAuth,UserController.changePassword)

export default userRouter;