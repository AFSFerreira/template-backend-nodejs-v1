import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllHomePageSlidersSchemaType } from '@custom-types/http/schemas/slider-image/get-all-home-page-sliders-schema'
import type { SliderImage } from '@prisma/generated/client'

export interface GetAllHomePageSlidersUseCaseRequest extends GetAllHomePageSlidersSchemaType {}

export interface GetAllHomePageSlidersUseCaseResponse extends PaginatedResult<SliderImage[]> {}
