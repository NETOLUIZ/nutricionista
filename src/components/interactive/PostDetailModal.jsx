import React from 'react';
import { X, Utensils } from 'lucide-react';
import { Modal } from '../ui/Modal';

export const PostDetailModal = ({ post, onClose }) => {
  return (
    <Modal
      isOpen={!!post}
      onClose={onClose}
      contentStyle={{ maxWidth: '640px', padding: '0', overflow: 'hidden' }}
    >
      {post && (
        <>
        {/* Imagem de Topo */}
        <div style={{ position: 'relative', width: '100%', height: '260px' }}>
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              backdropFilter: 'blur(6px)'
            }}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>

          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '4px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--primary)'
            }}
          >
            {post.badge}
          </div>
        </div>

        {/* Conteúdo Detalhado */}
        <div style={{ padding: '28px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              color: 'var(--text-main)',
              marginBottom: '12px',
              fontWeight: 600
            }}
          >
            {post.title}
          </h3>

          <p style={{ fontSize: '0.94rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '24px' }}>
            {post.caption}
          </p>

          {/* Caso seja Receita: Ingredientes e Modo de Preparo */}
          {post.type === 'recipe' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: 'var(--bg-main)', padding: '18px 20px', borderRadius: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px', fontSize: '0.92rem' }}>
                  <Utensils size={18} />
                  <span>Ingredientes Selecionados:</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-body)' }}>
                  {post.ingredients.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong style={{ fontSize: '0.94rem', color: 'var(--text-main)', display: 'block', marginBottom: '10px' }}>
                  Modo de Preparo:
                </strong>
                <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-body)' }}>
                  {post.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              {post.functionalBenefits && (
                <div style={{ padding: '14px 18px', borderRadius: '12px', backgroundColor: 'var(--secondary-faint)', border: '1px solid rgba(93, 107, 84, 0.15)', fontSize: '0.84rem', color: 'var(--secondary)' }}>
                  <strong>🌿 Benefício Funcional:</strong> {post.functionalBenefits}
                </div>
              )}
            </div>
          )}

          {/* Caso seja Artigo Científico / Reflexão */}
          {post.fullContent && (
            <div style={{ backgroundColor: 'var(--bg-main)', padding: '20px', borderRadius: '16px', marginBottom: '24px', fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.7 }}>
              {post.fullContent}
            </div>
          )}

          {/* Rodapé do Modal */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <span>❤️ {post.likes} curtidas</span>
              <span>💬 {post.comments} comentários</span>
            </div>

            <a
              href="https://www.instagram.com/julianamartins_nutri/"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <span>Ver no Instagram</span>
            </a>
          </div>
        </div>
        </>
      )}
    </Modal>
  );
};
