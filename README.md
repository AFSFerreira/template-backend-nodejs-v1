# Template Backend Nodejs V1

## 📋 Sumário

1. [Visão Geral](#visao-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Tipos de Usuários](#tipos-de-usuarios)
4. [Funcionalidades por Requisito](#funcionalidades-por-requisito)
5. [Requisitos Não Funcionais](#requisitos-nao-funcionais)
6. [Casos de Uso Principais](#casos-de-uso-principais)
7. [Requisitos](#requisitos)
8. [Versões Utilizadas](#versoes-utilizadas)
9. [Como Executar o Servidor](#como-executar-o-servidor)
10. [Links Externos](#links-externos)
11. [Equipe de Desenvolvimento](#equipe-de-desenvolvimento)

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
├── .devcontainer
|  └── scripts
├── .github
|  ├── ISSUE_TEMPLATE
|  └── workflows
├── .husky
├── .vscode
├── load-tests
├── logs
├── prisma
|  ├── migrations
|  |  └── 20260318062946_initial_migration
|  └── seed-data
└── src
   ├── @types
   |  ├── custom
   |  ├── entrypoints
   |  ├── jobs
   |  ├── lib
   |  ├── repository
   |  ├── responses
   |  ├── services
   |  ├── use-cases
   |  └── utils
   ├── constants
   ├── entrypoints
   |  ├── http
   |  └── ws
   ├── env
   ├── errors
   ├── jobs
   |  ├── cron
   |  └── queues
   ├── lib
   |  ├── async-local-storage
   |  ├── bullmq
   |  ├── dayjs
   |  ├── nodemailer
   |  ├── pino
   |  ├── prisma
   |  ├── redis
   |  ├── sentry
   |  ├── swagger
   |  ├── tsyringe
   |  └── zod
   ├── messages
   |  ├── emails
   |  ├── loggings
   |  ├── responses
   |  ├── system
   |  └── validations
   ├── repositories
   |  └── prisma
   ├── services
   |  ├── caches
   |  ├── encryption
   |  ├── error-handlers
   |  ├── externals
   |  ├── files
   |  ├── formatters
   |  ├── hashes
   |  ├── renderers
   |  ├── system
   |  └── validators
   ├── templates
   |  └── user
   ├── use-cases
   |  ├── errors
   |  └── user
   └── utils
      ├── errors
      ├── files
      ├── formatters
      ├── generics
      ├── guards
      ├── http
      ├── mappers
      ├── validators
      └── ws
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

### 📌 Requisito 1 – Gestão de Conta e Autenticação:

- [x] 1.1 Cadastro de usuário
- [x] 1.2 Login com email/username e senha
- [x] 1.3 Renovação de sessão com refresh token
- [x] 1.4 Logout (encerramento de sessão)
- [x] 1.5 Redefinição de senha (esqueci a senha)
- [x] 1.6 Reset de senha com token
- [x] 1.7 Alteração de senha para usuário autenticado
- [ ] 1.8 Login com CPF

### 📌 Requisito 2 – Administração de Usuários:

- [x] 2.1 Listagem de usuários com paginação, filtros e ordenação
- [x] 2.2 Busca de usuário por identificador público
- [x] 2.3 Atualização do próprio perfil
- [x] 2.4 Exclusão da própria conta
- [ ] 2.5 ...
   - [ ] 2.5.1 ...
   - [ ] 2.5.2 ...

### 📌 Requisito 3 – Confiabilidade e Auditoria:

- [x] 3.1 Health check da aplicação
- [x] 3.2 Auditoria de autenticação
- [x] 3.3 Auditoria de ações de usuário
- [x] 3.4 Limpeza automática de registros antigos de auditoria
- [ ] 3.5 ...

### 📌 Requisito 4 – Comunicação em Tempo Real:

- [x] 4.1 Endpoint WebSocket para conexões em tempo real
- [x] 4.2 Controle de heartbeat (ping/pong) das conexões
- [x] 4.3 Dispatcher para roteamento de ações WebSocket
- [ ] 4.4 ...

---

<a name="requisitos-nao-funcionais"></a>

## 🧪 Requisitos Não Funcionais:

- [x] NF.1 - Segurança: JWT, RBAC, rate limiting e validação com Zod
- [x] NF.2 - Observabilidade: logging de requisição/resposta e health check
- [x] NF.3 - Confiabilidade: trilha de auditoria para autenticação e ações críticas
- [x] NF.4 - Escalabilidade: filas assíncronas e canal WebSocket para tempo real
- [ ] NF.5 - ...
- [ ] NF.6 - ...

---

<a name="casos-de-uso-principais"></a>

## 🛠️ Casos de Uso Principais:

- [x] 1. Usuário se cadastra no sistema
- [x] 2. Usuário faz login e renova sessão
- [x] 3. Usuário solicita recuperação e redefine senha
- [x] 4. Administrador lista e consulta usuários
- [x] 5. Usuário autenticado atualiza dados da própria conta
- [ ] 6. ...
- [ ] 7. ...

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
