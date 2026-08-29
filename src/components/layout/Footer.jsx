import { MessageCircle, ShieldCheck, ArrowUp, MapPin, Mail, Clock } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';

export const Footer = ({ onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      style={{
        backgroundColor: '#221A17',
        color: '#E8E1DA',
        paddingTop: '80px',
        paddingBottom: '36px',
        borderTop: '1px solid rgba(235, 217, 199, 0.1)',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
            marginBottom: '64px'
          }}
        >
          {/* Coluna 1: Marca & Filosofia */}
          <div>
            <div style={{ marginBottom: '18px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.65rem',
                  fontWeight: 600,
                  color: '#FAF7F2',
                  display: 'block'
                }}
              >
                Juliana Martins
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  fontWeight: 600,
                  display: 'block',
                  marginTop: '2px'
                }}
              >
                Nutrição Funcional & Ortomolecular
              </span>
            </div>

            <p
              style={{
                fontSize: '0.9rem',
                color: '#BDB4AC',
                lineHeight: 1.7,
                marginBottom: '20px'
              }}
            >
              Cuidado individualizado, fundamentado na ciência da nutrição funcional e desenhado para caber na sua vida real. Saúde com leveza, autonomia e constância.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'rgba(201, 150, 101, 0.12)',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(201, 150, 101, 0.25)',
                fontSize: '0.78rem',
                color: 'var(--accent-champagne)'
              }}
            >
              <ShieldCheck size={14} color="var(--accent-gold)" />
              <span>Registro Profissional: CRN-4 18249/P</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: '#FAF7F2',
                marginBottom: '20px',
                letterSpacing: '0.02em'
              }}
            >
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Início', href: '#inicio' },
                { label: 'Sobre a Juliana', href: '#sobre' },
                { label: 'Abordagem Funcional', href: '#abordagem' },
                { label: 'Serviços & Consultas', href: '#servicos' },
                { label: 'Como Funciona', href: '#como-funciona' },
                { label: 'Receitas & Conteúdos', href: '#conteudos' },
                { label: 'Depoimentos de Pacientes', href: '#depoimentos' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    style={{
                      color: '#BDB4AC',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--accent-gold)')}
                    onMouseLeave={(e) => (e.target.style.color = '#BDB4AC')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Atendimento & Horários */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: '#FAF7F2',
                marginBottom: '20px',
                letterSpacing: '0.02em'
              }}
            >
              Atendimento
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem', color: '#BDB4AC' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Consultório Presencial & Teleconsulta Online para todo o Brasil e exterior</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <span>Segunda a Sexta: 08h às 19h</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <span>contato@julianamartinsnutri.com.br</span>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <a
                href="https://www.instagram.com/julianamartins_nutri/"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FAF7F2',
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
                aria-label="Instagram de Juliana Martins"
              >
                <InstagramIcon size={18} />
              </a>

              <a
                href="https://wa.me/5585989500225?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20as%20consultas%20nutricionais."
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FAF7F2',
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--secondary)';
                  e.currentTarget.style.borderColor = 'var(--secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
                aria-label="WhatsApp de Contato"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Coluna 4: Segurança, Privacidade & LGPD */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: '#FAF7F2',
                marginBottom: '20px',
                letterSpacing: '0.02em'
              }}
            >
              Privacidade & Segurança
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#A89F97', lineHeight: 1.6, marginBottom: '16px' }}>
              Garantia de sigilo profissional médico-nutricional e total conformidade com a LGPD (Lei nº 13.709/2018) no tratamento de dados sensíveis de saúde.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => onOpenLegal('privacy')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-gold)',
                  fontSize: '0.86rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--accent-gold)')}
              >
                • Política de Privacidade & LGPD
              </button>
              <button
                onClick={() => onOpenLegal('terms')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-gold)',
                  fontSize: '0.86rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  transition: 'var(--transition)'
                }}
                onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--accent-gold)')}
              >
                • Termos de Uso & Atendimento
              </button>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div
          style={{
            height: '1px',
            background: 'rgba(255, 255, 255, 0.08)',
            marginBottom: '32px'
          }}
        />

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.82rem',
            color: '#8E857E'
          }}
        >
          <div>
            © {new Date().getFullYear()} Juliana Martins Nutrição. Todos os direitos reservados.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>Feito com cuidado & ciência</span>
            <button
              onClick={scrollToTop}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FAF7F2',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
