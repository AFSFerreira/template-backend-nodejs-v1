import type { FastifyInstance } from 'fastify'
import { DIRECTORS_BOARD_PAYLOAD_LIMIT_SIZE, RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS, MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { createDirectorBoard } from './create-director-board.controller'
import { deleteDirectorBoard } from './delete-director-board.controller'
import { findDirectorBoardByPublicId } from './find-director-board-by-public-id.controller'
import { findDirectorBoardByPublicIdForAdmin } from './find-director-board-by-public-id-for-admin.controller'
import { getAllDirectorsBoard } from './get-all-director-board.controller'
import { getDirectorBoardAboutHTML } from './get-director-board-about-html.controller'
import { updateDirectorBoard } from './update-director-board.controller'
import { uploadDirectorBoardProfileImage } from './upload-director-board-profile-image.controller'

export async function directorBoardRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllDirectorsBoard,
  )
  app.get(
    '/:publicId/about-me/html',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getDirectorBoardAboutHTML,
  )
  app.get(
    '/restrict/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    findDirectorBoardByPublicIdForAdmin,
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    findDirectorBoardByPublicId,
  )

  // POST
  app.post(
    '/uploads/profile-image',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadDirectorBoardProfileImage,
  )
  app.post(
    '/',
    {
      ...DIRECTORS_BOARD_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    createDirectorBoard,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...DIRECTORS_BOARD_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    updateDirectorBoard,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    deleteDirectorBoard,
  )
}
