import { env } from '@env/index'
import type { PrismaClient } from '@prisma/client'

export async function ensurePgTrgmAvailable(prisma: PrismaClient) {
  const response: Array<{ extname: string }> = await prisma.$queryRaw`
    SELECT extname FROM pg_extension WHERE extname = 'pg_trgm'
  `

  if (response.length === 0) {
    console.warn(
      '\x1b[31mpg_trgm not enabled on this DB. Run the SQL script: prisma/extensions/pg-trgm.sql\x1b[0m',
    )
    return false
  }

  if (env.NODE_ENV === 'dev') {
    // Testar similarity:
    const similarity =
      await prisma.$queryRaw`SELECT similarity('astrology', 'astrobiology') as similarity`
    console.log('pg_trgm similarity check:', similarity)

    const result = await prisma.$queryRaw<
      Array<{ similar: boolean; score: number }>
    >`
      SELECT 
        similarity(${`banana`}, ${`bananas`}) AS score,
        ${`banana`} % ${`bananas`} AS similar;
    `

    console.log('result:', result)
  }

  return true
}
