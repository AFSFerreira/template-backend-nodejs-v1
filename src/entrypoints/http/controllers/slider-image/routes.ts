import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { createHomePageSliderImageBodySchema } from '@http/schemas/slider-image/create-home-page-slider-image-body-schema'
import { deleteSliderImageParamsSchema } from '@http/schemas/slider-image/delete-slider-image-params-schema'
import { getAllHomePageSlidersRestrictSchema } from '@http/schemas/slider-image/get-all-home-page-sliders-restrict-schema'
import { getAllHomePageSlidersSchema } from '@http/schemas/slider-image/get-all-home-page-sliders-schema'
import { updateSliderImageBodySchema } from '@http/schemas/slider-image/update-slider-image-body-schema'
import { updateSliderImageParamsSchema } from '@http/schemas/slider-image/update-slider-image-params-schema'
import { sliderImageSwaggerDocs } from '@lib/swagger/models/slider-image'
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { CreateHomePageSliderImageController } from './create-home-page-slider-image.controller'
import { DeleteSliderImageController } from './delete-slider-image.controller'
import { GetAllHomePageSlidersController } from './get-all-home-page-sliders.controller'
import { GetAllHomePageSlidersRestrictController } from './get-all-home-page-sliders-restrict.controller'
import { UpdateSliderImageController } from './update-slider-image.controller'
import { UploadSliderImageController } from './upload-slider-image.controller'

export async function sliderImageRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/home-page/restrict',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...sliderImageSwaggerDocs.getAllHomePageSlidersRestrict,
        querystring: getAllHomePageSlidersRestrictSchema,
      },
    },
    adaptRoute(GetAllHomePageSlidersRestrictController),
  )
  app.get(
    '/home-page',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...sliderImageSwaggerDocs.getAllHomePageSliders,
        querystring: getAllHomePageSlidersSchema,
      },
    },
    adaptRoute(GetAllHomePageSlidersController),
  )

  // POST
  app.post(
    '/home-page',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...sliderImageSwaggerDocs.createHomePageSliderImage,
        body: createHomePageSliderImageBodySchema,
      },
    },
    adaptRoute(CreateHomePageSliderImageController),
  )
  app.post(
    '/uploads/images',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
      schema: {
        ...sliderImageSwaggerDocs.uploadSliderImage,
      },
    },
    adaptRoute(UploadSliderImageController),
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...sliderImageSwaggerDocs.updateSliderImage,
        params: updateSliderImageParamsSchema,
        body: updateSliderImageBodySchema,
      },
    },
    adaptRoute(UpdateSliderImageController),
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...sliderImageSwaggerDocs.deleteSliderImage,
        params: deleteSliderImageParamsSchema,
      },
    },
    adaptRoute(DeleteSliderImageController),
  )
}
