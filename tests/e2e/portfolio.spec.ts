import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("el recorrido de proyectos funciona y conserva un contacto directo", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await page
    .getByRole("link", { name: "Ver proyectos", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/#proyectos$/);
  const projects = page.locator("#proyectos article");
  await expect(projects).toHaveCount(3);
  for (let index = 0; index < 3; index++) {
    const title = await projects.nth(index).getByRole("heading").innerText();
    await projects
      .nth(index)
      .getByRole("link", { name: "Explorar proyecto" })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(
      page.getByRole("link", { name: "Ver código", exact: true }),
    ).toHaveAttribute("href", /^https:\/\/github.com\/NahuelAnselmo\//);
    await page.getByRole("link", { name: "Volver a proyectos" }).click();
  }
  await expect(page.getByRole("link", { name: "Escribime" })).toHaveAttribute(
    "href",
    "mailto:nahuelanselmo63t@gmail.com",
  );
  await expect(
    page.getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveAttribute("href", "https://www.linkedin.com/in/nahuelanselmo/");
});

test("la navegación funciona con teclado y el menú devuelve el foco", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  if (isMobile) {
    const trigger = page.getByRole("button", { name: "Abrir menú" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("button", { name: "Cerrar menú" }),
    ).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Tab");
    await expect(page.locator("#mobile-navigation a").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expect(page.locator("#mobile-navigation")).toBeHidden();
    await trigger.click();
    await page
      .locator("#mobile-navigation")
      .getByRole("link", { name: "Contacto" })
      .click();
    await expect(page).toHaveURL(/#contacto$/);
    await expect(page.locator("#mobile-navigation")).toBeHidden();
  } else {
    await expect(page.getByRole("button", { name: "Abrir menú" })).toBeHidden();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Contacto" })
      .click();
    await expect(page).toHaveURL(/#contacto$/);
  }
});

test("home y caso de estudio pasan los controles automáticos de accesibilidad", async ({
  page,
  isMobile,
}) => {
  for (const path of ["/", "/projects/gestor-de-tareas"]) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  if (isMobile) {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});

test("no hay desborde horizontal y se respeta movimiento reducido", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page.screenshot({
    path: test.info().outputPath("home-desktop.png"),
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: test.info().outputPath("home-mobile.png"),
    fullPage: true,
  });
});

test("metadata, recursos sociales, sitemap y rutas inexistentes responden correctamente", async ({
  page,
  request,
}) => {
  await page.goto("/projects/gestor-de-tareas");
  await expect(page).toHaveTitle("Gestor de tareas | Nahuel Anselmo");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://127.0.0.1:3100/projects/gestor-de-tareas",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Gestor de tareas",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  const og = await request.get("/opengraph-image");
  expect(og.ok()).toBe(true);
  expect(og.headers()["content-type"]).toContain("image/png");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(
    "http://127.0.0.1:3100/projects/la-cerveceria",
  );
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Allow: /");
  for (const path of ["/no-existe", "/projects/no-existe"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Esta página no está acá.",
    );
    await page.getByRole("link", { name: "Volver al inicio" }).click();
    await expect(page).toHaveURL("/");
  }
});
