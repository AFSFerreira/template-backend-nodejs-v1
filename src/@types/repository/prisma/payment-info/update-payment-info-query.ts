import type { Prisma } from '@prisma/generated/client'

export interface UpdatePaymentInfoQuery {
  id: number
  data: Prisma.PaymentInfoUpdateInput
}
