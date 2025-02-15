import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 }
  },
  testDir: "./tests" // Ruta donde están tus pruebas (opcional si usas Cucumber)
});
