import type { PrismaClient } from '@prisma/client'
import { isValidSqlIdentifier } from '@/utils/is-valid-SQL-identifier'

export let enabledPgTrigramEnabled = false

async function enablePgTrgm(prisma: PrismaClient) {
  await prisma.$executeRawUnsafe(`
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
  `)

  await prisma.$executeRawUnsafe(`
    SET pg_trgm.similarity_threshold = 0.4;
  `)

  console.log('\x1b[32;1mpg_trgm enabled!\x1b[0m\n')

  console.log('Similarity Tests:')
  await logSimilarity(prisma, 'astrobiology', 'astrology')
}

async function insertGinIndexes(
  prisma: PrismaClient,
  tableName: string,
  fieldName: string,
) {
  if (!isValidSqlIdentifier(tableName))
    throw new Error(`Invalid SQL table name: '${tableName}'`)

  if (!isValidSqlIdentifier(fieldName))
    throw new Error(`Invalid SQL field name: '${fieldName}'`)

  const indexName = `idx_${tableName}_${fieldName}_trgm`

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS ${indexName} ON ${tableName} USING gin(${fieldName} gin_trgm_ops);
  `)

  console.log(`\x1b[33;1mindex '${indexName}' created!\x1b[0m`)
}

async function logSimilarity(prisma: PrismaClient, a: string, b: string) {
  const similarityResult = await prisma.$queryRawUnsafe<
    Array<{ similarity: number }>
  >(`
    SELECT similarity('${a}', '${b}');
  `)

  const operatorResult = await prisma.$queryRawUnsafe<
    Array<{ matches: boolean }>
  >(`
    SELECT '${a}' % '${b}' AS matches;
  `)

  const similarityValue = similarityResult[0]?.similarity
  const match = operatorResult[0]?.matches

  console.log(
    `\n\x1b[1msimilarity('${a}', '${b}') = ${similarityValue}\x1b[0m\n`,
  )
  console.log(`'\x1b[1m${a}' % '${b}' (threshold match) = ${match}\x1b[0m\n`)

  return { similarityValue, match }
}

export async function initializePgTrgmLib(prisma: PrismaClient) {
  // Habilitando lib do trigram:
  await enablePgTrgm(prisma)

  const targets = [{ table: 'blogs', field: 'content' }]

  for (const { table, field } of targets) {
    await insertGinIndexes(prisma, table, field)
  }

  enabledPgTrigramEnabled = true
}
