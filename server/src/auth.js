import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
if (!secret || secret.length < 16) {
  throw new Error('JWT_SECRET ausente ou curto demais (mín. 16 caracteres). Veja .env.example');
}

export const signToken = (admin) =>
  jwt.sign({ sub: admin.id, email: admin.email }, secret, { algorithm: 'HS256', expiresIn: '8h' });

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Não autenticado' });
  try {
    req.admin = jwt.verify(token, secret, { algorithms: ['HS256'] });
    next();
  } catch {
    res.status(401).json({ error: 'Sessão expirada' });
  }
};
