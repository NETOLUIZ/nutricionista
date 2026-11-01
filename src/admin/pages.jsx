import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarDays, Check, MessageCircle, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import { api, assetUrl } from '../lib/api';
import { Button, Empty, Field, Notice, PageHead, Toggle, formatBRL, formatDate, useAction } from './ui';

// Carrega uma lista do admin e devolve [dados, recarregar, erro]
function useList(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    try {
      setData(await api(path, { auth: true }));
      setError('');
    } catch (e) { setError(e.message); }
  }, [path]);
  useEffect(() => { load(); }, [load]);
  return [data, load, error];
}

const confirmDelete = (what) => window.confirm(`Excluir ${what}? Essa ação não pode ser desfeita.`);

/* ---------------------------- Agendamentos ---------------------------- */
const STATUS_LABEL = { PENDING: 'Pendente', CONFIRMED: 'Confirmado', DONE: 'Concluído', CANCELED: 'Cancelado' };

export function AppointmentsPage() {
  const [filter, setFilter] = useState('');
  const [items, load, error] = useList(`/api/admin/appointments${filter ? `?status=${filter}` : ''}`);
  const { msg, run } = useAction();

  const patch = (id, body) => run(async () => { await api(`/api/admin/appointments/${id}`, { method: 'PATCH', body, auth: true }); await load(); });
  const remove = (a) => confirmDelete(`o agendamento de ${a.patientName}`) &&
    run(async () => { await api(`/api/admin/appointments/${a.id}`, { method: 'DELETE', auth: true }); await load(); });

  const count = (s) => (items || []).filter((a) => a.status === s).length;

  return (
    <>
      <PageHead
        title="Agendamentos"
        desc="Solicitações feitas pelo site. Confirme, conclua ou cancele e acompanhe os pagamentos."
        action={
          <Field label="Filtrar por situação">
            <select className="adm-input" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="">Todos</option>
              {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </Field>
        }
      />
      <Notice type="error">{error || msg?.type === 'error' ? error || msg.text : ''}</Notice>
      {items && !filter && (
        <div className="adm-stats">
          <div><strong>{count('PENDING')}</strong><span>Pendentes</span></div>
          <div><strong>{count('CONFIRMED')}</strong><span>Confirmados</span></div>
          <div><strong>{items.filter((a) => a.paymentStatus === 'UNPAID' && a.status !== 'CANCELED').length}</strong><span>Aguardando pagamento</span></div>
        </div>
      )}
      {!items ? <Empty>Carregando…</Empty> : items.length === 0 ? <Empty>Nenhum agendamento por aqui ainda.</Empty> : (
        <ul className="adm-list">
          {items.map((a) => (
            <li key={a.id} className={`adm-card ${a.status === 'CANCELED' ? 'is-muted' : ''}`}>
              <div className="adm-card-top">
                <div className="adm-when">
                  <CalendarDays size={18} aria-hidden="true" />
                  <strong>{formatDate(a.date)} às {a.time}</strong>
                  <span className="adm-chip">{a.modality === 'online' ? 'Online' : 'Presencial'}</span>
                </div>
                <span className={`adm-chip adm-status-${a.status}`}>{STATUS_LABEL[a.status]}</span>
              </div>
              <h3>{a.patientName}</h3>
              <p className="adm-sub">{a.planName} · {formatBRL(a.priceCents / 100)} · <span className={a.paymentStatus === 'PAID' ? 'adm-paid' : ''}>{a.paymentStatus === 'PAID' ? 'Pago' : 'Não pago'}</span></p>
              {a.goal && <p className="adm-goal">“{a.goal}”</p>}
              <p className="adm-sub">{a.whatsapp}{a.email ? ` · ${a.email}` : ''}</p>
              <div className="adm-actions">
                <a className="adm-btn adm-btn-ghost" target="_blank" rel="noreferrer"
                  href={`https://wa.me/55${a.whatsapp.replace(/\D/g, '').replace(/^55/, '')}`}>
                  <MessageCircle size={16} aria-hidden="true" /><span>WhatsApp</span>
                </a>
                {a.status === 'PENDING' && <Button icon={Check} onClick={() => patch(a.id, { status: 'CONFIRMED' })}>Confirmar</Button>}
                {a.status === 'CONFIRMED' && <Button icon={Check} onClick={() => patch(a.id, { status: 'DONE' })}>Concluir</Button>}
                {a.paymentStatus === 'UNPAID'
                  ? <Button variant="ghost" onClick={() => patch(a.id, { paymentStatus: 'PAID' })}>Marcar como pago</Button>
                  : <Button variant="ghost" onClick={() => patch(a.id, { paymentStatus: 'UNPAID' })}>Desfazer pagamento</Button>}
                {a.status !== 'CANCELED' && <Button icon={X} variant="ghost" onClick={() => patch(a.id, { status: 'CANCELED' })}>Cancelar</Button>}
                <Button icon={Trash2} variant="danger" aria-label={`Excluir agendamento de ${a.patientName}`} onClick={() => remove(a)}>Excluir</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ------------------------------- Planos ------------------------------- */
const EMPTY_PLAN = { name: '', price: '', tagline: '', popular: false, active: true, sortOrder: 0, featuresText: '' };

function PlanForm({ plan, onSaved }) {
  const [f, setF] = useState(plan ? { ...plan, featuresText: plan.features.join('\n') } : EMPTY_PLAN);
  const { loading, msg, run } = useAction();
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  const save = () => run(async () => {
    const body = { ...f, price: Number(String(f.price).replace(',', '.')), features: f.featuresText.split('\n') };
    if (plan) await api(`/api/admin/plans/${plan.id}`, { method: 'PUT', body, auth: true });
    else { await api('/api/admin/plans', { method: 'POST', body, auth: true }); setF(EMPTY_PLAN); }
    await onSaved();
  }, 'Plano salvo.');

  const remove = () => confirmDelete(`o plano ${plan.name}`) &&
    run(async () => { await api(`/api/admin/plans/${plan.id}`, { method: 'DELETE', auth: true }); await onSaved(); });

  return (
    <section className="adm-card adm-form">
      <div className="adm-grid2">
        <Field label="Nome do plano"><input className="adm-input" value={f.name} onChange={(e) => set('name', e.target.value)} /></Field>
        <Field label="Valor (R$)"><input className="adm-input" inputMode="decimal" value={f.price} onChange={(e) => set('price', e.target.value)} placeholder="299,99" /></Field>
      </div>
      <Field label="Frase de apresentação"><input className="adm-input" value={f.tagline} onChange={(e) => set('tagline', e.target.value)} /></Field>
      <Field label="O que está incluído" hint="Um item por linha."><textarea className="adm-input" rows={5} value={f.featuresText} onChange={(e) => set('featuresText', e.target.value)} /></Field>
      <div className="adm-grid2">
        <Field label="Ordem de exibição"><input className="adm-input" type="number" value={f.sortOrder} onChange={(e) => set('sortOrder', e.target.value)} /></Field>
        <div className="adm-toggles">
          <Toggle checked={f.popular} onChange={(v) => set('popular', v)} label="Destacar como “Mais popular”" />
          <Toggle checked={f.active} onChange={(v) => set('active', v)} label="Visível no site" />
        </div>
      </div>
      <Notice type={msg?.type}>{msg?.text}</Notice>
      <div className="adm-actions">
        <Button icon={plan ? Save : Plus} loading={loading} onClick={save}>{plan ? 'Salvar alterações' : 'Adicionar plano'}</Button>
        {plan && <Button icon={Trash2} variant="danger" onClick={remove}>Excluir</Button>}
      </div>
    </section>
  );
}

export function PlansPage() {
  const [plans, load, error] = useList('/api/admin/plans');
  return (
    <>
      <PageHead title="Planos e valores" desc="O que você editar aqui aparece na seção de investimento do site e no agendamento." />
      <Notice type="error">{error}</Notice>
      {!plans ? <Empty>Carregando…</Empty> : (
        <div className="adm-stack">
          {plans.map((p) => <PlanForm key={p.id} plan={p} onSaved={load} />)}
          <h3 className="adm-h3">Novo plano</h3>
          <PlanForm onSaved={load} />
        </div>
      )}
    </>
  );
}

/* ------------------------------- Textos ------------------------------- */
export function TextsPage() {
  const [items, , error] = useList('/api/admin/texts');
  const [values, setValues] = useState(null);
  const { loading, msg, run } = useAction();

  useEffect(() => {
    if (items && !values) setValues(Object.fromEntries(items.map((t) => [t.key, t.value])));
  }, [items, values]);

  const save = () => run(() => api('/api/admin/texts', { method: 'PUT', body: values, auth: true }), 'Textos salvos. Já estão no site.');

  return (
    <>
      <PageHead title="Textos do site" desc="Edite as principais frases. No título do início, use *asteriscos* para destacar palavras em verde." />
      <Notice type="error">{error}</Notice>
      {!values ? <Empty>Carregando…</Empty> : (
        <section className="adm-card adm-form">
          {items.map((t) => (
            <Field key={t.key} label={t.label}>
              {t.long
                ? <textarea className="adm-input" rows={3} value={values[t.key]} onChange={(e) => setValues({ ...values, [t.key]: e.target.value })} />
                : <input className="adm-input" value={values[t.key]} onChange={(e) => setValues({ ...values, [t.key]: e.target.value })} />}
              {values[t.key] !== t.defaultValue && (
                <button type="button" className="adm-link" onClick={() => setValues({ ...values, [t.key]: t.defaultValue })}>Restaurar texto original</button>
              )}
            </Field>
          ))}
          <Notice type={msg?.type}>{msg?.text}</Notice>
          <div className="adm-actions"><Button icon={Save} loading={loading} onClick={save}>Salvar textos</Button></div>
        </section>
      )}
    </>
  );
}

/* ------------------------------- Banners ------------------------------ */
const EMPTY_BANNER = { title: '', subtitle: '', imageUrl: '', linkUrl: '', linkLabel: '', active: true, sortOrder: 0 };

function ImagePicker({ value, onChange }) {
  const ref = useRef(null);
  const { loading, msg, run } = useAction();
  const pick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    run(async () => {
      const form = new FormData();
      form.append('image', file);
      const { url } = await api('/api/admin/upload', { method: 'POST', form, auth: true });
      onChange(url);
    });
    e.target.value = '';
  };
  return (
    <div className="adm-field">
      <span className="adm-label">Imagem (JPG, PNG ou WebP, até 3 MB)</span>
      {value && <img className="adm-thumb" src={assetUrl(value)} alt="Pré-visualização do banner" />}
      <div className="adm-actions">
        <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={pick} />
        <Button icon={Upload} variant="ghost" loading={loading} onClick={() => ref.current.click()}>{value ? 'Trocar imagem' : 'Enviar imagem'}</Button>
        {value && <Button icon={X} variant="ghost" onClick={() => onChange('')}>Remover</Button>}
      </div>
      <Notice type={msg?.type}>{msg?.text}</Notice>
    </div>
  );
}

function BannerForm({ banner, onSaved }) {
  const [f, setF] = useState(banner ? { ...EMPTY_BANNER, ...banner } : EMPTY_BANNER);
  const { loading, msg, run } = useAction();
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const save = () => run(async () => {
    if (banner) await api(`/api/admin/banners/${banner.id}`, { method: 'PUT', body: f, auth: true });
    else { await api('/api/admin/banners', { method: 'POST', body: f, auth: true }); setF(EMPTY_BANNER); }
    await onSaved();
  }, 'Banner salvo.');
  const remove = () => confirmDelete('este banner') &&
    run(async () => { await api(`/api/admin/banners/${banner.id}`, { method: 'DELETE', auth: true }); await onSaved(); });

  return (
    <section className="adm-card adm-form">
      <Field label="Título"><input className="adm-input" value={f.title} onChange={(e) => set('title', e.target.value)} /></Field>
      <Field label="Subtítulo (opcional)"><input className="adm-input" value={f.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} /></Field>
      <ImagePicker value={f.imageUrl} onChange={(v) => set('imageUrl', v)} />
      <div className="adm-grid2">
        <Field label="Link do botão (opcional)" hint="Comece com https://"><input className="adm-input" value={f.linkUrl || ''} onChange={(e) => set('linkUrl', e.target.value)} /></Field>
        <Field label="Texto do botão"><input className="adm-input" value={f.linkLabel || ''} onChange={(e) => set('linkLabel', e.target.value)} placeholder="Saiba mais" /></Field>
      </div>
      <div className="adm-grid2">
        <Field label="Ordem de exibição"><input className="adm-input" type="number" value={f.sortOrder} onChange={(e) => set('sortOrder', e.target.value)} /></Field>
        <div className="adm-toggles"><Toggle checked={f.active} onChange={(v) => set('active', v)} label="Visível no site" /></div>
      </div>
      <Notice type={msg?.type}>{msg?.text}</Notice>
      <div className="adm-actions">
        <Button icon={banner ? Save : Plus} loading={loading} onClick={save}>{banner ? 'Salvar alterações' : 'Adicionar banner'}</Button>
        {banner && <Button icon={Trash2} variant="danger" onClick={remove}>Excluir</Button>}
      </div>
    </section>
  );
}

export function BannersPage() {
  const [items, load, error] = useList('/api/admin/banners');
  return (
    <>
      <PageHead title="Banners" desc="Destaques visuais mostrados logo abaixo do início do site (promoções, novidades, avisos)." />
      <Notice type="error">{error}</Notice>
      {!items ? <Empty>Carregando…</Empty> : (
        <div className="adm-stack">
          {items.map((b) => <BannerForm key={b.id} banner={b} onSaved={load} />)}
          <h3 className="adm-h3">Novo banner</h3>
          <BannerForm onSaved={load} />
        </div>
      )}
    </>
  );
}

/* ----------------------------- Informativos ---------------------------- */
const EMPTY_ANN = { title: '', body: '', active: true };

function AnnouncementForm({ item, onSaved }) {
  const [f, setF] = useState(item || EMPTY_ANN);
  const { loading, msg, run } = useAction();
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
  const save = () => run(async () => {
    if (item) await api(`/api/admin/announcements/${item.id}`, { method: 'PUT', body: f, auth: true });
    else { await api('/api/admin/announcements', { method: 'POST', body: f, auth: true }); setF(EMPTY_ANN); }
    await onSaved();
  }, item ? 'Informativo salvo.' : 'Informativo publicado.');
  const remove = () => confirmDelete('este informativo') &&
    run(async () => { await api(`/api/admin/announcements/${item.id}`, { method: 'DELETE', auth: true }); await onSaved(); });

  return (
    <section className="adm-card adm-form">
      <Field label="Título"><input className="adm-input" value={f.title} onChange={(e) => set('title', e.target.value)} /></Field>
      <Field label="Mensagem"><textarea className="adm-input" rows={4} value={f.body} onChange={(e) => set('body', e.target.value)} /></Field>
      <Toggle checked={f.active} onChange={(v) => set('active', v)} label="Visível no site" />
      <Notice type={msg?.type}>{msg?.text}</Notice>
      <div className="adm-actions">
        <Button icon={item ? Save : Plus} loading={loading} onClick={save}>{item ? 'Salvar alterações' : 'Publicar informativo'}</Button>
        {item && <Button icon={Trash2} variant="danger" onClick={remove}>Excluir</Button>}
      </div>
    </section>
  );
}

export function AnnouncementsPage() {
  const [items, load, error] = useList('/api/admin/announcements');
  return (
    <>
      <PageHead title="Informativos" desc="Avisos para os pacientes (horários, feriados, novidades). Os 5 mais recentes aparecem no site." />
      <Notice type="error">{error}</Notice>
      {!items ? <Empty>Carregando…</Empty> : (
        <div className="adm-stack">
          <h3 className="adm-h3">Novo informativo</h3>
          <AnnouncementForm onSaved={load} />
          {items.length > 0 && <h3 className="adm-h3">Publicados</h3>}
          {items.map((a) => <AnnouncementForm key={a.id} item={a} onSaved={load} />)}
        </div>
      )}
    </>
  );
}

/* ------------------------------ Pagamentos ----------------------------- */
function PaymentForm({ method, onSaved }) {
  const [f, setF] = useState(method);
  const { loading, msg, run } = useAction();
  const save = () => run(async () => {
    await api(`/api/admin/payment-methods/${method.key}`, { method: 'PUT', body: f, auth: true });
    await onSaved();
  }, 'Salvo.');
  return (
    <section className="adm-card adm-form">
      <Toggle checked={f.enabled} onChange={(v) => setF({ ...f, enabled: v })} label={`${method.label} — aceito`} />
      <Field label="Instruções mostradas ao paciente" hint={method.key === 'pix' ? 'Ex.: chave Pix e nome do favorecido.' : 'Ex.: condições de parcelamento.'}>
        <textarea className="adm-input" rows={3} value={f.instructions} onChange={(e) => setF({ ...f, instructions: e.target.value })} />
      </Field>
      <Notice type={msg?.type}>{msg?.text}</Notice>
      <div className="adm-actions"><Button icon={Save} loading={loading} onClick={save}>Salvar</Button></div>
    </section>
  );
}

export function PaymentsPage() {
  const [items, load, error] = useList('/api/admin/payment-methods');
  return (
    <>
      <PageHead title="Métodos de pagamento" desc="Escolha o que aparece para o paciente no site e após o agendamento." />
      <Notice type="error">{error}</Notice>
      <p className="adm-info">O pagamento online automático (cobrança direto no site) será conectado em uma próxima etapa. Por enquanto, o paciente vê as formas aceitas e as instruções, e você marca o agendamento como pago.</p>
      {!items ? <Empty>Carregando…</Empty> : <div className="adm-stack">{items.map((m) => <PaymentForm key={m.key} method={m} onSaved={load} />)}</div>}
    </>
  );
}

/* -------------------------------- Conta -------------------------------- */
export function AccountPage() {
  const [f, setF] = useState({ currentPassword: '', newPassword: '' });
  const { loading, msg, run } = useAction();
  const save = () => run(async () => {
    await api('/api/auth/password', { method: 'POST', body: f, auth: true });
    setF({ currentPassword: '', newPassword: '' });
  }, 'Senha alterada.');
  return (
    <>
      <PageHead title="Minha conta" desc="Altere sua senha de acesso." />
      <section className="adm-card adm-form">
        <Field label="Senha atual"><input className="adm-input" type="password" autoComplete="current-password" value={f.currentPassword} onChange={(e) => setF({ ...f, currentPassword: e.target.value })} /></Field>
        <Field label="Nova senha" hint="Mínimo de 10 caracteres."><input className="adm-input" type="password" autoComplete="new-password" value={f.newPassword} onChange={(e) => setF({ ...f, newPassword: e.target.value })} /></Field>
        <Notice type={msg?.type}>{msg?.text}</Notice>
        <div className="adm-actions"><Button icon={Save} loading={loading} onClick={save}>Alterar senha</Button></div>
      </section>
    </>
  );
}
