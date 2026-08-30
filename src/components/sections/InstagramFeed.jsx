import React from 'react';
import { instagramPosts } from '../../data/instagramPosts';
import { Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';
import { SectionHeader } from '../ui/SectionHeader';

export const InstagramFeed = ({ onSelectPost }) => {
  return (
    <section
      id="conteudos"
      style={{
        paddingTop: '110px',
        paddingBottom: '110px',
        backgroundColor: 'var(--bg-surface)',
        position: 'relative'
      }}
    >
      <div className="container">
        
        <SectionHeader
          icon={InstagramIcon}
          badge="@julianamartins_nutri"
          title="Conteúdos para deixar sua alimentação mais leve"
          description="Dicas práticas, receitas funcionais e ciência descomplicada compartilhadas diariamente no meu feed."
          maxWidth="680px"
        />

        {/* Grid de 6 Publicações Interativas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px'
          }}
        >
          {instagramPosts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => onSelectPost(post)}
              className="card-solid"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'var(--transition)',
                width: '100%',
                textAlign: 'left',
                padding: 0,
                fontFamily: 'inherit'
              }}
            >
              {/* Imagem com Overlay e Zoom no Hover */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '85%',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-main)'
                }}
                className="post-image-container"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  className="post-img"
                />

                {/* Badge Flutuante no Topo da Imagem */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                  }}
                >
                  {post.badge}
                </div>

                {/* Hover Overlay com Likes e Comentários */}
                <div
                  className="post-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(20, 28, 17, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '24px',
                    color: '#FFFFFF',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.92rem' }}>
                    <Heart size={18} fill="#FFFFFF" />
                    <span>{post.likes}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.92rem' }}>
                    <MessageCircle size={18} fill="#FFFFFF" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Informações do Post */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--text-main)',
                    fontWeight: 600,
                    marginBottom: '10px',
                    lineHeight: 1.3
                  }}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '18px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {post.caption}
                </p>

                <div
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem',
                    color: 'var(--primary)',
                    fontWeight: 600
                  }}
                >
                  <span>{post.type === 'recipe' ? 'Ver receita completa' : 'Ler publicação completa'}</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Botão Ver Mais no Instagram */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <a
            href="https://www.instagram.com/julianamartins_nutri/"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ padding: '15px 32px' }}
          >
            <InstagramIcon size={18} color="var(--primary)" />
            <span>Acompanhar no Instagram @julianamartins_nutri</span>
          </a>
        </div>
      </div>

      <style>{`
        .post-image-container:hover .post-img {
          transform: scale(1.06);
        }
        .post-image-container:hover .post-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};
