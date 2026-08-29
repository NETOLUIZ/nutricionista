import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { privacyPolicy, termsOfUse } from '../../data/legalData';
import { Modal } from '../ui/Modal';

export const LegalModal = ({ type, isOpen, onClose }) => {
  const data = type === 'privacy' ? privacyPolicy : termsOfUse;

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentStyle={{ maxWidth: '760px', padding: '36px' }}>
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px'
          }}
          aria-label="Fechar"
        >
          <X size={22} />
        </button>

        {/* Cabeçalho */}
        <div style={{ marginBottom: '28px' }}>
          <div className="tag-badge" style={{ marginBottom: '10px' }}>
            <ShieldCheck size={14} color="var(--primary)" />
            <span>Segurança & Conformidade Legal</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.75rem',
              color: 'var(--text-main)',
              fontWeight: 600,
              marginBottom: '6px'
            }}
          >
            {data.title}
          </h3>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Última atualização: {data.lastUpdated} • Protegido pela Lei Federal nº 13.709/2018 (LGPD)
          </div>
        </div>

        {/* Seções de Texto Jurídico */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxHeight: '55vh',
            overflowY: 'auto',
            paddingRight: '12px'
          }}
        >
          {data.sections.map((section, idx) => (
            <div key={idx} style={{ backgroundColor: 'var(--bg-main)', padding: '20px', borderRadius: '16px' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '10px' }}>
                {section.title}
              </h4>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé do Modal */}
        <div style={{ marginTop: '28px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            className="btn-primary"
            style={{ padding: '10px 24px', fontSize: '0.88rem' }}
          >
            <span>Entendi e Concordo</span>
          </button>
        </div>
    </Modal>
  );
};
