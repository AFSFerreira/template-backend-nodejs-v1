import type { updateSliderImageParamsSchema } from '@http/schemas/slider-image/update-slider-image-params-schema'
import type z from 'zod'

export type UpdateSliderImageParamsSchemaType = z.infer<typeof updateSliderImageParamsSchema>
