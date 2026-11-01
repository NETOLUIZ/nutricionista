// URL do backend (server/). Vazia = site funciona só com os dados estáticos.
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export const hasApi = Boolean(API_URL);

const TOKEN_KEY = 'nutri_admin_token';

export const getToken = () => {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
};
export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch { /* storage indisponível */ }
};

// Imagens enviadas vêm como /uploads/xxx e moram no servidor
export const assetUrl = (url) => (url && url.startsWith('/uploads/') ? API_URL + url : url || '');

export async function api(path, { method = 'GET', body, auth = false, form } = {}) {
  const headers = {};
  if (auth) headers.Authorization = `Bearer ${getToken()}`;
  if (body) headers['Content-Type'] = 'application/json';
  let res;
  try {
    res = await fetch(API_URL + path, { method, headers, body: form || (body ? JSON.stringify(body) : undefined) });
  } catch {
    throw new Error('Não foi possível conectar ao servidor.');
  }
  if (res.status === 401 && auth) {
    setToken(null);
    window.dispatchEvent(new Event('adm-logout'));
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || 'Erro inesperado.'), { status: res.status });
  return data;
}
