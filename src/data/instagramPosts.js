export const instagramPosts = [
  {
    id: 'post-1',
    type: 'recipe',
    badge: 'Receita Funcional',
    title: 'Bowl Antioxidante & Anti-inflamatório',
    caption: 'Começando o dia nutrindo as mitocôndrias e fortalecendo a microbiota com polifenóis e gorduras boas. Uma opção rápida, densa em nutrientes e sem pico glicêmico! 🥣✨',
    image: `${import.meta.env.BASE_URL}images/post_bowl.jpg`,
    likes: '1.428',
    comments: '89',
    prepTime: '8 min',
    ingredients: [
      '1/2 xícara de mirtilos ou frutas vermelhas frescas',
      '1 colher de sopa de sementes de chia e cânhamo',
      '1 dose de proteína vegetal de baunilha ou peptídeos de colágeno',
      '150ml de leite vegetal de amêndoas sem açúcar',
      'Fatias de figo fresco e flores comestíveis para finalizar',
      '1 fatia de pão de fermentação natural com abacate amassado e microverdes'
    ],
    instructions: [
      'Bata as frutas vermelhas congeladas com a proteína vegetal e o leite de amêndoas até obter textura cremosa de sorbet.',
      'Despeje na tigela e salpique as sementes de chia, figo e microverdes.',
      'Acompanhe com o toast de sourdough e abacate temperado com azeite extravirgem e flor de sal.'
    ],
    functionalBenefits: 'Rico em antocianinas, ácidos graxos monoinsaturados e fibras prebióticas que auxiliam na integridade da barreira intestinal.'
  },
  {
    id: 'post-2',
    type: 'quote',
    badge: 'Reflexão & Mindset',
    title: 'Saúde não é sobre privação',
    caption: 'Comer bem não é sobre o que você precisa cortar, mas sobre o quanto de nutrição você é capaz de somar ao seu prato todos os dias. 🌿',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    likes: '2.150',
    comments: '142',
    quoteAuthor: 'Juliana Martins',
    fullContent: 'Quando mudamos a perspectiva de "o que é proibido" para "como meu corpo se sente nutrido", a constância deixa de ser um sacrifício e vira um ato genuíno de autocuidado. Você não precisa de uma dieta que dure 30 dias; você precisa de uma rotina alimentar que você consiga sustentar pelos próximos 30 anos.'
  },
  {
    id: 'post-3',
    type: 'science',
    badge: 'Nutrição Funcional',
    title: 'O Eixo Intestino-Cérebro & Ansiedade',
    caption: 'Você sabia que mais de 80% da serotonina é produzida no trato gastrointestinal? Cuidar da sua digestão é cuidar das suas emoções. 🧠✨',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    likes: '1.870',
    comments: '116',
    keyTakeaways: [
      'Disbiose intestinal altera a produção de neurotransmissores como GABA e serotonina.',
      'Sintomas como estufamento crônico e névoa mental costumam andar juntos.',
      'Alimentos ricos em triptofano, magnésio e fibras são fundamentais para o equilíbrio do humor.'
    ],
    fullContent: 'Na nutrição funcional e ortomolecular, investigamos a causa raiz da ansiedade e da fadiga. Pequenas modulações na microbiota e reposição de cofatores enzimáticos (vitaminas do complexo B, zinco e magnésio) transformam a clareza mental e a disposição.'
  },
  {
    id: 'post-4',
    type: 'recipe',
    badge: 'Almoço Prático',
    title: 'Salmão Selvagem com Legumes Assados & Ervas',
    caption: 'Refeição rica em Ômega-3 EPA/DHA para modular processos inflamatórios e dar saciedade prolongada sem sensação de peso. 🐟🥑',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    likes: '1.630',
    comments: '74',
    prepTime: '20 min',
    ingredients: [
      '1 filé de salmão fresco (180g)',
      '1 xícara de cubos de batata-doce ou abóbora cabotiá',
      'Abobrinha em tiras e tomates sweet grape',
      'Azeite de oliva extravirgem prensado a frio',
      'Ramos de alecrim fresco, tomilho e sementes de romã'
    ],
    instructions: [
      'Tempere os legumes com azeite, ervas frescas, sal marinho e leve à assadeira por 15 minutos a 200°C.',
      'Grelhe o salmão na frigideira com um fio de azeite por 3 a 4 minutos de cada lado até ficar suculento.',
      'Monte o prato com folhas verdes escuras e finalize com sementes de romã.'
    ],
    functionalBenefits: 'Potente ação anti-inflamatória sistêmica, suporte cardiovascular e melhora da sensibilidade à insulina.'
  },
  {
    id: 'post-5',
    type: 'routine',
    badge: 'Rotina & Hábitos',
    title: 'Shot Matinal: Mito ou Aliado?',
    caption: 'Como usar a fitoterapia e os compostos bioativos a favor da sua digestão logo ao acordar. 🍋🌿',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    likes: '3.120',
    comments: '205',
    fullContent: 'O shot matinal não faz milagre sozinho, mas estimula a secreção do ácido clorídrico no estômago, ativa enzimas pancreáticas e fornece antioxidantes como a curcumina e o gingerol. Excelente para quem acorda com digestão lenta ou inchaço.'
  },
  {
    id: 'post-6',
    type: 'education',
    badge: 'Exames & Bioquímica',
    title: 'Valores Ideais vs. Valores de Referência',
    caption: 'Estar dentro da referência do laboratório nem sempre significa saúde ótima. Entenda a diferença entre não estar doente e ter vitalidade plena!',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    likes: '2.840',
    comments: '198',
    fullContent: 'Na nutrição funcional, buscamos faixas ótimas de nutrientes (Ferritina, Vitamina D, B12, Zinco, Homocisteína). O objetivo não é apenas evitar deficiências clínicas graves, mas garantir que todas as reações metabólicas do seu organismo funcionem no potencial máximo.'
  }
];
