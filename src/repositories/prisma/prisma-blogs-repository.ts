import type { BlogSimplifiedRaw } from '@custom-types/adapter/blog-simplified'
import type { ListAllBlogsQuery } from '@custom-types/repository/blog/list-all-blogs-query'
import type { OrderableType } from '@custom-types/validator/orderable'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { BlogsRepository } from '@repositories/blogs-repository'
import { blogWithDetails } from '@custom-types/validator/blog-with-details'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'
import { blogAdapter } from './adapters/blogs/blog-adapter'
import { buildListAllBlogsQuery } from './queries/blogs/build-list-all-blogs-query'

@injectable()
export class PrismaBlogsRepository implements BlogsRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  async create(data: Prisma.BlogUncheckedCreateInput) {
    const blog = await this.dbContext.client.blog.create({
      data,
      include: blogWithDetails.include,
    })
    return blog
  }

  async findById(id: number) {
    const blog = await this.dbContext.client.blog.findUnique({
      where: { id },
      include: blogWithDetails.include,
    })
    return blog
  }

  async findByPublicId(publicId: string) {
    const blog = await this.dbContext.client.blog.findUnique({
      where: { publicId },
      include: blogWithDetails.include,
    })
    return blog
  }

  async listAllBlogs(query?: ListAllBlogsQuery) {
    const orderBy: Prisma.BlogOrderByWithRelationInput[] = [
      { title: 'asc' as OrderableType },
      { id: 'asc' as OrderableType },
    ]

    if (!query) {
      const blogs = await this.dbContext.client.blog.findMany({
        select: {
          publicId: true,
          title: true,
          bannerImage: true,
          accessCount: true,
          searchContent: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy,
      })

      return {
        data: blogs,
        meta: {
          totalItems: blogs.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: blogs.length,
        },
      }
    }

    const { searchQuery, countQuery } = buildListAllBlogsQuery(query)

    const [countResult, blogs] = await Promise.all([
      this.dbContext.client.$queryRaw<Array<{ total: number }>>(countQuery),
      this.dbContext.client.$queryRaw<BlogSimplifiedRaw[]>(searchQuery),
    ])

    const pageSize = query.limit
    const totalItems = countResult[0].total

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: blogs.map(blogAdapter),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async incrementAccessesNumber(id: number) {
    await this.dbContext.client.blog.update({
      where: { id },
      data: {
        accessCount: { increment: 1 },
      },
    })
  }
}
