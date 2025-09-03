# ![4797b663cfb501a9d4dddd726180bf7502b7bd95](https://github.com/user-attachments/assets/01ecf847-53b2-4db2-bda3-95923cee525b)

## 📋 Sumário

1. [Visão Geral](#visao-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Tipos de Usuários](#tipos-de-usuarios)
4. [Funcionalidades por Requisito](#funcionalidades-por-requisito)
5. [Requisitos Não Funcionais](#requisitos-nao-funcionais)
6. [Como Executar o Servidor](#como-executar-o-servidor)
7. [Links Externos](#links-externos)
8. [Equipe de Desenvolvimento](#equipe-de-desenvolvimento)

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

<a name="como-executar-o-servidor"></a>

## 💻 Como Executar o Servidor:
Se você já possui o <a href="https://pt.wikipedia.org/wiki/Docker_(software)" target="_blank">Docker</a> instalado e configurado em sua máquina, ignore esta etapa e avance para o [procedimento de execução do backend](#procedimento-de-execucao).

> [!TIP]
> Para verificar se você possui o Docker instalado em sua máquina, você pode executar as seguintes etapas:
> 
> ### 🪟 Verificando a Existência do Docker no Windows
> Abra o menu iniciar e pesquise se o programa `Docker Desktop` está instalado em sua máquina. Alternativamente, abra um terminal com o WSL e tente o comando `sudo docker --version`. Se você não sabe abrir ou configurar o WSL, avance para a [etapa de instalação do Docker + WSL](#etapa-de-instalacao-do-docker-no-wsl) descrita posteriormente.
> 
> ### 🐧 Verificando a Existência do Docker no Linux
> Abra um terminal e execute o comando `sudo docker --version`. Se você obter uma mensagem de retorno com o comando bem-sucedido, o Docker estará instalado em sua máquina. Caso contrário, avance para a etapa de [instalação do Docker no Linux](#instalação-do-docker-no-linux).

Caso contrário, siga as etapas abaixo descrevendo o procedimento de instalação em sua máquina:

> [!NOTE]
> Todos os comandos descritos a seguir podem e devem ser executados no terminal aberto diretamente na raiz do projeto clonado.
 
<a name="etapa-de-instalacao-do-docker-no-wsl"></a>

### 🪟 Instalando Docker + WSL no Windows
Será necessário instalar previamente uma ferramenta de emulação do Linux no Windows chamada <a href="https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux" target="_blank">WSL (Windows Subsystem for Linux)</a> para suportar os contêineres de Docker. Para isto, abra um novo terminal com permissão de administrador e execute os comandos listados a seguir, respectivamente:

Instale o WSL na sua máquina com uma distro do Ubuntu utilizando o comando:

```bash
wsl --install
```

Inicie a primeira instância de usuário Linux no WSL com o comando a seguir:

```bash
wsl.exe -d Ubuntu
```

Aguarde o término do processo e siga as etapas que o terminal solicitar, como a criação de um novo usuário e senha.

> [!WARNING]
> Se você obtiver algum erro durante a execução de algum dos comandos listados acima, significa que o serviço necessário para criar a <a href="https://pt.wikipedia.org/wiki/M%C3%A1quina_virtual" target="_blank">máquina virtual (VM)</a> do WSL2. É um erro comum quando algum requisito do WSL2 está desativado, corrompido ou mal configurado. Para solucionar este problema, siga as seguintes etapas:
> 1. Abra um novo terminal com permissão de administrador.
> 2. Execute o comando `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart` e, logo em seguida, execute `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`.
> 3. Reinicie o seu computador.
> 4. Abra um terminal com permissão de administrador novamente.
> 5. Por fim, instale o WSL novamente com o comando `wsl --install`.
> 
> Após concluir com êxito as etapas descritas acima, abra novamente um terminal na raíz do projeto e execute o comando `wsl` para acessar o terminal do wsl.
 
Finalizando as etapas anteriores, avance para o processo de instalação do Docker no Linux conforme descrito logo abaixo.
 
 <a name="instalação-do-docker-no-linux"></a>

### 🐧 Instalando Docker no Linux
Antes de proceder com a instalação, certifitique-se de remover quaisquer dependências conflitantes com o Docker de sua máquina. Para isto, execute o seguinte comando:

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

> [!TIP]
> Clique no ícone de "*copy to clipboard*" localizado no canto superior direito dos blocos de código com o estilo similar ao que está presente logo acima desta dica para copiar rapidamente todo o código contido no trecho.
 
Agora, antes de instalar o Docker, é preciso configurar o Docker apt Repository para preparar o ambiente de execução. Para tal, execute sequencialmente os comandos listados abaixo:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Finalmente, basta agora instalar o próprio Docker em sua máquina com o comando: 

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
 
Se desejar checar a instalação bem sucedida do Docker, execute o comando `sudo docker run hello-world` para obter um `Hello World` diretamente do Docker.
 
Para mais informações detalhadas sobre a instalação do Docker em ambiente Linux, acesse <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank">este site</a>.

> [!TIP]
> Alternativamente, você pode instalar o <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktop para Windows</a>, que já instala o Docker Engine e integra automaticamente com o WSL. Esta é a abordagem mais simples, mas necessita de um hardware mais potente.

> [!NOTE]
> Durante a execução dos comandos de instalação do Docker no WSL, é possível que seja solicitada múltiplas vezes a senha <a href="https://en.wikipedia.org/wiki/Sudo" target="_blank">sudo (SuperUser Do)</a> do usuário. A senha digitada não irá aparecer no terminal enquanto você a preenche, mas basta escrevê-la corretamente e pressionar enter para enviá-la.

<a name="procedimento-de-execucao" display="none"></a>

### 👨‍💻 Execução do Servidor:
1. Abra o terminal - `CMD`, `PowerShell`, `Bash` ou similares - em algum diretório de preferência em sua máquina.
2. Clone este repositório com o comando: `git clone https://github.com/IN-Junior-UFF/astrobiologia-backend`.
3. Navegue para dentro do projeto clonado com o comando: `cd astrobiologia-backend`.
4. Instale as dependências do projeto ao executar no console o comando: `npm install`.
5. Crie um arquivo `.env` na raiz do projeto copiando o conteúdo do `.env.example`. Preencha manualmente os valores que não estiverem definidos.
6. Se o seu sistema for o Windows e você ainda não estiver dentro do WSL, inicie-o com o comando `wsl.exe -d Ubuntu` no terminal aberto anteriormente na raíz do projeto. Se estiver utilizando Linux ou outro sistema operacional, ignore esta etapa.
7. Inicialize os contêiners do Docker executando o comando `sudo docker compose up -d` no terminal.
8. Execute `npm run db:reset:all` para resetar o banco de dados, populá-lo com dados de teste definidos em `prisma/seed.ts` e habilitar as extensões necessárias.
9. Rode o projeto com o comando: `npm run start:dev`.

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
