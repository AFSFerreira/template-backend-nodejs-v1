# AGENTS.md

Instruções para agentes de AI trabalhando neste repositório.

## Visão geral

Backend da Sociedade Brasileira de Astrobiologia (SBAstrobio). API REST construída com Node.js + TypeScript seguindo **Layered Architecture** fortemente influenciada por **Clean Architecture**. Gerencia membros, blogs, encontros científicos, newsletters, publicações acadêmicas, quadro de diretores e métricas administrativas.

## RESTRIÇÃO ARQUITETURAL — OBRIGATÓRIA

> **Este projeto segue Clean Architecture com camadas rigorosas. Qualquer violação de fronteira arquitetural é inaceitável.**

As seguintes regras são **invioláveis**:

1. **Controllers** NUNCA acessam banco de dados ou repositórios diretamente. Sempre delegam para Use Cases.
2. **Use Cases** NUNCA dependem de frameworks HTTP (Fastify, Request, Reply). Recebem dados puros e retornam resultados ou erros de domínio.
3. **Use Cases** dependem de **interfaces** de repositórios, NUNCA de implementações concretas (Prisma).
4. **Repositories Prisma** são o ÚNICO local onde `prismaClient` é importado.
5. **Use Cases** são resolvidos exclusivamente pelo container Tsyringe (`container.resolve(...)`) — NUNCA instanciados diretamente nos controllers.
6. **Presenters** formatam saídas — controllers NUNCA retornam objetos crus do ORM.
7. **Transações:** todo Use Case que execute mais de uma operação DML correlacionada (não-atômica) DEVE envolver as operações em `dbContext.runInTransaction()` para garantir rollback em caso de falha.
8. **Swagger:** ao registrar novas rotas ou endpoints, SEMPRE criar a documentação Swagger correspondente seguindo o padrão já estabelecido no projeto (schemas Zod de request/response nos arquivos de rota).

Antes de gerar qualquer código, valide mentalmente se respeita essas fronteiras.

## Stack obrigatória

| Camada         | Tecnologia                                              |
| -------------- | ------------------------------------------------------- |
| Runtime        | Node.js >= 20                                           |
| Linguagem      | TypeScript estrito (`strict: true`)                     |
| Framework HTTP | Fastify 5 com `fastify-type-provider-zod`               |
| ORM            | Prisma 7 (com `@prisma/adapter-pg`)                     |
| Banco          | PostgreSQL 14                                           |
| Cache / Fila   | Redis (ioredis) + BullMQ                                |
| DI Container   | Tsyringe (`reflect-metadata`)                           |
| Validação      | Zod 4                                                   |
| Linter/Format  | Biome                                                   |
| Hashing        | Argon2 (primário), bcryptjs (legado)                    |
| Email          | Nodemailer + Nunjucks templates                         |
| Monitoramento  | Sentry                                                  |
| Rich Text      | TipTap / ProseMirror                                    |
| Build          | tsdown                                                  |
| Pkg Manager    | pnpm (obrigatório)                                      |

Não introduza dependências fora dessa stack sem solicitação explícita.

## Estrutura do projeto

