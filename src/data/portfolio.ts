export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  description: string;
  focus: string;
  scope: string;
  highlights: readonly string[];
  flow: readonly { name: string; detail: string }[];
  technologies: readonly string[];
  repository: string;
  backendRepository?: string;
  tone: "sage" | "sand" | "slate";
  demo?: string;
  caseStudy: readonly { title: string; body: string }[];
};

type Experience = {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
};

type PortfolioContent = {
  locale: "es";
  name: string;
  role: string;
  description: string;
  navigation: readonly { href: string; label: string }[];
  labels: {
    theme: { label: string; system: string; light: string; dark: string };
    skip: string;
    menu: string;
    closeMenu: string;
    navigation: string;
    home: string;
    viewProject: string;
    repository: string;
    demo: string;
    back: string;
    stack: string;
    footer: string;
    backend: string;
    signature: string;
    focus: string;
    scope: string;
    flow: string;
    highlights: string;
    caseIndex: string;
    projectContact: string;
    nextProject: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    primary: string;
    secondary: string;
    availability: string;
    panelTitle: string;
    panelDescription: string;
    capabilities: readonly { title: string; detail: string }[];
  };
  about: {
    label: string;
    title: string;
    intro: string;
    paragraphs: readonly string[];
    principles: readonly { title: string; body: string }[];
  };
  skills: {
    label: string;
    title: string;
    intro: string;
    items: readonly {
      name: string;
      category: string;
      description: string;
      mark: string;
    }[];
  };
  projectsSection: { label: string; title: string; intro: string };
  projects: readonly Project[];
  experience: {
    label: string;
    title: string;
    intro: string;
    emptyTitle: string;
    emptyBody: string;
    items: readonly Experience[];
  };
  contact: {
    label: string;
    title: string;
    body: string;
    email?: string;
    emailLabel: string;
    links: readonly { label: string; href: string }[];
  };
  notFound: { title: string; body: string; action: string };
};

