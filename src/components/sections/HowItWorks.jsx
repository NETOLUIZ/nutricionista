import React from 'react';
import { CalendarCheck, ClipboardList, UtensilsCrossed, Sparkles, MessageSquareHeart } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

export const HowItWorks = ({ onOpenBooking }) => {
  const steps = [
    {
      number: '01',
      title: 'Agende sua consulta',
      description: 'Escolha o melhor dia e horário diretamente no sistema, no modelo presencial ou online.',
      icon: CalendarCheck
    },
    {
      number: '02',
      title: 'Conheça sua rotina',
      description: 'Vamos entender a fundo seus hábitos, histórico de saúde, sinais metabólicos e rotina real.',
      icon: ClipboardList
    },
    {
      number: '03',
      title: 'Receba seu planejamento',
      description: 'Um plano alimentar pensado exclusivamente para você, com receitas práticas e metas claras.',
      icon: UtensilsCrossed
    },
    {
      number: '04',
      title: 'Tenha acompanhamento',
      description: 'Evolua com suporte contínuo, ajuste fino de estratégia e acompanhamento no aplicativo.',
      icon: MessageSquareHeart
    }
  ];

  return (
    <section
      id="como-funciona"
      style={{
        paddingTop: '110px',
        paddingBottom: '110px',
        backgroundColor: 'var(--bg-main)',
        position: 'relative'
      }}
    >
      <div className="container">
        
        <SectionHeader
          icon={Sparkles}
          badge="Passo a Passo"
          title="Como funciona o acompanhamento"
          description="Uma jornada estruturada para que você tenha segurança, clareza e resultados duradouros em cada etapa."
        />

        {/* Timeline (Adaptada para Horizontal em Desktop e Vertical em Mobile) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
            position: 'relative'
          }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="glass-card"
                style={{
                  padding: '36px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '24px',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {/* Número Grande Elegante */}
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    color: 'rgba(147, 91, 71, 0.15)',
                    lineHeight: 1,
                    marginBottom: '12px'
                  }}
                >
                  {step.number}
                </div>

                {/* Ícone */}
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--primary-faint)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    border: '1px solid rgba(147, 91, 71, 0.1)'
                  }}
                >
                  <Icon size={22} />
                </div>

                {/* Título & Descrição */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem',
                    color: 'var(--text-main)',
                    fontWeight: 600,
                    marginBottom: '12px',
                    lineHeight: 1.3
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.7
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Intermediário */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <button
            onClick={onOpenBooking}
            className="btn-primary"
            style={{ padding: '16px 36px', fontSize: '1rem' }}
          >
            <CalendarCheck size={18} />
            <span>Iniciar meu acompanhamento agora</span>
          </button>
        </div>
      </div>
    </section>
  );
};
