import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const CookieConsentBanner = ({ onOpenPrivacy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('nutriflow_lgpd_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nutriflow_lgpd_consent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        right: '24px',
        maxWidth: '560px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '20px 24px',
        boxShadow: '0 16px 48px rgba(26, 42, 22, 0.15)',
        border: '1px solid rgba(46, 94, 32, 0.15)',
        zIndex: 900,
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-faint)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <ShieldCheck size={20} />
        </div>

        <div style={{ flexGrow: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-main)', marginBottom: '4px' }}>
            Privacidade & Proteção de Dados (LGPD)
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '14px' }}>
            Utilizamos cookies essenciais para oferecer uma experiência personalizada e segura, em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleAccept}
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.82rem' }}
            >
              <span>Aceitar e Continuar</span>
            </button>

            <button
              onClick={() => onOpenPrivacy()}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '4px 0'
              }}
            >
              Ler Política de Privacidade
            </button>
          </div>
        </div>

        <button
          onClick={() => setVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px'
          }}
          aria-label="Fechar banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
