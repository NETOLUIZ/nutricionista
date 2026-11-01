import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { prisma } from '../db.js';
import { signToken, authMiddleware } from '../auth.js';

const router = Router();

// Hash descartável: a senha é sempre comparada, mesmo sem usuário, para o tempo de resposta não revelar se o e-mail existe
const DUMMY_HASH = bcrypt.hashSync('senha-descartavel', 12);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas. Aguarde alguns minutos.' }
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || typeof password !== 'string' || password.length > 200) {
      return res.status(400).json({ error: 'Informe e-mail e senha' });
    }
    const admin = await prisma.admin.findUnique({ where: { email: email.trim().toLowerCase() } });
    const passwordOk = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);
    const ok = Boolean(admin) && passwordOk;
    if (!ok) return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    res.json({ token: signToken(admin), email: admin.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

router.post('/password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (typeof newPassword !== 'string' || newPassword.length < 10 || newPassword.length > 200) {
      return res.status(400).json({ error: 'A nova senha precisa ter entre 10 e 200 caracteres' });
    }
    const admin = await prisma.admin.findUnique({ where: { id: req.admin.sub } });
    if (!admin || !(await bcrypt.compare(String(currentPassword || ''), admin.passwordHash))) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }
    await prisma.admin.update({
      where: { id: admin.id },
      data: { passwordHash: await bcrypt.hash(newPassword, 12) }
    });
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

export default router;
