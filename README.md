# Este é o servidor da Sociedade Brasileira de Astrobiologia

1. Clone este repositório: `git clone https://github.com/IN-Junior-UFF/astrobiologia-backend.git`.
2. Instale as dependências ao executar o comando no console: `npm install`.
3. Crie um arquivo `.env`, copie e cole o conteúdo de `.env.example` e configure as variáveis de ambiente.
4. Abra o Docker Desktop em sua máquina para ser capaz de utilizar os comandos do Docker
5. Inicialize os contêiners do Docker. executando o comando `docker-compose up -d` no terminal.
6. Execute o comando `npx prisma migrate dev` no terminal para transferir as migrações do banco de dados.
7. Execute o projeto com o comando: `npm run start:dev`.
