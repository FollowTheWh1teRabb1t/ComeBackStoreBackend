import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const authRoutes = Router();

const authController = new AuthController();

authRoutes.post('/login', authController.login);
authRoutes.post('/logout', authController.logout);
authRoutes.post('/register', authController.register);
authRoutes.get('/me', ensureAuthenticated, authController.me);

