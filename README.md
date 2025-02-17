# Ginte CRUD

Este projeto é uma aplicação Next.js utilizando o App Router, API Routes, Prisma com TypeScript, além de integração com autenticação via NextAuth e GitHub.

## Tecnologias Usadas

- **Next.js** (App Router, API Routes)
- **Prisma** (ORM)
- **Tailwind CSS** (Framework CSS)
- **React Hook Form** (Gerenciamento de formulários)
- **Zod** (Validação de dados)
- **SQLite** (Banco de dados)
- **TypeScript** (Tipagem estática)
- **Phosphor Icons** (Ícones)
- **Next-Auth** (Autenticação via GitHub)

## Pré-requisitos

Antes de começar, é necessário ter os seguintes programas instalados:

- **Node.js**: [Baixe a versão mais recente do Node.js](https://nodejs.org/)
- **Git**: [Baixe o Git](https://git-scm.com/)
- **SQLite** (Opcional): Embora o SQLite seja embutido no Prisma, você pode precisar de ferramentas adicionais para gerenciamento (como DB Browser for SQLite).

## Como Iniciar o Projeto

1. **Clone o repositório**

   ```bash
   git clone https://github.com/restlucas/crud-ginte.git
   cd crud-ginte
   ```

2. **Instale as dependências**
    ```bash
    npm install
    ```

3. ***Configure as variáveis de ambiente***

    Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:
    ```bash
    # URL do banco de dados SQLite
    DATABASE_URL="file:./dev.db"

    # URL do NextAuth (para autenticação)
    NEXTAUTH_URL=http://localhost:3000

    # Chave secreta para autenticação do NextAuth
    NEXTAUTH_SECRET=gerar-uma-chave-secreta-aqui

    # Credenciais do GitHub para autenticação via OAuth
    GITHUB_CLIENT_ID=seu-client-id-do-github
    GITHUB_CLIENT_SECRET=seu-client-secret-do-github
    ```

    Observação: Para obter o NEXTAUTH_SECRET, você pode gerar uma chave aleatória com o comando openssl rand -base64 32 ou usar qualquer outro método para gerar uma chave secreta segura

4. ***Gerar as migrations do banco de dados com o Prisma***
    ```bash
    npx prisma migrate dev --name init
    ```

    Para visualizar o banco de dados ou fazer outras alterações, você pode usar o Prisma Studio
    ```bash
    npx prisma studio
    ```

5. ***Iniciar o projeto***
    ```bash
    npm run dev
    ```

    Isso iniciará o servidor em http://localhost:3000


## Estrutura do projeto

A estrutura do projeto foi organizada da seguinte maneira:

```bash
├── @types/             # Pasta para tipagens  
├── app/                # Diretório principald o Next.js
│   ├── (ginte)/        # Páginas acessíveis após o login
│   ├── api/            # Rotas da API 
│   └── login/          # Página de login
├── components/         # Componentes reutilizados nas páginas    
├── lib/                # Configuração e inicialização de bibliotecas
├── services/           # Funções que interagem diretamente com a API
└── utils/              # Funções auxiliares e utilitárias
```

## Como Funciona a Autenticação com GitHub

Este projeto utiliza o NextAuth para autenticação e autorização. A autenticação é feita via OAuth utilizando as credenciais do GitHub. Durante o fluxo de login, o usuário é redirecionado para a página de login do GitHub e, após autenticação, o NextAuth cria uma sessão no aplicativo.



### Resumo do `README.md`:

- **Comandos para iniciar o projeto**: Contém as etapas para clonar o repositório, instalar dependências, configurar variáveis de ambiente, e rodar o servidor de desenvolvimento.
- **Estrutura do Projeto**: Descrição dos principais diretórios e arquivos do projeto.
- **Autenticação com GitHub**: Explica como a autenticação via GitHub é implementada.
