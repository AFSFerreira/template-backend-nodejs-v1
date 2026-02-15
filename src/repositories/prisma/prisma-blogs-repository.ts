import type { BlogDetailedRaw } from '@custom-types/repository/prisma/adapter/blog-detailed'
import type { BlogSimplifiedRaw } from '@custom-types/repository/prisma/adapter/blog-simplified'
import type { CreateBlogQuery } from '@custom-types/repository/prisma/blog/create-blog-query'
import type { ListAllBlogsDetailedQuery } from '@custom-types/repository/prisma/blog/list-all-blogs-detailed-query'
import type { ListAllBlogsQuery } from '@custom-types/repository/prisma/blog/list-all-blogs-query'
import type { UpdateBlogQuery } from '@custom-types/repository/prisma/blog/update-blog-query'
import type { UpdateBlogStatusQuery } from '@custom-types/repository/prisma/blog/update-blog-status-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { BlogsRepository } from '@repositories/blogs-repository'
import { blogWithDetails } from '@custom-types/validators/blog-with-details'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'
import { blogDetailedAdapter } from './adapters/blogs/blog-detailed-adapter'
import { blogSimplifiedAdapter } from './adapters/blogs/blog-simplified-adapter'
import { buildListAllBlogsDetailedQuery } from './queries/blogs/orchestrators/build-list-all-blogs-detailed-query'
import { buildListAllBlogsSimplifiedQuery } from './queries/blogs/orchestrators/build-list-all-blogs-simplified-query'
import { buildListAllUserBlogsDetailedQuery } from './queries/blogs/orchestrators/build-list-all-user-blogs-detailed-query'

@injectable()
export class PrismaBlogsRepository implements BlogsRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  async create(data: CreateBlogQuery) {
    const { subcategoriesIds, userId, ...filteredBlogData } = data

    const blog = await this.dbContext.client.blog.create({
      data: {
        ...filteredBlogData,
        User: {
          connect: {
            id: userId,
          },
        },
        Subcategories: {
          connect: subcategoriesIds.map((subcategoryId) => ({
            id: subcategoryId,
          })),
        },
      },
      include: blogWithDetails.include,
    })
    return blog
  }

  async totalCount(where?: Prisma.BlogWhereInput) {
    const totalBlogs = await this.dbContext.client.blog.count({
      where,
    })
    return totalBlogs
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

  async listAllBlogs(query: ListAllBlogsQuery) {
    const { searchQuery, countQuery } = buildListAllBlogsSimplifiedQuery(query)

    const [countResult, blogs] = await Promise.all([
      this.dbContext.client.$queryRaw<Array<{ total: number }>>(countQuery),
      this.dbContext.client.$queryRaw<BlogSimplifiedRaw[]>(searchQuery),
    ])

    const pageSize = query.limit
    const totalItems = countResult[0].total

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: blogs.map(blogSimplifiedAdapter),
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

  async listAllBlogsDetailed(query: ListAllBlogsDetailedQuery) {
    const { searchQuery, countQuery } = buildListAllBlogsDetailedQuery(query)

    const [countResult, blogs] = await Promise.all([
      this.dbContext.client.$queryRaw<Array<{ total: number }>>(countQuery),
      this.dbContext.client.$queryRaw<BlogDetailedRaw[]>(searchQuery),
    ])

    const totalItems = countResult[0].total
    const pageSize = query.limit
    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: blogs.map(blogDetailedAdapter),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async listAllUserBlogs(query: ListAllBlogsDetailedQuery) {
    const { searchQuery, countQuery } = buildListAllUserBlogsDetailedQuery(query)

    const [countResult, blogs] = await Promise.all([
      this.dbContext.client.$queryRaw<Array<{ total: number }>>(countQuery),
      this.dbContext.client.$queryRaw<BlogDetailedRaw[]>(searchQuery),
    ])

    const totalItems = countResult[0].total
    const pageSize = query.limit
    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: blogs.map(blogDetailedAdapter),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async delete(id: number) {
    await this.dbContext.client.blog.delete({
      where: { id },
    })
  }

  async update(query: UpdateBlogQuery) {
    const blog = await this.dbContext.client.blog.update({
      where: { id: query.id },
      data: query.data,
    })
    return blog
  }

  async updateStatus(query: UpdateBlogStatusQuery) {
    const blog = await this.dbContext.client.blog.update({
      where: { id: query.id },
      data: {
        editorialStatus: query.status,
      },
    })
    return blog
  }
}
