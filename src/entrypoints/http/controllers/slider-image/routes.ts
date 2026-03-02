import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { createHomePageSliderImage } from './create-home-page-slider-image.controller'
import { deleteSliderImage } from './delete-slider-image.controller'
import { getAllHomePageSliders } from './get-all-home-page-sliders.controller'
import { getAllHomePageSlidersRestrict } from './get-all-home-page-sliders-restrict.controller'
import { updateSliderImage } from './update-slider-image.controller'
import { uploadSliderImage } from './upload-slider-image.controller'

export async function sliderImageRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/home-page/restrict',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getAllHomePageSlidersRestrict,
  )
  app.get(
    '/home-page',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllHomePageSliders,
  )

  // POST
  app.post(
    '/home-page',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
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
    },
    updateSliderImage,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteSliderImage,
  )
}
