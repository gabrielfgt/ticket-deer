# Ticket Assignment System

Um sistema simples de atribuição de tickets construído com React e Node.js.

## Deploy do Sistema

### Backend (Render.com)

1. Crie uma conta no [Render](https://render.com)
2. Clique em "New +" e selecione "Web Service"
3. Conecte seu repositório GitHub
4. Configure o serviço:
   - Nome: ticket-deer-backend
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Plano: Free

### Frontend (Vercel)

1. Crie uma conta no [Vercel](https://vercel.com)
2. Instale a CLI do Vercel: `npm i -g vercel`
3. No diretório `client`, execute:
   ```bash
   vercel login
   vercel
   ```
4. Após o deploy, copie a URL do frontend
5. Atualize o arquivo `server.js` com a URL do frontend no array `origin`
6. Atualize o arquivo `client/src/config.js` com a URL do backend
7. Execute `vercel --prod` para fazer o deploy em produção

## Desenvolvimento Local

1. Instale as dependências:
   ```bash
   npm install
   cd client && npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev:full
   ```

O backend estará disponível em `http://localhost:5002` e o frontend em `http://localhost:3001`. 