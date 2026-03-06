import type { deleteSliderImageParamsSchema } from '@http/schemas/slider-image/delete-slider-image-params-schema'
import type z from 'zod'

export type DeleteSliderImageParamsType = typeof deleteSliderImageParamsSchema

export type DeleteSliderImageParamsSchemaType = z.infer<DeleteSliderImageParamsType>
