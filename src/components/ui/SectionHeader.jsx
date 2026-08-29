import React from 'react';

export const SectionHeader = ({ icon: Icon, badge, title, description, maxWidth = '640px', marginBottom = '64px' }) => {
  return (
    <div style={{ textAlign: 'center', maxWidth, margin: `0 auto ${marginBottom}` }}>
      <div className="tag-badge" style={{ marginBottom: '16px' }}>
        {Icon && <Icon size={14} color="var(--primary)" />}
        <span>{badge}</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
          color: 'var(--text-main)',
          fontWeight: 600,
          lineHeight: 1.2
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            marginTop: '16px',
            lineHeight: 1.6
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
