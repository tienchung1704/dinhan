import UserAdminController from '@controllers/UserAdminController';
import express, { Router } from 'express';
import { checkAuth } from 'src/middlewares/AuthMiddle';

const userAdminRouter: Router = express.Router();

userAdminRouter.post('/login', UserAdminController.loginUser);
userAdminRouter.post('/register', UserAdminController.resgisterUser);
userAdminRouter.get('/list', UserAdminController.fetchListUser)
export default userAdminRouter;