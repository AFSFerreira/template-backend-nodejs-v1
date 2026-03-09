# ![4797b663cfb501a9d4dddd726180bf7502b7bd95](https://github.com/user-attachments/assets/01ecf847-53b2-4db2-bda3-95923cee525b)

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
Neste repositório está o projeto para a Sociedade de Astrobiologia. O projeto consiste na reconstrução da plataforma já existente. A plataforma possui postagens de blogs, materiais de ensino/aprendizagem, informações internas, entre outros. A plataforma pretende ser uma fonte de aprendizado ao mesmo tempo que é uma porta de entrada para conhecer a sociedade.

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
|  |  ├── academic-publication
|  |  ├── activity-area
|  |  ├── address-state
|  |  ├── blog
|  |  ├── dashboard-metrics
|  |  ├── director-board
|  |  ├── director-position
|  |  ├── document-management
|  |  ├── errors
|  |  ├── institution
|  |  ├── institutional-info
|  |  ├── meeting
|  |  ├── meeting-enrollment
|  |  ├── newsletters
|  |  ├── slider-image
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
   ├── director-board
   |  └── profile-images
   ├── documents
   |  └── public
   ├── meeting
   |  ├── agendas
   |  └── banners
   ├── newsletter
   |  ├── html
   |  └── images
   ├── slider-image
   |  └── home-page
   ├── temp
   |  ├── blog
   |  ├── director-board
   |  ├── institutional-info
   |  ├── meeting
   |  ├── newsletter
   |  ├── slider-image
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
| ADMIN              | Gerenciamento global do sistema                           |
| MANAGER            | Gerenciamento parcial do sistema                          |
| CONTENT_LEADER     | Produtor e revisor irrestrito de conteúdo                 |
| CONTENT_PRODUCER   | Produtor de conteúdo dependente do CONTENT_LEADER         |
| NEWSLETTER_LEADER  | Criação e gestão de newsletters                           |
| DEFAULT            | Usuário do sistema sem permissões especiais               |

</div>

---

<a name="funcionalidades-por-requisito"></a>

## ✅ Funcionalidades por Requisito:

### 📌 Requisito 1 – Cadastro e Edição de Usuários:

- [x] 1.1 Cadastro de Manager: Outorgar ou remover o privilégio de MANAGER para um usuário do sistema pelo Administrador
- [x] 1.2 Cadastro de Content Leader: Outorgar ou remover o privilégio de CONTENT_LEADER para um usuário do sistema pelo Administrador ou pelos Gestores do Sistema
- [x] 1.3 Cadastro de Content Producer: Outorgar ou remover o privilégio de CONTENT_PRODUCER para um usuário do sistema pelo Administrador ou pelos Gestores do Sistema
- [x] 1.4 Cadastro de Usuário: Envio das informações básicas necessárias para cadastrar um novo usuário comum (desconsiderando a imagem de perfil)
- [x] 1.5 Cadastro com upload de imagem de perfil
- [x] 1.6 Edição de Usuário: Os dados do usuário devem ser editáveis

### 📌 Requisito 2 – Autenticação e Acesso:
- [x] 2.1 Login com Email/Username e Senha
- [x] 2.2 Redefinição de Senha com envio de Email (esqueci a senha)
- [x] 2.3 Inativação de Usuário: Um usuário deve ser inativado do sistema se não realizar o pagamento mensal da associação
- [x] 2.4 Recuperação de Usuários: Um Administrador ou um Gestor do Sistema devem ser capazes de recuperar usuários filtrados com paginação
- [x] 2.5 Aprovação de Usuário: Um Administrador ou um Gestor do Sistema devem ser capazes de aprovar ou rejeitar o pedido de associação pendente do usuário

### 📌 Requisito 3 – Criação e Gestão de Reuniões:
- [x] 3.1 Criação de Reunião: Título, datas, resumo do local e edital
- [x] 3.2 Cancelamento de Reunião: A reunião deve ser removida do sistema
- [x] 3.3 Edição de Reunião: Os dados da reunião devem ser editáveis

