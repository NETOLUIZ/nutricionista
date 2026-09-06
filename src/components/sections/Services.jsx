import React from 'react';
import { servicesData, formatPrice } from '../../data/servicesData';
import { Calendar, Check, Star, Wallet, MapPin, Video, QrCode, CreditCard, Banknote } from 'lucide-react';
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
          icon={Wallet}
          badge="Tabela de Investimento"
          title="Escolha o pacote ideal para você"
          description="Planos desenhados para diferentes momentos da sua jornada nutricional — do primeiro passo ao acompanhamento completo."
          maxWidth="680px"
        />

        {/* Grid de Pacotes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px',
            paddingTop: '8px'
          }}
        >
          {servicesData.map((pkg) => (
            <div
              key={pkg.id}
              className="card-solid"
              style={{
                padding: '40px 28px 32px',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '24px',
                position: 'relative',
                border: pkg.popular ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                boxShadow: pkg.popular ? 'var(--shadow-hover)' : 'var(--shadow-sm)'
              }}
            >
              {pkg.popular && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 6px 16px rgba(46, 94, 32, 0.35)'
                  }}
                >
                  <Star size={13} fill="#FFFFFF" />
                  <span>Mais Popular</span>
                </span>
              )}

              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '10px'
                }}
              >
                Investimento
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  marginBottom: '14px'
                }}
              >
                {pkg.name}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.9rem, 2.4vw, 2.3rem)',
                  fontWeight: 700,
                  color: pkg.popular ? 'var(--primary)' : 'var(--text-main)',
                  lineHeight: 1,
                  marginBottom: '14px'
                }}
              >
                {formatPrice(pkg.price)}
              </div>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--secondary)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  marginBottom: '24px'
                }}
              >
                {pkg.tagline}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '32px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-subtle)',
                  flexGrow: 1
                }}
              >
                {pkg.features.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: 'var(--text-body)' }}>
                    <Check size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onSelectServiceForBooking(pkg.id)}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '13px 20px',
                  fontSize: '0.92rem',
                  minHeight: '44px'
                }}
              >
                <Calendar size={16} />
                <span>Agendar este pacote</span>
              </button>
            </div>
          ))}
        </div>

        {/* Modalidades & Formas de Pagamento */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            marginTop: '64px'
          }}
        >
          {/* Modalidades */}
          <div className="card-solid" style={{ padding: '32px', borderRadius: '24px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.2rem',
                color: 'var(--text-main)',
                fontWeight: 600,
                marginBottom: '20px'
              }}
            >
              Modalidades
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--primary-faint)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.96rem', color: 'var(--text-main)', marginBottom: '2px' }}>
                    Atendimento presencial
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                    Conforme disponibilidade de agenda
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    backgroundColor: 'var(--secondary-faint)',
                    color: 'var(--secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Video size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.96rem', color: 'var(--text-main)', marginBottom: '2px' }}>
                    Atendimento online
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                    De onde você estiver, com acompanhamento individualizado
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formas de Pagamento */}
          <div className="card-solid" style={{ padding: '32px', borderRadius: '24px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.2rem',
                color: 'var(--text-main)',
                fontWeight: 600,
                marginBottom: '20px'
              }}
            >
              Formas de Pagamento
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
              {[
                { label: 'Pix', icon: QrCode },
                { label: 'Cartão', icon: CreditCard },
                { label: 'À vista', icon: Banknote }
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <span
                    key={method.label}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      minHeight: '44px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'var(--bg-main)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  >
                    <Icon size={16} color="var(--primary)" />
                    {method.label}
                  </span>
                );
              })}
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Consulte condições de parcelamento.
            </p>
          </div>
        </div>

        {/* CTA Final em Destaque */}
        <div
          style={{
            marginTop: '64px',
            backgroundColor: 'var(--bg-dark)',
            borderRadius: '32px',
            padding: '56px 32px',
            textAlign: 'center'
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 600,
              color: 'var(--text-on-dark)',
              marginBottom: '14px',
              lineHeight: 1.25
            }}
          >
            Seu objetivo merece um plano feito para você.
          </h3>
          <p
            style={{
              fontSize: '1.02rem',
              color: 'var(--text-on-dark)',
              opacity: 0.85,
              marginBottom: '32px'
            }}
          >
            Agende seu atendimento e escolha o acompanhamento ideal para você.
          </p>
          <button
            type="button"
            onClick={() => onSelectServiceForBooking()}
            className="btn-primary"
            style={{ padding: '15px 34px', fontSize: '1rem', minHeight: '44px' }}
          >
            <Calendar size={18} />
            <span>Agendar meu atendimento</span>
          </button>
        </div>
      </div>
    </section>
  );
};
