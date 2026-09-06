import React from 'react';
import { HeartHandshake } from 'lucide-react';

export const About = () => {
  return (
    <section
      id="sobre"
      style={{
        paddingTop: '110px',
        paddingBottom: '110px',
        backgroundColor: 'var(--bg-surface)',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '64px'
          }}
        >
          {/* Lado Esquerdo: Imagem com visual editorial de atendimento */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(26, 42, 22, 0.08)',
                border: '1px solid rgba(46, 94, 32, 0.1)'
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/juliana_about.jpg`}
                alt="Juliana Martins em atendimento de nutrição funcional"
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Elemento de Fundo Minimalista */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '2px dashed rgba(167, 201, 87, 0.4)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Lado Direito: Texto & Filosofia de Atendimento */}
          <div>
            <div
              className="tag-badge-secondary tag-badge"
              style={{ marginBottom: '18px' }}
            >
              <HeartHandshake size={14} color="var(--secondary)" />
              <span>Prazer, sou Juliana</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                color: 'var(--text-main)',
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: '24px'
              }}
            >
              Nutrição sem complicação.
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                color: 'var(--text-body)',
                fontSize: '1.02rem',
                lineHeight: 1.75,
                marginBottom: '36px'
              }}
            >
              <p>
                Acredito que comer bem não deve ser um peso, uma fonte de culpa ou uma lista interminável de proibições. Meu propósito é te ajudar a recuperar o prazer de se alimentar com consciência, saúde e liberdade.
              </p>
              <p>
                Com formação especializada em <strong>Nutrição Funcional</strong>, investigo a individualidade bioquímica de cada paciente: seu intestino, sua imunidade, seus níveis hormonais e a sua rotina real. Não entrego dietas prontas de gaveta — construímos juntos um estilo de vida sustentável.
              </p>
            </div>

            {/* Indicadores Visuais / Métricas Elegantes */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                paddingTop: '28px',
                borderTop: '1px solid rgba(46, 94, 32, 0.12)'
              }}
            >
              {/* Stat 1 */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    lineHeight: 1
                  }}
                >
                  +500
                </div>
                <div
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    marginTop: '6px',
                    fontWeight: 500
                  }}
                >
                  Pacientes atendidos
                </div>
              </div>

              {/* Stat 2 */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
                    fontWeight: 700,
                    color: 'var(--secondary)',
                    lineHeight: 1
                  }}
                >
                  8+
                </div>
                <div
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    marginTop: '6px',
                    fontWeight: 500
                  }}
                >
                  Anos de experiência
                </div>
              </div>

              {/* Stat 3 */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
                    fontWeight: 700,
                    color: 'var(--accent-gold)',
                    lineHeight: 1
                  }}
                >
                  100%
                </div>
                <div
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    marginTop: '6px',
                    fontWeight: 500
                  }}
                >
                  Atendimento personalizado
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
