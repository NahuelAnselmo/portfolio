import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("el tema sigue al sistema y conserva una elección explícita entre páginas", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const root = page.locator("html");
  const selector = page.getByRole("button", {
    name: "Tema de la página: Sistema",
  });
  await expect(root).toHaveAttribute("data-theme", "dark");
  await expect(selector).toHaveText(/Sistema/);
  await page.emulateMedia({ colorScheme: "light" });
  await expect(root).toHaveAttribute("data-theme", "light");
  await selector.click();
  await page.getByRole("menuitemradio", { name: "Oscuro" }).click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await page
    .locator("#proyectos article")
    .first()
    .getByRole("link", { name: "Explorar proyecto" })
    .click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("button", { name: "Tema de la página: Oscuro" }),
  ).toBeVisible();
  await page.reload();
  await expect(root).toHaveAttribute("data-theme", "dark");
  const darkSelector = page.getByRole("button", {
    name: "Tema de la página: Oscuro",
  });
  await expect(darkSelector).toHaveText(/Oscuro/);
  await darkSelector.click();
  await page.getByRole("menuitemradio", { name: "Claro" }).click();
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(root).toHaveAttribute("data-theme", "light");
  const lightSelector = page.getByRole("button", {
    name: "Tema de la página: Claro",
  });
  await lightSelector.click();
  await page.getByRole("menuitemradio", { name: "Sistema" }).click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  const systemSelector = page.getByRole("button", {
    name: "Tema de la página: Sistema",
  });
  await systemSelector.focus();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("menuitemradio", { name: "Sistema" }),
  ).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("menuitemradio", { name: "Claro" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(systemSelector).toBeFocused();
  expect(errors).toEqual([]);
});

test("el tema funciona cuando localStorage está bloqueado", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("button", { name: "Tema de la página: Sistema" })
    .click();
  await page.getByRole("menuitemradio", { name: "Claro" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("las páginas mantienen contraste y distribución en modo oscuro", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  for (const path of [
    "/",
    "/projects/agenda-local",
    "/projects/gestor-de-tareas",
    "/projects/la-cerveceria",
    "/projects/portfolio-profesional",
  ]) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  await page.screenshot({
    path: test.info().outputPath("case-dark.png"),
    fullPage: true,
  });
  await page.goto("/");
  await page.screenshot({
    path: test.info().outputPath("home-dark.png"),
    fullPage: true,
  });
  await page.screenshot({ path: test.info().outputPath("hero-dark.png") });
  if (isMobile) {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});

test("los casos permiten navegar el índice, contactar y seguir a otro proyecto", async ({
  page,
}) => {
  await page.goto("/projects/agenda-local");
  const index = page.getByRole("navigation", {
    name: "En este caso de estudio",
  });
  await index.getByRole("link", { name: "Consistencia de la agenda" }).click();
  await expect(page).toHaveURL(/#seccion-3$/);
  await expect(
    page.getByRole("link", { name: "Hablemos de este proyecto" }),
  ).toHaveAttribute(
    "href",
    "mailto:nahuelanselmo63t@gmail.com?subject=Agenda%20Local",
  );
  await page
    .getByRole("link", { name: "Seguir explorando: Gestor de tareas" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Gestor de tareas",
  );
});
