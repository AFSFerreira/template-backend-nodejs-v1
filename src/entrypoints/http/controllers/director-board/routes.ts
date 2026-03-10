import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { DIRECTORS_BOARD_PAYLOAD_LIMIT_SIZE, RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS, MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { createDirectorBoardBodySchema } from '@http/schemas/director-board/create-director-board-body-schema'
import { deleteDirectorBoardParamsSchema } from '@http/schemas/director-board/delete-director-board-params-schema'
import { findDirectorBoardByPublicIdForAdminParamsSchema } from '@http/schemas/director-board/find-director-board-by-public-id-for-admin-params-schema'
import { findDirectorBoardByPublicIdParamsSchema } from '@http/schemas/director-board/find-director-board-by-public-id-params-schema'
import { getAllDirectorBoardSchema } from '@http/schemas/director-board/get-all-director-board-query-schema'
import { getDirectorBoardAboutHTMLParamsSchema } from '@http/schemas/director-board/get-director-board-about-html-params-schema'
import { updateDirectorBoardBodySchema } from '@http/schemas/director-board/update-director-board-body-schema'
import { updateDirectorBoardParamsSchema } from '@http/schemas/director-board/update-director-board-params-schema'
import { directorBoardSwaggerDocs } from '@lib/swagger/models/director-board'
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { CreateDirectorBoardController } from './create-director-board.controller'
import { DeleteDirectorBoardController } from './delete-director-board.controller'
import { FindDirectorBoardByPublicIdController } from './find-director-board-by-public-id.controller'
import { FindDirectorBoardByPublicIdForAdminController } from './find-director-board-by-public-id-for-admin.controller'
import { GetAllDirectorsBoardController } from './get-all-director-board.controller'
import { GetDirectorBoardAboutHTMLController } from './get-director-board-about-html.controller'
import { UpdateDirectorBoardController } from './update-director-board.controller'
import { UploadDirectorBoardProfileImageController } from './upload-director-board-profile-image.controller'

export async function directorBoardRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...directorBoardSwaggerDocs.getAllDirectorsBoard,
        querystring: getAllDirectorBoardSchema,
      },
    },
    adaptRoute(GetAllDirectorsBoardController),
  )
  app.get(
    '/:publicId/about-me/html',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...directorBoardSwaggerDocs.getDirectorBoardAboutHTML,
        params: getDirectorBoardAboutHTMLParamsSchema,
      },
    },
    adaptRoute(GetDirectorBoardAboutHTMLController),
  )
  app.get(
    '/restrict/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...directorBoardSwaggerDocs.findDirectorBoardByPublicIdForAdmin,
        params: findDirectorBoardByPublicIdForAdminParamsSchema,
      },
    },
    adaptRoute(FindDirectorBoardByPublicIdForAdminController),
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...directorBoardSwaggerDocs.findDirectorBoardByPublicId,
        params: findDirectorBoardByPublicIdParamsSchema,
      },
    },
    adaptRoute(FindDirectorBoardByPublicIdController),
  )

  // POST
  app.post(
    '/uploads/profile-image',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
      schema: {
        ...directorBoardSwaggerDocs.uploadDirectorBoardProfileImage,
      },
    },
    adaptRoute(UploadDirectorBoardProfileImageController),
  )
  app.post(
    '/',
    {
      ...DIRECTORS_BOARD_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...directorBoardSwaggerDocs.createDirectorBoard,
        body: createDirectorBoardBodySchema,
      },
    },
    adaptRoute(CreateDirectorBoardController),
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...DIRECTORS_BOARD_PAYLOAD_LIMIT_SIZE,
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...directorBoardSwaggerDocs.updateDirectorBoard,
        params: updateDirectorBoardParamsSchema,
        body: updateDirectorBoardBodySchema,
      },
    },
    adaptRoute(UpdateDirectorBoardController),
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...directorBoardSwaggerDocs.deleteDirectorBoard,
        params: deleteDirectorBoardParamsSchema,
      },
    },
    adaptRoute(DeleteDirectorBoardController),
  )
}
