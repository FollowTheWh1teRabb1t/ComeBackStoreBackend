import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
    return (request: Request, response: Response, next: NextFunction) => {
        const result = schema.safeParse(request.body);

        if(!result.success) {
            return response.status(400).json({
                message: 'Erro de validação',
                errors: result.error.flatten().fieldErrors,
            });
        }

        request.body = result.data;
        next();
    }
}