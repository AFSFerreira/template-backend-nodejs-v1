import type { Document } from '@prisma/dmmf'

declare module '@prisma/generated/client' {
  namespace Prisma {
    export const dmmf: Document
  }
}
