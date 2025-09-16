import { activityAreaConnection, subActivityAreasConnection1, subActivityAreasConnection2 } from './activity-areas'
import { userData1 } from './users'

export const blogData = {
  title: 'INTRODUÇÃO À ASTROBIOLOGIA',
  authorName: userData1.fullName,
  searchContent: 'Olá Mundo',
  content: {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 1 },
        content: [
          {
            type: 'text',
            text: 'Olá Mundo',
          },
        ],
      },
    ],
  },
  User: {
    connect: {
      username: userData1.username,
    },
  },
  MainBlogCategory: {
    connect: {
      ...activityAreaConnection,
    },
  },
  Subcategories: {
    connect: [subActivityAreasConnection1, subActivityAreasConnection2],
  },
}
