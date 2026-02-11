import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  private authService = new AuthService();

  login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const result = await this.authService.login(email, password);

    response.cookie('token', result.token, {
      httpOnly: true,
      sameSite: 'lax', 
      secure: false,    
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return response.status(200).json({
      user: result.user,
    });
  };

  logout = async (request: Request, response: Response) => {
    response.clearCookie('token', { path: '/' });
    return response.status(204).send();
  }

  register = async (request: Request, response: Response) => {
    const { name, email, password } = request.body;

    const user = await this.authService.register({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  };

  me = async (request: Request, response: Response) => {
    return response.status(200).json({
      user: request.userId,
    });
  };
}
