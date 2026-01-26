import type { UpdateBlogUseCaseRequest, UpdateBlogUseCaseResponse } from '@custom-types/use-cases/blogs/update-blog'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { CONTENT_LEADER_PERMISSIONS, DRAFT_OR_PENDING_OR_CHANGES_REQUESTED } from '@constants/sets'
import { deleteFileEnqueued, moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_UPDATED_SUCCESSFULLY, BLOG_UPDATE_ERROR } from '@messages/loggings/models/blog-loggings'
import { ActivityAreaType } from '@prisma/client'
import { buildBlogBannerPath, buildBlogTempBannerPath } from '@services/builders/paths/build-blog-banner-path'
import { buildBlogImagePath, buildBlogTempImagePath } from '@services/builders/paths/build-blog-image-path'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { buildBlogImageUrl } from '@services/builders/urls/build-blog-image-url'
import { removeBlogHTMLCache } from '@services/cache/blogs-html-cache'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import { replaceProseMirrorImages } from '@services/extractors/replace-prose-mirror-images'
import { moveFile } from '@services/files/move-file'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { BlogAccessForbiddenError } from '@use-cases/errors/blog/blog-access-forbidden-error'
import { BlogEditorialStatusChangeForbiddenError } from '@use-cases/errors/blog/blog-editorial-status-change-forbidden-error'
import { BlogImageNotFoundError } from '@use-cases/errors/blog/blog-image-not-found-error'
import { BlogImagePersistError } from '@use-cases/errors/blog/blog-image-persist-error'
import { BlogInvalidBannerLinkError } from '@use-cases/errors/blog/blog-invalid-banner-link-error'
import { BlogInvalidImageLinkError } from '@use-cases/errors/blog/blog-invalid-image-link-error'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { InvalidBlogContentError } from '@use-cases/errors/blog/invalid-blog-content-error'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { fileExists } from '@utils/files/file-exists'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { BlogBannerPersistError } from '../errors/blog/blog-banner-persist-error'

