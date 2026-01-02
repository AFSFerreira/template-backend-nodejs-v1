import type { GetDirectorBoardAboutHTMLParamsSchemaType } from '@custom-types/schemas/director-board/get-director-board-about-html-params-schema'

export interface GetDirectorBoardAboutHTMLUseCaseRequest extends GetDirectorBoardAboutHTMLParamsSchemaType {}

export interface GetDirectorBoardAboutHTMLUseCaseResponse {
  htmlContent: string
}
