import { UserRepository } from "../repositories/userRepository";
import { Hash } from '../utils/hash';

export class UserService {
    private userRepository = new UserRepository();


    updateProfile = async (
        userId: string,
        data: { name?: string; email?: string; phone?: string }
    ) => {
        return this.userRepository.updateProfile(userId, data);
    }
    
    changePassword = async (
        userId: string,
        currentPassword: string,
        newPassword: string
    ) => {
        const user = await this.userRepository.findById(userId);

        if(!user) {
            throw new Error('Usuário não encontrado');
        }

        const passwordMatch = await Hash.compare(currentPassword, user.password);

        if(!passwordMatch) {
            throw new Error('Senha inválida');
        }

        const hashedPassword = await Hash.generate(newPassword);

        await this.userRepository.updatePassword(userId, hashedPassword);
    };
}