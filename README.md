# ![4797b663cfb501a9d4dddd726180bf7502b7bd95](https://github.com/user-attachments/assets/01ecf847-53b2-4db2-bda3-95923cee525b)

## Tabela de Conteúdos

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Estrutura Atual](#estrutura-atual)
3. [Sobre a Arquitetura](#sobre-a-arquitetura)
4. [O que já foi Feito?](#o-que-já-foi-feito)
5. [Como Executar o Servidor](#como-executar-o-servidor)


## Sobre o Projeto
Neste repositório está o projeto para a Sociedade de Astrobiologia. O projeto consiste na reconstrução da plataforma já existente. A plataforma possui postagens de blogs, materiais de ensino/aprendizagem, informações internas, entre outros. A plataforma pretende ser uma fonte de aprendizado ao mesmo tempo que é uma porta de entrada para conhecer a sociedade.

## Estrutura Atual

```code
├─── .github
│    └───workflows
├─── .husky
├─── prisma
│    └─── migrations
│         └─── ...
├─── src
│    ├─── @types
│    ├─── constants
│    ├─── env
│    ├─── http
│    │    └─── controllers
│    │        └───users
│    ├─── lib
│    ├─── middlewares
│    ├─── services
│    ├─── repositories
│    │    └─── prisma
│    ├─── use-cases
│    │   ├─── errors
│    │   ├─── academic-publication
│    │   │    └─── factories
│    │   ├─── address
│    │   │    └───factories
│    │   ├─── area-of-activity
│    │   │    └─── factories
│    │   ├─── enrolled-course
│    │   │    └─── factories
│    │   ├─── keyword
│    │   │    └─── factories
│    │   └─── user
│    │        └─── factories
│    └─── utils
└─── uploads
     └─── profile-images
```

## Sobre a Arquitetura

A arquitetura básica do projeto segue um padrão em camadas, amplamente adotado na empresa em projetos que utilizam TypeScript e Prisma. No entanto, algumas mudanças estruturais foram introduzidas, divergindo sutilmente das práticas previamente estabelecidas. Essas alterações concentram-se especificamente na organização do diretório de *use-cases*.

Diferentemente da estrutura tipicamente empregada nos demais projetos — nos quais a pasta *use-cases* segue um padrão mais simplificado, conforme ilustrado abaixo:

```bash
├─── errors
└─── factories
```

Optamos por aumentar a granularidade da divisão dos diretórios, reorganizando-os por modelo de domínio, conforme ilustrado a seguir:

```bash
├─── errors
├─── academic-publication
│    └─── factories
├─── address
│    └───factories
├─── area-of-activity
│    └─── factories
├─── enrolled-course
|    └─── factories
├─── keyword
|    └─── factories
└─── user
|     └─── factories
└─── ...
```

Essa decisão justifica-se pela necessidade de uma organização mais refinada dos arquivos, que, em outros projetos, estavam excessivamente dispersos, dificultando a localização de casos de uso específicos com base em seu contexto ou modelo associado.

O principal revés dessa abordagem está no pequeno aumento da complexidade dos caminhos relativos utilizados para referenciar arquivos de *factories* e *use-cases* — ainda que atenuado pelos aliases definidos no arquivo `tsconfig.json`. Contudo, após discussões sobre as implicações positivas e negativas da mudança, optamos por adotar essa reorganização estrutural como uma medida de melhoria na futura manutenção e escalabilidade do projeto.


## O que já foi Feito?
- [x] Configuração do Backend com Typescript, Husky e Linter
- [x] Documentação das Instruções de Setup
- [x] Rota para Realizar Cadastro de Usuários
- [x] Rota para Download dos Dados dos Usuários do Sistema em Formato `.csv`
- [x] Rota de Autenticação / Login
- [ ] Rota CRUD para os Dados de Usuário

## Como Executar o Servidor
1. Abra o terminal - `CMD`, `PowerShell`, `Bash` ou similares - em algum diretório de preferência em sua máquina.
2. Clone este repositório com o comando: `git clone https://github.com/IN-Junior-UFF/astrobiologia-backend`.
3. Navegue para dentro do projeto clonado com o comando: `cd astrobiologia-backend`.
4. Instale as dependências do projeto ao executar no console o comando: `npm install`.
5. Crie um arquivo `.env` na raiz do projeto copiando o conteúdo do `.env.example`. Preencha manualmente os valores que não estiverem definidos.

> [!WARNING]
> Se você já possui o [Docker](https://pt.wikipedia.org/wiki/Docker_(software)) instalado e configurado em sua máquina, avance para a etapa 6 deste procedimento.
> Caso contrário, siga as etapas elencadas abaixo para instalá-lo corretamente em sua máquina:
> 
> ### Windows
> Será necessário instalar previamente uma ferramenta de emulação do Linux no Windows chamada [WSL (Windows Subsystem for Linux)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) para suportar os contêineres de Docker. Para isto, abra um novo terminal com permissão de administrador e execute os comandos listados a seguir, respectivamente:
> - `wsl --install`: instala o WSL na sua máquina como uma distro do Ubuntu.
> - `wsl`: Inicializa a primeira instância de usuário Unix no WSL. Aguarde o término do processo e siga as etapas que o terminal solicitar
> 
> Após a conclusão das etapas listadas acima, avance para o processo de instalação do Docker no Linux descrito logo abaixo.
> 
> ### Linux
> Antes de proceder com a instalação, certifitique-se de remover quaisquer dependências conflitantes com o Docker de sua máquina. Para isto, execute o seguinte comando:
> - `for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done`
> 
> Agora, antes de instalar o Docker, é preciso configurar o Docker apt Repository para preparar o ambiente de execução. Para tal, execute sequencialmente os comandos listados abaixo:
>
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
> [!WARNING]
> Finalmente, basta agora instalar o próprio Docker em sua máquina com o comando: `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`
> 
> Se desejar constatar a instalação bem sucedida do Docker, execute o comando `sudo docker run hello-world` para obter um `Hello World` diretamente do Docker.
> 
> Para mais informações detalhadas sobre a instalação do Docker em ambiente Linux, acesse [este site](https://docs.docker.com/engine/install/ubuntu/).

> [!TIP]
> Alternativamente, você pode instalar o [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop/), que já instala o Docker Engine e integra automaticamente com o WSL. Esta é a abordagem mais simples, mas necessita de um hardware mais potente.

> [!NOTE]
> Durante a execução dos comandos de instalação do Docker no WSL, é possível que seja solicitada múltiplas vezes a senha [sudo (SuperUser Do)](https://en.wikipedia.org/wiki/Sudo) do usuário. A senha digitada não irá aparecer no terminal enquanto você a preenche, mas basta escrevê-la corretamente e pressionar enter para envia-la.

6. Se você ainda não estiver dentro do WSL, inicie-o com o comando `wsl`.
7. Inicialize os contêiners do Docker executando o comando `sudo docker compose up -d` no terminal.
8. (Opcional) Execute `npx prisma migrate dev` para aplicar as migrações se desejar preservar dados existentes.
9. Execute `npx prisma migrate reset` para resetar o banco e popular com dados de teste definidos em `prisma/seed.ts`.
10. Rode o projeto com o comando: `npm run start:dev`.
