import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { optionalNonemptyTextSchema } from '@lib/zod/utils/primitives/optional-nonempty-text-schema'
import z from 'zod'

export interface UploadedFileDefaultPresenterInput {
  filename: string
  publicUrl?: string
}

const httpFileSchema = z.object({
  filename: nonemptyTextSchema,
  publicUrl: optionalNonemptyTextSchema,
})

export type HTTPFile = z.infer<typeof httpFileSchema>
