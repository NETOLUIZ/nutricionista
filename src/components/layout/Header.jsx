import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, ChevronRight } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';

export const Header = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre mim', href: '#sobre' },
    { label: 'Abordagem', href: '#abordagem' },
    { label: 'Atendimento', href: '#servicos' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Conteúdos', href: '#conteudos' },
    { label: 'Depoimentos', href: '#depoimentos' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingTop: isScrolled ? '14px' : '20px',
        paddingBottom: isScrolled ? '14px' : '20px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        backgroundColor: isScrolled ? 'rgba(250, 250, 246, 0.92)' : 'transparent',
        borderBottom: isScrolled ? '1px solid rgba(46, 94, 32, 0.1)' : '1px solid transparent',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none'
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.1
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                letterSpacing: '-0.02em'
              }}
            >
              Juliana Martins
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                fontWeight: 600,
                marginTop: '2px'
              }}
            >
              Nutrição Funcional
            </span>
          </a>

          {/* Desktop Nav */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav-container"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-body)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'var(--transition)',
                  position: 'relative',
                  padding: '4px 0'
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-body)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => onOpenBooking()}
              className="btn-primary"
              style={{
                padding: '10px 22px',
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <Calendar size={16} />
              <span>Agendar consulta</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(46, 94, 32, 0.08)',
                border: '1px solid rgba(46, 94, 32, 0.15)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(250, 250, 246, 0.98)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '30px 24px',
            gap: '20px',
            zIndex: 90,
            overflowY: 'auto',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text-main)',
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 500,
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(46, 94, 32, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{link.label}</span>
                <ChevronRight size={18} color="var(--primary)" />
              </a>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              <Calendar size={18} />
              <span>Agendar consulta agora</span>
            </button>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', marginTop: '10px' }}>
              <a
                href="https://www.instagram.com/julianamartins_nutri/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                <InstagramIcon size={16} color="var(--primary)" />
                <span>@julianamartins_nutri</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Media query for desktop navigation toggle */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav-container {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
