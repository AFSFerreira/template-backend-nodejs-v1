import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { createSliderImage } from './create-slider-image.controller'
import { deleteSliderImage } from './delete-slider-image.controller'
import { getElectionNotice } from './get-election-notice.controller'
import { getSliderImages } from './get-slider-images.controller'
import { getStatute } from './get-statute.controller'
import { updateSliderImage } from './update-slider-image.controller'
import { uploadElectionNotice } from './upload-election-notice.controller'
import { uploadStatute } from './upload-statute.controller'

export async function documentManagementRoutes(app: FastifyInstance) {
  app.get('/statute', getStatute)
  app.get('/election-notice', getElectionNotice)
  app.get('/slider-images', getSliderImages)

  app.post(
    '/statute',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadStatute,
  )
  app.post(
    '/election-notice',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadElectionNotice,
  )
  app.post(
    '/slider-images',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    createSliderImage,
  )

  app.patch(
    '/slider-images/:id',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    updateSliderImage,
  )

  app.delete(
    '/slider-images/:id',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteSliderImage,
  )
}
