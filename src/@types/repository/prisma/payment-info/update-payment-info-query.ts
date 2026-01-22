import type { Prisma } from '@prisma/client'

export interface UpdatePaymentInfoQuery {
  id: number
  data: Prisma.PaymentInfoUpdateInput
}