### 📌 Requisito 4 – Exportação de Dados:
- [x] 4.1 Exportação dos Usuários: O sistema deve ser capaz de exportar os dados de todos os usuários pelo Administador ou por um Gestor do Sistema
- [x] 4.2 Exportação de Reuniões: O sistema deve ser capaz de exportar os dados de todas as reuniões pelo Administador ou por um Gestor do Sistema

### 📌 Requisito 5 – Painel Administrativo e Métricas:
- [x] 5.1 Métricas de usuários: Total de membros ativos, pendentes e inativos
- [x] 5.2 Métricas de blogs: Total de publicações ativas
- [x] 5.3 Métricas de newsletters: Total de newsletters cadastradas
- [x] 5.4 Registro de visualizações de página com deduplication por IP
- [x] 5.5 Métricas de visualizações dos últimos 7 dias via Redis
- [x] 5.6 Transmissão em tempo real de atualizações de métricas via WebSocket + Redis Pub/Sub

### 📌 Requisito 6 – Conteúdo e Blog:
- [x] 6.1 Criação, edição e publicação de artigos de blog com workflow editorial
- [x] 6.2 Gestão de publicações acadêmicas dos membros
- [x] 6.3 Gestão de newsletters com templates e envio por email
- [x] 6.4 Gestão do quadro de diretores e cargos da diretoria
- [x] 6.5 Gestão de informações institucionais (sobre, estatuto)
- [x] 6.6 Gestão de imagens do carrossel da home (slider)
- [x] 6.7 Gestão de documentos públicos
- [x] 6.8 Gestão de inscrições em encontros científicos

---

<a name="requisitos-nao-funcionais"></a>

## 🧪 Requisitos Não Funcionais:

- [x] NF.1 - Segurança: Controle de acesso por tipo de usuário, hashing Argon2id com pepper, criptografia AES para dados sensíveis, blind index para documentos de identidade, rate limiting em todos os endpoints
- [x] NF.2 - Escalabilidade: Suporte a múltiplos acessos simultâneos via WebSocket com dispatcher genérico baseado em Redis Pub/Sub (padrão OCP)
- [x] NF.3 - Desempenho: Buscas com paginação, cache Redis, full-text search com tsvector/GIN e índices otimizados no PostgreSQL
- [x] NF.4 - Testabilidade: Arquitetura em camadas com repositórios in-memory permitem testes unitários de Use Cases sem dependência de banco
- [x] NF.5 - Confiabilidade: Endpoint de health check, monitoramento via Sentry, logs estruturados com Pino e jobs assíncronos com BullMQ

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
git clone https://github.com/IN-Junior-UFF/astrobiologia-backend
```

3. Navegue para dentro do projeto clonado com o comando:

```bash
cd astrobiologia-backend
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
- **Template Backend Utilizado**: <a href="https://github.com/gabriel-camara-dev/Template-backend" target="_blank">Clique Aqui</a>
- **Pipefy do Projeto**: <a href="https://app.pipefy.com/pipes/306383839" target="_blank">Clique Aqui</a>
- **Design Figma do Projeto**: <a href="https://www.figma.com/design/ULiwCqEx0UwiznBnox8JMO/Astrobiologia?node-id=0-1&p=f&t=S6I4CBTeWReB5J2u-0" target="_blank">Clique Aqui</a>
- **Documentação da API**: <a href="https://documenter.getpostman.com/view/45717933/2sB3HgQigL">Clique Aqui</a>
- **Diagrama ER do Banco de Dados** (senha: 362880): <a href="https://dbdocs.io/allber.ferreira/SBAstrobio-DB-Schema?view=relationships">Clique Aqui</a>

---

<a name="equipe-de-desenvolvimento"></a>

## 👥 Equipe de Desenvolvimento:
- **Product Owner**: <a href="https://github.com/DougCristiano" target="_blank">Douglas Cristiano</a>
- **Dev Backend**: <a href="https://github.com/zfrekey" target="_blank">Filype Abreu</a>
- **Dev Backend**: <a href="https://github.com/AFSFerreira" target="_blank">Allber Ferreira</a>
