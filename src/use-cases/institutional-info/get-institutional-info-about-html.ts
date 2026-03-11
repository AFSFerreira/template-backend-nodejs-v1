import type { GetInstitutionalInfoAboutHTMLUseCaseResponse } from '@custom-types/use-cases/institutional-info/get-institutional-info-about-html'
import type { InstitutionalInfoRepository } from '@repositories/institutional-info-repository'
import type { JSONContent } from '@tiptap/core'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { InstitutionalInfoHtmlCacheService } from '@services/caches/institutional-info-html-cache'
import { TipTapRendererService } from '@services/formatters/generate-prose-mirror-html'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetInstitutionalInfoAboutHTMLUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutionalInfo)
    private readonly institutionalInfoRepository: InstitutionalInfoRepository,

    @inject(InstitutionalInfoHtmlCacheService)
    private readonly institutionalInfoHtmlCacheService: InstitutionalInfoHtmlCacheService,

    @inject(TipTapRendererService)
    private readonly tipTapRendererService: TipTapRendererService,
  ) {}

  async execute(): Promise<GetInstitutionalInfoAboutHTMLUseCaseResponse> {
    const cachedHtml = await this.institutionalInfoHtmlCacheService.get()

    if (cachedHtml) return { htmlContent: cachedHtml }

    const institutionalInfo = await this.institutionalInfoRepository.getInstitutionalInfo()

    const proseMirror = institutionalInfo.aboutDescription as JSONContent

    const htmlContent = await this.tipTapRendererService.generateProseMirrorHtmlWeb(proseMirror, tiptapConfiguration)

    await this.institutionalInfoHtmlCacheService.set(htmlContent)

    return { htmlContent }
  }
}
