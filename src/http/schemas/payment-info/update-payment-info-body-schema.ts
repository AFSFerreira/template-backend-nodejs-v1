import { paymentInfoSchema } from '@schemas/utils/components/payment-info/payment-info-schema'

export const updatePaymentInfoBodySchema = paymentInfoSchema.partial()
