import { prisma } from '@lib/prisma'
import 'reflect-metadata'
import { userData1 } from './seed-data/users'

async function main() {
  // Criação de Usuários:
  await prisma.user.upsert({
    where: { email: userData1.email },
    update: {},
    create: userData1,
  })
}

main()
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    // biome-ignore lint/suspicious/noConsole: <Console necessário. Impossível utilizar pino aqui>
    console.error('Erro ao executar seed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
