# BookShelf Backend

## Requisitos
- Node.js
- npm

## Instalação
```sh
npm install
```

## Configuração do Banco de Dados
1. Copie `.env.example` para `.env` e ajuste se necessário.
2. Certifique-se que o `DATABASE_URL` está assim:
   ```
   DATABASE_URL="file:./prisma/dev.db"
   ```

## Migrações Prisma
```sh
npx prisma migrate dev
```

## Seed de Dados
```sh
node prisma/seed.js
```

## Rodando o Backend
```sh
npm run dev
```

## Observações
- O backend usa SQLite e Prisma.
- O arquivo do banco será criado em `backend/prisma/dev.db`.
- Endpoints protegidos exigem autenticação JWT.
