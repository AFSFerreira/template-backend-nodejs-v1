import { MANAGER_PERMISSIONS } from '@constants/route-configuration-constants'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import type { FastifyInstance } from 'fastify'
import { getElectionNotice } from './get-election-notice.controller'
import { getStatute } from './get-statute.controller'
import { uploadElectionNotice } from './upload-election-notice.controller'
import { uploadStatute } from './upload-statute.controller'

export async function documentManagementRoutes(app: FastifyInstance) {
  app.post(
    '/statute',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadStatute,
  )

  app.get('/statute', getStatute)

  app.post(
    '/election-notice',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadElectionNotice,
  )

  app.get('/election-notice', getElectionNotice)
}
