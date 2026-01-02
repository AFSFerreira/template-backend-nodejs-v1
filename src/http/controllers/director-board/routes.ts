import type { FastifyInstance } from 'fastify'
import { ADMIN_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { createDirectorBoard } from './create-director-board.controller'
import { findDirectorBoardByPublicId } from './find-director-board-by-public-id.controller'
import { getAllDirectorsBoard } from './get-all-director-board.controller'
import { uploadDirectorBoardProfileImage } from './upload-director-board-profile-image.controller'

export async function directorBoardRoutes(app: FastifyInstance) {
  // GET
  app.get('/', getAllDirectorsBoard)
  app.get('/:publicId', findDirectorBoardByPublicId)

  // POST
  app.post(
    '/uploads/temp-profile-image',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS), verifyMultipart],
    },
    uploadDirectorBoardProfileImage,
  )
  app.post(
    '/',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    createDirectorBoard,
  )
}
