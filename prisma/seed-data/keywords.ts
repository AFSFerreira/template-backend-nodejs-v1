import type { Prisma } from '@prisma/client'

const keywordConnectOrCreateUserData1: Prisma.KeywordCreateOrConnectWithoutUserInput = {
  where: { value: 'PALAVRA-CHAVE 1' },
  create: { value: 'PALAVRA-CHAVE 1' },
}

const keywordConnectOrCreateUserData2: Prisma.KeywordCreateOrConnectWithoutUserInput = {
  where: { value: 'PALAVRA-CHAVE 2' },
  create: { value: 'PALAVRA-CHAVE 2' },
}

const keywordConnectOrCreateUserData3: Prisma.KeywordCreateOrConnectWithoutUserInput = {
  where: { value: 'PALAVRA-CHAVE 3' },
  create: { value: 'PALAVRA-CHAVE 3' },
}

const keywordConnectOrCreateUserData4: Prisma.KeywordCreateOrConnectWithoutUserInput = {
  where: { value: 'PALAVRA-CHAVE 4' },
  create: { value: 'PALAVRA-CHAVE 4' },
}

export const keywordsConnectOrCreateUserData1: Prisma.KeywordCreateOrConnectWithoutUserInput[] = [
  keywordConnectOrCreateUserData1,
  keywordConnectOrCreateUserData2,
  keywordConnectOrCreateUserData3,
  keywordConnectOrCreateUserData4,
]