// El contenido y los textos de interfaz comparten un contrato. Una futura
// traducción puede implementar este mismo contrato y ampliar el locale.
export const portfolio: PortfolioContent = {
  locale: "es",
  name: "Nahuel Anselmo",
  role: "Full Stack Web Developer",
  description:
    "Portfolio profesional de Nahuel Anselmo. Desarrollo web con Next.js, React, TypeScript y Tailwind CSS.",
  navigation: [
    { href: "/#proyectos", label: "Proyectos" },
    { href: "/#sobre-mi", label: "Sobre mí" },
    { href: "/#tecnologias", label: "Tecnologías" },
    { href: "/#experiencia", label: "Experiencia" },
    { href: "/#contacto", label: "Contacto" },
  ],
  labels: {
    theme: {
      label: "Tema de la página",
      system: "Sistema",
      light: "Claro",
      dark: "Oscuro",
    },
    skip: "Saltar al contenido",
    menu: "Abrir menú",
    closeMenu: "Cerrar menú",
    navigation: "Navegación principal",
    home: "Nahuel Anselmo — inicio",
    viewProject: "Explorar proyecto",
    repository: "Ver código",
    demo: "Ver demo",
    back: "Volver a proyectos",
    stack: "Tecnologías del proyecto",
    footer: "Diseñado con intención. Construido para la web.",
    backend: "Código del backend",
    signature: "REACT / NEXT.JS / NODE.JS / TYPESCRIPT",
    focus: "Foco técnico",
    scope: "Alcance",
    flow: "Recorrido de la aplicación",
    highlights: "Qué demuestra este proyecto",
    caseIndex: "En este caso de estudio",
    projectContact: "Hablemos de este proyecto",
    nextProject: "Seguir explorando",
  },
  hero: {
    eyebrow: "FULL STACK WEB DEVELOPER",
    title: "Nahuel Anselmo.",
    accent: "De la idea a la web.",
    body: "Desarrollo interfaces en React y APIs con Node.js. Conecto experiencia de usuario, lógica de negocio y datos para construir aplicaciones web completas.",
    primary: "Ver proyectos",
    secondary: "Hablemos",
    availability: "Abierto a oportunidades laborales",
    panelTitle: "Una mirada full stack.",
    panelDescription: "Del primer clic a la persistencia de los datos.",
    capabilities: [
      { title: "Interfaces", detail: "React · Next.js · Tailwind CSS" },
      {
        title: "Lógica de aplicación",
        detail: "Node.js · Express · APIs REST",
      },
      { title: "Datos", detail: "MongoDB · Mongoose" },
    ],
  },
  about: {
    label: "Sobre mí",
    title: "Detrás del código,\nuna forma de pensar.",
    intro:
      "Me interesa tanto cómo funciona una aplicación como la experiencia de quien la usa.",
    paragraphs: [
      "Me formé en Desarrollo Web Full Stack en RollingCode School. A través de proyectos individuales y en equipo trabajé con interfaces en React, APIs en Node.js y Express, autenticación y persistencia en MongoDB.",
      "Mis proyectos incluyen un gestor de tareas y una aplicación de pedidos para gastronomía. Hoy sigo profundizando en Next.js, TypeScript y Tailwind CSS, con foco en escribir código mantenible y construir experiencias claras para quienes las usan.",
    ],
    principles: [
      {
        title: "Claridad",
        body: "Código legible y decisiones que se pueden explicar.",
      },
      {
        title: "Cuidado",
        body: "Accesibilidad, adaptación y atención al detalle.",
      },
      {
        title: "Evolución",
        body: "Aprender, revisar y mejorar con cada proyecto.",
      },
    ],
  },
  skills: {
    label: "Tecnologías",
    title: "Mi caja de herramientas.",
    intro: "Un stack enfocado en desarrollar experiencias web modernas.",
    items: [
      {
        name: "Next.js",
        category: "FRAMEWORK",
        description: "Rutas, renderizado y estructura de aplicación.",
        mark: "N",
      },
      {
        name: "React",
        category: "INTERFACES",
        description: "Composición de componentes e interactividad.",
        mark: "Re",
      },
      {
        name: "TypeScript",
        category: "LENGUAJE",
        description: "Contratos claros y tipos para trabajar con confianza.",
        mark: "Ts",
      },
      {
        name: "Tailwind CSS",
        category: "ESTILOS",
        description: "Diseño consistente y adaptable a cada pantalla.",
        mark: "Tw",
      },
      {
        name: "Node.js",
        category: "BACKEND",
        description: "Desarrollo de servidores y lógica de aplicación.",
        mark: "No",
      },
      {
        name: "Express",
        category: "API REST",
        description: "Rutas, controladores y middlewares del servidor.",
        mark: "Ex",
      },
      {
        name: "MongoDB",
        category: "BASE DE DATOS",
        description: "Persistencia de usuarios, tareas y productos.",
        mark: "Mo",
      },
      {
        name: "Git y GitHub",
        category: "COLABORACIÓN",
        description: "Control de versiones y proyectos compartidos.",
        mark: "Git",
      },
    ],
  },
  projectsSection: {
    label: "Proyectos",
    title: "Proyectos que hablan\npor mi código.",
    intro:
      "Aplicaciones propias y en equipo. Explorá qué resuelven, cómo están construidas y las decisiones que hay detrás.",
  },
  projects: [
    {
      slug: "gestor-de-tareas",
      focus: "Autenticación y datos por usuario",
      scope: "Aplicación full stack",
      highlights: [
        "Operaciones CRUD con persistencia en MongoDB",
        "Rutas protegidas y validación de datos",
        "Separación entre interfaz, API y modelos",
      ],
      flow: [
        { name: "Interfaz", detail: "React · formularios y rutas" },
        { name: "API", detail: "Express · autenticación y validación" },
        { name: "Persistencia", detail: "MongoDB · tareas por usuario" },
      ],
      title: "Gestor de tareas",
      category: "APLICACIÓN FULL STACK",
      status: "Código disponible",
      tone: "slate",
      description:
        "Aplicación MERN para organizar tareas con registro, inicio de sesión y operaciones de creación, consulta, edición y eliminación asociadas a cada usuario.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      repository: "https://github.com/NahuelAnselmo/client-tasks-crud",
      backendRepository: "https://github.com/NahuelAnselmo/server-tasks-crud",
      caseStudy: [
        {
          title: "El proyecto",
          body: "Un gestor de tareas que conecta una interfaz React con una API Express y una base de datos MongoDB. El frontend y el backend están organizados en repositorios separados.",
        },
        {
          title: "La interfaz",
          body: "React Router organiza las pantallas de registro, acceso, perfil y tareas. Los contextos separan autenticación, tareas y notificaciones; las rutas de tareas requieren una sesión en la interfaz.",
        },
        {
          title: "Los datos y el acceso",
          body: "El backend utiliza modelos de Mongoose y controladores para las operaciones CRUD. Las consultas de tareas incluyen el identificador del usuario autenticado para limitar la lectura, actualización y eliminación a sus registros.",
        },
        {
          title: "Las herramientas",
          body: "La API incorpora JWT para autenticación y esquemas Zod para validación. Esta separación entre rutas, controladores, modelos y middlewares permite recorrer el flujo de una petición de manera clara.",
        },
        {
          title: "Explorar el código",
          body: "Los repositorios permiten explorar el recorrido completo: desde el formulario de una tarea hasta su validación y persistencia. El código del cliente y del servidor está disponible para revisar la implementación.",
        },
      ],
    },
    {
      slug: "la-cerveceria",
      focus: "Catálogo, carrito y administración",
      scope: "Proyecto colaborativo · equipo de 3",
      highlights: [
        "Catálogo con filtros y gestión de pedidos",
        "Estado de sesión y carrito con Zustand",
        "Colaboración con Mario Arroyo y Santiago Altamiranda",
      ],
      flow: [
        { name: "Experiencia", detail: "React · catálogo y carrito" },
        { name: "Operaciones", detail: "Express · productos y pedidos" },
        { name: "Datos", detail: "MongoDB · usuarios y productos" },
      ],
      title: "La Cervecería",
      category: "PROYECTO EN EQUIPO",
      status: "Código disponible",
      tone: "sand",
      description:
        "Aplicación de pedidos para gastronomía con catálogo, filtros, carrito y administración de productos. Desarrollada en colaboración con Mario Arroyo y Santiago Altamiranda.",
      technologies: ["React", "Bootstrap", "Zustand", "Express", "MongoDB"],
      repository: "https://github.com/NahuelAnselmo/LaCerveceria-Front",
      backendRepository: "https://github.com/NahuelAnselmo/LaCerveceria-Back",
      caseStudy: [
        {
          title: "La propuesta",
          body: "Un proyecto orientado a facilitar la consulta del menú y la creación de pedidos en un establecimiento gastronómico, con una interfaz para clientes y herramientas de administración.",
        },
        {
          title: "El recorrido del usuario",
          body: "El frontend incluye registro e inicio de sesión, catálogo filtrable y un carrito que permite revisar el pedido. La administración contempla alta, edición y eliminación de productos.",
        },
        {
          title: "La base técnica",
          body: "React y React Router organizan la interfaz; Bootstrap aporta estilos y componentes, y Zustand se utiliza para el estado de sesión y carrito. El backend separa rutas, controladores, validaciones y modelos de MongoDB.",
        },
        {
          title: "El trabajo compartido",
          body: "Participé junto a Mario Arroyo y Santiago Altamiranda. Las funcionalidades descritas corresponden al proyecto colectivo; el README de ambos repositorios identifica al equipo.",
        },
        {
          title: "Explorar el código",
          body: "Los repositorios del frontend y del backend permiten recorrer las pantallas, el manejo del carrito y las rutas de la API. Los README documentan las funcionalidades y las instrucciones de ejecución.",
        },
      ],
    },
    {
      slug: "portfolio-profesional",
      focus: "Accesibilidad, rendimiento y presentación",
      scope: "Portfolio personal",
      highlights: [
        "Contenido tipado y páginas prerenderizadas",
        "Tema claro, oscuro y preferencia del sistema",
        "Pruebas de navegador y controles de accesibilidad",
      ],
      flow: [
        { name: "Contenido", detail: "TypeScript · datos y contratos" },
        { name: "Renderizado", detail: "Next.js · Server Components" },
        { name: "Interfaz", detail: "Tailwind CSS · diseño adaptable" },
      ],
      title: "Portfolio profesional",
      category: "DESARROLLO WEB",
      status: "En desarrollo",
      description:
        "Un espacio propio para presentar proyectos y decisiones técnicas, construido con una arquitectura sencilla y una experiencia accesible.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      repository: "https://github.com/NahuelAnselmo/portfolio",
      tone: "sage",
      caseStudy: [
        {
          title: "El punto de partida",
          body: "Crear una presentación profesional que permita conocer mi perfil y explorar proyectos durante una búsqueda laboral o una entrevista técnica.",
        },
        {
          title: "La arquitectura",
          body: "App Router organiza las rutas. Los datos tipados y los textos en español viven separados de la presentación, preparando la incorporación de otro idioma sin duplicar componentes.",
        },
        {
          title: "Las decisiones",
          body: "Las secciones se renderizan como Server Components. El menú móvil y el selector de tema concentran la interacción del cliente. El contenido local versionado evita sumar infraestructura que esta primera versión no necesita.",
        },
        {
          title: "La experiencia",
          body: "El diseño parte de pantallas pequeñas, mantiene una jerarquía de lectura clara y contempla navegación por teclado, foco visible y preferencias de movimiento reducido.",
        },
        {
          title: "Lo que sigue",
          body: "Completar el contenido profesional, incorporar más casos de estudio y preparar una versión en inglés. El proyecto continúa en desarrollo; todavía no hay métricas de uso publicadas.",
        },
      ],
    },
  ],
  experience: {
    label: "Experiencia",
    title: "Aprender. Construir.\nSeguir creciendo.",
    intro: "Formación y experiencia práctica en proyectos de desarrollo web.",
    emptyTitle: "Próximamente, más sobre mi recorrido.",
    emptyBody:
      "Esta sección se está preparando. Mientras tanto, podés explorar el proceso y las decisiones del portfolio en la sección de proyectos.",
    items: [
      {
        id: "rollingcode",
        role: "Formación en Desarrollo Web Full Stack",
        organization: "RollingCode School",
        period: "2024 — 2025 · FORMACIÓN",
        description:
          "Desarrollo de proyectos individuales y grupales con React, Node.js y bases de datos. Práctica de APIs REST, autenticación, Git y organización de trabajo con Scrum y Trello.",
      },
      {
        id: "practica",
        role: "Desarrollo de aplicaciones web",
        organization: "Proyectos propios y colaborativos",
        period: "EXPERIENCIA EN PROYECTOS",
        description:
          "Implementación de un gestor de tareas MERN y participación en La Cervecería. Una base práctica para seguir profundizando en frontend, backend e integración de aplicaciones.",
      },
    ],
  },
  contact: {
    label: "Contacto",
    title: "Toda buena idea empieza\ncon una conversación.",
    body: "¿Querés conversar sobre una oportunidad o un proyecto? Escribime y contame de qué se trata.",
    email: "nahuelanselmo63t@gmail.com",
    emailLabel: "Escribime",
    links: [
      { label: "GitHub", href: "https://github.com/NahuelAnselmo" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nahuelanselmo/" },
    ],
  },
  notFound: {
    title: "Esta página no está acá.",
    body: "El enlace puede haber cambiado. Volvé al portfolio para seguir explorando.",
    action: "Volver al inicio",
  },
};
