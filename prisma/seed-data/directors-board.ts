import { directorPositionsArray } from './director-positions'

export const directorBoardData1 = {
  fullName: 'Gustavo Porto de Mello',
  aboutMe:
    'Astrônomo (UFRJ, 1986), doutor em Astrofísica (ON, 1996) e astrobiólogo. Professor do Observatório do Valongo/UFRJ desde 1993. Sócio fundador e atual presidente da Sociedade Brasileira de Astrobiologia. Coautor da descoberta da gêmea solar 18 Scorpii e de proposta da Kappa Ceti como análoga do Sol jovem. 55+ artigos, intensa divulgação científica desde 1987.',
  directorBoardProfileImage: 'Gustavo-Melo.png',
  linkLattes: 'http://lattes.cnpq.br/1918385364299862',
  DirectorPosition: { connect: { position: directorPositionsArray[0].position } },
}

export const directorBoardData2 = {
  fullName: 'Douglas Galante',
  aboutMe:
    'Bacharel em Ciências Moleculares (USP), doutor em Astronomia (IAG-USP) e pós-doutor pelo IAG-USP. Ex-coordenador do Grupo Carnaúba do Sirius/CNPEM. Professor de Geobiologia no IGc-USP. Atua em Geobiologia, Astrobiologia e Ciências Planetárias, estudando efeitos de radiação e a interação da vida com o ambiente em múltiplas escalas.',
  directorBoardProfileImage: 'Douglas-Galante.png',
  linkLattes: 'http://lattes.cnpq.br/9117662545474146',
  DirectorPosition: { connect: { position: directorPositionsArray[1].position } },
}

export const directorBoardData3 = {
  fullName: 'Beatriz Siffert',
  aboutMe:
    'Bacharel (2004) e doutora (2008) em Física (UFRJ), com pós-doutorados na Univ. Federico II (Itália), no CBPF e no IF/UFRJ. Professora na UFRJ (campus Duque de Caxias) desde 2016. Experiência em Astropartículas, Cosmologia e Astrobiologia; atuou com raios cósmicos, matéria escura e habitabilidade/exoplanetas.',
  directorBoardProfileImage: 'Beatriz-Siffert.png',
  linkLattes: 'http://lattes.cnpq.br/5093103617210826',
  DirectorPosition: { connect: { position: directorPositionsArray[3].position } },
}

export const directorBoardData4 = {
  fullName: 'Amanda Bendia',
  aboutMe:
    'Bióloga (UFRJ), mestrado em Biofísica (UFRJ) e doutorado em Microbiologia (USP). Professora doutora no Instituto Oceanográfico/USP, onde coordena o Laboratório de Extremófilos Marinhos. Pesquisa extremófilos em oceanos e Antártica, coordena o projeto AeroMicroAntar e atua fortemente em divulgação científica.',
  directorBoardProfileImage: 'Amanda-Bendia.png',
  linkLattes: 'http://lattes.cnpq.br/7450204581620194',
  DirectorPosition: { connect: { position: directorPositionsArray[4].position } },
}

export const directorBoardData5 = {
  fullName: 'Fábio Rodrigues',
  aboutMe:
    'Formado em Ciências Moleculares (USP) e doutor pelo IQ-USP. Pós-doutorado no IQ-USP; experiência no LNLS em espectroscopia EUV. Docente do IQ-USP e pesquisador associado ao NAP/Astrobio. Pesquisa química de interações entre microrganismos e substratos inorgânicos e bioassinaturas espectroscópicas.',
  directorBoardProfileImage: 'Fabio-Rodrigues.png',
  linkLattes: 'http://lattes.cnpq.br/5822376591265210',
  DirectorPosition: { connect: { position: directorPositionsArray[2].position } },
}

export const directorBoardData6 = {
  fullName: 'Flávia Callefo',
  aboutMe: 'Biografia da Flávia Callefo.',
  directorBoardProfileImage: 'Flavia-Callefo.png',
  linkLattes: 'http://lattes.cnpq.br/1704175571734114',
  DirectorPosition: { connect: { position: directorPositionsArray[7].position } },
}

export const directorBoardData7 = {
  fullName: 'Claudia Lage',
  aboutMe: 'Biografia da Claudia Lage.',
  directorBoardProfileImage: 'Claudia-Lage.png',
  linkLattes: 'http://lattes.cnpq.br/4916914753471904',
  DirectorPosition: { connect: { position: directorPositionsArray[6].position } },
}

export const directorBoardsArray = [
  directorBoardData1,
  directorBoardData2,
  directorBoardData3,
  directorBoardData4,
  directorBoardData5,
  directorBoardData6,
  directorBoardData7,
]
