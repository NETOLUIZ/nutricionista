import React, { useEffect, useState } from 'react';
import { CalendarDays, Clock, CreditCard, Image, KeyRound, Leaf, LogOut, Megaphone, Tag, Type } from 'lucide-react';
import { api, getToken, hasApi, setToken } from '../lib/api';
import { Button, Field, Notice, useAction } from './ui';
import {
  AccountPage, AnnouncementsPage, AppointmentsPage, AvailabilityPage, BannersPage, PaymentsPage, PlansPage, TextsPage
} from './pages';
import './admin.css';

const TABS = [
  { id: 'agendamentos', label: 'Agendamentos', icon: CalendarDays, Page: AppointmentsPage },
  { id: 'disponibilidade', label: 'Disponibilidade', icon: Clock, Page: AvailabilityPage },
  { id: 'planos', label: 'Planos', icon: Tag, Page: PlansPage },
  { id: 'textos', label: 'Textos', icon: Type, Page: TextsPage },
  { id: 'banners', label: 'Banners', icon: Image, Page: BannersPage },
  { id: 'informativos', label: 'Informativos', icon: Megaphone, Page: AnnouncementsPage },
  { id: 'pagamentos', label: 'Pagamentos', icon: CreditCard, Page: PaymentsPage },
  { id: 'conta', label: 'Conta', icon: KeyRound, Page: AccountPage }
];

function Login({ onLogin }) {
  const [f, setF] = useState({ email: '', password: '' });
  const { loading, msg, run } = useAction();
  const submit = (e) => {
    e.preventDefault();
    run(async () => {
      const { token } = await api('/api/auth/login', { method: 'POST', body: f });
      setToken(token);
      onLogin();
    });
  };
  return (
    <main className="adm-login">
      <form className="adm-card adm-form" onSubmit={submit}>
        <div className="adm-brand"><Leaf size={22} aria-hidden="true" /><span>Área da Nutricionista</span></div>
        <Field label="E-mail"><input className="adm-input" type="email" autoComplete="username" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
        <Field label="Senha"><input className="adm-input" type="password" autoComplete="current-password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></Field>
        <Notice type={msg?.type}>{msg?.text}</Notice>
        <button type="submit" className="adm-btn adm-btn-primary" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}</button>
        <a className="adm-link" href="#/">Voltar ao site</a>
      </form>
    </main>
  );
}

export default function AdminApp() {
  const [logged, setLogged] = useState(Boolean(getToken()));
  const [tab, setTab] = useState(() => {
    const id = window.location.hash.split('/')[2];
    return TABS.some((t) => t.id === id) ? id : 'agendamentos';
  });

  useEffect(() => {
    document.title = 'Área da Nutricionista';
    const meta = document.createElement('meta'); // painel fora dos buscadores
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    const out = () => setLogged(false);
    window.addEventListener('adm-logout', out);
    return () => {
      window.removeEventListener('adm-logout', out);
      meta.remove();
    };
  }, []);

  const go = (id) => {
    setTab(id);
    window.history.replaceState(null, '', `#/admin/${id}`);
  };

  if (!hasApi) {
    return (
      <main className="adm-login">
        <div className="adm-card adm-form">
          <h1 className="adm-h3">Servidor não configurado</h1>
          <p>Defina <code>VITE_API_URL</code> com o endereço do servidor (pasta <code>server/</code>) e gere o site novamente.</p>
        </div>
      </main>
    );
  }
  if (!logged) return <Login onLogin={() => setLogged(true)} />;

  const { Page } = TABS.find((t) => t.id === tab);
  return (
    <div className="adm-shell">
      <header className="adm-top">
        <div className="adm-brand"><Leaf size={20} aria-hidden="true" /><span>Área da Nutricionista</span></div>
        <div className="adm-top-actions">
          <a className="adm-btn adm-btn-ghost" href="#/">Ver site</a>
          <Button icon={LogOut} variant="ghost" onClick={() => { setToken(null); setLogged(false); }}>Sair</Button>
        </div>
      </header>
      <nav className="adm-nav" aria-label="Seções">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={tab === id ? 'is-active' : ''} aria-current={tab === id ? 'page' : undefined} onClick={() => go(id)}>
            <Icon size={18} aria-hidden="true" /><span>{label}</span>
          </button>
        ))}
      </nav>
      <main className="adm-main"><Page /></main>
    </div>
  );
}
