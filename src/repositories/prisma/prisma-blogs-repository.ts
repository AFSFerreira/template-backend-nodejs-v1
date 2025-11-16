import type { BlogRaw } from '@custom-types/adapter/input/blog-raw-type'
import type { ListAllBlogsQuery } from '@custom-types/repositories/blog/list-all-blogs-query'
import { blogWithDetails } from '@custom-types/validator/blog-with-details'
import type { OrderableType } from '@custom-types/validator/orderable'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import type { BlogsRepository } from '@repositories/blogs-repository'
import { evalTotalPages } from '@utils/eval-total-pages'
import { blogAdapter } from './adapters/blogs/blog-adapter'
import { buildListAllBlogsQuery } from './queries/blogs/build-list-all-blogs-query'

export class PrismaBlogsRepository implements BlogsRepository {
  async create(data: Prisma.BlogUncheckedCreateInput) {
    const blog = await prisma.blog.create({
      data,
      include: blogWithDetails.include,
    })
    return blog
  }

  async findById(id: number) {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: blogWithDetails.include,
    })
    return blog
  }

  async findByPublicId(publicId: string) {
    const blog = await prisma.blog.findUnique({
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
      const blogs = await prisma.blog.findMany({
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
      prisma.$queryRaw<Array<{ total: number }>>(countQuery),
      prisma.$queryRaw<BlogRaw[]>(searchQuery),
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
    await prisma.blog.update({
      where: { id },
      data: {
        accessCount: { increment: 1 },
      },
    })
  }
}
