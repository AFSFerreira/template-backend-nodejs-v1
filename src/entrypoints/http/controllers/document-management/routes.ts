import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
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
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getStatute,
  )
  app.get(
    '/election-notice',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getElectionNotice,
  )

  // POST
  app.post(
    '/statute',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadStatute,
  )
  app.post(
    '/election-notice',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadElectionNotice,
  )
}