```
src/
├── app.ts                          # bootstrap Fastify — registra plugins, middlewares e rotas
├── server.ts                       # entrypoint — sobe o servidor HTTP
├── @types/                         # tipos globais e contratos (custom, http, jobs, lib, presenter, repository, etc.)
├── constants/                      # constantes da aplicação (env, regex, cache, arrays, maps, sets)
├── env/
│   └── index.ts                    # schema Zod das variáveis de ambiente + validação
├── errors/                         # erros globais da aplicação
├── messages/                       # mensagens e strings reutilizáveis
│
├── entrypoints/
│   ├── http/
│   │   ├── configurations/         # compress, cors, jwt, multipart, rate-limit, swagger
│   │   ├── controllers/            # 16 domínios (user, blog, meeting, newsletter, etc.)
│   │   │   └── {domínio}/
│   │   │       ├── {verbo}-{recurso}.controller.ts
│   │   │       └── routes.ts
│   │   ├── middlewares/             # verify-jwt, verify-multipart, verify-user-role
│   │   ├── plugins/                # request-logger, response-logger, serializer, shutdown, static-files
│   │   ├── presenters/             # 16+ presenters por domínio (default, simplified, detailed, forAdmin)
│   │   ├── schemas/                # schemas Zod de request/response por domínio
│   │   └── routes.ts               # registro central de rotas HTTP
│   └── ws/
│       ├── configurations/
│       └── routes.ts               # rotas WebSocket
│
├── use-cases/
│   ├── {domínio}/                  # lógica de negócio pura (um arquivo por use case)
│   └── errors/                     # erros específicos de domínio (ResourceNotFoundError, etc.)
│
├── repositories/
│   ├── {domínio}-repository.ts     # interfaces dos repositórios
│   └── prisma/
│       ├── prisma-{domínio}-repository.ts  # implementações concretas
│       ├── adapters/               # transformação de dados
│       ├── mappers/                # mapeamento Prisma → domínio
│       └── queries/                # query builders complexos
│
├── services/
│   ├── builders/                   # URL builders, auth token builders
│   ├── cache/                      # abstração de cache Redis
│   ├── encryption/                 # criptografia de dados sensíveis
│   ├── error-handlers/             # handlers globais de erro (Fastify, Sentry)
│   ├── exporters/                  # exportação CSV/Excel
│   ├── external/                   # integrações externas
│   ├── files/                      # manipulação de arquivos e uploads
│   ├── formatters/                 # formatação de dados
│   ├── guards/                     # validações de segurança e acesso
│   ├── hashes/                     # HashService (Argon2/bcrypt)
│   ├── mappers/                    # mapeamento genérico
│   ├── renderers/                  # renderização HTML (Nunjucks)
│   ├── system/                     # sinais do sistema, shutdown
│   ├── validators/                 # validações reutilizáveis
│   └── ws/                         # serviços WebSocket
│
├── jobs/
│   ├── queues/facades/             # facades das filas BullMQ
│   └── cron/schedulers/            # tarefas agendadas
│
├── lib/
│   ├── tsyringe/                   # configuração DI (tokens, registros)
│   │   └── helpers/
│   │       ├── tokens.ts           # registro centralizado de tokens
│   │       └── registers/          # registros de repositórios, presenters, infra
│   ├── bullmq/                     # configuração de filas
│   │   └── helpers/bullmq-tokens.ts
│   ├── prisma/                     # cliente Prisma e extensões
│   ├── redis/                      # cliente Redis
│   ├── zod/                        # schemas Zod reutilizáveis (primitivos, enums, componentes)
│   ├── pino/                       # configuração de logger
│   ├── sentry/                     # integração Sentry
│   ├── nodemailer/                 # configuração SMTP
│   ├── tiptap/                     # processamento ProseMirror/TipTap
│   └── dayjs/                      # configuração de datas (dayjs)
│
├── templates/                      # templates Nunjucks para emails
└── utils/                          # utilitários puros (date, formatters, guards)

prisma/
├── schema.prisma                   # schema do banco de dados
├── seed.ts                         # seed de dados
├── migrations/                     # migrations Prisma
└── seed-data/                      # dados para seed
```

## Padrão arquitetural (fluxo de uma request)

```
Request → Controller → Zod validation → Use Case (via Tsyringe) → Repository Interface → Prisma Implementation → DB
                                              ↓
                                     Result / Domain Error
                                              ↓
                              Controller → Presenter → HTTP Response
```

## Tokens e Injeção de Dependência

