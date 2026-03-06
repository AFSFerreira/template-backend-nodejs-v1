import type { updateSliderImageBodySchema } from '@http/schemas/slider-image/update-slider-image-body-schema'
import type z from 'zod'

export type UpdateSliderImageBodyType = typeof updateSliderImageBodySchema

export type UpdateSliderImageBodySchemaType = z.infer<UpdateSliderImageBodyType>
