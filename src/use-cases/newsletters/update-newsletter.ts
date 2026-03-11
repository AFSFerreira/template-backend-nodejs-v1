import type { ImagePathInfo } from '@custom-types/custom/image-path-info'
import type { UpdateNewsletterQuery } from '@custom-types/repository/prisma/newsletter/update-newsletter-query'
import type {
  UpdateNewsletterUseCaseRequest,
  UpdateNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/update-newsletter'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { NewsletterTemplatesRepository } from '@repositories/newsletter-templates-repository'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import type { JSONContent } from '@tiptap/core'
import { UnreachableCaseError } from '@errors/unreachable-case-error'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/newsletter-loggings'
import { Prisma } from '@prisma/generated/client'
import { NewsletterFormatType } from '@prisma/generated/enums'
import { NewsletterUrlBuilderService } from '@services/builders/urls/build-newsletter-image-url'
import { NewsletterHtmlCacheService } from '@services/caches/newsletters-html-cache'
import { ProseMirrorExtractorService } from '@services/extractors/extract-prose-mirror-images'
import { FileService } from '@services/files/file-service'
import { InvalidNewsletterContentError } from '@use-cases/errors/newsletter/invalid-newsletter-content-error'
import { NewsletterAlreadyExistsError } from '@use-cases/errors/newsletter/newsletter-already-exists-error'
import { NewsletterInvalidFilenameError } from '@use-cases/errors/newsletter/newsletter-invalid-filename-error'
import { NewsletterInvalidImageLinkError } from '@use-cases/errors/newsletter/newsletter-invalid-image-link-error'
import { NewsletterNotFoundError } from '@use-cases/errors/newsletter/newsletter-not-found-error'
import { NewsletterTemplateNotFoundError } from '@use-cases/errors/newsletter/newsletter-template-not-found-error'
import { buildNewsletterHtmlPath, buildNewsletterTempHtmlPath } from '@utils/builders/paths/build-newsletter-html-path'
import {
  buildNewsletterImagePath,
  buildNewsletterTempImagePath,
} from '@utils/builders/paths/build-newsletter-image-path'
import { getProseMirrorText } from '@utils/extractors/get-prose-mirror-text'
import { replaceProseMirrorImages } from '@utils/extractors/replace-prose-mirror-images'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateNewsletterUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tsyringeTokens.repositories.newsletterTemplates)
    private readonly newsletterTemplatesRepository: NewsletterTemplatesRepository,

    @inject(NewsletterUrlBuilderService)
    private readonly newsletterUrlBuilderService: NewsletterUrlBuilderService,

    @inject(NewsletterHtmlCacheService)
    private readonly newsletterHtmlCacheService: NewsletterHtmlCacheService,

    @inject(ProseMirrorExtractorService)
    private readonly proseMirrorExtractorService: ProseMirrorExtractorService,

    @inject(FileService)
    private readonly fileService: FileService,
  ) {}

  async execute({ publicId, body }: UpdateNewsletterUseCaseRequest): Promise<UpdateNewsletterUseCaseResponse> {
    const updateData: UpdateNewsletterQuery['data'] = {}

    let htmlFileToMove: ImagePathInfo | undefined
    let htmlFileToDelete: string | undefined
    let imagesToMove: ImagePathInfo[] | undefined
    let imagesToDelete: string[] | undefined

    const foundNewsletter = ensureExists({
      value: await this.newslettersRepository.findByPublicId(publicId),
      error: new NewsletterNotFoundError(),
    })

    // Validação e atualização do template:
    if (body.templateId) {
      const newsletterTemplate = ensureExists({
        value: await this.newsletterTemplatesRepository.findByPublicId(body.templateId),
        error: new NewsletterTemplateNotFoundError(),
      })

      updateData.newsletterTemplateId = newsletterTemplate.id
    }

    // Validação de conflito de sequência/edição/volume:
    if (body.sequenceNumber || body.editionNumber || body.volume) {
      const sequenceNumber = body.sequenceNumber ?? foundNewsletter.sequenceNumber
      const editionNumber = body.editionNumber ?? foundNewsletter.editionNumber
      const volume = body.volume ?? foundNewsletter.volume

      const conflictingNewsletter = await this.newslettersRepository.findConflictingNewsletter({
        ...(editionNumber && volume ? { editionNumber_volume: { editionNumber, volume } } : {}),
        sequenceNumber,
      })

      if (conflictingNewsletter && conflictingNewsletter.id !== foundNewsletter.id) {
        throw new NewsletterAlreadyExistsError()
      }

      if (body.sequenceNumber) updateData.sequenceNumber = body.sequenceNumber
      if (body.editionNumber) updateData.editionNumber = body.editionNumber
      if (body.volume) updateData.volume = body.volume
    }

    // Processamento de conteúdo:
    if (body.content) {
      const previousFormat = foundNewsletter.format
      const currentFormat = body.content.format

      switch (currentFormat) {
        case NewsletterFormatType.HTML_FILE: {
          const newContentFilename = ensureExists({
            value: sanitizeUrlFilename(body.content.contentFilename),
            error: new NewsletterInvalidFilenameError(),
          })

          updateData.format = NewsletterFormatType.HTML_FILE
          updateData.fileContent = newContentFilename
          updateData.proseContent = Prisma.DbNull

          htmlFileToMove = {
            oldFilePath: buildNewsletterTempHtmlPath(newContentFilename),
            newFilePath: buildNewsletterHtmlPath(newContentFilename),
          }

          // Limpeza de conteúdo do formato anterior:
          switch (previousFormat) {
            case NewsletterFormatType.HTML_FILE: {
              if (!foundNewsletter.fileContent) break

              if (foundNewsletter.fileContent) {
                htmlFileToDelete = buildNewsletterHtmlPath(foundNewsletter.fileContent)
              }

              break
            }

            case NewsletterFormatType.PROSEMIRROR: {
              if (!foundNewsletter.proseContent) break

              if (foundNewsletter.proseContent) {
                const oldProseMirrorImages = this.proseMirrorExtractorService.extractImages(
                  foundNewsletter.proseContent as JSONContent,
                )

                imagesToDelete = Array.from(oldProseMirrorImages).map((imageLink) => {
                  return ensureExists({
                    value: sanitizeUrlFilename(imageLink),
                    error: new NewsletterInvalidImageLinkError(),
                  })
                })
              }

              break
            }

            default: {
              throw new UnreachableCaseError(previousFormat satisfies never)
            }
          }

          break
        }

        case NewsletterFormatType.PROSEMIRROR: {
          ensureExists({
            value: getProseMirrorText({ proseMirror: body.content.proseContent, tiptapConfiguration }),
            error: new InvalidNewsletterContentError(),
          })

          // Limpeza de conteúdo do formato anterior:
          switch (previousFormat) {
            case NewsletterFormatType.HTML_FILE: {
              if (!foundNewsletter.fileContent) break

              if (foundNewsletter.fileContent) {
                htmlFileToDelete = buildNewsletterHtmlPath(foundNewsletter.fileContent)
              }

              break
            }

            case NewsletterFormatType.PROSEMIRROR: {
              if (!foundNewsletter.proseContent) break

              // Diferenciando imagens novas e removidas:
              const oldImages = this.proseMirrorExtractorService.extractImages(
                foundNewsletter.proseContent as JSONContent,
              )
              const newImages = this.proseMirrorExtractorService.extractImages(body.content.proseContent)

              const addedImageLinks = Array.from<string>(newImages.difference(oldImages))
              const removedImageLinks = Array.from<string>(oldImages.difference(newImages))

              const oldToNewImagesLinkMap = new Map<string, string>()

              imagesToDelete = removedImageLinks.map((imageLink) => {
                return ensureExists({
                  value: sanitizeUrlFilename(imageLink),
                  error: new NewsletterInvalidImageLinkError(),
                })
              })

              imagesToMove = addedImageLinks.map((imageLink) => {
                const imageName = ensureExists({
                  value: sanitizeUrlFilename(imageLink),
                  error: new NewsletterInvalidImageLinkError(),
                })

                oldToNewImagesLinkMap.set(imageName, this.newsletterUrlBuilderService.buildImageUrl(imageName))

                return {
                  oldFilePath: buildNewsletterTempImagePath(imageName),
                  newFilePath: buildNewsletterImagePath(imageName),
                }
              })

              const newProseMirror = replaceProseMirrorImages({
                proseMirror: body.content.proseContent,
                oldToNewImagesMap: oldToNewImagesLinkMap,
              })

              updateData.format = NewsletterFormatType.PROSEMIRROR
              updateData.fileContent = null
              updateData.proseContent = newProseMirror as InputJsonValue

              break
            }

            default: {
              throw new UnreachableCaseError(previousFormat satisfies never)
            }
          }

          // Se o conteúdo prose mirror ainda não foi processado, tratar como nova criação:
          if (!updateData.proseContent) {
            const oldToNewImagesLinkMap = new Map<string, string>()

            const allImages = Array.from(this.proseMirrorExtractorService.extractImages(body.content.proseContent))

            imagesToMove = allImages.map((imageLink) => {
              const imageName = ensureExists({
                value: sanitizeUrlFilename(imageLink),
                error: new NewsletterInvalidImageLinkError(),
              })

              oldToNewImagesLinkMap.set(imageLink, this.newsletterUrlBuilderService.buildImageUrl(imageName))

              return {
                oldFilePath: buildNewsletterTempImagePath(imageName),
                newFilePath: buildNewsletterImagePath(imageName),
              }
            })

            const newProseMirror = replaceProseMirrorImages({
              proseMirror: body.content.proseContent,
              oldToNewImagesMap: oldToNewImagesLinkMap,
            })

            updateData.format = NewsletterFormatType.PROSEMIRROR
            updateData.fileContent = null
            updateData.proseContent = newProseMirror as InputJsonValue
          }

          break
        }

        default: {
          throw new UnreachableCaseError(currentFormat satisfies never)
        }
      }
    }

    const shouldUpdate = Object.keys(updateData).length > 0

    const newsletter = shouldUpdate
      ? await this.newslettersRepository.update({ id: foundNewsletter.id, data: updateData })
      : foundNewsletter

    // Mover arquivos HTML da pasta temporária para a pasta definitiva:
    if (htmlFileToMove) {
      await this.fileService.moveFilesIfNotExists(htmlFileToMove)
    }

    // Apagar arquivos HTML antigos:
    if (htmlFileToDelete) {
      await deleteFileEnqueued({ filePath: htmlFileToDelete })
    }

    // Mover novas imagens do prose mirror:
    if (imagesToMove) {
      await this.fileService.moveFilesIfNotExists(imagesToMove)
    }

    // Apagar imagens removidas do prose mirror:
    if (imagesToDelete) {
      await Promise.all(
        imagesToDelete.map(
          async (imageName) => await deleteFileEnqueued({ filePath: buildNewsletterImagePath(imageName) }),
        ),
      )
    }

    await this.newsletterHtmlCacheService.remove(foundNewsletter.publicId)

    logger.info(
      { newsletterPublicId: newsletter.publicId, sequenceNumber: newsletter.sequenceNumber },
      NEWSLETTER_UPDATED_SUCCESSFULLY,
    )

    return {
      newsletter,
    }
  }
}
