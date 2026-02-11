import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
    private userService = new UserService();

    updateProfile = async (request: Request, response: Response) => {

        if(!request.userId) {
            return response.status(401).json({ message: 'Não autorizado!'})
        }

        const userId = request.userId;
        const { name, email, phone } = request.body;

        const user = await this.userService.updateProfile(userId, {
            name,
            email,
            phone,
        });
        return response.json(user);
    }

    changePassword = async (request: Request, response: Response) => {
        if(!request.userId) {
            return response.status(401).json({ message: 'Não autorizado!'})
        }

        const userId = request.userId;
        const { currentPassword, newPassword } = request.body;
        
        await this.userService.changePassword(userId, currentPassword, newPassword);

         return response.status(204).send();
    };
}