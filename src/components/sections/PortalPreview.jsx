import React, { useState } from 'react';
import { Smartphone, Utensils, FileText, LineChart, MessageSquare, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

export const PortalPreview = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState('mealplan');
  const [metabolicScore, setMetabolicScore] = useState({
    energia: 2,
    digestao: 1,
    sono: 2,
    pele: 1
  });

  const handleScoreChange = (field, val) => {
    setMetabolicScore(prev => ({ ...prev, [field]: Number(val) }));
  };

  const totalScore = Object.values(metabolicScore).reduce((acc, curr) => acc + curr, 0);

  return (
    <section
      id="portal-preview"
      style={{
        paddingTop: '110px',
        paddingBottom: '110px',
        backgroundColor: 'var(--bg-main)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        
        <SectionHeader
          icon={Smartphone}
          badge="Experiência do Paciente"
          title="Seu acompanhamento na palma da mão"
          description="Acesso exclusivo ao seu plano alimentar, receitas, evolução gráfica e questionários funcionais digitalizados direto no seu celular."
          maxWidth="720px"
          marginBottom="60px"
        />

        {/* Mockup Interativo do Portal / App NutriFlow */}
        <div
          className="card-solid"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '36px',
            borderRadius: '32px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 24px 64px rgba(37, 31, 28, 0.08)'
          }}
        >
          {/* Navegação de Abas do Portal */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '20px',
              marginBottom: '28px'
            }}
          >
            {[
              { id: 'mealplan', label: 'Plano Alimentar', icon: Utensils },
              { id: 'questionnaire', label: 'Rastreamento Metabólico', icon: FileText },
              { id: 'evolution', label: 'Evolução Antropométrica', icon: LineChart },
              { id: 'reminders', label: 'Lembretes & Suporte', icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: 'var(--radius-pill)',
                    border: 'none',
                    backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-main)',
                    color: isActive ? '#FFFFFF' : 'var(--text-body)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Conteúdo da Aba 1: Plano Alimentar Interativo */}
          {activeTab === 'mealplan' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div style={{ backgroundColor: 'var(--bg-main)', padding: '24px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.9rem' }}>07:30 • Café da Manhã</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>~380 kcal</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '10px', color: 'var(--text-main)' }}>Bowl de Iogurte de Coco com Berries & Granola Low Carb</h4>
                <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>• 150g Iogurte artesanal de coco</li>
                  <li>• 1 col. de sopa de sementes de chia ativadas</li>
                  <li>• 1/2 xícara de frutas vermelhas frescas</li>
                  <li>• 1 xícara de café com óleo de coco e canela</li>
                </ul>
              </div>

              <div style={{ backgroundColor: 'var(--bg-main)', padding: '24px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--secondary)', fontSize: '0.9rem' }}>12:30 • Almoço Funcional</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>~540 kcal</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '10px', color: 'var(--text-main)' }}>Filé de Tilápia com Purê de Abóbora & Salada Verde</h4>
                <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>• 150g Filé de peixe grelhado com azeite e alecrim</li>
                  <li>• 3 col. de sopa de purê de abóbora cabotiá</li>
                  <li>• Mix de folhas verdes, rúcula e sementes de girassol</li>
                  <li>• Molho de azeite extravirgem e limão siciliano</li>
                </ul>
              </div>

              <div style={{ backgroundColor: 'var(--bg-main)', padding: '24px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--accent-gold)', fontSize: '0.9rem' }}>19:30 • Jantar Restaurador</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>~420 kcal</span>
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '10px', color: 'var(--text-main)' }}>Creme de Legumes com Frango Desfiado & Cúrcuma</h4>
                <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-body)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>• 1 bowl de sopa de abobrinha, cenoura e gengibre</li>
                  <li>• 120g de peito de frango desfiado com ervas</li>
                  <li>• 1 col. de sopa de azeite de oliva cru ao servir</li>
                  <li>• Infusão de camomila com melissa antes de dormir</li>
                </ul>
              </div>
            </div>
          )}

          {/* Conteúdo da Aba 2: Rastreamento Metabólico Pontuado */}
          {activeTab === 'questionnaire' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '16px 20px', backgroundColor: 'var(--primary-faint)', borderRadius: '16px', border: '1px solid rgba(147, 91, 71, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.92rem' }}>Questionário de Rastreamento Metabólico (QRM)</span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Classifique a intensidade dos sintomas de 0 (nunca) a 4 (frequente e grave):</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)' }}>{totalScore} pts</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Score Total</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {[
                  { key: 'energia', label: 'Cansaço / Fadiga ao acordar' },
                  { key: 'digestao', label: 'Estufamento / Inchaço pós-refeição' },
                  { key: 'sono', label: 'Dificuldade para dormir / Insônia' },
                  { key: 'pele', label: 'Queda de cabelo / Unhas fracas' }
                ].map((item) => (
                  <div key={item.key} style={{ backgroundColor: 'var(--bg-main)', padding: '16px', borderRadius: '16px' }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 600, marginBottom: '8px' }}>{item.label}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Intensidade:</span>
                      <select
                        value={metabolicScore[item.key]}
                        onChange={(e) => handleScoreChange(item.key, e.target.value)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-subtle)',
                          backgroundColor: '#FFFFFF',
                          fontWeight: 600,
                          color: 'var(--primary)'
                        }}
                      >
                        <option value="0">0 - Nunca</option>
                        <option value="1">1 - Raro / Leve</option>
                        <option value="2">2 - Moderado</option>
                        <option value="3">3 - Frequente</option>
                        <option value="4">4 - Muito Severo</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conteúdo da Aba 3: Evolução Antropométrica */}
          {activeTab === 'evolution' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '12px' }}>Acompanhamento de Resultados Reais</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '18px' }}>
                  A cada retorno, os dados de bioimpedância e medidas são plotados em gráficos claros para você acompanhar a perda de gordura e o ganho de massa muscular.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', backgroundColor: 'var(--bg-main)', borderRadius: '10px' }}>
                    <span>% de Gordura Corporal</span>
                    <strong style={{ color: 'var(--secondary)' }}>28% ➔ 21% (-7%)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', backgroundColor: 'var(--bg-main)', borderRadius: '10px' }}>
                    <span>Massa Magra Muscular</span>
                    <strong style={{ color: 'var(--primary)' }}>46kg ➔ 48.5kg (+2.5kg)</strong>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-main)', padding: '24px', borderRadius: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Evolução de Peso & Composição Corporal</div>
                {/* Visual Representation of Progress Bar */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '140px', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '38px', height: '110px', backgroundColor: 'rgba(147, 91, 71, 0.3)', borderRadius: '8px' }} />
                    <span style={{ fontSize: '0.75rem' }}>Mês 1</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '38px', height: '95px', backgroundColor: 'rgba(147, 91, 71, 0.6)', borderRadius: '8px' }} />
                    <span style={{ fontSize: '0.75rem' }}>Mês 2</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '38px', height: '80px', backgroundColor: 'var(--primary)', borderRadius: '8px' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>Mês 3</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo da Aba 4: Lembretes & Suporte */}
          {activeTab === 'reminders' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: 'var(--bg-main)', padding: '20px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🔔</span>
                  <strong style={{ fontSize: '0.92rem' }}>Lembrete de Hidratação & Chás</strong>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>"Hora da sua infusão de gengibre e alecrim para ativar a digestão da tarde!"</p>
              </div>

              <div style={{ backgroundColor: 'var(--bg-main)', padding: '20px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📅</span>
                  <strong style={{ fontSize: '0.92rem' }}>Confirmação de Consulta Automática</strong>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Receba o link da teleconsulta e instruções pré-consulta 24 horas antes.</p>
              </div>
            </div>
          )}

          {/* Botão de Agendamento */}
          <div style={{ textAlign: 'center', marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={onOpenBooking}
              className="btn-primary"
              style={{ padding: '14px 32px' }}
            >
              <span>Quero ter acesso a esse acompanhamento</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
