import type { Prisma } from '@prisma/generated/client'
import { HashService } from '@services/hashes/hash-service'

const passwordHash = await new HashService().hashPassword('123456789Az#')

export const userData1: Prisma.UserCreateInput = {
  fullName: 'Default User',
  email: 'user@email.com',
  username: 'username',
  passwordHash,
  birthdate: new Date('2025-09-22'),
  loginAttempts: 0,
  lastLogin: null,
}
