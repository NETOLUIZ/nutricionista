import React from 'react';
import { Sliders, Scale, Users, TrendingUp, Sparkles } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

export const Approach = () => {
  const cards = [
    {
      number: '01',
      title: 'Personalização',
      description: 'Cada pessoa possui uma rotina, objetivos e necessidades diferentes. Seu plano respeita seu paladar, seus horários e suas preferências.',
      icon: Sliders,
      accentColor: 'var(--primary)'
    },
    {
      number: '02',
      title: 'Equilíbrio',
      description: 'Uma alimentação saudável precisa caber na vida real. Sem terrorismo nutricional, sem culpa em momentos sociais e com espaço para o prazer.',
      icon: Scale,
      accentColor: 'var(--secondary)'
    },
    {
      number: '03',
      title: 'Acompanhamento',
      description: 'Você não precisa fazer essa mudança sozinha. Suporte próximo, esclarecimento de dúvidas e ajustes constantes ao longo de todo o processo.',
      icon: Users,
      accentColor: 'var(--accent-gold)'
    },
    {
      number: '04',
      title: 'Resultados',
      description: 'Construção de hábitos sustentáveis a longo prazo. Conquiste sua melhor versão física, mental e metabólica sem o efeito sanfona.',
      icon: TrendingUp,
      accentColor: 'var(--primary-light)'
    }
  ];

  return (
    <section
      id="abordagem"
      style={{
        paddingTop: '100px',
        paddingBottom: '100px',
        backgroundColor: 'var(--bg-main)',
        position: 'relative'
      }}
    >
      <div className="container">
        
        <SectionHeader
          icon={Sparkles}
          badge="Nossa Abordagem"
          title="Uma nova forma de cuidar da sua alimentação"
          description="Princípios claros que transformam a teoria nutricional em hábitos prazerosos e duradouros no seu dia a dia."
          maxWidth="640px"
          marginBottom="60px"
        />

        {/* Grid de 4 Cards Minimalistas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '28px'
          }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.number}
                className="card-solid"
                style={{
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Número Sutil no Topo */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '28px'
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '16px',
                      backgroundColor: 'var(--bg-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: card.accentColor,
                      border: '1px solid rgba(46, 94, 32, 0.1)'
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: 'var(--text-faint)'
                    }}
                  >
                    {card.number}
                  </span>
                </div>

                {/* Título & Descrição */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    color: 'var(--text-main)',
                    fontWeight: 600,
                    marginBottom: '14px'
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.7,
                    marginTop: 'auto'
                  }}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
