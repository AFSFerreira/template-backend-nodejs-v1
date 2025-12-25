import { EditorialStatusType, type Prisma } from '@prisma/client'
import {
  subActivityAreaData1,
  subActivityAreaData4,
  subActivityAreaData9,
  subActivityAreaData11,
  subActivityAreaData12,
  subActivityAreaData15,
} from './activity-areas'
import { blogSearchContent1, blogSearchContent2, blogSearchContent3 } from './blog-contents'
import { contentLeaderUserData1 } from './users'

const blogData1: Prisma.BlogCreateInput = {
  ...blogSearchContent1,
  editorialStatus: EditorialStatusType.PUBLISHED,
  bannerImage: 'default.png',
  title: 'Apresentação do blog da SBAstrobio',
  authorName: contentLeaderUserData1.fullName,
  Subcategories: {
    connect: [
      {
        type_area: subActivityAreaData1,
      },
    ],
  },
  User: {
    connect: {
      email: contentLeaderUserData1.email,
    },
  },
}

const blogData2: Prisma.BlogCreateInput = {
  ...blogSearchContent2,
  editorialStatus: EditorialStatusType.PUBLISHED,
  title: 'Entrevista com um astrobiólogo: Dimas Zaia',
  bannerImage: 'dimas-zaia.png',
  authorName: contentLeaderUserData1.fullName,
  User: {
    connect: {
      email: contentLeaderUserData1.email,
    },
  },
  Subcategories: {
    connect: [
      {
        type_area: subActivityAreaData9,
      },
      {
        type_area: subActivityAreaData12,
      },
    ],
  },
}

const blogData3: Prisma.BlogCreateInput = {
  ...blogSearchContent3,
  editorialStatus: EditorialStatusType.PUBLISHED,
  title: 'Entrevista com um astrobiólogo — Eduardo Janot Pacheco',
  bannerImage: 'eduardo-pacheco.png',
  authorName: contentLeaderUserData1.fullName,
  User: {
    connect: {
      email: contentLeaderUserData1.email,
    },
  },
  Subcategories: {
    connect: [
      {
        type_area: subActivityAreaData1,
      },
      {
        type_area: subActivityAreaData4,
      },
      {
        type_area: subActivityAreaData11,
      },
      {
        type_area: subActivityAreaData15,
      },
    ],
  },
}

export const blogDataArray1: Prisma.BlogCreateInput[] = [blogData1, blogData2, blogData3]
