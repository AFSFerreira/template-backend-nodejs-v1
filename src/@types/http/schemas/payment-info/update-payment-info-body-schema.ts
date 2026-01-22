import type { updatePaymentInfoBodySchema } from '@schemas/payment-info/update-payment-info-body-schema'
import type z from 'zod'

export type UpdatePaymentInfoBodySchemaType = z.infer<typeof updatePaymentInfoBodySchema>
