# ![4797b663cfb501a9d4dddd726180bf7502b7bd95](https://github.com/user-attachments/assets/01ecf847-53b2-4db2-bda3-95923cee525b)

## Tabela de Conteúdos

1. [Sobre o Projeto](#sobre-o-projeto)
2. [Estrutura Atual](#estrutura-atual)
3. [Sobre a Arquitetura](#sobre-a-arquitetura)
4. [O Que Fizemos](#o-que-fizemos)
5. [Como Executar o Servidor](#como-executar-o-servidor)
6. [Equipe de Desenvolvimento](#equipe-de-desenvolvimento)

## Sobre o Projeto
Neste repositório está o projeto para a Sociedade de Astrobiologia. O projeto consiste na reconstrução da plataforma já existente. A plataforma possui postagens de blogs, materiais de ensino/aprendizagem, informações internas, entre outros. A plataforma pretende ser uma fonte de aprendizado ao mesmo tempo que é uma porta de entrada para conhecer a sociedade.

## Estrutura Atual

```bash
├─── .husky
├─── .github
│    └─── workflows
├─── uploads
│    └─── profile-images
├─── prisma
│    └─── migrations
│         └─── ...
└─── src
     ├─── @types
     ├─── constants
     ├─── env
     ├─── lib
     ├─── middlewares
     ├─── services
     ├─── utils
     ├─── repositories
     │    └─── prisma
     ├─── http
     │    └─── controllers
     │         └─── user
     └─── use-cases
         ├─── errors
         ├─── academic-publication
         │    └─── factories
         ├─── address
         │    └───factories
         ├─── area-of-activity
         │    └─── factories
         ├─── enrolled-course
         │    └─── factories
         ├─── keyword
         │    └─── factories
         └─── user
              └─── factories
    
```

## Sobre a Arquitetura
A arquitetura básica do projeto segue um padrão em camadas, amplamente adotado na empresa em projetos que utilizam [TypeScript](https://www.typescriptlang.org/) e [Prisma](https://www.prisma.io/). No entanto, algumas mudanças estruturais foram introduzidas, divergindo sutilmente das práticas previamente estabelecidas. Essas alterações concentram-se especificamente na organização do diretório de *use-cases*.

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
│    └─── factories
├─── area-of-activity
│    └─── factories
├─── enrolled-course
│    └─── factories
├─── keyword
│    └─── factories
├─── user
│    └─── factories
└─── ...
```

Essa decisão justifica-se pela necessidade de uma organização mais refinada dos arquivos, que, em outros projetos, estavam excessivamente dispersos, dificultando a localização de casos de uso específicos com base em seu contexto ou modelo associado.

O principal revés dessa abordagem está no pequeno aumento da complexidade dos caminhos relativos utilizados para referenciar arquivos de *factories* e *use-cases* — ainda que atenuado pelos aliases definidos no arquivo `tsconfig.json`. Contudo, após discussões sobre as implicações positivas e negativas da mudança, optamos por adotar essa reorganização estrutural como uma medida de melhoria na futura manutenção e escalabilidade do projeto.


## O Que Fizemos

- [x] Configuração do Backend com Typescript, Husky e Linter
- [ ] Modelo Completo do Banco de Dados
- [x] Documentação das Instruções de Setup
- [ ] Swagger do Servidor
- [x] Rota para Cadastrar Usuários
- [x] Rota para Autenticar Usuários
- [ ] Endpoints para Tratar os Dados do Usuário
- [x] Rota para Download dos Dados dos Usuários do Sistema em Formato `.csv`

## Como Executar o Servidor

1. Abra o terminal - `CMD`, `PowerShell`, `Bash` ou similares - em algum diretório de preferência em sua máquina.
2. Clone este repositório com o comando: `git clone https://github.com/IN-Junior-UFF/astrobiologia-backend`.
3. Navegue para dentro do projeto clonado com o comando: `cd astrobiologia-backend`.
4. Instale as dependências do projeto ao executar no console o comando: `npm install`.
5. Crie um arquivo `.env` na raiz do projeto copiando o conteúdo do `.env.example`. Preencha manualmente os valores que não estiverem definidos.

Se você já possui o [Docker](https://pt.wikipedia.org/wiki/Docker_(software)) instalado e configurado em sua máquina, avance para a [etapa 6](#etapa-6) deste procedimento.

> [!TIP]
> Para verificar se você possui o Docker instalado em sua máquina, você pode executar as seguintes etapas:
> 
> ### Verificando a Existência do Docker no Windows
> Abra o menu iniciar e pesquise se o programa `Docker Desktop` está instalado em sua máquina. Alternativamente, abra um terminal com o WSL e tente o comando `sudo docker --version`. Se você não sabe abrir ou configurar o WSL, avance para a [etapa de instalação do Docker + WSL](#instalando-docker--wsl-no-windows) descrita posteriormente.
> 
> ### Verificando a Existência do Docker no Linux
> Abra um terminal e execute o comando `sudo docker run hello-world`. Se você obter uma mensagem de retorno com o comando bem-sucedido, o Docker estará instalado em sua máquina. , avance para a etapa de [instalação do Docker no Linux](#instalando-o-docker-no-linux).

Caso contrário, siga as etapas abaixo descrevendo o procedimento de instalação em sua máquina:

> [!NOTE]
> Todos os comandos descritos a seguir podem e devem ser executados no terminal aberto diretamente na raiz do projeto clonado.
 
### Instalando Docker + WSL no Windows
Será necessário instalar previamente uma ferramenta de emulação do Linux no Windows chamada [WSL (Windows Subsystem for Linux)](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) para suportar os contêineres de Docker. Para isto, abra um novo terminal com permissão de administrador e execute os comandos listados a seguir, respectivamente:

Instale o WSL na sua máquina com uma distro do Ubuntu utilizando o comando:

```bash
wsl --install
```

Inicie a primeira instância de usuário Linux no WSL com o comando a seguir:

```bash
wsl
```

Aguarde o término do processo e siga as etapas que o terminal solicitar, como a criação de um novo usuário e senha.

> [!WARNING]
> Se você obtiver algum erro durante a execução de algum dos comandos listados acima, significa que o serviço necessário para criar a máquina virtual (VM) do WSL2 não está disponível ou não pode ser iniciado. É um erro comum quando algum requisito do WSL2 está desativado, corrompido ou mal configurado. Para solucionar este problema, siga as seguintes etapas:
> 1. Abra um novo terminal com permissão de administrador.
> 2. Execute o comando `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart` e, logo em seguida, execute `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`.
> 3. Reinicie o seu computador.
> 4. Abra um terminal com permissão de administrador novamente.
> 5. Por fim, instale o WSL novamente com o comando `wsl --install`.
> 
> Após concluir com êxito as etapas descritas acima, abra novamente um terminal na raíz do projeto e execute o comando `wsl` para acessar o terminal do wsl.
 
Finalziando as etapas anteriores, avance para o processo de instalação do Docker no Linux conforme descrito logo abaixo.
 
### Instalando Docker no Linux
Antes de proceder com a instalação, certifitique-se de remover quaisquer dependências conflitantes com o Docker de sua máquina. Para isto, execute o seguinte comando:

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

> [!TIP]
> Cline no ícone de "*copy to clipboard*" localizado no canto superior direito dos blocos de código com o estilo similar ao que está presente logo acima desta dica para copiar rapidamente todo o código contido no trecho.
 
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
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`
```
 
Se desejar checar a instalação bem sucedida do Docker, execute o comando `sudo docker run hello-world` para obter um `Hello World` diretamente do Docker.
 
Para mais informações detalhadas sobre a instalação do Docker em ambiente Linux, acesse [este site](https://docs.docker.com/engine/install/ubuntu/).

> [!TIP]
> Alternativamente, você pode instalar o [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop/), que já instala o Docker Engine e integra automaticamente com o WSL. Esta é a abordagem mais simples, mas necessita de um hardware mais potente.

> [!NOTE]
> Durante a execução dos comandos de instalação do Docker no WSL, é possível que seja solicitada múltiplas vezes a senha [sudo (SuperUser Do)](https://en.wikipedia.org/wiki/Sudo) do usuário. A senha digitada não irá aparecer no terminal enquanto você a preenche, mas basta escrevê-la corretamente e pressionar enter para enviá-la.

<a name="etapa-6" display="none"></a>

6. Se você ainda não estiver dentro do WSL, inicie-o com o comando `wsl`.
7. Inicialize os contêiners do Docker executando o comando `sudo docker compose up -d` no terminal.
8. (**Opcional**) Execute `npx prisma migrate dev` para aplicar as migrações se desejar preservar dados existentes.
9. Execute `npx prisma migrate reset` para resetar o banco e popular com dados de teste definidos em `prisma/seed.ts`.
10. Rode o projeto com o comando: `npm run start:dev`.

## Equipe de Desenvolvimento
- **Product Owner** : [Douglas Cristiano](https://github.com/DougCristiano) 
- **Dev Backend** : [Filype Abreu](https://github.com/zfrekey)
- **Dev Backend** : [Allber Ferreira](https://github.com/AFSFerreira)
