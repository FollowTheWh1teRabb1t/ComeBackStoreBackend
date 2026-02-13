import { UserRepository } from '../repositories/userRepository';
import { Hash } from '../utils/hash';
import { Token } from '../utils/jwt';
import { AppError } from '../utils/appError';

export class AuthService {
  private userRepository = new UserRepository();

  login = async (email: string, password: string) => {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou senha inválidos.', 401);
    }

    const passwordMatch = await Hash.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email ou senha inválidos.', 401);
    }

    const token = Token.generate({ userId: user.id });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  };

  register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {

    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError('Email já está em uso.', 409);
    }

    const hashedPassword = await Hash.generate(data.password);

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  };
}
