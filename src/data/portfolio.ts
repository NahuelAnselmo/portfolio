export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  description: string;
  technologies: readonly string[];
  repository: string;
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
    skip: string; menu: string; closeMenu: string; navigation: string;
    home: string; viewProject: string; repository: string; demo: string;
    back: string; stack: string; footer: string;
  };
  hero: { eyebrow: string; title: string; accent: string; body: string; primary: string; secondary: string };
  about: { title: string; intro: string; paragraphs: readonly string[]; principles: readonly { title: string; body: string }[] };
  skills: { title: string; intro: string; items: readonly { name: string; category: string; description: string; mark: string }[] };
  projectsSection: { title: string; intro: string };
  projects: readonly Project[];
  experience: { title: string; intro: string; emptyTitle: string; emptyBody: string; items: readonly Experience[] };
  contact: { title: string; body: string; email?: string; emailLabel: string; links: readonly { label: string; href: string }[] };
  notFound: { title: string; body: string; action: string };
};

// El contenido y los textos de interfaz comparten un contrato. Una futura
// traducción puede implementar este mismo contrato y ampliar el locale.
export const portfolio: PortfolioContent = {
  locale: "es",
  name: "Nahuel Anselmo",
  role: "Full Stack Web Developer",
  description: "Portfolio profesional de Nahuel Anselmo. Desarrollo web con Next.js, React, TypeScript y Tailwind CSS.",
  navigation: [
    { href: "/#sobre-mi", label: "Sobre mí" },
    { href: "/#tecnologias", label: "Tecnologías" },
    { href: "/#proyectos", label: "Proyectos" },
    { href: "/#experiencia", label: "Experiencia" },
    { href: "/#contacto", label: "Contacto" },
  ],
  labels: {
    skip: "Saltar al contenido", menu: "Abrir menú", closeMenu: "Cerrar menú",
    navigation: "Navegación principal", home: "Nahuel Anselmo — inicio",
    viewProject: "Explorar proyecto", repository: "Ver código", demo: "Ver demo",
    back: "Volver a proyectos", stack: "Tecnologías del proyecto",
    footer: "Diseñado con intención. Construido para la web.",
  },
  hero: {
    eyebrow: "DESARROLLO WEB · PORTFOLIO PERSONAL",
    title: "Ideas claras.", accent: "Experiencias que funcionan.",
    body: "Soy Nahuel Anselmo, Full Stack Web Developer. Mi foco está en construir aplicaciones web útiles, accesibles y cuidadas en cada detalle.",
    primary: "Ver proyectos", secondary: "Conocerme mejor",
  },
  about: {
    title: "Detrás del código,\nuna forma de pensar.",
    intro: "Me interesa tanto cómo funciona una aplicación como la experiencia de quien la usa.",
    paragraphs: [
      "Mi stack principal es Next.js, React, TypeScript y Tailwind CSS. Busco combinar una interfaz clara con una base técnica que pueda crecer y mantenerse en el tiempo.",
      "Este portfolio es parte de ese proceso: un espacio para presentar lo que construyo, explicar mis decisiones y compartir mi evolución como desarrollador.",
    ],
    principles: [
      { title: "Claridad", body: "Código legible y decisiones que se pueden explicar." },
      { title: "Cuidado", body: "Accesibilidad, adaptación y atención al detalle." },
      { title: "Evolución", body: "Aprender, revisar y mejorar con cada proyecto." },
    ],
  },
  skills: {
    title: "Mi caja de herramientas.", intro: "Un stack enfocado en desarrollar experiencias web modernas.",
    items: [
      { name: "Next.js", category: "FRAMEWORK", description: "Rutas, renderizado y estructura de aplicación.", mark: "N" },
      { name: "React", category: "INTERFACES", description: "Composición de componentes e interactividad.", mark: "Re" },
      { name: "TypeScript", category: "LENGUAJE", description: "Contratos claros y tipos para trabajar con confianza.", mark: "Ts" },
      { name: "Tailwind CSS", category: "ESTILOS", description: "Diseño consistente y adaptable a cada pantalla.", mark: "Tw" },
    ],
  },
  projectsSection: { title: "Del concepto\na la implementación.", intro: "Una mirada al código, al proceso y a las decisiones detrás de cada proyecto." },
  projects: [{
    slug: "portfolio-profesional", title: "Portfolio profesional", category: "DESARROLLO WEB", status: "En desarrollo",
    description: "Un espacio propio para presentar proyectos y decisiones técnicas, construido con una arquitectura sencilla y una experiencia accesible.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repository: "https://github.com/NahuelAnselmo/portfolio",
    caseStudy: [
      { title: "El punto de partida", body: "Crear una presentación profesional que permita conocer mi perfil y explorar proyectos durante una búsqueda laboral o una entrevista técnica." },
      { title: "La arquitectura", body: "App Router organiza las rutas. Los datos tipados y los textos en español viven separados de la presentación, preparando la incorporación de otro idioma sin duplicar componentes." },
      { title: "Las decisiones", body: "Las secciones se renderizan como Server Components. El menú móvil concentra la interacción del cliente. El contenido local versionado evita sumar infraestructura que esta primera versión no necesita." },
      { title: "La experiencia", body: "El diseño parte de pantallas pequeñas, mantiene una jerarquía de lectura clara y contempla navegación por teclado, foco visible y preferencias de movimiento reducido." },
      { title: "Lo que sigue", body: "Completar el contenido profesional, incorporar más casos de estudio y preparar una versión en inglés. El proyecto continúa en desarrollo; todavía no hay métricas de uso publicadas." },
    ],
  }],
  experience: {
    title: "Un recorrido en construcción.", intro: "Experiencia, aprendizaje y próximos pasos.",
    emptyTitle: "Próximamente, más sobre mi recorrido.",
    emptyBody: "Esta sección se está preparando. Mientras tanto, podés explorar el proceso y las decisiones del portfolio en la sección de proyectos.",
    items: [],
  },
  contact: {
    title: "Toda buena idea empieza\ncon una conversación.",
    body: "Encontrá mi perfil y el código de mis proyectos en GitHub. Próximamente sumaré más canales de contacto profesional.",
    emailLabel: "Escribime",
    links: [{ label: "GitHub", href: "https://github.com/NahuelAnselmo" }],
  },
  notFound: { title: "Esta página no está acá.", body: "El enlace puede haber cambiado. Volvé al portfolio para seguir explorando.", action: "Volver al inicio" },
};
