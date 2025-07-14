import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Função para verificar a validade do token JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const cookieToken = req.cookies.auth_token;

    if (!token && !cookieToken) {
        return res.status(401).send('Token de autenticação não fornecido.');
    }

    if (token == 'CookieOnly') {
        req.body = { userId: 'CookieOnly' };
    } else if (token) {
        jwt.verify(token, 'secret_key', (err: any, decoded: jwt.JwtPayload) => {
            if (err || typeof decoded === 'string') {
                return res.status(401).send('Token de autenticação inválido.');
            }
        });
    }

    if (cookieToken) {
        try {
            const decoded = jwt.verify(cookieToken, process.env.AUTH_SECRET_KEY);
            req.body = { email: (decoded as JwtPayload).email }
        } catch {
            return res.status(401).json({ message: 'Cookie token inválido ou expirado' });
        }
    }
    next();
};
