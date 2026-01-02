import type { UpdateBlogUseCaseRequest, UpdateBlogUseCaseResponse } from '@custom-types/use-cases/blogs/update-blog'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { CONTENT_LEADER_PERMISSIONS, DRAFT_OR_PENDING_OR_CHANGES_REQUESTED } from '@constants/sets'
import { logger } from '@lib/logger'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_UPDATED_SUCCESSFULLY } from '@messages/loggings/blog-loggings'
import { ActivityAreaType } from '@prisma/client'
import { buildBlogBannerPath, buildBlogTempBannerPath } from '@services/builders/paths/build-blog-banner-path'
import { buildBlogImagePath, buildBlogTempImagePath } from '@services/builders/paths/build-blog-image-path'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { buildBlogImageUrl } from '@services/builders/urls/build-blog-image-url'
import { removeBlogHTMLCache } from '@services/cache/blogs-html-cache'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import { replaceProseMirrorImages } from '@services/extractors/replace-prose-mirror-images'
import { persistFile } from '@services/files/persist-file'
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
import { deleteFile } from '@utils/files/delete-file'
import { fileExists } from '@utils/files/file-exists'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { BlogBannerPersistError } from '../errors/blog/blog-banner-persist-error'

@injectable()
export class UpdateBlogUseCase {
  constructor(
    @inject(tokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,

    @inject(tokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, userPublicId, body }: UpdateBlogUseCaseRequest): Promise<UpdateBlogUseCaseResponse> {
    const { blog, user } = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(userPublicId),
        error: new UserNotFoundError(),
      })

      const blog = ensureExists({
        value: await this.blogsRepository.findByPublicId(publicId),
        error: new BlogNotFoundError(),
      })

      // Se o usuário é um produtor de conteúdo e o blog não for de autoria dele:
      const userIsContentProducerAndIsNotAuthor = !CONTENT_LEADER_PERMISSIONS.has(user.role) && blog.userId !== user.id

      // Se o usuário é um produtor de conteúdo e o blog não está em estado de rascunho ou mudanças solicitadas:
      const userIsContentProducerAndBlogIsUnavailable =
        !CONTENT_LEADER_PERMISSIONS.has(user.role) &&
        blog.userId === user.id &&
        !DRAFT_OR_PENDING_OR_CHANGES_REQUESTED.has(blog.editorialStatus)

      if (userIsContentProducerAndIsNotAuthor || userIsContentProducerAndBlogIsUnavailable) {
        throw new BlogAccessForbiddenError()
      }

      const updateData: Prisma.BlogUpdateInput = {}

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
        const searchContent = getProseMirrorText({ proseMirror: body.content, tiptapConfiguration })

        if (!searchContent) {
          throw new InvalidBlogContentError()
        }

        const oldBlogImages = extractProseMirrorImages(blog.content as JSONContent)
        const newBlogImages = extractProseMirrorImages(body.content)

        const newImages = newBlogImages.difference(oldBlogImages)
        const removedImages = oldBlogImages.difference(newBlogImages)

        const oldToNewImagesLinkMap = new Map<string, string>()

        // Persistindo as novas imagens do blog:
        await Promise.all(
          Array.from(newImages).map(async (imageLink) => {
            const imageName = sanitizeUrlFilename(imageLink)

            if (!imageName) {
              throw new BlogInvalidImageLinkError()
            }

            oldToNewImagesLinkMap.set(imageLink, buildBlogImageUrl(imageName))

            const oldFilePath = buildBlogTempImagePath(imageName)
            const newFilePath = buildBlogImagePath(imageName)

            const imagePersistResult = await persistFile({
              oldFilePath,
              newFilePath,
              options: {
                ignoreOldFileMissing: true,
              },
            })

            // Se a imagem não foi encontrada na pasta temporária,
            // ela precisa estar na pasta definitiva:
            const fileAlreadyExists = await fileExists(newFilePath)

            if (imagePersistResult === oldFilePath && !fileAlreadyExists) {
              throw new BlogImageNotFoundError()
            }

            // Se ocorrer algum erro durante a persistência da imagem do blog:
            if (!imagePersistResult) {
              throw new BlogImagePersistError()
            }
          }),
        )

        // Apagando as imagens removidas do blog:
        await Promise.all(
          Array.from(removedImages).map(async (image) => {
            const filenameFromUrl = sanitizeUrlFilename(image)

            if (!filenameFromUrl) {
              throw new BlogInvalidImageLinkError()
            }

            await deleteFile(buildBlogImagePath(filenameFromUrl))
          }),
        )

        const newProseMirror = replaceProseMirrorImages({
          proseMirror: body.content,
          oldToNewImagesMap: oldToNewImagesLinkMap,
        })

        updateData.content = newProseMirror as InputJsonValue
        updateData.searchContent = searchContent
      }

      if (body.bannerImage) {
        const newBannerImage = sanitizeUrlFilename(body.bannerImage)

        if (!newBannerImage) {
          throw new BlogInvalidBannerLinkError()
        }

        if (newBannerImage !== blog.bannerImage) {
          const persistedBanner = await persistFile({
            oldFilePath: buildBlogTempBannerPath(newBannerImage),
            newFilePath: buildBlogBannerPath(newBannerImage),
          })

          if (!persistedBanner) {
            throw new BlogBannerPersistError()
          }

          // Remove a imagem antiga somente após persistir a nova:
          await deleteFile(buildBlogBannerPath(blog.bannerImage))

          updateData.bannerImage = persistedBanner
        }
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

      // Remover cache HTML do blog para forçar regeneração
      await removeBlogHTMLCache({ blogId: blog.id, redis })

      return { blog: updatedBlog, user }
    })

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
  }
}
