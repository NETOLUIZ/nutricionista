import React from 'react';
import { testimonialsData } from '../../data/testimonialsData';
import { Star, Sparkles } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

export const Testimonials = () => {
  return (
    <section
      id="depoimentos"
      style={{
        paddingTop: '110px',
        paddingBottom: '110px',
        backgroundColor: 'var(--bg-subtle)',
        position: 'relative'
      }}
    >
      <div className="container">
        
        <SectionHeader
          icon={Sparkles}
          badge="Depoimentos"
          title="Histórias reais. Mudanças reais."
          description="A transformação de quem redescobriu a saúde, a autoestima e a leveza com a nutrição funcional."
        />

        {/* Grid de Depoimentos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}
        >
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="card-solid"
              style={{
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '24px',
                position: 'relative'
              }}
            >
              {/* Topo do Card: Estrelas & Badge da Queixa Tratada */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#E5A84B" color="#E5A84B" />
                  ))}
                </div>

                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: 'var(--secondary)',
                    backgroundColor: 'var(--secondary-faint)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)'
                  }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Texto do Depoimento */}
              <p
                style={{
                  fontSize: '0.96rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  marginBottom: '28px'
                }}
              >
                "{item.text}"
              </p>

              {/* Paciente Info */}
              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-faint)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}
                >
                  {item.name.charAt(0)}
                </div>

                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--text-main)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.role} • {item.timeAgo}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
