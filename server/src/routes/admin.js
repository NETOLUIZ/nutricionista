import { Router } from 'express';
import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prisma } from '../db.js';
import { authMiddleware } from '../auth.js';
import { TEXT_DEFAULTS, TEXT_KEYS } from '../textDefaults.js';

const router = Router();
router.use(authMiddleware);

const uploadsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'uploads');
const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => cb(null, crypto.randomUUID() + EXT[file.mimetype])
  }),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    EXT[file.mimetype] ? cb(null, true) : cb(new Error('Envie uma imagem JPG, PNG ou WebP'))
});

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const optStr = (v, max) => str(v, max) || null;
const id = (req) => Number.parseInt(req.params.id, 10);
const fail = (res, error) => {
  console.error(error);
  if (error?.code === 'P2025') return res.status(404).json({ error: 'Registro não encontrado' });
  res.status(500).json({ error: 'Erro interno' });
};
// Aceita apenas links http(s) ou caminhos de upload do próprio servidor
const safeUrl = (v) => {
  const s = str(v, 500);
  return /^(https?:\/\/|\/uploads\/)/.test(s) ? s : null;
};

// ---------- Upload de imagem ----------
// O tipo enviado pelo navegador pode ser forjado: confere os primeiros bytes do arquivo
async function hasImageSignature(file) {
  const handle = await fs.promises.open(file, 'r');
  try {
    const buf = Buffer.alloc(12);
    await handle.read(buf, 0, 12, 0);
    const jpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
    const png = buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    const webp = buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP';
    return jpeg || png || webp;
  } finally {
    await handle.close();
  }
}

router.post('/upload', (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      const text = err.code === 'LIMIT_FILE_SIZE' ? 'A imagem tem mais de 3 MB' : err.message;
      return res.status(400).json({ error: text });
    }
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    try {
      if (!(await hasImageSignature(req.file.path))) {
        await fs.promises.unlink(req.file.path).catch(() => {});
        return res.status(400).json({ error: 'O arquivo não é uma imagem válida' });
      }
      res.json({ url: `/uploads/${req.file.filename}` });
    } catch (e) { fail(res, e); }
  });
});

// ---------- Agendamentos ----------
const STATUS = ['PENDING', 'CONFIRMED', 'DONE', 'CANCELED'];
const PAYMENT = ['UNPAID', 'PAID'];

router.get('/appointments', async (req, res) => {
  try {
    const where = {};
    if (STATUS.includes(req.query.status)) where.status = req.query.status;
    res.json(await prisma.appointment.findMany({ where, orderBy: [{ date: 'asc' }, { time: 'asc' }] }));
  } catch (e) { fail(res, e); }
});

router.patch('/appointments/:id', async (req, res) => {
  try {
    const data = {};
    if (STATUS.includes(req.body?.status)) data.status = req.body.status;
    if (PAYMENT.includes(req.body?.paymentStatus)) data.paymentStatus = req.body.paymentStatus;
    if (!Object.keys(data).length) return res.status(400).json({ error: 'Nada para atualizar' });
    res.json(await prisma.appointment.update({ where: { id: id(req) }, data }));
  } catch (e) { fail(res, e); }
});

router.delete('/appointments/:id', async (req, res) => {
  try {
    await prisma.appointment.delete({ where: { id: id(req) } });
    res.status(204).end();
  } catch (e) { fail(res, e); }
});

// ---------- Disponibilidade ----------
const isDate = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
const isTime = (v) => typeof v === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);

router.get('/availability', async (req, res) => {
  try {
    res.json(await prisma.availability.findMany({ orderBy: { date: 'asc' } }));
  } catch (e) { fail(res, e); }
});

router.post('/availability', async (req, res) => {
  try {
    const b = req.body || {};
    if (!isDate(b.date)) return res.status(400).json({ error: 'Data inválida' });
    const times = Array.isArray(b.times) ? [...new Set(b.times.filter(isTime))].sort() : [];
    if (!times.length) return res.status(400).json({ error: 'Adicione ao menos um horário' });
    res.status(201).json(
      await prisma.availability.upsert({ where: { date: b.date }, update: { times }, create: { date: b.date, times } })
    );
  } catch (e) { fail(res, e); }
});

router.delete('/availability/:id', async (req, res) => {
  try {
    await prisma.availability.delete({ where: { id: id(req) } });
    res.status(204).end();
  } catch (e) { fail(res, e); }
});

// ---------- Planos ----------
const planData = (b) => {
  const name = str(b.name, 80);
  const price = Number(b.price);
  if (!name || !Number.isFinite(price) || price < 0 || price > 100000) return null;
  const features = Array.isArray(b.features)
    ? b.features.map((f) => str(f, 160)).filter(Boolean).slice(0, 20)
    : [];
  return {
    name,
    priceCents: Math.round(price * 100),
    tagline: str(b.tagline, 160),
    popular: b.popular === true,
    active: b.active !== false,
    sortOrder: Number.parseInt(b.sortOrder, 10) || 0,
    features
  };
};
const toPlan = (p) => ({ ...p, price: p.priceCents / 100 });
const slug = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

