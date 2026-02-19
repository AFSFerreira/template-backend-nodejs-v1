import { subcategoryArraySchema } from '@lib/zod/utils/database/subcategory-array-schema'
import { editorialStatusEnumSchema } from '@lib/zod/utils/enums/editorial-status-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { integerSchema } from '@lib/zod/utils/primitives/integer-schema'
import { nonemptyNullableTextSchema } from '@lib/zod/utils/primitives/nonempty-nullable-text-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const blogSimplifiedAdapterSchema = z
  .object({
    id: integerSchema,
    public_id: modelPublicIdSchema,
    editorial_status: editorialStatusEnumSchema,
    title: nonemptyTextSchema,
    banner_image: nonemptyTextSchema,
    search_content: nonemptyTextSchema,
    access_count: integerSchema,
    created_at: dateSchema,
    updated_at: dateSchema,
    user_full_name: nonemptyNullableTextSchema,
    subcategories: subcategoryArraySchema,
  })
  .transform((raw) => ({
    publicId: raw.public_id,
    title: raw.title,
    editorialStatus: raw.editorial_status,
    bannerImage: raw.banner_image,
    searchContent: raw.search_content,
    accessCount: raw.access_count,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  }))
