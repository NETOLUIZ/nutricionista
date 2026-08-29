import React from 'react';
import { servicesData } from '../../data/servicesData';
import { Calendar, Check, Clock, Activity } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

export const Services = ({ onSelectServiceForBooking }) => {
  return (
    <section
      id="servicos"
      style={{
        paddingTop: '110px',
        paddingBottom: '110px',
        backgroundColor: 'var(--bg-surface)',
        position: 'relative'
      }}
    >
      <div className="container">
        
        <SectionHeader
          icon={Activity}
          badge="Planos & Atendimentos"
          title="Como posso te ajudar?"
          description="Modalidades de atendimento desenhadas com base na nutrição funcional e adaptadas para o seu momento de vida."
          maxWidth="680px"
        />

        {/* Grid de Cards de Serviços */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="card-solid"
              style={{
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '24px',
                position: 'relative'
              }}
            >
              {/* Badge do Serviço */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--primary-faint)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(147, 91, 71, 0.15)'
                  }}
                >
                  {service.tag}
                </span>

                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} />
                  {service.duration}
                </span>
              </div>

              {/* Título & Subtítulo */}
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                {service.title}
              </h3>

              <div
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--secondary)',
                  fontWeight: 500,
                  marginBottom: '18px'
                }}
              >
                {service.subtitle}
              </div>

              {/* Descrição */}
              <p
                style={{
                  fontSize: '0.94rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.7,
                  marginBottom: '24px'
                }}
              >
                {service.description}
              </p>

              {/* Lista de Benefícios / Bullets */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '32px',
                  paddingTop: '18px',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                {service.bullets.map((bullet, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: 'var(--text-body)' }}>
                    <Check size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Ação: Agendar este serviço */}
              <div style={{ marginTop: 'auto' }}>
                <button
                  onClick={() => onSelectServiceForBooking(service.id)}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    fontSize: '0.92rem'
                  }}
                >
                  <Calendar size={16} />
                  <span>Agendar este serviço</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
