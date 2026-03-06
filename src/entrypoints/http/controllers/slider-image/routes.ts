import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
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
import { rateLimit } from '@utils/http/rate-limit'
import { createHomePageSliderImage } from './create-home-page-slider-image.controller'
import { deleteSliderImage } from './delete-slider-image.controller'
import { getAllHomePageSliders } from './get-all-home-page-sliders.controller'
import { getAllHomePageSlidersRestrict } from './get-all-home-page-sliders-restrict.controller'
import { updateSliderImage } from './update-slider-image.controller'
import { uploadSliderImage } from './upload-slider-image.controller'

export async function sliderImageRoutes(app: ZodFastifyInstance) {
  // GET
  app.get(
    '/home-page/restrict',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        querystring: getAllHomePageSlidersRestrictSchema,
      },
    },
    getAllHomePageSlidersRestrict,
  )
  app.get(
    '/home-page',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        querystring: getAllHomePageSlidersSchema,
      },
    },
    getAllHomePageSliders,
  )

  // POST
  app.post(
    '/home-page',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        body: createHomePageSliderImageBodySchema,
      },
    },
    createHomePageSliderImage,
  )
  app.post(
    '/uploads/images',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadSliderImage,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        params: updateSliderImageParamsSchema,
        body: updateSliderImageBodySchema,
      },
    },
    updateSliderImage,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        params: deleteSliderImageParamsSchema,
      },
    },
    deleteSliderImage,
  )
}
