import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { prisma } from '../db.js';
import { TEXT_DEFAULTS } from '../textDefaults.js';

const router = Router();

// Versão da política de privacidade aceita pelo paciente (mesma data de src/data/legalData.js)
const PRIVACY_VERSION = '2026-11-01';

const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas solicitações. Tente novamente mais tarde.' }
});

const isDate = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
const isTime = (v) => typeof v === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// Tudo que o site público precisa, em uma chamada
router.get('/site', async (req, res) => {
  try {
    const [plans, texts, banners, announcements, paymentMethods] = await Promise.all([
      prisma.plan.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } }),
      prisma.siteText.findMany(),
      prisma.banner.findMany({ where: { active: true }, orderBy: [{ sortOrder: 'asc' }, { id: 'desc' }] }),
      prisma.announcement.findMany({ where: { active: true }, orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.paymentMethod.findMany({ where: { enabled: true }, orderBy: { sortOrder: 'asc' } })
    ]);
    const merged = Object.fromEntries(TEXT_DEFAULTS.map((t) => [t.key, t.value]));
    for (const t of texts) if (t.key in merged) merged[t.key] = t.value;
    res.json({
      plans: plans.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.priceCents / 100,
        tagline: p.tagline,
        popular: p.popular,
        features: p.features
      })),
      texts: merged,
      banners,
      announcements,
      paymentMethods: paymentMethods.map(({ key, label, instructions }) => ({ key, label, instructions }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Horários já ocupados em uma data (para desabilitar no formulário)
router.get('/booked', async (req, res) => {
  try {
    if (!isDate(req.query.date)) return res.status(400).json({ error: 'Data inválida' });
    const rows = await prisma.appointment.findMany({
      where: { date: req.query.date, status: { not: 'CANCELED' } },
      select: { time: true }
    });
    res.json(rows.map((r) => r.time));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

router.post('/appointments', bookingLimiter, async (req, res) => {
  try {
    const b = req.body || {};
    const patientName = clean(b.patientName, 120);
    const whatsapp = clean(b.whatsapp, 30);
    if (!patientName || whatsapp.replace(/\D/g, '').length < 10) {
      return res.status(400).json({ error: 'Informe nome e WhatsApp válidos' });
    }
    if (b.lgpdConsent !== true) {
      return res.status(400).json({ error: 'É necessário aceitar o termo de consentimento' });
    }
    if (!isDate(b.date) || !isTime(b.time) || !['online', 'presencial'].includes(b.modality)) {
      return res.status(400).json({ error: 'Data, horário ou modalidade inválidos' });
    }
    if (b.date < new Date().toISOString().slice(0, 10)) {
      return res.status(400).json({ error: 'Escolha uma data futura' });
    }
    // preço e nome vêm sempre do banco, nunca do cliente
    const plan = await prisma.plan.findFirst({ where: { id: String(b.planId), active: true } });
    if (!plan) return res.status(400).json({ error: 'Plano inválido' });

    const taken = await prisma.appointment.findFirst({
      where: { date: b.date, time: b.time, status: { not: 'CANCELED' } }
    });
    if (taken) return res.status(409).json({ error: 'Este horário acabou de ser reservado. Escolha outro.' });

    const appointment = await prisma.appointment.create({
      data: {
        planId: plan.id,
        planName: plan.name,
        priceCents: plan.priceCents,
        modality: b.modality,
        date: b.date,
        time: b.time,
        patientName,
        whatsapp,
        email: clean(b.email, 160) || null,
        goal: clean(b.goal, 500) || null,
        consentAt: new Date(),
        consentVersion: PRIVACY_VERSION
      }
    });
    res.status(201).json({ id: appointment.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

export default router;
