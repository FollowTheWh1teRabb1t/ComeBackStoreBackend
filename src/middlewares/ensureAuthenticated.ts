import { Request, Response, NextFunction } from 'express';
import { Token } from '../utils/jwt';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const token = request.cookies.token;

  if (!token) {
    return response.status(401).json({ message: 'Token não encontrado.' });
  }

  try {
  
    const decoded = Token.verify<{ userId: string }>(token);

    request.userId = decoded.userId;

    return next();
  } catch {
    return response.status(401).json({ message: 'Token inválido!' });
  }
}
