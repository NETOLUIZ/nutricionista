// Textos editáveis do site. `label` aparece no painel; `value` é o padrão (igual ao site atual).
// Use *palavra* para destacar em verde itálico (apenas no título do início).
export const TEXT_DEFAULTS = [
  { key: 'hero_title', label: 'Início — título principal', long: false, value: 'Uma alimentação mais *leve, saudável* e possível para você.' },
  { key: 'hero_subtitle', label: 'Início — frase de apoio', long: true, value: 'Cuide da sua alimentação sem dietas impossíveis e construa uma rotina que realmente combina com a sua vida.' },
  { key: 'services_title', label: 'Planos — título da seção', long: false, value: 'Escolha o pacote ideal para você' },
  { key: 'services_description', label: 'Planos — descrição da seção', long: true, value: 'Planos desenhados para diferentes momentos da sua jornada nutricional — do primeiro passo ao acompanhamento completo.' },
  { key: 'payment_note', label: 'Planos — observação de pagamento', long: false, value: 'Consulte condições de parcelamento.' },
  { key: 'services_cta_title', label: 'Planos — chamada final (título)', long: false, value: 'Seu objetivo merece um plano feito para você.' },
  { key: 'services_cta_text', label: 'Planos — chamada final (texto)', long: true, value: 'Agende seu atendimento e escolha o acompanhamento ideal para você.' },
  { key: 'cta_title', label: 'Final da página — título', long: false, value: 'Seu próximo passo pode começar hoje.' },
  { key: 'cta_subtitle', label: 'Final da página — frase', long: true, value: 'Vamos construir uma alimentação que faça sentido para você?' },
  { key: 'whatsapp', label: 'WhatsApp (somente números com DDI+DDD)', long: false, value: '5585989500225' }
];

export const TEXT_KEYS = TEXT_DEFAULTS.map((t) => t.key);
