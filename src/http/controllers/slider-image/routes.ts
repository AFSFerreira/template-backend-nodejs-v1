import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { createHomePageSliderImage } from './create-home-page-slider-image.controller'
import { uploadSliderImage } from './upload-slider-image.controller'

export async function sliderImageRoutes(app: FastifyInstance) {
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
}

// app.patch(
//   '/slider-images/:id',
//   {
//     preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
//   },
//   updateSliderImage,
// )

// app.delete(
//   '/slider-images/:id',
//   {
//     preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
//   },
//   deleteSliderImage,
// )
