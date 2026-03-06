import type { getAllHomePageSlidersRestrictSchema } from '@http/schemas/slider-image/get-all-home-page-sliders-restrict-schema'
import type z from 'zod'

export type GetAllHomePageSlidersRestrictType = typeof getAllHomePageSlidersRestrictSchema

export type GetAllHomePageSlidersRestrictSchemaType = z.infer<GetAllHomePageSlidersRestrictType>
