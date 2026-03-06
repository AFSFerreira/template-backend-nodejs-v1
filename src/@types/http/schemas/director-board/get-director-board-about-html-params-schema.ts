import type { getDirectorBoardAboutHTMLParamsSchema } from '@http/schemas/director-board/get-director-board-about-html-params-schema'
import type z from 'zod'

export type GetDirectorBoardAboutHTMLParamsType = typeof getDirectorBoardAboutHTMLParamsSchema

export type GetDirectorBoardAboutHTMLParamsSchemaType = z.infer<GetDirectorBoardAboutHTMLParamsType>
