# BookShelf - Sistema de Gerenciamento de Livros

Este projeto foi refatorado para separar o frontend do backend, proporcionando melhor organização e escalabilidade.

## 📁 Estrutura do Projeto

```
BookShelf/
├── backend/                 # API Express.js
│   ├── src/
│   │   ├── controllers/     # Controladores das rotas
│   │   ├── routes/         # Definições das rotas
│   │   ├── config/         # Configurações (Supabase, DB)
│   │   ├── middleware/     # Middlewares customizados
│   │   └── server.js       # Servidor principal
│   ├── package.json
│   └── .env.example
├── frontend/               # Aplicação Next.js
│   ├── src/
│   │   ├── app/           # Pages e layouts do App Router
│   │   ├── components/    # Componentes React
│   │   ├── services/      # Serviços para comunicação com API
│   │   ├── lib/           # Utilitários e configurações
│   │   └── types/         # Definições de tipos TypeScript
│   ├── package.json
│   └── .env.local.example
└── README.md
```

## 🚀 Como Executar

### Backend (API)

1. Navegue até a pasta backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações do Supabase.

4. Execute o servidor:
```bash
npm run dev
```
O backend será executado em `http://localhost:3001`

### Frontend (Next.js)

1. Navegue até a pasta frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```
Edite o arquivo `.env.local` com suas configurações.

4. Execute o frontend:
```bash
npm run dev
```
O frontend será executado em `http://localhost:3000`

## 📡 APIs Disponíveis

### Autenticação
- `POST /api/auth/signup` - Cadastrar usuário
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout
- `POST /api/auth/reset-password` - Resetar senha
- `POST /api/auth/update-password` - Atualizar senha

### Livros
- `GET /api/books` - Listar todos os livros
- `GET /api/books/:id` - Buscar livro por ID
- `POST /api/books` - Criar novo livro
- `PUT /api/books/:id` - Atualizar livro
- `DELETE /api/books/:id` - Deletar livro
- `GET /api/books/user/:userId` - Livros de um usuário

## 🛠 Tecnologias Utilizadas

### Backend
- Node.js + Express.js
- Supabase (Database & Auth)
- CORS, Helmet, Morgan

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Radix UI

## 📝 Próximos Passos

1. Configure as variáveis de ambiente em ambos os projetos
2. Execute `npm install` em cada pasta
3. Inicie o backend primeiro, depois o frontend
4. Teste as funcionalidades básicas

## 🔧 Scripts Disponíveis

### Backend
- `npm run dev` - Executa em modo desenvolvimento
- `npm start` - Executa em modo produção

### Frontend  
- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm start` - Executa build de produção
- `npm run lint` - Executa linting

## 🌐 Variáveis de Ambiente

Consulte os arquivos `.env.example` (backend) e `.env.local.example` (frontend) para ver todas as variáveis necessárias.