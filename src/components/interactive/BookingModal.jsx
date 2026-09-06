import React, { useState } from 'react';
import { X, Clock, Check, ShieldCheck, ArrowRight, ArrowLeft, Sparkles, MapPin, Video } from 'lucide-react';
import confetti from 'canvas-confetti';
import { servicesData, formatPrice } from '../../data/servicesData';
import { Modal } from '../ui/Modal';

const WEEKDAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTH_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function getNextBusinessDays(count) {
  const days = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);
  while (days.length < count) {
    const dayOfWeek = cursor.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const year = cursor.getFullYear();
      const month = String(cursor.getMonth() + 1).padStart(2, '0');
      const day = String(cursor.getDate()).padStart(2, '0');
      days.push({
        label: `${WEEKDAY_LABELS[dayOfWeek]}, ${cursor.getDate()}/${MONTH_LABELS[cursor.getMonth()]}`,
        value: `${year}-${month}-${day}`
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export const BookingModal = ({ isOpen, onClose, initialServiceId }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialServiceId || servicesData[0].id);
  const [modality, setModality] = useState('online'); // 'online' | 'presencial'
  const dates = getNextBusinessDays(5);
  const [selectedDate, setSelectedDate] = useState(dates[0].value);
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [patientData, setPatientData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    goal: '',
    lgpdConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const times = ['09:00', '10:30', '14:00', '15:30', '17:00', '18:15'];

  const handleNextStep = () => {
    if (step === 3) {
      if (!patientData.name || !patientData.whatsapp || !patientData.lgpdConsent) {
        alert('Por favor, preencha seu nome, WhatsApp e aceite o termo de consentimento LGPD para proteger seus dados.');
        return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 600);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const currentServiceObj = servicesData.find(s => s.id === selectedService) || servicesData[0];

  const whatsappMessage = encodeURIComponent(
    `Olá Dra. Juliana! Acabei de solicitar meu agendamento pelo site.\n\n` +
    `*Nome:* ${patientData.name}\n` +
    `*Pacote:* ${currentServiceObj.name} (${formatPrice(currentServiceObj.price)})\n` +
    `*Modalidade:* ${modality === 'online' ? 'Teleconsulta Online' : 'Presencial'}\n` +
    `*Data/Hora:* ${selectedDate} às ${selectedTime}\n` +
    `*Objetivo:* ${patientData.goal || 'Saúde e Nutrição Funcional'}`
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%'
          }}
          aria-label="Fechar"
        >
          <X size={22} />
        </button>

        {/* Cabeçalho do Modal */}
        <div style={{ marginBottom: '24px' }}>
          <div className="tag-badge" style={{ marginBottom: '8px' }}>
            <Sparkles size={12} color="var(--primary)" />
            <span>Agendamento Inteligente NutriFlow</span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.75rem',
              color: 'var(--text-main)',
              fontWeight: 600
            }}
          >
            {step === 4 ? 'Solicitação Confirmada!' : 'Agende sua Consulta Nutricional'}
          </h3>
          {step < 4 && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  style={{
                    height: '4px',
                    flexGrow: 1,
                    borderRadius: '2px',
                    backgroundColor: s <= step ? 'var(--primary)' : 'rgba(46, 94, 32, 0.15)',
                    transition: 'var(--transition)'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ETAPA 1: Seleção de Serviço & Modalidade */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '10px' }}>
                1. Escolha a Modalidade de Atendimento:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModality('online')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px',
                    borderRadius: '14px',
                    border: `1.5px solid ${modality === 'online' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: modality === 'online' ? 'var(--primary-faint)' : '#FFFFFF',
                    color: modality === 'online' ? 'var(--primary)' : 'var(--text-body)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Video size={18} />
                  <span>Teleconsulta Online</span>
                </button>

                <button
                  type="button"
                  onClick={() => setModality('presencial')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px',
                    borderRadius: '14px',
                    border: `1.5px solid ${modality === 'presencial' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: modality === 'presencial' ? 'var(--primary-faint)' : '#FFFFFF',
                    color: modality === 'presencial' ? 'var(--primary)' : 'var(--text-body)',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <MapPin size={18} />
                  <span>Consultório Presencial</span>
                </button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '10px' }}>
                2. Selecione o Tipo de Serviço:
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {servicesData.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(s.id)}
                    aria-pressed={selectedService === s.id}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '14px 18px',
                      borderRadius: '14px',
                      border: `1.5px solid ${selectedService === s.id ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      backgroundColor: selectedService === s.id ? 'var(--primary-faint)' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'inherit'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.94rem', color: 'var(--text-main)' }}>{s.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatPrice(s.price)}</div>
                    </div>
                    {selectedService === s.id && <Check size={18} color="var(--primary)" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 2: Data e Horário */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '10px' }}>
                Escolha o Dia:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
                {dates.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setSelectedDate(d.value)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: `1.5px solid ${selectedDate === d.value ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      backgroundColor: selectedDate === d.value ? 'var(--primary)' : '#FFFFFF',
                      color: selectedDate === d.value ? '#FFFFFF' : 'var(--text-body)',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '10px' }}>
                Escolha o Horário Disponível:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {times.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTime(t)}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      border: `1.5px solid ${selectedTime === t ? 'var(--secondary)' : 'var(--border-subtle)'}`,
                      backgroundColor: selectedTime === t ? 'var(--secondary-faint)' : '#FFFFFF',
                      color: selectedTime === t ? 'var(--secondary)' : 'var(--text-body)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Clock size={14} />
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 3: Dados Pessoais & Consentimento LGPD */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Seu Nome Completo *
              </label>
              <input
                type="text"
                value={patientData.name}
                onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                placeholder="Ex: Maria Carolina Silva"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.92rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  WhatsApp / Celular *
                </label>
                <input
                  type="tel"
                  value={patientData.whatsapp}
                  onChange={(e) => setPatientData({ ...patientData, whatsapp: e.target.value })}
                  placeholder="(21) 99999-9999"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  E-mail
                </label>
                <input
                  type="email"
                  value={patientData.email}
                  onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                  placeholder="seu@email.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.92rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Principal Objetivo ou Sintoma a Tratar
              </label>
              <textarea
                value={patientData.goal}
                onChange={(e) => setPatientData({ ...patientData, goal: e.target.value })}
                placeholder="Ex: Emagrecimento, estufamento intestinal, cansaço frequente, exames de rotina..."
                rows={2}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Checkbox de Proteção LGPD / Dados Sensíveis de Saúde */}
            <div
              style={{
                backgroundColor: 'var(--bg-main)',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(46, 94, 32, 0.15)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}
            >
              <input
                type="checkbox"
                id="lgpdConsent"
                checked={patientData.lgpdConsent}
                onChange={(e) => setPatientData({ ...patientData, lgpdConsent: e.target.checked })}
                style={{ marginTop: '3px', cursor: 'pointer', accentColor: 'var(--primary)' }}
              />
              <label htmlFor="lgpdConsent" style={{ fontSize: '0.78rem', color: 'var(--text-body)', lineHeight: 1.5, cursor: 'pointer' }}>
                <ShieldCheck size={14} color="var(--primary)" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                Autorizo a coleta e o tratamento dos meus dados de contato e saúde exclusivamente para fins de agendamento e anamnese nutricional, sob sigilo profissional e em total conformidade com a <strong>LGPD (Lei 13.709/18)</strong>.
              </label>
            </div>
          </div>
        )}

        {/* ETAPA 4: Sucesso e Confirmação */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--secondary-faint)',
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px'
              }}
            >
              <Check size={32} />
            </div>

            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', marginBottom: '8px' }}>
              Horário Pré-Reservado com Sucesso!
            </h4>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
              Olá <strong>{patientData.name}</strong>, sua consulta do <strong>{currentServiceObj.name}</strong> foi agendada para <strong>{selectedDate} às {selectedTime}</strong> ({modality === 'online' ? 'Teleconsulta Online' : 'Presencial'}).
            </p>

            <a
              href={`https://wa.me/5585989500225?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', backgroundColor: '#25D366', borderColor: '#25D366' }}
            >
              <span>Confirmar agora via WhatsApp</span>
              <ArrowRight size={18} />
            </a>
          </div>
        )}

        {/* Rodapé de Navegação do Modal */}
        {step < 4 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="btn-secondary"
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                <ArrowLeft size={16} />
                <span>Voltar</span>
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNextStep}
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '0.88rem' }}
              disabled={isSubmitting}
            >
              <span>{step === 3 ? (isSubmitting ? 'Agendando...' : 'Concluir Agendamento') : 'Avançar'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
    </Modal>
  );
};