- **Tsyringe** é o container de DI. Tokens definidos em `src/lib/tsyringe/helpers/tokens.ts`.
- Token format: `'NomeDoRepositorio'` para repositórios, `'entity:variant'` para presenters.
- Use Cases são decorados com `@injectable()` e recebem dependências via `@inject(token)` no construtor.
- Controllers resolvem Use Cases do container: `container.resolve(NomeDoUseCase)`.

## Variáveis de ambiente obrigatórias

```
NODE_ENV                    # development | staging | production | test
APP_PORT                    # porta do servidor (padrão: 3333)
DATABASE_URL                # postgres://...
JWT_SECRET                  # mín. 60 caracteres
JWT_EXPIRATION              # ex: 2h
JWT_REFRESH_EXPIRATION      # ex: 7d
ENCRYPTION_KEY              # base64, 44 chars (AES para dados sensíveis)
BLIND_INDEX_SECRET          # base64, 44 chars (blind index para documentos)
ARGON_MEMORY_COST           # 4096–262144
ARGON_TIME_COST             # 1–10
ARGON_PARALLELISM           # 1–8
ARGON_SECRET                # 32–64 chars
REDIS_HOST                  # host do Redis
REDIS_PORT                  # porta do Redis (padrão: 6379)
REDIS_PASSWORD              # senha do Redis
FRONTEND_URL                # URL do frontend (CORS)
SMTP_EMAIL                  # email do remetente
SMTP_PASSWORD               # senha SMTP
SMTP_PORT                   # porta SMTP
SMTP_HOST                   # host SMTP
SMTP_SECURE                 # true | false
SENTRY_DSN                  # (opcional) DSN do Sentry
```

## Padrões de código

- **TypeScript estrito:** nunca use `any`. Use `unknown` se necessário e faça narrowing.
- **Interfaces vs Types:** `interface` para contratos públicos (Repositories, Services); `type` para unions/intersections.
- **Zod:** use `z.infer<>` para derivar tipos de schemas de validação.
- **Imports:** use path aliases (`@use-cases/*`, `@repositories/*`, `@http/*`, `@services/*`, `@lib/*`, `@constants/*`, `@utils/*`, etc.).
- **Naming:** controllers nomeados `{verbo}-{recurso}.controller.ts`; use cases em pastas por domínio.
- **Presenters:** implementam `IPresenterStrategy<Input, Output>` com método `toHTTP()`.
- **Erros:** Use Cases lançam erros de domínio específicos (`ResourceNotFoundError`, etc.). Controllers mapeiam para HTTP status codes.
- **Sem comentários óbvios:** não gere comentários que apenas descrevem o que o código faz.
- **Sem adições não solicitadas:** não adicione testes, documentação ou refatorações que não foram pedidos.
- **Erros não relacionados:** se ocorrer algum erro de compilação que não esteja correlacionado com a tarefa em andamento, pode ignorá-lo — não conserte a menos que o usuário solicite.

## Segurança

- Todos os endpoints públicos devem ter Rate Limiting configurado.
- Toda entrada de dados é validada com Zod — sem exceção.
- Dados sensíveis (senhas, tokens, documentos) NUNCA são logados.
- Documentos de identidade são criptografados (AES) com blind index para busca.
- Hashing de senhas com Argon2 (com secret pepper).
- Comparações de tokens com `timingSafeEqual` — nunca compare strings diretamente.

## Comandos úteis

```bash
pnpm start:dev              # desenvolvimento com hot reload (tsx watch)
pnpm build                  # gera build (prisma generate + tsdown)
pnpm start:prod             # roda dist/ em produção
pnpm db:generate            # gera o Prisma Client
pnpm db:migrate:dev         # roda migrations em dev
pnpm db:reset               # reset completo (generate + migrate reset + seed)
pnpm db:seed                # popula o banco com dados de seed
pnpm check:src:biome        # lint + format do código fonte
make dev-up                 # sobe PostgreSQL + Redis via Docker Compose
make dev-down               # derruba containers e volumes
make dev-reset-full         # reset completo (containers + install + db reset)
```
