import type {
  CreateDraftCopyBlogUseCaseRequest,
  CreateDraftCopyBlogUseCaseResponse,
} from '@custom-types/use-cases/blogs/create-draft-copy-blog'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { BLOG_BANNERS_PATH, BLOG_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { CONTENT_LEADER_PERMISSIONS } from '@constants/sets'
import { logger } from '@lib/logger'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_COPY_CREATED_SUCCESSFULLY } from '@messages/loggings/models/blog-loggings'
import { EditorialStatusType } from '@prisma/client'
import { buildBlogBannerPath } from '@services/builders/paths/build-blog-banner-path'
import { buildBlogImagePath } from '@services/builders/paths/build-blog-image-path'
import { buildBlogImageUrl } from '@services/builders/urls/build-blog-image-url'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import { replaceProseMirrorImages } from '@services/extractors/replace-prose-mirror-images'
import { copyFile } from '@services/files/copy-file'
import { BlogContentCopyError } from '@use-cases/errors/blog/blog-content-copy-error'
import { BlogCopyForbiddenError } from '@use-cases/errors/blog/blog-copy-forbidden-error'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class CreateDraftCopyBlogUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    publicId,
    userPublicId,
  }: CreateDraftCopyBlogUseCaseRequest): Promise<CreateDraftCopyBlogUseCaseResponse> {
    const { blog, user } = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(userPublicId),
        error: new UserNotFoundError(),
      })

      const blog = ensureExists({
        value: await this.blogsRepository.findByPublicId(publicId),
        error: new BlogNotFoundError(),
      })

      if (!CONTENT_LEADER_PERMISSIONS.has(user.role) && blog.userId !== user.id) {
        throw new BlogCopyForbiddenError()
      }

      // Extrai o conjunto de todos os nomes das imagens do blog em formato de link:
      const blogImages = extractProseMirrorImages(blog.content as JSONContent)

      const oldToNewImagesLinkMap = new Map<string, string>()

      // Cria um map para transformar cada link de imagem antigo para o novo:
      await Promise.all(
        Array.from(blogImages).map(async (imageLink) => {
          const imageName = ensureExists({
            value: sanitizeUrlFilename(imageLink),
            error: new BlogContentCopyError(),
          })

          const imageCopyInfo = await copyFile({
            sourceFilePath: buildBlogImagePath(imageName),
            destinationFolderPath: BLOG_IMAGES_PATH,
          })

          if (!imageCopyInfo.success) {
            throw new BlogContentCopyError()
          }

          const copyImageNewUrl = buildBlogImageUrl(imageCopyInfo.filename)

          oldToNewImagesLinkMap.set(imageLink, copyImageNewUrl)
        }),
      )

      // Substitui os links do antigo prose mirror pelo novo:
      const newProseMirror = replaceProseMirrorImages({
        oldToNewImagesMap: oldToNewImagesLinkMap,
        proseMirror: blog.content as JSONContent,
      })

      // Cria um novo searchContent por segurança:
      const searchContent = ensureExists({
        value: getProseMirrorText({ proseMirror: newProseMirror as JSONContent, tiptapConfiguration }),
        error: new BlogContentCopyError(),
      })

      // Cria uma nova cópia da imagem do banner:
      const newBannerImage = await copyFile({
        sourceFilePath: buildBlogBannerPath(blog.bannerImage),
        destinationFolderPath: BLOG_BANNERS_PATH,
      })

      if (!newBannerImage.success) {
        throw new BlogContentCopyError()
      }

      const createdBlog = await this.blogsRepository.create({
        editorialStatus: EditorialStatusType.DRAFT,
        title: `${blog.title} - Cópia`,
        bannerImage: newBannerImage.filename,
        searchContent,
        subcategoriesIds: blog.Subcategories.map((subcategory) => subcategory.id),
        content: newProseMirror as InputJsonValue,
        authorName: user.fullName,
        userId: user.id,
      })

      return { blog: createdBlog, user }
    })

    logger.info(
      {
        blogPublicId: blog.publicId,
        title: blog.title,
        authorPublicId: user.publicId,
      },
      BLOG_COPY_CREATED_SUCCESSFULLY,
    )

    return { blog }
  }
}
