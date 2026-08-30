import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

export const CtaSection = ({ onOpenBooking }) => {
  return (
    <section
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        backgroundColor: '#1A2A16',
        color: '#FAFAF6',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Organic Lighting */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(167, 201, 87, 0.18) 0%, rgba(26, 42, 22, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'rgba(232, 240, 210, 0.12)',
              border: '1px solid rgba(232, 240, 210, 0.2)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent-champagne)',
              marginBottom: '24px'
            }}
          >
            <Sparkles size={14} color="var(--accent-gold)" />
            <span>Transformação & Cuidado</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              color: '#FAFAF6',
              marginBottom: '24px'
            }}
          >
            Seu próximo passo pode começar hoje.
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.4vw, 1.25rem)',
              color: '#CBD6C4',
              lineHeight: 1.7,
              marginBottom: '40px',
              fontFamily: 'var(--font-serif-cormorant)',
              fontStyle: 'italic'
            }}
          >
            "Vamos construir uma alimentação que faça sentido para você?"
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenBooking}
              className="btn-primary"
              style={{
                fontSize: '1.05rem',
                padding: '18px 40px',
                backgroundColor: 'var(--primary)',
                boxShadow: '0 8px 30px rgba(46, 94, 32, 0.4)'
              }}
            >
              <Calendar size={18} />
              <span>Agendar consulta agora</span>
            </button>
          </div>

          <div
            style={{
              marginTop: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              fontSize: '0.82rem',
              color: '#A3AD9E',
              flexWrap: 'wrap'
            }}
          >
            <span>🌿 Atendimento acolhedor</span>
            <span>🔒 Sigilo médico e LGPD garantidos</span>
            <span>📱 Acompanhamento contínuo</span>
          </div>
        </div>
      </div>
    </section>
  );
};
