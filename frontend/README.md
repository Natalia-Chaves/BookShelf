# BookShelf

## Visão Geral

O BookShelf é uma aplicação web moderna e intuitiva, desenvolvida com Next.js, projetada para ajudar os amantes de livros a organizar e explorar suas coleções. Com uma interface amigável, o projeto permite que os usuários gerenciem seus livros, descubram novos títulos e compartilhem suas opiniões através de um sistema de avaliação.

## 🚀 Funcionalidades Principais

O BookShelf oferece um conjunto robusto de funcionalidades para uma experiência completa de gerenciamento de livros:

*   **✅ Sistema de Autenticação:** Permite que os usuários se cadastrem e façam login de forma segura para acessar suas coleções personalizadas.
*   **✅ Catálogo de Livros:** Explore uma vasta biblioteca de livros, com opções de busca e filtragem para encontrar exatamente o que você procura.
*   **✅ Detalhes do Livro:** Visualize informações detalhadas sobre cada livro, incluindo sinopse, autor, capa e avaliações de outros usuários.
*   **✅ Sistema de Avaliação:** Atribua classificações por estrelas aos livros que você leu e veja a média das avaliações da comunidade.
*   **✅ Gerenciamento de Coleção:** Adicione e remova livros da sua coleção pessoal, mantendo um registro organizado de suas leituras.

## 💻 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias de ponta:

*   **Next.js:** Um framework React para aplicações web de alto desempenho, com renderização do lado do servidor e geração de sites estáticos.
*   **TypeScript:** Uma linguagem de programação que adiciona tipagem estática ao JavaScript, melhorando a robustez e a manutenibilidade do código.
*   **CSS (com PostCSS):** Para estilização flexível e modular, garantindo um design responsivo e atraente.
*   **ESLint:** Para manter a qualidade do código e garantir a conformidade com os padrões de estilo.

## ⚙️ Como Acessar e Executar o Projeto

Siga os passos abaixo para configurar e executar o BookShelf em seu ambiente de desenvolvimento local.

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

*   **Node.js** (versão 18 ou superior)
*   Um gerenciador de pacotes: **npm**, **yarn**, **pnpm** ou **bun**.

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Debug-Cafe/BookShelf.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd BookShelf
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    # ou
    bun install
    ```

### Executando o Servidor de Desenvolvimento

Para iniciar a aplicação em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Após a execução, abra seu navegador e acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

## 🏗️ Estrutura do Projeto

A organização do código segue uma estrutura clara e modular:

```
BookShelf/
├── public/                  # Arquivos estáticos (imagens, ícones, etc.)
├── src/
│   ├── app/                 # Rotas e páginas da aplicação (cadastro, catálogo, detalhes de livros)
│   │   ├── cadastro/
│   │   ├── catalogo/
│   │   ├── globals.css      # Estilos globais
│   │   ├── layout.tsx       # Layout principal da aplicação
│   │   ├── livro/           # Páginas de detalhes de livros
│   │   └── page.tsx         # Página inicial
│   ├── components/          # Componentes React reutilizáveis (botões, cards, formulários)
│   │   ├── AddBookForm.tsx
│   │   ├── BookCard.tsx
│   │   ├── BookList.tsx
│   │   ├── Card.tsx
│   │   ├── DeleteConfirmationModal.tsx
│   │   ├── Footer.tsx
│   │   ├── LoginForm.tsx
│   │   ├── Navbar.tsx
│   │   ├── RegisterForm.tsx
│   │   └── StarRating.tsx
│   ├── contexts/            # Contextos React para gerenciamento de estado global
│   ├── lib/                 # Funções utilitárias e bibliotecas de apoio
│   └── types.ts             # Definições de tipos TypeScript para o projeto
├── styles/                  # Estilos específicos de componentes e módulos
├── .gitignore               # Arquivos e diretórios a serem ignorados pelo Git
├── eslint.config.mjs        # Configuração do ESLint para linting de código
├── next.config.ts           # Configuração do Next.js
├── package.json             # Metadados do projeto e lista de dependências
├── package-lock.json        # Registro exato das dependências instaladas (npm)
├── postcss.config.mjs       # Configuração do PostCSS
└── tsconfig.json            # Configuração do TypeScript
```

## 🤝 Contribuição

Contribuições são bem-vindas! Se você deseja aprimorar o BookShelf, siga estas diretrizes:

1.  Faça um fork do repositório.
2.  Crie uma nova branch para sua feature (`git checkout -b feature/nome-da-feature`).
3.  Faça suas alterações e commit (`git commit -m 'feat: Adiciona nova funcionalidade X'`).
4.  Envie para a branch (`git push origin feature/nome-da-feature`).
5.  Abra um Pull Request detalhando suas mudanças.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` na raiz do repositório para mais detalhes.


