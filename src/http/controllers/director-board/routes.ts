import type { FastifyInstance } from 'fastify'
import { ADMIN_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
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
  app.get('/', getAllDirectorsBoard)
  app.get('/:publicId/about-me/html', getDirectorBoardAboutHTML)
  app.get(
    '/restrict/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    findDirectorBoardByPublicIdForAdmin,
  )
  app.get('/:publicId', findDirectorBoardByPublicId)

  // PATCH
  app.patch(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    updateDirectorBoard,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    deleteDirectorBoard,
  )

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
