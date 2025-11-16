import type { Prisma } from '@prisma/client'
import {
  activityAreaConnection1,
  subActivityAreasConnection1,
  subActivityAreasConnection3,
  subActivityAreasConnection4,
  subActivityAreasConnection5,
  subActivityAreasConnection6,
  subActivityAreasConnection7,
} from './activity-areas'
import { blogSearchContent1, blogSearchContent2, blogSearchContent3 } from './blog-contents'
import { dummyUserInfoArray } from './users'

const daniloInfo = dummyUserInfoArray.find((director) => director.fullName.toLowerCase() === 'danilo albergaria')

export const dummyBlogDataArray: Prisma.BlogCreateInput[] = [
  {
    ...blogSearchContent1,
    bannerImage: 'default.png',
    title: 'Apresentação do blog da SBAstrobio',
    authorName: daniloInfo.fullName,
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
    User: {
      connect: {
        email: daniloInfo.email,
      },
    },
  },
  {
    ...blogSearchContent2,
    title: 'Entrevista com um astrobiólogo: Dimas Zaia',
    bannerImage: 'dimas-zaia.png',
    authorName: daniloInfo.fullName,
    User: {
      connect: {
        email: daniloInfo.email,
      },
    },
    Subcategories: {
      connect: [subActivityAreasConnection3, subActivityAreasConnection4],
    },
  },
  {
    ...blogSearchContent3,
    title: 'Entrevista com um astrobiólogo — Eduardo Janot Pacheco',
    bannerImage: 'eduardo-pacheco.png',
    authorName: daniloInfo.fullName,
    User: {
      connect: {
        email: daniloInfo.email,
      },
    },
    Subcategories: {
      connect: [
        activityAreaConnection1,
        subActivityAreasConnection5,
        subActivityAreasConnection6,
        subActivityAreasConnection7,
      ],
    },
  },
  //   {
  //     ...partialBlogData1,
  //     title: 'VIDA EXTRATERRESTRE',
  //     searchContent: 'Busca por vida alienígena, exobiologia e organismos extremófilos',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
  //   {
  //     ...partialBlogData1,
  //     title: 'EXOPLANETAS E ZONAS HABITÁVEIS',
  //     searchContent: 'Planetas extrassolares, zona de Goldilocks e habitabilidade planetária',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
  //   {
  //     ...partialBlogData1,
  //     title: 'ORIGEM DA VIDA NA TERRA',
  //     searchContent: 'Evolução química, primeiros organismos e teorias sobre origem da vida',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
  //   {
  //     ...partialBlogData1,
  //     title: 'MISSÕES ESPACIAIS ASTROBIOLÓGICAS',
  //     searchContent: 'Mars Rover, Europa Clipper, exploração de Marte e luas de Júpiter',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
  //   {
  //     ...partialBlogData1,
  //     title: 'BIOSSINATURAS E DETECÇÃO DE VIDA',
  //     searchContent: 'Marcadores biológicos, espectroscopia e métodos de detecção remota',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
  //   {
  //     ...partialBlogData1,
  //     title: 'EXTREMÓFILOS E AMBIENTES EXTREMOS',
  //     searchContent: 'Organismos extremófilos, vida em condições adversas e analogos terrestres',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
  //   {
  //     ...partialBlogData1,
  //     title: 'QUÍMICA PREBIÓTICA',
  //     searchContent: 'Moléculas orgânicas complexas, aminoácidos no espaço e meteoritos',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
  //   {
  //     ...partialBlogData1,
  //     title: 'ATMOSFERAS PLANETÁRIAS E CLIMA',
  //     searchContent: 'Composição atmosférica, efeito estufa e evolução climática planetária',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
  //   {
  //     ...partialBlogData1,
  //     title: 'SETI E COMUNICAÇÃO EXTRATERRESTRE',
  //     searchContent: 'Search for Extraterrestrial Intelligence, radiotelescópios e sinais do espaço',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
  //   {
  //     ...partialBlogData1,
  //     title: 'EVOLUÇÃO ESTELAR E HABITABILIDADE',
  //     searchContent: 'Ciclo de vida das estrelas, anãs vermelhas e impacto na habitabilidade',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
  //   {
  //     ...partialBlogData1,
  //     title: 'PANSPERMIA E TRANSFERÊNCIA DE VIDA',
  //     searchContent: 'Teoria da panspermia, meteoritos e transferência de vida entre planetas',
  //     Subcategories: {
  //       connect: [subActivityAreasConnection1],
  //     },
  //   },
]
