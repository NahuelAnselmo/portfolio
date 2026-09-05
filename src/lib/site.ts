// La URL se configura al publicar. Sin dominio no emitimos URLs canónicas
// ficticias y mantenemos desactivada la indexación de la versión de trabajo.
export const siteUrl = process.env.SITE_URL
  ? new URL(process.env.SITE_URL)
  : undefined;

if (siteUrl && !["https:", "http:"].includes(siteUrl.protocol)) {
  throw new Error("SITE_URL debe ser una URL HTTP o HTTPS absoluta.");
}
