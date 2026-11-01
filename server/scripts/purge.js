// Elimina solicitações de agendamento que não viraram atendimento (LGPD: fim do tratamento).
// Simulação por padrão. Para apagar de verdade: npm run purge -- --apply
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const apply = process.argv.includes('--apply');
const days = Number.parseInt(process.env.RETENTION_DAYS, 10) || 180;

const limit = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
// Só canceladas ou nunca confirmadas. Atendimentos confirmados/concluídos NÃO são tocados:
// o prazo de guarda deles depende da regulamentação profissional.
const where = { status: { in: ['CANCELED', 'PENDING'] }, date: { lt: limit } };

async function main() {
  const total = await prisma.appointment.count({ where });
  console.log(`${total} solicitação(ões) canceladas/não confirmadas com data anterior a ${limit}.`);
  if (!apply) {
    console.log('Simulação: nada foi apagado. Use --apply para eliminar.');
    return;
  }
  const { count } = await prisma.appointment.deleteMany({ where });
  console.log(`${count} registro(s) eliminados.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
