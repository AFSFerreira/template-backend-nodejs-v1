import { env } from '@env/index'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = env.DATABASE_URL
const pool = new Pool({ connectionString })

export const adapter = new PrismaPg(pool)
