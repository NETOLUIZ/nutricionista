import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export const Field = ({ label, hint, children }) => (
  <label className="adm-field">
    <span className="adm-label">{label}</span>
    {children}
    {hint && <span className="adm-hint">{hint}</span>}
  </label>
);

export const Toggle = ({ checked, onChange, label }) => (
  <label className="adm-toggle">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <span className="adm-toggle-track" aria-hidden="true" />
    <span>{label}</span>
  </label>
);

export const Button = ({ icon: Icon, loading, variant = 'primary', children, ...rest }) => (
  <button type="button" className={`adm-btn adm-btn-${variant}`} disabled={loading || rest.disabled} {...rest}>
    {loading ? <Loader2 size={16} className="adm-spin" aria-hidden="true" /> : Icon && <Icon size={16} aria-hidden="true" />}
    <span>{children}</span>
  </button>
);

export const Notice = ({ type = 'ok', children }) =>
  children ? (
    <p className={`adm-notice adm-notice-${type}`} role={type === 'error' ? 'alert' : 'status'}>{children}</p>
  ) : null;

export const PageHead = ({ title, desc, action }) => (
  <div className="adm-pagehead">
    <div>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
    {action}
  </div>
);

export const Empty = ({ children }) => <p className="adm-empty">{children}</p>;

// Executa uma ação assíncrona controlando loading e mensagem
export function useAction() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null); // { type, text }
  const run = async (fn, okText) => {
    setLoading(true);
    setMsg(null);
    try {
      const result = await fn();
      if (okText) setMsg({ type: 'ok', text: okText });
      return result;
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
      return undefined;
    } finally {
      setLoading(false);
    }
  };
  return { loading, msg, run, setMsg };
}

export const formatBRL = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const formatDate = (iso) => iso.split('-').reverse().join('/');
