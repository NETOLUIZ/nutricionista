# Segurança e LGPD — checklist

Este documento é um guia técnico, não aconselhamento jurídico. Peça a um advogado
de proteção de dados que revise a política de privacidade antes de ir ao ar.

## O que o sistema já faz
- Front-end sem segredos: só o endereço público da API (`VITE_API_URL`). Banco, JWT e senhas ficam só em `server/.env`.
- Painel protegido por login (JWT HS256, 8 h), senha com bcrypt, limite de tentativas e resposta de login sem revelar se o e-mail existe.
- Preço e nome do plano vêm sempre do banco, nunca do navegador. Todas as entradas são validadas e cortadas por tamanho.
- Upload só de JPG/PNG/WebP até 3 MB, conferindo os bytes reais do arquivo.
- Cabeçalhos de segurança (helmet), CORS restrito às origens do `.env`, erros genéricos (sem stack trace).
- Consentimento registrado por agendamento (`consentAt` e `consentVersion`).
- `npm run purge` elimina solicitações canceladas/não confirmadas após `RETENTION_DAYS` (simulação por padrão; `-- --apply` apaga).
- Exclusão por titular: tela Agendamentos > Excluir.

## Banco de dados
- Nunca publique a porta 5432 na internet. Em desenvolvimento, publique só em localhost:
  `-p 127.0.0.1:5432:5432`.
- Em produção, crie um usuário só para a aplicação (sem superusuário) e use senha longa e aleatória na `DATABASE_URL`.
- Disco da VPS cifrado ou backups cifrados; teste a restauração.
- Se o banco ficar em outra máquina, use `?sslmode=require`.

## Produção (VPS)
- Nginx com HTTPS na frente da API; `TRUST_PROXY=1` no `.env`.
- Gere um `JWT_SECRET` novo (32+ bytes aleatórios) e troque a senha do painel (tela Conta).
- Firewall liberando só 80/443 (e SSH com chave).
- `CORS_ORIGINS` só com o domínio real do site.
- A pasta `uploads/` entra no backup.

## Pendências que dependem de decisão sua
- Prazo de guarda dos registros de atendimento (consulte a regulamentação do CFN e um advogado) e ajuste da seção 5 da política.
- Cifrar o campo `goal` (pode ser dado de saúde) no nível da aplicação, se quiser camada extra além do disco cifrado.
- Registro de ações do painel (quem alterou/excluiu o quê), se houver mais de um usuário.
- Link da política de privacidade dentro do formulário de agendamento.
