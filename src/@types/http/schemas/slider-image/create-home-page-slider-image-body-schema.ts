import type { createHomePageSliderImageBodySchema } from '@http/schemas/slider-image/create-home-page-slider-image-body-schema'
import type z from 'zod'

export type CreateHomePageSliderImageBodySchemaType = z.infer<typeof createHomePageSliderImageBodySchema>
