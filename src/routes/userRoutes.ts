import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const userRoutes = Router();

const userController = new UserController();

userRoutes.put('/profile', ensureAuthenticated, userController.updateProfile);
userRoutes.post('/password', ensureAuthenticated, userController.changePassword);
