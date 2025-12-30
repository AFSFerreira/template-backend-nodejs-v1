import type { getAllHomePageSlidersSchema } from '@schemas/slider-image/get-all-home-page-sliders-schema'
import type z from 'zod'

export type GetAllHomePageSlidersSchemaType = z.infer<typeof getAllHomePageSlidersSchema>
