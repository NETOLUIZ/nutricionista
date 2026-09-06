export const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const servicesData = [
  {
    id: 'pacote-essencial',
    name: 'Pacote Essencial',
    price: 299.99,
    tagline: 'Ideal para quem deseja começar.',
    popular: false,
    features: [
      'Avaliação nutricional',
      'Consulta nutricional',
      'Plano alimentar individualizado',
      'Interpretação de exames',
      'Orientações nutricionais personalizadas'
    ]
  },
  {
    id: 'pacote-equilibrio',
    name: 'Pacote Equilíbrio',
    price: 379.99,
    tagline: 'Ideal para quem busca constância e acompanhamento.',
    popular: true,
    features: [
      'Avaliação nutricional',
      'Consulta inicial',
      'Plano alimentar personalizado',
      'Interpretação de exames',
      '1 retorno para acompanhamento',
      'Ajustes no plano alimentar',
      'Suporte para dúvidas'
    ]
  },
  {
    id: 'personal-diet',
    name: 'Personal Diet',
    price: 499.99,
    tagline: 'Ideal para quem precisa de praticidade e organização.',
    popular: false,
    features: [
      'Avaliação das necessidades alimentares',
      'Planejamento personalizado',
      'Organização das refeições',
      'Lista/organização de compras',
      'Orientações para escolha dos alimentos',
      'Estratégias para facilitar a rotina alimentar'
    ]
  },
  {
    id: 'pacote-transformacao',
    name: 'Pacote Transformação',
    price: 749.99,
    tagline: 'Ideal para quem deseja um acompanhamento mais completo.',
    popular: false,
    features: [
      'Avaliação nutricional completa',
      'Consulta inicial',
      'Plano alimentar individualizado',
      'Interpretação de exames',
      '2 retornos',
      'Reavaliações nutricionais',
      'Ajustes do plano durante o acompanhamento',
      'Estratégias para melhorar a adesão',
      'Suporte entre consultas'
    ]
  }
];
