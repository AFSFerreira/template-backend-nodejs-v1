import type {
  FindBlogByPublicIdRestrictedUseCaseRequest,
  FindBlogByPublicIdRestrictedUseCaseResponse,
} from '@custom-types/use-cases/blogs/find-blog-by-public-id-detailed'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { CONTENT_LEADER_PERMISSIONS, DRAFT_OR_PENDING_OR_CHANGES_REQUESTED } from '@constants/sets'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { EditorialStatusType } from '@prisma/client'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { BlogAccessForbiddenError } from '@use-cases/errors/blog/blog-access-forbidden-error'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindBlogByPublicIdRestrictedUseCase {
  constructor(
    @inject(tokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    publicId,
    userPublicId,
  }: FindBlogByPublicIdRestrictedUseCaseRequest): Promise<FindBlogByPublicIdRestrictedUseCaseResponse> {
    const { blog } = await this.dbContext.runInTransaction(async () => {
      const blog = ensureExists({
        value: await this.blogsRepository.findByPublicId(publicId),
        error: new BlogNotFoundError(),
      })

      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(userPublicId),
        error: new UserNotFoundError(),
      })

      // Se a role do usuário não for um manager e o blog não é de autoria dele:
      const isNotManagagerAndBlogIsNotYours = !CONTENT_LEADER_PERMISSIONS.has(user.role) && blog.userId !== user.id

      // Se o usuário é um content producer, o blog é de autoria dele e o blog não está em um estado de rascunho:
      const blogIsYoursAndIsApproved =
        !CONTENT_LEADER_PERMISSIONS.has(user.role) &&
        !DRAFT_OR_PENDING_OR_CHANGES_REQUESTED.has(blog.editorialStatus) &&
        blog.userId === user.id

      // Se o blog está em um estado de rascunho e não é de autoria do usuário:
      const blogIsDraftAndIsNotYours = blog.editorialStatus === EditorialStatusType.DRAFT && blog.userId !== user.id

      if (isNotManagagerAndBlogIsNotYours || blogIsYoursAndIsApproved || blogIsDraftAndIsNotYours) {
        throw new BlogAccessForbiddenError()
      }

      return { blog }
    })

    return {
      blog: {
        ...blog,
        bannerImage: buildBlogBannerUrl(blog.bannerImage),
      },
    }
  }
}
