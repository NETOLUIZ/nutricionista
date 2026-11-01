# Servidor da Área da Nutricionista

API (Express + Prisma + PostgreSQL) que alimenta o site e o painel em `/#/admin`.

## Rodar localmente
```bash
cd server
cp .env.example .env        # preencha DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed                # cria o login, os 4 planos atuais e as formas de pagamento
npm run dev                 # http://localhost:3333
```
No site (raiz do projeto): copie `.env.example` para `.env.local` e rode `npm run dev`.
Painel: `http://localhost:5173/nutricionista/#/admin`.

## Produção
- `npx prisma migrate deploy` (nunca `migrate reset`), `npm start` sob PM2, Nginx na frente com HTTPS.
- `CORS_ORIGINS` deve listar a origem do site (ex.: `https://usuario.github.io`).
- `PUBLIC_URL` e `uploads/` (imagens dos banners) precisam de backup junto com o banco.
- No GitHub, crie a variável de repositório `VITE_API_URL` com a URL pública da API.

## Verificar
```bash
curl http://localhost:3333/api/health
curl http://localhost:3333/api/public/site
curl -X POST http://localhost:3333/api/auth/login -H "Content-Type: application/json" \
  -d '{"email":"SEU_EMAIL","password":"SUA_SENHA"}'
```
