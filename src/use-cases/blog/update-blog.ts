import type { ImagePathInfo } from '@custom-types/custom/image-path-info'
import type { UpdateBlogQuery } from '@custom-types/repository/prisma/blog/update-blog-query'
import type { UpdateBlogUseCaseRequest, UpdateBlogUseCaseResponse } from '@custom-types/use-cases/blogs/update-blog'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { CONTENT_LEADER_PERMISSIONS, DRAFT_OR_PENDING_OR_CHANGES_REQUESTED } from '@constants/sets'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/blog-loggings'
import { ActivityAreaType } from '@prisma/generated/enums'
import { buildBlogImageUrl } from '@services/builders/urls/build-blog-image-url'
import { removeBlogHTMLCache } from '@services/caches/blogs-html-cache'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { BlogAccessForbiddenError } from '@use-cases/errors/blog/blog-access-forbidden-error'
import { BlogEditorialStatusChangeForbiddenError } from '@use-cases/errors/blog/blog-editorial-status-change-forbidden-error'
import { BlogInvalidImageLinkError } from '@use-cases/errors/blog/blog-invalid-image-link-error'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { InvalidBlogContentError } from '@use-cases/errors/blog/invalid-blog-content-error'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { buildBlogBannerPath, buildBlogTempBannerPath } from '@utils/builders/paths/build-blog-banner-path'
import { buildBlogImagePath, buildBlogTempImagePath } from '@utils/builders/paths/build-blog-image-path'
import { getProseMirrorText } from '@utils/extractors/get-prose-mirror-text'
import { replaceProseMirrorImages } from '@utils/extractors/replace-prose-mirror-images'
import { moveFilesIfNotExists } from '@utils/files/move-files-if-not-exists'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateBlogUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,

    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ publicId, userPublicId, body }: UpdateBlogUseCaseRequest): Promise<UpdateBlogUseCaseResponse> {
    const updateData: UpdateBlogQuery['data'] = {}

    let newBannerImage: string | undefined

    let formattedBlogImages: ImagePathInfo[] | undefined

    let addedImageLinks: Array<string> | undefined
    let imagesToDelete: Array<string> | undefined

    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(userPublicId),
      error: new UserNotFoundError(),
    })

    const foundBlog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    if (body.bannerImage) {
      const bannerImageSanitized = sanitizeUrlFilename(body.bannerImage)

      newBannerImage =
        bannerImageSanitized && bannerImageSanitized !== foundBlog.bannerImage ? bannerImageSanitized : undefined
    }

    // Se o usuário é um produtor de conteúdo e o blog não for de autoria dele:
    const userIsContentProducerAndIsNotAuthor =
      !CONTENT_LEADER_PERMISSIONS.has(user.role) && foundBlog.userId !== user.id

    // Se o usuário é um produtor de conteúdo e o blog não está em estado de rascunho ou mudanças solicitadas:
    const userIsContentProducerAndBlogIsUnavailable =
      !CONTENT_LEADER_PERMISSIONS.has(user.role) &&
      foundBlog.userId === user.id &&
      !DRAFT_OR_PENDING_OR_CHANGES_REQUESTED.has(foundBlog.editorialStatus)

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

      const oldBlogImages = extractProseMirrorImages(foundBlog.content as JSONContent)
      const newBlogImages = extractProseMirrorImages(body.content as JSONContent)

      addedImageLinks = Array.from<string>(newBlogImages.difference(oldBlogImages)).map((imageLink) => {
        return ensureExists({
          value: sanitizeUrlFilename(imageLink),
          error: new BlogInvalidImageLinkError(),
        })
      })

      imagesToDelete = Array.from<string>(oldBlogImages.difference(newBlogImages)).map((imageLink) => {
        return ensureExists({
          value: sanitizeUrlFilename(imageLink),
          error: new BlogInvalidImageLinkError(),
        })
      })

      const oldToNewImagesLinkMap = new Map<string, string>()

      formattedBlogImages = addedImageLinks.map((imageName) => {
        oldToNewImagesLinkMap.set(imageName, buildBlogImageUrl(imageName))

        return {
          oldFilePath: buildBlogTempImagePath(imageName),
          newFilePath: buildBlogImagePath(imageName),
        }
      })

      const newProseMirror = replaceProseMirrorImages({
        proseMirror: body.content,
        oldToNewImagesMap: oldToNewImagesLinkMap,
      })

      updateData.content = newProseMirror as InputJsonValue
      updateData.searchContent = searchContent
    }

    if (newBannerImage) {
      updateData.bannerImage = newBannerImage
    }

    if (body.subcategories) {
      const nonRepeatingSubcategories = Array.from<string>(new Set<string>(body.subcategories))

      const formattedSubcategories = nonRepeatingSubcategories.map((subcategory) => ({
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

    const shouldUpdate = Object.keys(updateData).length > 0

    const blog = shouldUpdate
      ? await this.blogsRepository.update({
          id: foundBlog.id,
          data: updateData,
        })
      : foundBlog

    const blogBannerPaths = newBannerImage
      ? {
          oldFilePath: buildBlogTempBannerPath(newBannerImage),
          newFilePath: buildBlogBannerPath(newBannerImage),
        }
      : undefined

    if (blogBannerPaths) {
      await moveFilesIfNotExists(blogBannerPaths)

      await deleteFileEnqueued({
        filePath: buildBlogBannerPath(blog.bannerImage),
      })
    }

    if (formattedBlogImages) {
      await moveFilesIfNotExists(formattedBlogImages)
    }

    if (imagesToDelete) {
      // Enfileirando a remoção das imagens removidas do conteúdo do blog:
      await Promise.all(
        imagesToDelete.map(
          async (imageName) =>
            await deleteFileEnqueued({
              filePath: buildBlogImagePath(imageName),
            }),
        ),
      )
    }

    // Remover cache HTML do blog para forçar regeneração:
    await removeBlogHTMLCache({ publicId: blog.publicId, redis })

    logger.info(
      {
        blogPublicId: blog.publicId,
        title: blog.title,
        authorPublicId: user.publicId,
        authorName: user.fullName,
      },
      BLOG_UPDATED_SUCCESSFULLY,
    )

    return { blog }
  }
}
