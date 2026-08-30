import React, { useState, Component } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Approach } from './components/sections/Approach';
import { Services } from './components/sections/Services';
import { HowItWorks } from './components/sections/HowItWorks';
import { PortalPreview } from './components/sections/PortalPreview';
import { InstagramFeed } from './components/sections/InstagramFeed';
import { Testimonials } from './components/sections/Testimonials';
import { CtaSection } from './components/sections/CtaSection';
import { Footer } from './components/layout/Footer';
import { BookingModal } from './components/interactive/BookingModal';
import { PostDetailModal } from './components/interactive/PostDetailModal';
import { LegalModal } from './components/interactive/LegalModal';
import { CookieConsentBanner } from './components/interactive/CookieConsentBanner';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#FAFAF6', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#2E5E20', marginBottom: '16px' }}>
            Juliana Martins Nutrição
          </h2>
          <p style={{ color: '#3E4A38', maxWidth: '500px', marginBottom: '24px', lineHeight: 1.6 }}>
            Ocorreu um pequeno ajuste na inicialização da página. Clique no botão abaixo para recarregar com segurança.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '14px 28px',
              backgroundColor: '#2E5E20',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Recarregar Página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingService, setSelectedBookingService] = useState(null);
  const [bookingRequestId, setBookingRequestId] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: 'privacy' });

  const handleOpenBooking = (serviceId = null) => {
    setSelectedBookingService(serviceId);
    setBookingRequestId((id) => id + 1);
    setBookingModalOpen(true);
  };

  const handleOpenLegal = (type = 'privacy') => {
    setLegalModalState({ isOpen: true, type });
  };

  return (
    <ErrorBoundary>
      <div className="app-shell">
        {/* Header Fixo Transparente / Sólido no Scroll */}
        <Header onOpenBooking={() => handleOpenBooking()} />

        {/* Conteúdo Principal */}
        <main>
          {/* 1. Hero Section */}
          <Hero onOpenBooking={() => handleOpenBooking()} />

          {/* 2. Sobre Mim */}
          <About />

          {/* 3. Abordagem Nutricional */}
          <Approach />

          {/* 4. Serviços & Consultas */}
          <Services onSelectServiceForBooking={(id) => handleOpenBooking(id)} />

          {/* 5. Como Funciona (Timeline) */}
          <HowItWorks onOpenBooking={() => handleOpenBooking()} />

          {/* 6. Demonstração do Portal / App NutriFlow (SaaS White-Label Experience) */}
          <PortalPreview onOpenBooking={() => handleOpenBooking()} />

          {/* 7. Instagram Feed & Receitas Funcionais */}
          <InstagramFeed onSelectPost={(post) => setSelectedPost(post)} />

          {/* 8. Depoimentos de Pacientes */}
          <Testimonials />

          {/* 9. Chamada para Ação Final (CTA) */}
          <CtaSection onOpenBooking={() => handleOpenBooking()} />
        </main>

        {/* Rodapé */}
        <Footer onOpenLegal={(type) => handleOpenLegal(type)} />

        {/* Modais Interativos */}
        <BookingModal
          key={bookingRequestId}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          initialServiceId={selectedBookingService}
        />

        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />

        <LegalModal
          type={legalModalState.type}
          isOpen={legalModalState.isOpen}
          onClose={() => setLegalModalState({ isOpen: false, type: 'privacy' })}
        />

        {/* Banner de Cookies & LGPD */}
        <CookieConsentBanner onOpenPrivacy={() => handleOpenLegal('privacy')} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
