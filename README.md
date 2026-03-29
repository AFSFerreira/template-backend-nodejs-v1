# Template Backend Nodejs V1

## 📋 Sumário

1. [Visão Geral](#visao-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Tipos de Usuários](#tipos-de-usuarios)
4. [Funcionalidades por Requisito](#funcionalidades-por-requisito)
5. [Requisitos Não Funcionais](#requisitos-nao-funcionais)
6. [Requisitos](#requisitos)
7. [Versões Utilizadas](#versoes-utilizadas)
8. [Como Executar o Servidor](#como-executar-o-servidor)
9. [Links Externos](#links-externos)
10. [Equipe de Desenvolvimento](#equipe-de-desenvolvimento)

<a name="visao-geral"></a>

---

## 🗺️ Visão Geral:
Este repositório contém um template de backend reutilizável para múltiplos contextos de negócio. A proposta é oferecer uma base pronta com arquitetura em camadas, autenticação, autorização, validações, integração com banco de dados, filas e cache. O conteúdo funcional descrito abaixo é intencionalmente genérico e pode ser adaptado para qualquer produto.

---

<a name="estrutura-do-projeto"></a>

## 📂 Estrutura do Projeto:

<!-- START_TREE -->
```text
.
├── .github
|  ├── ISSUE_TEMPLATE
|  └── workflows
├── .husky
├── .vscode
├── load-tests
├── logs
├── prisma
|  ├── migrations
|  |  ├── 20250920021905_creating_database_models
|  |  ├── 20250921000200_add_pg_extensions
|  |  ├── 20250921000300_add_tsvector_indexes
|  |  ├── 20250921000400_add_unaccented_columns
|  |  ├── 20250921000500_add_gin_indexes
|  |  └── 20250923000100_add_triggers
|  └── seed-data
├── src
|  ├── @types
|  |  ├── custom
|  |  ├── http
|  |  ├── jobs
|  |  ├── lib
|  |  ├── presenter
|  |  ├── repository
|  |  ├── responses
|  |  ├── services
|  |  ├── use-cases
|  |  ├── utils
|  |  └── validators
|  ├── constants
|  ├── entrypoints
|  |  ├── http
|  |  └── ws
|  ├── env
|  ├── errors
|  ├── jobs
|  |  ├── cron
|  |  └── queues
|  ├── lib
|  |  ├── async-local-storage
|  |  ├── bullmq
|  |  ├── dayjs
|  |  ├── nodemailer
|  |  ├── pino
|  |  ├── prisma
|  |  ├── redis
|  |  ├── sentry
|  |  ├── swagger
|  |  ├── tiptap
|  |  ├── tsyringe
|  |  └── zod
|  ├── messages
|  |  ├── emails
|  |  ├── jobs
|  |  ├── loggings
|  |  ├── responses
|  |  ├── system
|  |  └── validations
|  ├── repositories
|  |  └── prisma
|  ├── services
|  |  ├── builders
|  |  ├── cache
|  |  ├── encryption
|  |  ├── error-handlers
|  |  ├── errors
|  |  ├── exporters
|  |  ├── external
|  |  ├── extractors
|  |  ├── files
|  |  ├── formatters
|  |  ├── guards
|  |  ├── hashes
|  |  ├── http
|  |  ├── mappers
|  |  ├── renderers
|  |  ├── system
|  |  ├── validators
|  |  └── ws
|  ├── templates
|  |  ├── newsletter
|  |  └── user
|  ├── use-cases
|  |  ├── errors
|  |  └── user
|  └── utils
|     ├── dates
|     ├── excel
|     ├── extractors
|     ├── files
|     ├── formatters
|     ├── generics
|     ├── guards
|     ├── http
|     ├── mappers
|     ├── object
|     ├── system
|     └── validators
└── uploads
   ├── blog
   |  ├── banners
   |  └── images
   |  └── profile-images
   ├── documents
   |  └── public
   ├── meeting
   |  ├── agendas
   |  └── banners
   ├── newsletter
   |  ├── html
   |  └── images
   |  └── home-page
   ├── temp
   |  ├── blog
   |  ├── meeting
   |  ├── newsletter
   |  └── user
   └── user
      └── profile-images
```
<!-- END_TREE -->

---

<a name="tipos-de-usuarios"></a>

# 👤 Tipos de Usuários:

<div align="center">

| Tipo de Usuário    |            Permissões Principais                          |
| :----------------: | :-------------------------------------------------------: |
| ADMIN              | Gerenciamento global do sistema                           |                     |
| DEFAULT            | Usuário sem permissões administrativas                    |

</div>

---

<a name="funcionalidades-por-requisito"></a>

## ✅ Funcionalidades por Requisito:

### 📌 Requisito 1 – Cadastro e Edição de Usuários:

- [x] 1.1 Cadastro de perfis administrativos (mock): conceder e revogar permissões elevadas
- [x] 1.2 Cadastro de perfis operacionais (mock): criar papéis com escopo por módulo
- [x] 1.3 Cadastro de perfis de conteúdo (mock): controle de publicação e revisão
- [x] 1.4 Cadastro de usuário padrão (mock): registro com dados básicos obrigatórios
- [x] 1.5 Cadastro com upload de imagem de perfil (mock)
- [x] 1.6 Edição de usuário (mock): atualização de dados cadastrais e status

### 📌 Requisito 2 – Autenticação e Acesso:
- [x] 2.1 Login com email/username e senha (mock)
- [x] 2.2 Recuperação de senha por e-mail (mock)
- [x] 2.3 Bloqueio e inativação de usuário por regra de negócio (mock)
- [x] 2.4 Consulta de usuários com paginação, filtros e ordenação (mock)
- [x] 2.5 Aprovação e rejeição de contas pendentes (mock)

### 📌 Requisito 3 – Criação e Gestão de Reuniões:
- [x] 3.1 Criação de entidades de agenda/evento (mock): título, período e descrição
- [x] 3.2 Cancelamento e arquivamento de entidades de agenda/evento (mock)
- [x] 3.3 Edição de dados das entidades de agenda/evento (mock)

### 📌 Requisito 4 – Exportação de Dados:
- [x] 4.1 Exportação de dados de usuários por perfil autorizado (mock)
- [x] 4.2 Exportação de dados de entidades de domínio por perfil autorizado (mock)

### 📌 Requisito 5 – Painel Administrativo e Métricas:
- [x] 5.1 Métricas de usuários (mock): ativos, pendentes, inativos
- [x] 5.2 Métricas de conteúdo (mock): registros publicados
- [x] 5.3 Métricas de comunicação (mock): envios e entregas
- [x] 5.4 Registro de visualizações com deduplicação por IP (mock)
- [x] 5.5 Métricas dos últimos 7 dias via cache (mock)
- [x] 5.6 Atualizações em tempo real via WebSocket + Pub/Sub (mock)

### 📌 Requisito 6 – Conteúdo e Blog:
- [x] 6.1 Criação, edição e publicação de conteúdo com workflow (mock)
- [x] 6.2 Gestão de anexos e registros complementares (mock)
- [x] 6.3 Gestão de campanhas/comunicados com templates (mock)
- [x] 6.4 Gestão de cargos, funções e vínculos organizacionais (mock)
- [x] 6.5 Gestão de páginas institucionais e conteúdo estático (mock)
- [x] 6.6 Gestão de mídia para home/banners (mock)
- [x] 6.7 Gestão de documentos públicos e privados (mock)
- [x] 6.8 Gestão de inscrições/participações em eventos (mock)

---

<a name="requisitos-nao-funcionais"></a>

## 🧪 Requisitos Não Funcionais:

- [x] NF.1 - Segurança (mock): RBAC, hashing, proteção de dados sensíveis, rate limiting
- [x] NF.2 - Escalabilidade (mock): processamento assíncrono, cache e comunicação em tempo real
- [x] NF.3 - Desempenho (mock): paginação, indexação e otimização de consultas
- [x] NF.4 - Testabilidade (mock): arquitetura em camadas e testes de unidade/integrados
- [x] NF.5 - Confiabilidade (mock): health check, observabilidade e tratamento de falhas

---

<a name="requisitos"></a>

## ✔️ Requisitos:
Certifique-se de que você tenha os seguintes softwares instalados antes de continuar:

- [Docker](https://www.docker.com/) (versão mínima: 20.10)
- [Docker Compose](https://docs.docker.com/compose/) (versão mínima: 1.29)
- [pnpm](https://pnpm.io/) (versão mínima: 9.x)

---

<a name="versoes-utilizadas"></a>

## ⚙️ Versões Utilizadas:
- **Node.js**: 22.x (mínimo: 20)
- **PostgreSQL**: 14
- **Prisma**: 7.x
- **Redis**: 7.x

---

<a name="como-executar-o-servidor"></a>

## 💻 Como Executar o Servidor:
1. Abra o terminal - `CMD`, `PowerShell`, `Bash` ou similares - em algum diretório de preferência em sua máquina.
2. Clone este repositório com o comando:

```bash
git clone <url-do-seu-repositorio>
```

3. Navegue para dentro do projeto clonado com o comando:

```bash
cd <nome-do-projeto>
```

4. Instale as dependências do projeto ao executar no console o comando:

```bash
pnpm install
```

5. Crie um arquivo `.env` na raiz do projeto copiando o conteúdo do `.env.example`:

```bash
cp .env.example .env
# Preencha manualmente os valores do arquivo .env que não estiverem definidos.
```

6. Inicialize os contêineres do Docker (PostgreSQL + Redis) executando o comando:

```bash
make dev-up
```

7. Execute o comando para gerar o Prisma Client, rodar as migrations e popular o banco com dados de seed:

```bash
pnpm db:reset
```

8. Rode o projeto com o comando:

```bash
pnpm start:dev
```

---

<a name="links-externos"></a>

## 🔗 Links Externos:
- **Repositório do Projeto**: <a href="<url-repositorio>" target="_blank">Clique Aqui</a>
- **Board de Produto/Projeto**: <a href="<url-board>" target="_blank">Clique Aqui</a>
- **Design (Figma/Outro)**: <a href="<url-design>" target="_blank">Clique Aqui</a>
- **Documentação da API**: <a href="<url-documentacao-api>">Clique Aqui</a>
- **Diagrama ER do Banco de Dados**: <a href="<url-diagrama-er>">Clique Aqui</a>

---

<a name="equipe-de-desenvolvimento"></a>

## 👥 Equipe de Desenvolvimento:
- **Product Owner**: <a href="<url-po>" target="_blank">Nome do PO</a>
- **Tech Lead**: <a href="<url-tech-lead>" target="_blank">Nome do Tech Lead</a>
- **Dev Backend**: <a href="<url-dev-backend-1>" target="_blank">Nome Dev Backend 1</a>
- **Dev Backend**: <a href="<url-dev-backend-2>" target="_blank">Nome Dev Backend 2</a>
