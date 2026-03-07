import type { SliderImage } from '@prisma/generated/client'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface HomePageSliderImagePresenterInput extends SliderImage {}

const httpHomePageSliderImageSchema = z.object({
  id: modelPublicIdSchema,
  image: nonemptyTextSchema,
  link: nullableTextSchema,
  order: numberSchema,
  isActive: booleanSchema,
})

export type HTTPHomePageSliderImage = z.infer<typeof httpHomePageSliderImageSchema>
