import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
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
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getAllHomePageSlidersRestrict,
  )
  app.get('/home-page', getAllHomePageSliders)

  // POST
  app.post(
    '/home-page',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    createHomePageSliderImage,
  )
  app.post(
    '/uploads/images',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadSliderImage,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    updateSliderImage,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteSliderImage,
  )
}
