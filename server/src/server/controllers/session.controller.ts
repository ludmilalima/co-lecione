import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Função para verificar a validade do token JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Token de autenticação não fornecido.');
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err || typeof decoded === 'string') {
            return res.status(401).send('Token de autenticação inválido.');
        }

        // Decodifica o token e adiciona o ID do usuário à requisição
        req.userId = (decoded as JwtPayload).userId;
        next();
    });
};

// Função para realizar o logout do usuário (limpar token)
export const logout = (_req: Request, res: Response) => {
    // Limpe o token armazenado no cliente (por exemplo, no localStorage)
    // Realize outras ações de logout necessárias

    res.status(200).send('Logout realizado com sucesso.');
};
