import type { ImagePathInfo } from '@custom-types/custom/image-path-info'
import type { UpdateNewsletterQuery } from '@custom-types/repository/prisma/newsletter/update-newsletter-query'
import type {
  UpdateNewsletterUseCaseRequest,
  UpdateNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/update-newsletter'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import type { JSONContent } from '@tiptap/core'
import { InvalidFileOperationTypeError } from '@jobs/queues/errors/invalid-file-operation-type-error'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/newsletter-loggings'
import { Prisma } from '@prisma/generated/client'
import { NewsletterFormatType } from '@prisma/generated/enums'
import {
  buildNewsletterHtmlPath,
  buildNewsletterTempHtmlPath,
} from '@services/builders/paths/build-newsletter-html-path'
import {
  buildNewsletterImagePath,
  buildNewsletterTempImagePath,
} from '@services/builders/paths/build-newsletter-image-path'
import { buildNewsletterHtmlUrl } from '@services/builders/urls/build-newsletter-html-url'
import { buildNewsletterImageUrl } from '@services/builders/urls/build-newsletter-image-url'
import { removeNewsletterHTMLCache } from '@services/cache/newsletters-html-cache'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import { replaceProseMirrorImages } from '@services/extractors/replace-prose-mirror-images'
import { InvalidNewsletterContentError } from '@use-cases/errors/newsletter/invalid-newsletter-content-error'
import { NewsletterAlreadyExistsError } from '@use-cases/errors/newsletter/newsletter-already-exists-error'
import { NewsletterInvalidFilenameError } from '@use-cases/errors/newsletter/newsletter-invalid-filename-error'
import { NewsletterInvalidImageLinkError } from '@use-cases/errors/newsletter/newsletter-invalid-image-link-error'
import { NewsletterNotFoundError } from '@use-cases/errors/newsletter/newsletter-not-found-error'
import { moveFilesIfNotExists } from '@utils/files/move-files-if-not-exists'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateNewsletterUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,
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
                const oldProseMirrorImages = extractProseMirrorImages(foundNewsletter.proseContent as JSONContent)

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
              throw new InvalidFileOperationTypeError(previousFormat satisfies never)
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
              const oldImages = extractProseMirrorImages(foundNewsletter.proseContent as JSONContent)
              const newImages = extractProseMirrorImages(body.content.proseContent)

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

                oldToNewImagesLinkMap.set(imageName, buildNewsletterImageUrl(imageName))

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
              throw new InvalidFileOperationTypeError(previousFormat satisfies never)
            }
          }

          // Se o conteúdo prose mirror ainda não foi processado, tratar como nova criação:
          if (!updateData.proseContent) {
            const oldToNewImagesLinkMap = new Map<string, string>()

            const allImages = Array.from(extractProseMirrorImages(body.content.proseContent))

            imagesToMove = allImages.map((imageLink) => {
              const imageName = ensureExists({
                value: sanitizeUrlFilename(imageLink),
                error: new NewsletterInvalidImageLinkError(),
              })

              oldToNewImagesLinkMap.set(imageLink, buildNewsletterImageUrl(imageName))

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
          throw new InvalidFileOperationTypeError(currentFormat satisfies never)
        }
      }
    }

    const shouldUpdate = Object.keys(updateData).length > 0

    const newsletter = shouldUpdate
      ? await this.newslettersRepository.update({ id: foundNewsletter.id, data: updateData })
      : foundNewsletter

    // Mover arquivos HTML da pasta temporária para a pasta definitiva:
    if (htmlFileToMove) {
      await moveFilesIfNotExists(htmlFileToMove)
    }

    // Apagar arquivos HTML antigos:
    if (htmlFileToDelete) {
      await deleteFileEnqueued({ filePath: htmlFileToDelete })
    }

    // Mover novas imagens do prose mirror:
    if (imagesToMove) {
      await moveFilesIfNotExists(imagesToMove)
    }

    // Apagar imagens removidas do prose mirror:
    if (imagesToDelete) {
      await Promise.all(
        imagesToDelete.map(
          async (imageName) => await deleteFileEnqueued({ filePath: buildNewsletterImagePath(imageName) }),
        ),
      )
    }

    // Remover cache HTML da newsletter para forçar regeneração:
    await removeNewsletterHTMLCache({ newsletterId: foundNewsletter.id, redis })

    logger.info(
      { newsletterPublicId: newsletter.publicId, sequenceNumber: newsletter.sequenceNumber },
      NEWSLETTER_UPDATED_SUCCESSFULLY,
    )

    return {
      newsletter: {
        ...newsletter,
        contentUrl: buildNewsletterHtmlUrl(newsletter.publicId),
      },
    }
  }
}
