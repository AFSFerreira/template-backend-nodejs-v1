import type { GetInstitutionalInfoAboutHTMLUseCaseResponse } from '@custom-types/use-cases/institutional-info/get-institutional-info-about-html'
import type { InstitutionalInfoRepository } from '@repositories/institutional-info-repository'
import type { JSONContent } from '@tiptap/core'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import {
  getInstitutionalInfoHTMLCached,
  setInstitutionalInfoHTMLCache,
} from '@services/cache/institutional-info-html-cache'
import { generateHTML } from '@tiptap/html'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetInstitutionalInfoAboutHTMLUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutionalInfo)
    private readonly institutionalInfoRepository: InstitutionalInfoRepository,
  ) {}

  async execute(): Promise<GetInstitutionalInfoAboutHTMLUseCaseResponse> {
    const institutionalInfo = await this.institutionalInfoRepository.getInstitutionalInfo()

    const cachedHtml = await getInstitutionalInfoHTMLCached({ institutionalInfoId: institutionalInfo.id, redis })

    if (cachedHtml) return { htmlContent: cachedHtml }

    const proseMirror = institutionalInfo.aboutDescription as JSONContent

    const htmlContent = generateHTML(proseMirror, tiptapConfiguration)

    await setInstitutionalInfoHTMLCache({ institutionalInfoId: institutionalInfo.id, htmlContent, redis })

    return { htmlContent }
  }
}
