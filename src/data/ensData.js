export const ensData = {
  categories: [
    {
      id: 1,
      code: 'org',
      name: 'Marco Organizativo',
      description: 'Políticas, normativa y procedimientos de seguridad',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      code: 'op',
      name: 'Marco Operacional',
      description: 'Planificación, control de acceso y explotación',
      color: 'bg-green-500'
    },
    {
      id: 3,
      code: 'mp',
      name: 'Medidas de Protección',
      description: 'Protección de instalaciones, personal y equipos',
      color: 'bg-purple-500'
    }
  ],
  
  measures: [
    // Marco Organizativo
    {
      id: 'org.1',
      categoryId: 1,
      code: 'org.1',
      name: 'Política de Seguridad',
      description: 'La organización aprobará una política de seguridad de la información que contemple las directrices de seguridad que deben cumplir los sistemas de información.',
      basicRequirement: 'La normativa de seguridad estará disponible en la organización.',
      mediumRequirement: 'Además del nivel BAJO, la política será comunicada a todos los miembros de la organización.',
      highRequirement: 'Además del nivel MEDIO, se requerirá reconocimiento formal de su conocimiento.',
      guideLink: 'https://www.ccn-cert.cni.es/series-ccn-stic/800-guia-esquema-nacional-de-seguridad/item/download/476_f8d7f6a1b7c5e1a0d4c8f9e2b3a6c7d8.html'
    },
    {
      id: 'org.2',
      categoryId: 1,
      code: 'org.2',
      name: 'Normativa de Seguridad',
      description: 'La organización desarrollará una normativa de seguridad que concrete la política de seguridad.',
      basicRequirement: 'Existirá normativa de seguridad que concrete la política.',
      mediumRequirement: 'Además del nivel BAJO, se revisará periódicamente.',
      highRequirement: 'Además del nivel MEDIO, se mantendrá un control de versiones.',
      guideLink: 'https://www.ccn-cert.cni.es/series-ccn-stic/800-guia-esquema-nacional-de-seguridad/item/download/476_f8d7f6a1b7c5e1a0d4c8f9e2b3a6c7d8.html'
    },
    {
      id: 'org.3',
      categoryId: 1,
      code: 'org.3',
      name: 'Procedimientos de Seguridad',
      description: 'Se elaborarán procedimientos que desarrollen la normativa de seguridad.',
      basicRequirement: 'Existirán procedimientos que desarrollen la normativa.',
      mediumRequirement: 'Además del nivel BAJO, estarán documentados y actualizados.',
      highRequirement: 'Además del nivel MEDIO, se verificará su cumplimiento.',
      guideLink: 'https://www.ccn-cert.cni.es/series-ccn-stic/800-guia-esquema-nacional-de-seguridad/item/download/476_f8d7f6a1b7c5e1a0d4c8f9e2b3a6c7d8.html'
    },
    {
      id: 'org.4',
      categoryId: 1,
      code: 'org.4',
      name: 'Proceso de Autorización',
      description: 'Se establecerá un proceso de autorización de los sistemas de información.',
      basicRequirement: 'Existirá un proceso de autorización documentado.',
      mediumRequirement: 'Además del nivel BAJO, incluirá análisis de riesgos.',
      highRequirement: 'Además del nivel MEDIO, se realizará seguimiento continuo.',
      guideLink: 'https://www.ccn-cert.cni.es/series-ccn-stic/800-guia-esquema-nacional-de-seguridad/item/download/476_f8d7f6a1b7c5e1a0d4c8f9e2b3a6c7d8.html'
    },
    
    // Marco Operacional
    {
      id: 'op.pl.1',
      categoryId: 2,
      code: 'op.pl.1',
      name: 'Análisis de Riesgos',
      description: 'Se realizará un análisis de riesgos de los sistemas de información.',
      basicRequirement: 'Se realizará análisis de riesgos inicial.',
      mediumRequirement: 'Además del nivel BAJO, se actualizará periódicamente.',
      highRequirement: 'Además del nivel MEDIO, se realizará seguimiento continuo.',
      guideLink: 'https://www.ccn-cert.cni.es/series-ccn-stic/800-guia-esquema-nacional-de-seguridad/item/download/476_f8d7f6a1b7c5e1a0d4c8f9e2b3a6c7d8.html'
    },
    {
      id: 'op.acc.1',
      categoryId: 2,
      code: 'op.acc.1',
      name: 'Identificación',
      description: 'Los usuarios del sistema se identificarán de forma única.',
      basicRequirement: 'Existirá identificación única de usuarios.',
      mediumRequirement: 'Además del nivel BAJO, se gestionarán las identidades.',
      highRequirement: 'Además del nivel MEDIO, se verificará la identidad.',
      guideLink: 'https://www.ccn-cert.cni.es/series-ccn-stic/800-guia-esquema-nacional-de-seguridad/item/download/476_f8d7f6a1b7c5e1a0d4c8f9e2b3a6c7d8.html'
    },
    {
      id: 'op.acc.2',
      categoryId: 2,
      code: 'op.acc.2',
      name: 'Autenticación',
      description: 'Se verificará la identidad de los usuarios antes de permitir el acceso.',
      basicRequirement: 'Existirán mecanismos de autenticación.',
      mediumRequirement: 'Además del nivel BAJO, se usarán mecanismos robustos.',
      highRequirement: 'Además del nivel MEDIO, se implementará autenticación multifactor.',
      guideLink: 'https://www.ccn-cert.cni.es/series-ccn-stic/800-guia-esquema-nacional-de-seguridad/item/download/476_f8d7f6a1b7c5e1a0d4c8f9e2b3a6c7d8.html'
    },
    
    // Medidas de Protección
    {
      id: 'mp.if.1',
      categoryId: 3,
      code: 'mp.if.1',
      name: 'Áreas Seguras',
      description: 'Se establecerán áreas seguras para proteger las instalaciones.',
      basicRequirement: 'Existirán controles de acceso físico.',
      mediumRequirement: 'Además del nivel BAJO, se definirán perímetros de seguridad.',
      highRequirement: 'Además del nivel MEDIO, se implementará control de acceso avanzado.',
      guideLink: 'https://www.ccn-cert.cni.es/series-ccn-stic/800-guia-esquema-nacional-de-seguridad/item/download/476_f8d7f6a1b7c5e1a0d4c8f9e2b3a6c7d8.html'
    },
    {
      id: 'mp.per.1',
      categoryId: 3,
      code: 'mp.per.1',
      name: 'Caracterización del Personal',
      description: 'Se definirán los roles y responsabilidades del personal.',
      basicRequirement: 'Se definirán roles básicos de seguridad.',
      mediumRequirement: 'Además del nivel BAJO, se documentarán responsabilidades.',
      highRequirement: 'Además del nivel MEDIO, se verificarán antecedentes.',
      guideLink: 'https://www.ccn-cert.cni.es/series-ccn-stic/800-guia-esquema-nacional-de-seguridad/item/download/476_f8d7f6a1b7c5e1a0d4c8f9e2b3a6c7d8.html'
    },
    {
      id: 'mp.eq.1',
      categoryId: 3,
      code: 'mp.eq.1',
      name: 'Puesto de Trabajo',
      description: 'Se protegerán los puestos de trabajo.',
      basicRequirement: 'Existirán medidas básicas de protección.',
      mediumRequirement: 'Además del nivel BAJO, se implementarán controles adicionales.',
      highRequirement: 'Además del nivel MEDIO, se realizará monitorización.',
      guideLink: 'https://www.ccn-cert.cni.es/series-ccn-stic/800-guia-esquema-nacional-de-seguridad/item/download/476_f8d7f6a1b7c5e1a0d4c8f9e2b3a6c7d8.html'
    }
  ],
  
  assessments: {
    'org.1': {
      status: 'compliant',
      notes: 'Política de seguridad aprobada y comunicada a toda la organización.',
      evidence: ['politica_seguridad_v2.pdf', 'comunicacion_politica.pdf'],
      reviewedAt: '2024-01-20',
      reviewer: 'Ana García'
    },
    'org.2': {
      status: 'partial',
      notes: 'Normativa existe pero necesita actualización.',
      evidence: ['normativa_actual.pdf'],
      reviewedAt: '2024-01-22',
      reviewer: 'Carlos López'
    },
    'org.3': {
      status: 'non_compliant',
      notes: 'Procedimientos no documentados adecuadamente.',
      evidence: [],
      reviewedAt: '2024-01-25',
      reviewer: 'María Rodríguez'
    },
    'op.acc.1': {
      status: 'compliant',
      notes: 'Sistema de identificación única implementado.',
      evidence: ['config_ad.pdf'],
      reviewedAt: '2024-01-18',
      reviewer: 'Pedro Martín'
    },
    'mp.if.1': {
      status: 'partial',
      notes: 'Controles físicos básicos implementados, faltan mejoras.',
      evidence: ['plano_instalaciones.pdf'],
      reviewedAt: '2024-01-28',
      reviewer: 'Laura Sánchez'
    }
  }
};