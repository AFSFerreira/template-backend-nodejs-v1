import type { updateSliderImageParamsSchema } from '@http/schemas/slider-image/update-slider-image-params-schema'
import type z from 'zod'

export type UpdateSliderImageParamsType = typeof updateSliderImageParamsSchema

export type UpdateSliderImageParamsSchemaType = z.infer<UpdateSliderImageParamsType>
