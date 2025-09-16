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

```bash
├─── .github
│    └─── workflows
├─── .husky
├─── prisma
│    └─── migrations
│         └─── ...
├─── uploads
│    └─── profile-images
└─── src
     ├─── @types
     ├─── constants
     ├─── env
     ├─── lib
     ├─── services
     ├─── templates
     ├─── utils
     ├─── repositories
     │    └─── prisma
     │        └─── queries
     ├─── http
     │    ├─── controllers
     │    │    ├─── activity-area
     │    │    └─── user
     │    ├─── middlewares
     │    ├─── presenters
     │    └─── schemas
     │         ├─── activity-area
     │         ├─── user
     │         └─── utils
     └─── use-cases
          ├─── activity-area
          ├─── errors
          ├─── factories
          │    ├─── activity-area
          │    ├─── messaging
          │    └─── user
          ├─── messaging
          └─── user
    
```

---

<a name="tipos-de-usuarios"></a>

# 👤 Tipos de Usuários:

<div align="center">

| Tipo de Usuário   |            Permissões Principais                   |
| :---------------: | :------------------------------------------------: |
| ADMIN             |       Gerenciamento global do sistema              |
| MANAGER           |       Gerenciamento parcial do sistema             |
| CONTENT_LEADER    |  Produtor e revisor irrestrito de conteúdo         |
| CONTENT_PRODUCER  |  Produtor de conteúdo dependente do CONTENT_LEADER |
| DEFAULT           | Usuário do sistema sem permissões especiais        |

</div>

---

<a name="funcionalidades-por-requisito"></a>

## ✅ Funcionalidades por Requisito:

### 📌 Requisito 1 – Cadastro e Edição de Usuários:

- [x] 1.1 Cadastro de Manager: Outorgar ou remover o privilégio de MANAGER para um usuário do sistema pelo Administrador
- [x] 1.2 Cadastro de Content Leader: Outorgar ou remover o privilégio de CONTENT_LEADER para um usuário do sistema pelo Administrador ou pelos Gestores do Sistema
- [x] 1.3 Cadastro de Content Producer: Outorgar ou remover o privilégio de CONTENT_PRODUCER para um usuário do sistema pelo Administrador ou pelos Gestores do Sistema
- [ ] 1.4 Cadastro de Usuário: Envio das informações básicas necessárias para cadastrar um novo usuário comum (desconsiderando a imagem de perfil)
- [ ] 1.5 Cadastro com upload de imagem de perfil 
- [ ] 1.6 Edição de Usuário: Os dados do usuário devem ser editáveis

### 📌 Requisito 2 – Autenticação e Acesso:
- [x] 2.1 Login com Email/Username e Senha
- [x] 2.2 Redefinição de Senha com envio de Email (esqueci a senha)
- [ ] 2.3 Inativação de Usuário: Um usuário deve ser inativado do sistema se não realizar o pagamento mensal da associação
- [x] 2.4 Recuperação de Usuários: Um Administrador ou um Gestor do Sistema devem ser capazes de recuperar usuários filtrados com paginação
- [ ] 2.5 Aprovação de Usuário: Um Administrador ou um Gestor do Sistema devem ser capazes de aprovar ou rejeitar o pedido de associação pendente do usuário

### 📌 Requisito 3 – Criação e Gestão de Reuniões:
- [ ] 3.1 Criação de Reunião: Título, datas, resumo do local e edital
- [ ] 3.2 Cancelamento de Reunião: A reunião deve ser removida do sistema
- [ ] 3.3 Edição de Reunião: Os dados da reunião devem ser editáveis

### 📌 Requisito 4 – Exportação de Dados:
- [x] 4.1 Exportação dos Usuários: O sistema deve ser capaz de exportar os dados de todos os usuários pelo Administador ou por um Gestor do Sistema
- [ ] 4.2 Exportação de Reuniões: O sistema deve ser capaz de exportar os dados de todas as reuniões pelo Administador ou por um Gestor do Sistema

---

<a name="requisitos-nao-funcionais"></a>

## 🧪 Requisitos Não Funcionais:

- [x] NF.1 - Segurança: Controle de acesso por tipo de usuário
- [ ] NF.2 - Escalabilidade: Suporte a múltiplos acessos e pesquisas simultâneas
- [ ] NF.3 - Desempenho: Buscas rápidas com paginação, cache e tolerância a erros de digitação
- [ ] NF.4 - Testabilidade: O sistema deve ser capaz de conduzir testes automatizados para assegurar seu funcionamento íntegr
- [ ] NF.5 - Confiabilidade: O sistema deve realizar verificações de healthcheck periodicamente para 

---

<a name="requisitos"></a>

## ✔️ Requisitos:
Certifique-se de que você tenha os seguintes softwares instalados antes de continuar:

- [Docker](https://www.docker.com/) (versão mínima: 20.10)
- [Docker Compose](https://docs.docker.com/compose/) (versão mínima: 1.29)

---

<a name="versoes-utilizadas"></a>

## ⚙️ Versões Utilizadas:
- **Node.js**: 24.0.0
- **PostgreSQL**: 17.6.0 (Imagem Docker Bitnami)
- **Prisma**: 6.15.0

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
npm install
```

5. Crie um arquivo `.env` na raiz do projeto copiando o conteúdo do `.env.example`:

```bash
copy .env.example .env
# Preencha manualmente os valores do arquivo .env que não estiverem definidos.
```

6. Inicialize os contêiners do Docker executando o comando:

```bash
docker compose up -d
```

7. Execute o comando para resetar o banco de dados, populá-lo com dados de teste definidos em `prisma/seed.ts` e habilitar as extensões necessárias:

```bash
npm run db:reset:all
```

8. Rode o projeto com o comando: 

```bash
npm run start:dev
```

---

<a name="links-externos"></a>

## 🔗 Links Externos:
- **Template Backend Utilizado**: <a href="https://github.com/gabriel-camara-dev/Template-backend" target="_blank">Clique Aqui</a>
- **Design Figma do Projeto**: <a href="https://www.figma.com/design/ULiwCqEx0UwiznBnox8JMO/Astrobiologia?node-id=0-1&p=f&t=S6I4CBTeWReB5J2u-0" target="_blank">Clique Aqui</a>
- **Documentação da API**: <a href="https://documenter.getpostman.com/view/45717933/2sB3HgQigL">Clique Aqui</a>

---

<a name="equipe-de-desenvolvimento"></a>

## 👥 Equipe de Desenvolvimento:
- **Product Owner**: <a href="https://github.com/DougCristiano" target="_blank">Douglas Cristiano</a>
- **Dev Backend**: <a href="https://github.com/zfrekey" target="_blank">Filype Abreu</a>
- **Dev Backend**: <a href="https://github.com/AFSFerreira" target="_blank">Allber Ferreira</a>
