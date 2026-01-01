import type { Prisma } from '@prisma/client'
import {
  directorPositionData1,
  directorPositionData2,
  directorPositionData3,
  directorPositionData4,
  directorPositionData5,
  directorPositionData7,
  directorPositionData8,
} from './director-positions'

export const directorBoardCreateNestedUserData1: Prisma.DirectorBoardCreateNestedOneWithoutUserInput = {
  create: {
    aboutMe:
      'Astrônomo (UFRJ, 1986), doutor em Astrofísica (ON, 1996) e astrobiólogo. Professor do Observatório do Valongo/UFRJ desde 1993. Sócio fundador e atual presidente da Sociedade Brasileira de Astrobiologia. Coautor da descoberta da gêmea solar 18 Scorpii e de proposta da Kappa Ceti como análoga do Sol jovem. 55+ artigos, intensa divulgação científica desde 1987.',
    directorBoardProfileImage: 'gustavo-melo.png',
    DirectorPosition: { connect: { position: directorPositionData1.position } },
  },
}

export const directorBoardCreateNestedUserData2: Prisma.DirectorBoardCreateNestedOneWithoutUserInput = {
  create: {
    aboutMe:
      'Bacharel em Ciências Moleculares (USP), doutor em Astronomia (IAG-USP) e pós-doutor pelo IAG-USP. Ex-coordenador do Grupo Carnaúba do Sirius/CNPEM. Professor de Geobiologia no IGc-USP. Atua em Geobiologia, Astrobiologia e Ciências Planetárias, estudando efeitos de radiação e a interação da vida com o ambiente em múltiplas escalas.',
    directorBoardProfileImage: 'douglas-galante.png',
    DirectorPosition: { connect: { position: directorPositionData2.position } },
  },
}

export const directorBoardCreateNestedUserData3: Prisma.DirectorBoardCreateNestedOneWithoutUserInput = {
  create: {
    aboutMe:
      'Bacharel (2004) e doutora (2008) em Física (UFRJ), com pós-doutorados na Univ. Federico II (Itália), no CBPF e no IF/UFRJ. Professora na UFRJ (campus Duque de Caxias) desde 2016. Experiência em Astropartículas, Cosmologia e Astrobiologia; atuou com raios cósmicos, matéria escura e habitabilidade/exoplanetas.',
    directorBoardProfileImage: 'beatriz-siffert.png',
    DirectorPosition: { connect: { position: directorPositionData4.position } },
  },
}

export const directorBoardCreateNestedUserData4: Prisma.DirectorBoardCreateNestedOneWithoutUserInput = {
  create: {
    aboutMe:
      'Bióloga (UFRJ), mestrado em Biofísica (UFRJ) e doutorado em Microbiologia (USP). Professora doutora no Instituto Oceanográfico/USP, onde coordena o Laboratório de Extremófilos Marinhos. Pesquisa extremófilos em oceanos e Antártica, coordena o projeto AeroMicroAntar e atua fortemente em divulgação científica.',
    directorBoardProfileImage: 'amanda-bendia.png',
    DirectorPosition: { connect: { position: directorPositionData5.position } },
  },
}

export const directorBoardCreateNestedUserData5: Prisma.DirectorBoardCreateNestedOneWithoutUserInput = {
  create: {
    aboutMe:
      'Formado em Ciências Moleculares (USP) e doutor pelo IQ-USP. Pós-doutorado no IQ-USP; experiência no LNLS em espectroscopia EUV. Docente do IQ-USP e pesquisador associado ao NAP/Astrobio. Pesquisa química de interações entre microrganismos e substratos inorgânicos e bioassinaturas espectroscópicas.',
    directorBoardProfileImage: 'fabio-rodrigues.png',
    DirectorPosition: { connect: { position: directorPositionData3.position } },
  },
}

export const directorBoardCreateNestedUserData6: Prisma.DirectorBoardCreateNestedOneWithoutUserInput = {
  create: {
    aboutMe:
      'Licenciada (2011), mestre (2014) e doutora (2018) em Ciências Biológicas/Geociências (UNICAMP), com doutorado-sanduíche na Old Dominion University (EUA). Pós-doutoranda no Laboratório Nacional de Luz Síncrotron (Sirius – Linha Carnaúba/FAPESP). Experiência em Paleontologia, Geobiologia e Paleometria, com foco em estruturas microbianas e estudos paleoambientais. Interesse em Astrobiologia, especialmente em bioassinaturas geoquímicas e biominerais. Membro votante da Subcomissão do Pré-Criogeniano (ICS) e secretária da Sociedade Brasileira de Astrobiologia.',
    directorBoardProfileImage: 'flavia-callefo.png',
    DirectorPosition: { connect: { position: directorPositionData8.position } },
  },
}

export const directorBoardCreateNestedUserData7: Prisma.DirectorBoardCreateNestedOneWithoutUserInput = {
  create: {
    aboutMe:
      'Bacharel (1985), mestre (1990) e doutora (1995) em Ciências Biológicas (UFRJ), com pós-doutorados na USP e no CEA-França em reparo de DNA bacteriano. Professora associada na UFRJ desde 1994, atuou também como visiting professor na Open University (UK) e na Université de Nice Sophia-Antipolis (França), com colaborações em Astrobiologia e projetos bilaterais França-Brasil (PICS-CNRS). Tem experiência em Biofísica, com ênfase em dano e reparo de DNA, mutagênese e fotobiologia, integrando grupos de pesquisa do CNPq e tendo recebido o Prêmio de Inovação Médica em Genética (2018).',
    directorBoardProfileImage: 'claudia-lage.png',
    DirectorPosition: { connect: { position: directorPositionData7.position } },
  },
}

export const directorBoardCreateNestedUserDataArray1: Prisma.DirectorBoardCreateNestedOneWithoutUserInput[] = [
  directorBoardCreateNestedUserData1,
  directorBoardCreateNestedUserData2,
  directorBoardCreateNestedUserData3,
  directorBoardCreateNestedUserData4,
  directorBoardCreateNestedUserData5,
  directorBoardCreateNestedUserData6,
  directorBoardCreateNestedUserData7,
]
