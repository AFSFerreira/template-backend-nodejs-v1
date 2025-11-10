import type { Prisma } from '@prisma/client'
import { subActivityAreasConnection1, subActivityAreasConnection2 } from './activity-areas'
import { userData1 } from './users'

const partialBlogData1 = {
  authorName: userData1.fullName,
  bannerImage: 'null.png',
  content: {
    type: 'doc',
    content: 'Hello, World!',
  },
  User: {
    connect: {
      username: userData1.username,
    },
  },
  Subcategories: {
    connect: [subActivityAreasConnection1, subActivityAreasConnection2],
  },
}

export const blogData1 = {
  ...partialBlogData1,
  title: 'INTRODUÇÃO À ASTROBIOLOGIA',
  searchContent: 'Olá Mundo',
  Subcategories: {
    connect: [subActivityAreasConnection1, subActivityAreasConnection2],
  },
}

export const dummyBlogDataArray: Prisma.BlogCreateInput[] = [
  {
    ...partialBlogData1,
    bannerImage: 'blog-banner.jpg',
    title: 'Apresentação do blog da SBAstrobio',
    searchContent:
      'Se você está lendo esse texto, muito provavelmente é porque já tem algum interesse pela astrobiologia. E eu apostaria que você já faz alguma ideia de que a área procura entender como a vida pode estar distribuída no universo e como ela surgiu aqui na Terra e, talvez, em outros lugares. Mas você pode estar querendo saber mais sobre como os cientistas procuram por vida além do nosso planeta, como eles estão tentando entender quais são as condições e os ingredientes necessários para a existência de seres vivos em ambientes diferentes do nosso. Neste espaço, vamos publicar reportagens sobre pesquisas publicadas e projetos em andamento, entrevistas com cientistas, perfis dos pesquisadores que vêm construindo a astrobiologia no Brasil e no mundo. Com o tempo, vamos rechear o blog também com resenhas de livros e filmes, artigos contando episódios da história da busca por vida, mostrando como o imaginário ao redor de seres extraterrestres surgiu e mudou ao longo do tempo, além de comentários das mais recentes notícias relacionadas à astrobiologia. A maior parte dos materiais será produzida por mim, um jornalista de ciências que é também pesquisador da comunicação da astrobiologia. Nos últimos anos, tenho participado das discussões da comunidade científica da área sobre como encarar o desafio de comunicar resultados da busca por vida fora da Terra. Por isso, você também deverá encontrar por aqui, de vez em quando, algumas reflexões sobre como a astrobiologia se faz presente no espaço público.',
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Astrobiologia: busca, comunicação e curiosidade' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Se você está lendo esse texto, muito provavelmente é porque já tem algum interesse pela ',
            },
            { type: 'text', text: 'astrobiologia', marks: [{ type: 'bold' }] },
            {
              type: 'text',
              text: '. E eu apostaria que você já faz alguma ideia de que a área procura entender como a vida pode estar distribuída no universo e como ela surgiu aqui na Terra e, talvez, em outros lugares.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Mas você pode estar querendo saber mais sobre como os cientistas procuram por vida além do nosso planeta, como eles estão tentando entender quais são as condições e os ingredientes necessários para a existência de seres vivos em ambientes diferentes do nosso.',
            },
          ],
        },
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'O que encontrará por aqui' }],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Neste espaço, vamos publicar reportagens sobre pesquisas publicadas e projetos em andamento, entrevistas com cientistas, perfis dos pesquisadores que vêm construindo a ',
            },
            { type: 'text', text: 'astrobiologia', marks: [{ type: 'bold' }] },
            { type: 'text', text: ' no Brasil e no mundo.' },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Com o tempo, vamos rechear o blog também com resenhas de livros e filmes, artigos contando episódios da história da busca por vida, mostrando como o imaginário ao redor de seres extraterrestres surgiu e mudou ao longo do tempo, além de comentários das mais recentes notícias relacionadas à astrobiologia.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'A maior parte dos materiais será produzida por mim, ',
            },
            { type: 'text', text: 'um jornalista de ciências', marks: [{ type: 'italic' }] },
            {
              type: 'text',
              text: ' que é também pesquisador da comunicação da astrobiologia. Nos últimos anos, tenho participado das discussões da comunidade científica da área sobre como encarar o desafio de comunicar resultados da busca por vida fora da Terra.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Por isso, você também deverá encontrar por aqui, de vez em quando, algumas reflexões sobre como a astrobiologia se faz presente no espaço público.',
            },
          ],
        },
      ],
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
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
