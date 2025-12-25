import type {
  GetRestrictBlogHTMLContentUseCaseRequest,
  GetRestrictBlogHTMLContentUseCaseResponse,
} from '@custom-types/use-cases/blogs/get-restrict-blog-html-content'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { JSONContent } from '@tiptap/core'
import { CONTENT_LEADER_PERMISSIONS } from '@constants/sets'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { getBlogHTMLCached, setBlogHTMLCache } from '@services/cache/blogs-html-cache'
import { generateHTML } from '@tiptap/html'
import { BlogAccessForbiddenError } from '@use-cases/errors/blog/blog-access-forbidden-error'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetRestrictBlogHTMLContentUseCase {
  constructor(
    @inject(tokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    publicId,
    userPublicId,
  }: GetRestrictBlogHTMLContentUseCaseRequest): Promise<GetRestrictBlogHTMLContentUseCaseResponse> {
    const blog = ensureExists({
      value: await this.blogsRepository.findByPublicId(publicId),
      error: new BlogNotFoundError(),
    })

    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(userPublicId),
      error: new UserNotFoundError(),
    })

    if (!CONTENT_LEADER_PERMISSIONS.has(user.role) && blog.userId !== user.id) {
      throw new BlogAccessForbiddenError()
    }

    const cachedBlogHtml = await getBlogHTMLCached({ blogId: blog.id, redis })

    if (cachedBlogHtml) return { htmlContent: cachedBlogHtml }

    const blogProseMirror = blog.content as JSONContent

    const htmlContent = generateHTML(blogProseMirror, tiptapConfiguration)

    await setBlogHTMLCache({ blogId: blog.id, htmlContent, redis })

    return { htmlContent }
  }
}
