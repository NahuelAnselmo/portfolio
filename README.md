# Portfolio - Nahuel Anselmo

Portfolio profesional en español con Next.js App Router, React, TypeScript estricto y Tailwind CSS. Incluye presentación, tecnologías, proyectos con casos de estudio, formación/experiencia práctica y contacto.

## Desarrollo local

Recomendado: Node.js 24 y npm. Las dependencias están fijadas en `package-lock.json`.

```bash
npm ci
npm run dev
```

Abrí http://localhost:3000. El contenido no necesita una base de datos ni servicios externos para renderizarse. El contacto utiliza un enlace de email y perfiles profesionales; no hay formulario ni envío de correos desde el servidor.

## Estructura y decisiones

```text
src/
  app/          Rutas, layout, estilos globales y metadata
  components/   Secciones, navegación y componentes compartidos
  data/         Contenido y contratos TypeScript
  lib/          Configuración del dominio, usada por SEO
tests/e2e/      Recorridos de navegador y accesibilidad
```

- Páginas y secciones son Server Components. `mobile-menu.tsx` y `theme-select.tsx` concentran la interactividad del cliente.
- Home y proyectos se prerenderizan. Los slugs desconocidos devuelven 404.
- `SectionHeading`, `ProjectCard` y `SiteHeader` concentran elementos compartidos. No hay un sistema de componentes genérico ni estado global.
- Tailwind se integra con PostCSS. Los tokens y estilos visuales comunes viven en `src/app/globals.css`.
- Los diagramas de proyectos representan el recorrido de cada aplicación a partir de su implementación; no se presentan como capturas de pantalla. Las fuentes son del sistema, sin descargas externas.

## Editar el contenido

`src/data/portfolio.ts` contiene perfil, navegación, textos de interfaz, tecnologías, proyectos y experiencia. Para agregar un proyecto, incorporá un objeto en `projects` con un slug único, descripción, tecnologías, foco técnico, alcance, capacidades demostradas, pasos del flujo y caso de estudio. Su tarjeta, página y entrada del sitemap se generan a partir de esos datos.

`backendRepository` y `demo` son opcionales. Solo agregar demos verificadas. Para sumar una experiencia, indicá en `period` si se trata de formación, trabajo o práctica en proyectos y describí el alcance real.

### Fuentes del perfil

La presentación es una redacción basada en información pública y datos proporcionados por Nahuel. No representa una transcripción de LinkedIn.

- Email, GitHub y LinkedIn: proporcionados por el titular.
- Formación RollingCode 2024–2025: información pública indexada de [LinkedIn](https://ar.linkedin.com/in/nahuelanselmo). El acceso directo está limitado; no se inventaron puestos ni fechas laborales.
- Gestor de tareas: [cliente](https://github.com/NahuelAnselmo/client-tasks-crud) y [servidor](https://github.com/NahuelAnselmo/server-tasks-crud), revisando rutas, controladores y dependencias.
- La Cervecería: [frontend](https://github.com/NahuelAnselmo/LaCerveceria-Front) y [backend](https://github.com/NahuelAnselmo/LaCerveceria-Back). Proyecto grupal con Mario Arroyo y Santiago Altamiranda; las funcionalidades se atribuyen al equipo.
- DevFlow no se presenta como aplicación terminada: al revisar el frontend público, `App.tsx` conservaba la pantalla de ejemplo de Vite.

Las aplicaciones externas no fueron ejecutadas ni auditadas. Los casos de estudio describen el código consultado, sin afirmar resultados comerciales o métricas de producción. Antes de publicar, revisar la voz de la presentación y precisar las contribuciones personales en el trabajo grupal.

### Incorporar inglés después

Los textos traducibles están centralizados y la presentación consume el contrato `PortfolioContent`. Al incorporar inglés, extraer ese contrato a un módulo compartido, crear los contenidos `es` y `en` y resolverlos desde rutas localizadas. Pasar el contenido seleccionado a los componentes, actualizar `lang`, Open Graph y alternates `hreflang`. Por ahora no hay selector de idioma, rutas localizadas ni librería de traducción sin uso.

## Diseño y temas

La Home presenta primero el perfil y los proyectos, con acceso a casos de estudio, código y contacto. Cada caso tiene un índice de secciones, un resumen de alcance y navegación al siguiente proyecto. La experiencia de formación se distingue del trabajo profesional.

El selector del encabezado ofrece **Sistema**, **Claro** y **Oscuro**. La primera visita respeta el sistema; la elección explícita se guarda en `localStorage`. Un script pequeño en el documento aplica la preferencia antes de pintar la página. El selector usa `useSyncExternalStore` para reflejar cambios del sistema y de otras pestañas sin diferencias de hidratación. Si el almacenamiento está bloqueado, la elección funciona durante la visita.

Los colores semánticos están centralizados en variables CSS para ambas paletas. El cambio de tema no convierte las secciones ni los proyectos en Client Components y no agrega dependencias.

## Calidad

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

`test:e2e` crea un build de producción y levanta su propio servidor en el puerto 3100. Ejecuta recorridos en Chromium de escritorio y móvil, navegación por teclado, menú, enlaces de proyectos/contacto, respuestas 404, metadata, imagen social y comprobaciones con axe. También comprueba desborde a 320, 768 y 1440 px y movimiento reducido, persistencia del tema, cambios del sistema, almacenamiento bloqueado, navegación de casos y contraste en modo oscuro.

En Linux, si faltan bibliotecas para Chromium: `npx playwright install --with-deps chromium`. Las capturas y trazas se guardan en `test-results/`; el informe HTML en `playwright-report/`. Estos archivos no se versionan.

GitHub Actions ejecuta formato, lint, tipos y las pruebas con build. La revisión manual con lector de pantalla y navegadores Safari/Firefox sigue siendo parte de la preparación para publicación; axe no reemplaza esa revisión.

## Metadata y publicación

Copiá `.env.example` a `.env.local` y configurá `SITE_URL` con el dominio público definitivo antes del build. No necesita el prefijo `NEXT_PUBLIC_` porque solo se usa en el servidor. No se incluyen credenciales ni claves de servicios.

Con `SITE_URL` se habilitan indexación, URLs canónicas y sitemap. En producción de Vercel, si no se define esa variable, se utiliza automáticamente el dominio estable de `VERCEL_PROJECT_PRODUCTION_URL`. En local y en previews, sin `SITE_URL`, el sitio emite `noindex` y el sitemap queda vacío. Configurá cualquier dominio personalizado en Vercel o establecé `SITE_URL` únicamente en el entorno de producción.

La aplicación incluye metadata por proyecto, imagen Open Graph generada localmente, icono SVG y datos estructurados `Person`. `vercel.json` fija Next.js y la instalación mediante `npm ci`, coherente con CI. `.vercel/` contiene la vinculación local con la cuenta y no se versiona. Para publicar desde una sesión autenticada de Vercel: `npx vercel --prod`.

Para servir un build local:

```bash
npm run build
npm run start
```

Pendientes editoriales opcionales: CV, capturas reales de proyectos, demos verificadas y mayor detalle de las contribuciones individuales. La versión en inglés queda para una etapa posterior.
