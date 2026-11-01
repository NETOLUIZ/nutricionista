import React, { createContext, useContext, useEffect, useState } from 'react';
import { servicesData } from '../data/servicesData';
import { API_URL, hasApi } from './api';

// Mesmos textos padrão do servidor: o site funciona igual sem backend
export const DEFAULT_TEXTS = {
  hero_title: 'Uma alimentação mais *leve, saudável* e possível para você.',
  hero_subtitle: 'Cuide da sua alimentação sem dietas impossíveis e construa uma rotina que realmente combina com a sua vida.',
  services_title: 'Escolha o pacote ideal para você',
  services_description: 'Planos desenhados para diferentes momentos da sua jornada nutricional — do primeiro passo ao acompanhamento completo.',
  payment_note: 'Consulte condições de parcelamento.',
  services_cta_title: 'Seu objetivo merece um plano feito para você.',
  services_cta_text: 'Agende seu atendimento e escolha o acompanhamento ideal para você.',
  cta_title: 'Seu próximo passo pode começar hoje.',
  cta_subtitle: 'Vamos construir uma alimentação que faça sentido para você?',
  whatsapp: '5585989500225'
};

const FALLBACK = { plans: servicesData, texts: DEFAULT_TEXTS, banners: [], announcements: [], paymentMethods: null };

const SiteDataContext = createContext(FALLBACK);
export const useSiteData = () => useContext(SiteDataContext);

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(FALLBACK);

  useEffect(() => {
    if (!hasApi) return undefined;
    const controller = new AbortController();
    fetch(`${API_URL}/api/public/site`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Falha ao carregar'))))
      .then((json) =>
        setData({
          ...FALLBACK,
          ...json,
          plans: json.plans?.length ? json.plans : FALLBACK.plans,
          texts: { ...DEFAULT_TEXTS, ...json.texts }
        })
      )
      .catch(() => { /* mantém os dados estáticos */ });
    return () => controller.abort();
  }, []);

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

// Transforma *palavras* em destaque verde itálico
export function renderHighlight(text) {
  return text.split(/\*(.+?)\*/g).map((part, i) =>
    i % 2 === 1
      ? <span key={i} className="text-gradient" style={{ fontStyle: 'italic' }}>{part}</span>
      : part
  );
}
