import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { getPaymentInfo } from './get-payment-info.controller'
import { updatePaymentInfo } from './update-payment-info.controller'

export async function paymentInfoRoutes(app: FastifyInstance) {
  // GET
  app.get('/', getPaymentInfo)

  // PATCH
  app.patch(
    '/',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    updatePaymentInfo,
  )
}
