import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllDirectorPositionsSchemaType } from '@custom-types/http/schemas/director-position/get-all-director-positions-schema'
import type { DirectorPosition } from '@prisma/generated/client'

export interface GetAllDirectorPositionsUseCaseRequest extends GetAllDirectorPositionsSchemaType {}

export interface GetAllDirectorPositionsUseCaseResponse extends PaginatedResult<DirectorPosition[]> {}
