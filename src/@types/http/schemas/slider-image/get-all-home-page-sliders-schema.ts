import type { getAllHomePageSlidersSchema } from '@http/schemas/slider-image/get-all-home-page-sliders-schema'
import type z from 'zod'

export type GetAllHomePageSlidersType = typeof getAllHomePageSlidersSchema

export type GetAllHomePageSlidersSchemaType = z.infer<GetAllHomePageSlidersType>
