import type {
  GetDirectorBoardAboutHTMLUseCaseRequest,
  GetDirectorBoardAboutHTMLUseCaseResponse,
} from '@custom-types/use-cases/director-board/get-director-board-about-html'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { JSONContent } from '@tiptap/core'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { getDirectorBoardHTMLCached, setDirectorBoardHTMLCache } from '@services/cache/director-board-html-cache'
import { generateProseMirrorHtmlWeb } from '@services/formatters/generate-prose-mirror-html'
import { DirectorBoardNotFoundError } from '@use-cases/errors/director-board/director-board-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetDirectorBoardAboutHTMLUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,
  ) {}

  async execute({
    publicId,
  }: GetDirectorBoardAboutHTMLUseCaseRequest): Promise<GetDirectorBoardAboutHTMLUseCaseResponse> {
    const cachedHtml = await getDirectorBoardHTMLCached({ publicId, redis })

    if (cachedHtml) return { htmlContent: cachedHtml }

    const directorBoard = ensureExists({
      value: await this.directorBoardRepository.findByPublicId(publicId),
      error: new DirectorBoardNotFoundError(),
    })

    const proseMirror = directorBoard.aboutMe as JSONContent

    const htmlContent = await generateProseMirrorHtmlWeb(proseMirror, tiptapConfiguration)

    await setDirectorBoardHTMLCache({ publicId, htmlContent, redis })

    return { htmlContent }
  }
}
