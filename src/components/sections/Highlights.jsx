import React from 'react';
import { ArrowRight, Megaphone } from 'lucide-react';
import { useSiteData } from '../../lib/SiteData';
import { assetUrl } from '../../lib/api';

// Banners e informativos publicados pela nutricionista no painel. Some se não houver nada.
export const Highlights = () => {
  const { banners, announcements } = useSiteData();
  if (!banners.length && !announcements.length) return null;

  return (
    <section id="novidades" style={{ paddingTop: '64px', paddingBottom: '64px', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container" style={{ display: 'grid', gap: '32px' }}>
        {banners.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {banners.map((b) => (
              <article
                key={b.id}
                className="card-solid"
                style={{ borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {b.imageUrl && (
                  <img
                    src={assetUrl(b.imageUrl)}
                    alt=""
                    loading="lazy"
                    style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }}
                  />
                )}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-main)', fontWeight: 600 }}>{b.title}</h3>
                  {b.subtitle && <p style={{ fontSize: '0.95rem', color: 'var(--text-body)' }}>{b.subtitle}</p>}
                  {b.linkUrl && (
                    <a
                      href={b.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ marginTop: 'auto', alignSelf: 'flex-start', minHeight: '44px' }}
                    >
                      <span>{b.linkLabel || 'Saiba mais'}</span>
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {announcements.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {announcements.map((a) => (
              <article
                key={a.id}
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '8px' }}>
                  <Megaphone size={18} aria-hidden="true" />
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{a.title}</h3>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', whiteSpace: 'pre-line' }}>{a.body}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