router.get('/plans', async (req, res) => {
  try {
    res.json((await prisma.plan.findMany({ orderBy: { sortOrder: 'asc' } })).map(toPlan));
  } catch (e) { fail(res, e); }
});

router.post('/plans', async (req, res) => {
  try {
    const data = planData(req.body || {});
    if (!data) return res.status(400).json({ error: 'Informe nome e um valor válido' });
    let planId = slug(data.name) || 'plano';
    if (await prisma.plan.findUnique({ where: { id: planId } })) planId += '-' + Date.now().toString(36);
    res.status(201).json(toPlan(await prisma.plan.create({ data: { id: planId, ...data } })));
  } catch (e) { fail(res, e); }
});

router.put('/plans/:id', async (req, res) => {
  try {
    const data = planData(req.body || {});
    if (!data) return res.status(400).json({ error: 'Informe nome e um valor válido' });
    res.json(toPlan(await prisma.plan.update({ where: { id: req.params.id }, data })));
  } catch (e) { fail(res, e); }
});

router.delete('/plans/:id', async (req, res) => {
  try {
    await prisma.plan.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (e) { fail(res, e); }
});

// ---------- Textos ----------
router.get('/texts', async (req, res) => {
  try {
    const saved = Object.fromEntries((await prisma.siteText.findMany()).map((t) => [t.key, t.value]));
    res.json(TEXT_DEFAULTS.map((t) => ({ ...t, value: saved[t.key] ?? t.value, defaultValue: t.value })));
  } catch (e) { fail(res, e); }
});

router.put('/texts', async (req, res) => {
  try {
    const entries = Object.entries(req.body || {}).filter(([k, v]) => TEXT_KEYS.includes(k) && typeof v === 'string');
    await prisma.$transaction(
      entries.map(([key, value]) => {
        const v = value.trim().slice(0, 600);
        return prisma.siteText.upsert({ where: { key }, update: { value: v }, create: { key, value: v } });
      })
    );
    res.json({ ok: true });
  } catch (e) { fail(res, e); }
});

// ---------- Banners ----------
const bannerData = (b) => {
  const title = str(b.title, 120);
  if (!title) return null;
  return {
    title,
    subtitle: optStr(b.subtitle, 240),
    imageUrl: safeUrl(b.imageUrl),
    linkUrl: safeUrl(b.linkUrl),
    linkLabel: optStr(b.linkLabel, 40),
    active: b.active !== false,
    sortOrder: Number.parseInt(b.sortOrder, 10) || 0
  };
};

router.get('/banners', async (req, res) => {
  try {
    res.json(await prisma.banner.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'desc' }] }));
  } catch (e) { fail(res, e); }
});
router.post('/banners', async (req, res) => {
  try {
    const data = bannerData(req.body || {});
    if (!data) return res.status(400).json({ error: 'Informe o título do banner' });
    res.status(201).json(await prisma.banner.create({ data }));
  } catch (e) { fail(res, e); }
});
router.put('/banners/:id', async (req, res) => {
  try {
    const data = bannerData(req.body || {});
    if (!data) return res.status(400).json({ error: 'Informe o título do banner' });
    res.json(await prisma.banner.update({ where: { id: id(req) }, data }));
  } catch (e) { fail(res, e); }
});
router.delete('/banners/:id', async (req, res) => {
  try {
    await prisma.banner.delete({ where: { id: id(req) } });
    res.status(204).end();
  } catch (e) { fail(res, e); }
});

// ---------- Informativos ----------
const annData = (b) => {
  const title = str(b.title, 120);
  const body = str(b.body, 1200);
  if (!title || !body) return null;
  return { title, body, active: b.active !== false };
};

router.get('/announcements', async (req, res) => {
  try {
    res.json(await prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } }));
  } catch (e) { fail(res, e); }
});
router.post('/announcements', async (req, res) => {
  try {
    const data = annData(req.body || {});
    if (!data) return res.status(400).json({ error: 'Informe título e texto' });
    res.status(201).json(await prisma.announcement.create({ data }));
  } catch (e) { fail(res, e); }
});
router.put('/announcements/:id', async (req, res) => {
  try {
    const data = annData(req.body || {});
    if (!data) return res.status(400).json({ error: 'Informe título e texto' });
    res.json(await prisma.announcement.update({ where: { id: id(req) }, data }));
  } catch (e) { fail(res, e); }
});
router.delete('/announcements/:id', async (req, res) => {
  try {
    await prisma.announcement.delete({ where: { id: id(req) } });
    res.status(204).end();
  } catch (e) { fail(res, e); }
});

// ---------- Métodos de pagamento ----------
router.get('/payment-methods', async (req, res) => {
  try {
    res.json(await prisma.paymentMethod.findMany({ orderBy: { sortOrder: 'asc' } }));
  } catch (e) { fail(res, e); }
});
router.put('/payment-methods/:key', async (req, res) => {
  try {
    const b = req.body || {};
    res.json(
      await prisma.paymentMethod.update({
        where: { key: req.params.key },
        data: { enabled: b.enabled === true, instructions: str(b.instructions, 600) }
      })
    );
  } catch (e) { fail(res, e); }
});

export default router;
