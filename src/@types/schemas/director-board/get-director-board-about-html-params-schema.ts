import type { getDirectorBoardAboutHTMLParamsSchema } from '@schemas/director-board/get-director-board-about-html-params-schema'
import type z from 'zod'

export type GetDirectorBoardAboutHTMLParamsSchemaType = z.infer<typeof getDirectorBoardAboutHTMLParamsSchema>
