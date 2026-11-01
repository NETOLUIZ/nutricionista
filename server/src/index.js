import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/auth.js';
import publicRoutes from './routes/public.js';
import rateLimit from 'express-rate-limit';
import adminRoutes from './routes/admin.js';

const app = express();
const origins = (process.env.CORS_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);

// Só confie no cabeçalho X-Forwarded-For quando houver Nginx na frente (TRUST_PROXY=1);
// sem proxy, qualquer um poderia forjar o IP e driblar o limite de tentativas.
app.set('trust proxy', process.env.TRUST_PROXY === '1' ? 1 : false);
// imagens enviadas precisam ser carregáveis pelo site (outra origem)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: origins }));
app.use(express.json({ limit: '100kb' }));

const uploadsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'uploads');
app.use('/uploads', express.static(uploadsDir, { maxAge: '7d' }));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use(
  '/api/admin',
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 600, standardHeaders: true, legacyHeaders: false }),
  adminRoutes
);

app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }));

// Nunca devolver stack trace ou detalhes internos ao cliente
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON inválido' });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Requisição grande demais' });
  console.error(err);
  res.status(500).json({ error: 'Erro interno' });
});

const port = Number(process.env.PORT) || 3333;
app.listen(port, () => console.log(`API da nutricionista em http://localhost:${port}`));
