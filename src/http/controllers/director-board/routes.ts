import type { FastifyInstance } from 'fastify'
import { DIRECTORS_BOARD_PAYLOAD_LIMIT_SIZE } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS, MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
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
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getAllDirectorsBoard,
  )
  app.get(
    '/:publicId/about-me/html',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    getDirectorBoardAboutHTML,
  )
  app.get(
    '/restrict/:publicId',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    findDirectorBoardByPublicIdForAdmin,
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
    },
    findDirectorBoardByPublicId,
  )

  // POST
  app.post(
    '/uploads/profile-image',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS), verifyMultipart],
    },
    uploadDirectorBoardProfileImage,
  )
  app.post(
    '/',
    {
      ...DIRECTORS_BOARD_PAYLOAD_LIMIT_SIZE,
      ...rateLimit({ max: 15, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    createDirectorBoard,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...DIRECTORS_BOARD_PAYLOAD_LIMIT_SIZE,
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    updateDirectorBoard,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    deleteDirectorBoard,
  )
}
