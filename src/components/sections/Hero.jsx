import React from 'react';
import { Sparkles, Calendar, ArrowRight, CheckCircle2, Heart, Leaf } from 'lucide-react';

export const Hero = ({ onOpenBooking }) => {
  const scrollToAbout = (e) => {
    e.preventDefault();
    const element = document.querySelector('#sobre');
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '130px',
        paddingBottom: '80px',
        backgroundColor: 'var(--bg-main)',
        overflow: 'hidden'
      }}
    >
      {/* Background Soft Organic Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 240, 210, 0.45) 0%, rgba(250, 250, 246, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-8%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(92, 122, 82, 0.12) 0%, rgba(250, 250, 246, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '56px'
          }}
        >
          {/* Lado Esquerdo: Conteúdo */}
          <div style={{ maxWidth: '580px' }}>
            
            {/* Tag / Badge Minimalista */}
            <div
              className="tag-badge"
              style={{ marginBottom: '24px' }}
            >
              <Sparkles size={14} color="var(--primary)" />
              <span>Nutrição Personalizada & Funcional</span>
            </div>

            {/* Título Principal */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.75rem)',
                lineHeight: 1.15,
                color: 'var(--text-main)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                marginBottom: '24px'
              }}
            >
              Uma alimentação mais <span className="text-gradient" style={{ fontStyle: 'italic' }}>leve, saudável</span> e possível para você.
            </h1>

            {/* Texto de Apoio */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
                color: 'var(--text-body)',
                lineHeight: 1.7,
                marginBottom: '36px',
                fontWeight: 400
              }}
            >
              "Cuide da sua alimentação sem dietas impossíveis e construa uma rotina que realmente combina com a sua vida."
            </p>

            {/* Botões de Ação */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '42px'
              }}
            >
              <button
                onClick={onOpenBooking}
                className="btn-primary"
                style={{ fontSize: '1.02rem', padding: '16px 34px' }}
              >
                <Calendar size={18} />
                <span>Agendar minha consulta</span>
              </button>

              <a
                href="#sobre"
                onClick={scrollToAbout}
                className="btn-secondary"
                style={{ fontSize: '1rem', padding: '16px 28px' }}
              >
                <span>Conhecer meu trabalho</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Destaques / Badges de Confiança */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(46, 94, 32, 0.12)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--primary)" />
                <span>Sem dietas restritivas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--secondary)" />
                <span>Atendimento humanizado</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--accent-gold)" />
                <span>Plano 100% individualizado</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Fotografia & Elementos Orgânicos */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {/* Moldura Orgânica com Formas Curvas e Sombras Sutis */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
              }}
            >
              {/* Backing shape */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-14px -14px -14px -14px',
                  borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%',
                  background: 'linear-gradient(135deg, rgba(232, 240, 210, 0.6) 0%, rgba(92, 122, 82, 0.15) 100%)',
                  zIndex: 0,
                  transform: 'rotate(-2deg)'
                }}
              />

              {/* Imagem Principal */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  boxShadow: '0 24px 64px rgba(26, 42, 22, 0.14)',
                  zIndex: 1,
                  border: '1px solid rgba(255, 255, 255, 0.8)'
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/juliana_hero.jpg`}
                  alt="Juliana Martins - Nutricionista Funcional"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                    transform: 'scale(1.01)',
                    transition: 'transform 0.6s ease'
                  }}
                />
              </div>

              {/* Card Flutuante 1: Depoimento / Reconhecimento */}
              <div
                className="glass-card animate-float"
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-24px',
                  padding: '16px 20px',
                  borderRadius: '20px',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  maxWidth: '280px'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(46, 94, 32, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    flexShrink: 0
                  }}
                >
                  <Heart size={20} fill="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    Cuidado & Acolhimento
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Mais de 500 vidas transformadas
                  </div>
                </div>
              </div>

              {/* Card Flutuante 2: Nutrição Funcional Badge */}
              <div
                className="glass-card"
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '-20px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-pill)',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <Leaf size={16} color="var(--secondary)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  Saúde Integrativa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
