import type { updateSliderImageBodySchema } from '@schemas/slider-image/update-slider-image-body-schema'
import type z from 'zod'

export type UpdateSliderImageBodySchemaType = z.infer<typeof updateSliderImageBodySchema>