@injectable()
export class UpdateBlogUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,

    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, userPublicId, body }: UpdateBlogUseCaseRequest): Promise<UpdateBlogUseCaseResponse> {
    const updateData: Prisma.BlogUpdateInput = {}

    const bannerImageSanitized = sanitizeUrlFilename(body.bannerImage)

    let bannerImage: string | undefined

    let newImages: Array<string> | undefined
    let removedImages: Array<string> | undefined

    try {
      const { blog, user } = await this.dbContext.runInTransaction(async () => {
        const user = ensureExists({
          value: await this.usersRepository.findByPublicId(userPublicId),
          error: new UserNotFoundError(),
        })

        const blog = ensureExists({
          value: await this.blogsRepository.findByPublicId(publicId),
          error: new BlogNotFoundError(),
        })

        bannerImage = blog.bannerImage

        // Se o usuário é um produtor de conteúdo e o blog não for de autoria dele:
        const userIsContentProducerAndIsNotAuthor =
          !CONTENT_LEADER_PERMISSIONS.has(user.role) && blog.userId !== user.id

        // Se o usuário é um produtor de conteúdo e o blog não está em estado de rascunho ou mudanças solicitadas:
        const userIsContentProducerAndBlogIsUnavailable =
          !CONTENT_LEADER_PERMISSIONS.has(user.role) &&
          blog.userId === user.id &&
          !DRAFT_OR_PENDING_OR_CHANGES_REQUESTED.has(blog.editorialStatus)

        if (userIsContentProducerAndIsNotAuthor || userIsContentProducerAndBlogIsUnavailable) {
          throw new BlogAccessForbiddenError()
        }

        if (body.title) {
          updateData.title = body.title
        }

        if (body.editorialStatus) {
          if (!CONTENT_LEADER_PERMISSIONS.has(user.role)) {
            throw new BlogEditorialStatusChangeForbiddenError()
          }

          updateData.editorialStatus = body.editorialStatus
        }

        if (body.content) {
          const searchContent = ensureExists({
            value: getProseMirrorText({ proseMirror: body.content, tiptapConfiguration }),
            error: new InvalidBlogContentError(),
          })

          const oldBlogImages = extractProseMirrorImages(blog.content as JSONContent)
          const newBlogImages = extractProseMirrorImages(body.content as JSONContent)

          newImages = Array.from<string>(newBlogImages.difference(oldBlogImages)).map((imageLink) => {
            return ensureExists({
              value: sanitizeUrlFilename(imageLink),
              error: new BlogInvalidImageLinkError(),
            })
          })

          removedImages = Array.from<string>(oldBlogImages.difference(newBlogImages)).map((imageLink) => {
            return ensureExists({
              value: sanitizeUrlFilename(imageLink),
              error: new BlogInvalidImageLinkError(),
            })
          })

          const oldToNewImagesLinkMap = new Map<string, string>()

          // Persistindo as novas imagens do blog:
          await Promise.all(
            newImages.map(async (imageName) => {
              oldToNewImagesLinkMap.set(imageName, buildBlogImageUrl(imageName))

              const oldFilePath = buildBlogTempImagePath(imageName)
              const newFilePath = buildBlogImagePath(imageName)

              const imagePersistResult = await moveFile({
                oldFilePath,
                newFilePath,
                options: {
                  ignoreOldFileMissing: true,
                },
              })

              // Se ocorrer algum erro durante a persistência da imagem do blog:
              if (!imagePersistResult) {
                throw new BlogImagePersistError()
              }

              // Se a imagem não foi encontrada na pasta temporária,
              // ela precisa estar na pasta definitiva:
              const fileAlreadyExists = await fileExists(newFilePath)

              if (imagePersistResult === oldFilePath || !fileAlreadyExists) {
                throw new BlogImageNotFoundError()
              }
            }),
          )

          const newProseMirror = replaceProseMirrorImages({
            proseMirror: body.content,
            oldToNewImagesMap: oldToNewImagesLinkMap,
          })

          updateData.content = newProseMirror as InputJsonValue
          updateData.searchContent = searchContent
        }

        if (body.bannerImage && bannerImageSanitized && bannerImageSanitized !== blog.bannerImage) {
          ensureExists({
            value: bannerImageSanitized,
            error: new BlogInvalidBannerLinkError(),
          })

          const persistedBanner = await moveFile({
            oldFilePath: buildBlogTempBannerPath(bannerImageSanitized),
            newFilePath: buildBlogBannerPath(bannerImageSanitized),
          })

          if (!persistedBanner) {
            throw new BlogBannerPersistError()
          }

          updateData.bannerImage = persistedBanner
        }

        if (body.subcategories) {
          const formattedSubcategories = body.subcategories.map((subcategory) => ({
            area: subcategory,
            type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
          }))

          // Valida as novas subcategorias:
          const { validatedActivityAreas, success } = await validateActivityAreas({
            activityAreas: formattedSubcategories,
            activityAreasRepository: this.activityAreasRepository,
          })

          if (!success) {
            throw new InvalidActivityArea(
              validatedActivityAreas.map((activityArea) => JSON.stringify(activityArea, null, 2)).toString(),
            )
          }

          updateData.Subcategories = {
            set: [],
            connectOrCreate: formattedSubcategories.map((formattedSubcategory) => ({
              where: { type_area: formattedSubcategory },
              create: formattedSubcategory,
            })),
          }
        }

        const updatedBlog = await this.blogsRepository.update({
          id: blog.id,
          data: updateData,
        })

        return { blog: updatedBlog, user }
      })

      // Enfileirando a remoção da imagem de banner antiga somente após update bem-sucedido:
      if (bannerImageSanitized && bannerImageSanitized !== blog.bannerImage) {
        await deleteFileEnqueued({
          filePath: buildBlogBannerPath(blog.bannerImage),
        })
      }

      if (removedImages) {
        // Enfileirando a remoção das imagens removidas do conteúdo do blog:
        for (const imageName of removedImages) {
          await deleteFileEnqueued({
            filePath: buildBlogImagePath(imageName),
          })
        }
      }

      // Remover cache HTML do blog para forçar regeneração:
      await removeBlogHTMLCache({ blogId: blog.id, redis })

      logger.info(
        {
          blogPublicId: blog.publicId,
          title: blog.title,
          authorPublicId: user.publicId,
          authorName: user.fullName,
        },
        BLOG_UPDATED_SUCCESSFULLY,
      )

      return {
        blog: {
          ...blog,
          bannerImage: buildBlogBannerUrl(blog.bannerImage),
        },
      }
    } catch (error) {
      logError({ error, message: BLOG_UPDATE_ERROR })

      if (body.bannerImage && bannerImageSanitized && bannerImageSanitized !== bannerImage) {
        // Restaurando a imagen de banner de blog previamente persistida:
        await moveFileEnqueued({
          oldFilePath: buildBlogBannerPath(bannerImageSanitized),
          newFilePath: buildBlogTempBannerPath(bannerImageSanitized),
        })
      }

      if (newImages) {
        // Restaurando as novas imagens de blog previamente persistidas:
        for (const imageName of newImages) {
          await moveFileEnqueued({
            oldFilePath: buildBlogImagePath(imageName),
            newFilePath: buildBlogTempImagePath(imageName),
          })
        }
      }

      throw error
    }
  }
}
