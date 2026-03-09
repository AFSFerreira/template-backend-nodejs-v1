export const swaggerTokens = {
  tags: {
    academicPublication: {
      public: 'Publicações Acadêmicas',
    },

    activityArea: {
      public: 'Áreas de Atuação',
    },

    address: {
      public: 'Endereços',
    },

    blog: {
      public: 'Blog',
      restricted: 'Blog (Restrito)',
    },

    dashboardMetrics: {
      public: 'Métricas do Painel (Público)',
      restricted: 'Métricas do Painel',
    },

    directorBoard: {
      public: 'Corpo Diretivo',
      restricted: 'Corpo Diretivo (Restrito)',
    },

    directorPosition: {
      restricted: 'Cargos de Diretoria',
    },

    documentManagement: {
      public: 'Gestão de Documentos',
      restricted: 'Gestão de Documentos (Restrito)',
    },

    healthCheck: {
      public: 'Health Check',
    },

    institution: {
      public: 'Instituições',
      restricted: 'Instituições (Restrito)',
    },

    institutionalInfo: {
      public: 'Informações Institucionais',
      restricted: 'Informações Institucionais (Restrito)',
    },

    meeting: {
      public: 'Reuniões',
      auth: 'Reuniões (Autenticado)',
      restricted: 'Reuniões (Restrito)',
    },

    meetingEnrollment: {
      restricted: 'Inscrições em Reuniões',
    },

    newsletter: {
      auth: 'Newsletters (Autenticado)',
      restricted: 'Newsletters (Restrito)',
    },

    newsletterTemplate: {
      restricted: 'Templates de Newsletter',
    },

    sliderImage: {
      public: 'Imagens do Slider',
      restricted: 'Imagens do Slider (Restrito)',
    },

    user: {
      public: 'Usuários',
      auth: 'Autenticação',
      restricted: 'Usuários (Restrito)',
      admin: 'Usuários (Admin)',
    },
  },
} as const
