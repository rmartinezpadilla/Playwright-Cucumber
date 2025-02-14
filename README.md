# Automazando front usando Playwright y Cucumber
### Objetivos: 
    * Pendiente
    * Pendiente
    * Pendiente
    * Pendiente
    
### 1. Instalación
- Primero, instala Playwright y Cucumber en tu proyecto. Si aún no tienes un proyecto configurado, crea uno con npm:
sh
    * mkdir mi-proyecto-playwright
    * cd mi-proyecto-playwright
    * npm init -y

- Ahora instala Playwright y Cucumber:
sh
    1. npm install --save-dev @playwright/test
    2. npx playwright install
    3. npm install --save-dev @cucumber/cucumber

### 2. Configurar Cucumber con Playwright
#### 2.1. Crea la estructura de carpetas
    Organiza tu proyecto de la siguiente manera:
            mi-proyecto-playwright/
            ├── features/
            │   ├── login.feature
            ├── steps/
            │   ├── loginSteps.js
            ├── support/
            │   ├── world.js
            ├── package.json
            ├── playwright.config.js

#### 2.2. Configura el entorno de Cucumber
Crea el archivo world.js dentro de support/ para manejar el contexto de Playwright:
    
    const { setWorldConstructor } = require('@cucumber/cucumber');
    const { chromium } = require('@playwright/test');
    
    class CustomWorld {
            async launchBrowser() {
                this.browser = await chromium.launch({ headless: false });
                this.context = await this.browser.newContext();
                this.page = await this.context.newPage();
            }
            async closeBrowser() {
                await this.browser.close();
            }
        }
    setWorldConstructor(CustomWorld);

#### 2.3. Escribe tu primer feature
Crea un archivo features/login.feature:

    Feature: Login de usuario
    
    Scenario: Usuario inicia sesión correctamente
      Given el usuario abre la página de login
      When el usuario ingresa "usuario" y "contraseña"
      Then el usuario debería ver la página de inicio

#### 2.4. Define los steps en JavaScript
Crea steps/loginSteps.js:

    const { Given, When, Then, Before, After } = require('@cucumber/cucumber');

    Before(async function () {
        await this.launchBrowser();
    });
    
    After(async function () {
        await this.closeBrowser();
    });
    
    Given('el usuario abre la página de login', async function () {
        await this.page.goto('https://example.com/login');
    });

    When('el usuario ingresa {string} y {string}', async function (usuario, contraseña) {
        await this.page.fill('input[name="username"]', usuario);
        await this.page.fill('input[name="password"]', contraseña);
        await this.page.click('button[type="submit"]');
    });
    
    Then('el usuario debería ver la página de inicio', async function () {
        await this.page.waitForSelector('#dashboard');
    });

### 3. Configurar el package.json para ejecutar las pruebas
En package.json, agrega el siguiente script para ejecutar las pruebas:

    "scripts": {
      "test": "cucumber-js"
    }

## Ahora puedes ejecutar tus pruebas con:
    npm test

## Importante:
Para ejecutar solo un archivo .feature específico con Cucumber, usa el siguiente comando:
    
    sh
    npx cucumber-js features/login.feature

Si tus archivos .feature están en una subcarpeta, asegúrate de proporcionar la ruta correcta, por ejemplo:

    sh
    npx cucumber-js features/autenticacion/login.feature
También puedes filtrar escenarios usando tags. Por ejemplo, si en tu .feature tienes:

gherkin
@regresion
Scenario: Usuario inicia sesión correctamente
Puedes ejecutar solo los escenarios con ese tag:
sh
npx cucumber-js --tags @regresion
