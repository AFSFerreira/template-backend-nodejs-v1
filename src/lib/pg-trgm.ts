import type { PrismaClient } from '@prisma/client'

let alreadyRan = false

export async function enablePgTrgm(prisma: PrismaClient) {
  if (alreadyRan) return
  alreadyRan = true

  await prisma.$executeRawUnsafe(`
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
  `)

  console.log('pg_trgm enabled')
}
