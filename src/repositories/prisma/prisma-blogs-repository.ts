import { blogWithDetails } from '@custom-types/blog-with-details'
import type { CustomBlogRaw } from '@custom-types/custom-blog-raw-type'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import type { BlogsRepository, ListAllBlogsQuery } from '@repositories/blogs-repository'
import { customBlogAdapter } from './adapters/custom-blogs-adapter'
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
      prisma.$queryRaw<CustomBlogRaw[]>(searchQuery),
    ])

    const totalItems = countResult[0].total

    const totalPages = Math.ceil(totalItems / query.limit)

    return {
      data: blogs.map(customBlogAdapter),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize: query.limit,
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
