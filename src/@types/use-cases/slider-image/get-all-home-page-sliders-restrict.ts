import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllHomePageSlidersRestrictSchemaType } from '@custom-types/http/schemas/slider-image/get-all-home-page-sliders-restrict-schema'
import type { SliderImage } from '@prisma/client'

export interface GetAllHomePageSlidersRestrictUseCaseRequest extends GetAllHomePageSlidersRestrictSchemaType {}

export interface GetAllHomePageSlidersRestrictUseCaseResponse extends PaginatedResult<SliderImage[]> {}
