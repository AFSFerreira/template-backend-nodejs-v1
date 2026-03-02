import type { getAllHomePageSlidersRestrictSchema } from '@http/schemas/slider-image/get-all-home-page-sliders-restrict-schema'
import type z from 'zod'

export type GetAllHomePageSlidersRestrictSchemaType = z.infer<typeof getAllHomePageSlidersRestrictSchema>
