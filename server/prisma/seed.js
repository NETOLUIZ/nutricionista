import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const plans = [
  { id: 'pacote-essencial', name: 'Pacote Essencial', priceCents: 29999, tagline: 'Ideal para quem deseja começar.', popular: false, features: ['Avaliação nutricional', 'Consulta nutricional', 'Plano alimentar individualizado', 'Interpretação de exames', 'Orientações nutricionais personalizadas'] },
  { id: 'pacote-equilibrio', name: 'Pacote Equilíbrio', priceCents: 37999, tagline: 'Ideal para quem busca constância e acompanhamento.', popular: true, features: ['Avaliação nutricional', 'Consulta inicial', 'Plano alimentar personalizado', 'Interpretação de exames', '1 retorno para acompanhamento', 'Ajustes no plano alimentar', 'Suporte para dúvidas'] },
  { id: 'personal-diet', name: 'Personal Diet', priceCents: 49999, tagline: 'Ideal para quem precisa de praticidade e organização.', popular: false, features: ['Avaliação das necessidades alimentares', 'Planejamento personalizado', 'Organização das refeições', 'Lista/organização de compras', 'Orientações para escolha dos alimentos', 'Estratégias para facilitar a rotina alimentar'] },
  { id: 'pacote-transformacao', name: 'Pacote Transformação', priceCents: 74999, tagline: 'Ideal para quem deseja um acompanhamento mais completo.', popular: false, features: ['Avaliação nutricional completa', 'Consulta inicial', 'Plano alimentar individualizado', 'Interpretação de exames', '2 retornos', 'Reavaliações nutricionais', 'Ajustes do plano durante o acompanhamento', 'Estratégias para melhorar a adesão', 'Suporte entre consultas'] }
];

const paymentMethods = [
  { key: 'pix', label: 'Pix', enabled: true, instructions: '', sortOrder: 1 },
  { key: 'credit_card', label: 'Cartão', enabled: true, instructions: '', sortOrder: 2 },
  { key: 'cash', label: 'À vista', enabled: true, instructions: '', sortOrder: 3 }
];

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 8) {
    throw new Error('Defina ADMIN_EMAIL e ADMIN_PASSWORD (mín. 8 caracteres) no .env');
  }
  if (password.length < 10) console.warn('Aviso: use senha com 10+ caracteres; troque em Conta no painel.');

  // Cria o admin só se ainda não existir (não sobrescreve senha)
  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash: await bcrypt.hash(password, 12) }
  });

  // Planos e métodos: só preenche se a tabela estiver vazia (não sobrescreve edições)
  if ((await prisma.plan.count()) === 0) {
    await prisma.plan.createMany({ data: plans.map((p, i) => ({ ...p, sortOrder: i })) });
  }
  if ((await prisma.paymentMethod.count()) === 0) {
    await prisma.paymentMethod.createMany({ data: paymentMethods });
  }
  console.log('Seed concluído.');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
