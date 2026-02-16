import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { getElectionNotice } from './get-election-notice.controller'
import { getStatute } from './get-statute.controller'
import { uploadElectionNotice } from './upload-election-notice.controller'
import { uploadStatute } from './upload-statute.controller'

export async function documentManagementRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/statute',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getStatute,
  )
  app.get(
    '/election-notice',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getElectionNotice,
  )

  // POST
  app.post(
    '/statute',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadStatute,
  )
  app.post(
    '/election-notice',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadElectionNotice,
  )
}
