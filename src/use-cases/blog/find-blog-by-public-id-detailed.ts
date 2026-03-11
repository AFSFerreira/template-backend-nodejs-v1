import type {
  FindBlogByPublicIdRestrictedUseCaseRequest,
  FindBlogByPublicIdRestrictedUseCaseResponse,
} from '@custom-types/use-cases/blogs/find-blog-by-public-id-detailed'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { CONTENT_LEADER_PERMISSIONS, DRAFT_OR_PENDING_OR_CHANGES_REQUESTED } from '@constants/sets'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EditorialStatusType } from '@prisma/generated/enums'
import { BlogAccessForbiddenError } from '@use-cases/errors/blog/blog-access-forbidden-error'
import { BlogNotFoundError } from '@use-cases/errors/blog/blog-not-found-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class FindBlogByPublicIdRestrictedUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    publicId,
    userPublicId,
  }: FindBlogByPublicIdRestrictedUseCaseRequest): Promise<FindBlogByPublicIdRestrictedUseCaseResponse> {
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
  }
}
