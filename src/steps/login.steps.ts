import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "playwright";
import { faker } from "@faker-js/faker";

let browser: Browser;
let page: Page;

const randomEmail = faker.internet.email();

Given("que el usuario está en la página de login", async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("https://www.demoblaze.com/");
});

When("ingresa su usuario y contraseña correctos", async function () {
    const signUp = page.locator("#signin2");
    await signUp.click();
    await page.fill("#sign-username", randomEmail);
    await page.fill("#sign-password", "password123");
});

When("hace clic en el botón de login", async function () {    
   // await page.locator("button.btn-login").click();
    await page.getByRole("button", { name: "Sign up" }).click();
    //await page.locator(".btn btn-primary", { hasText: "Sign up" }).click();
    page.once("dialog", async (dialog) => {
        console.log(`Mensaje de la alerta: ${dialog.message()}`);
        await dialog.accept(); // Cierra la alerta
    });
    const logIn = page.locator("#login2");
    await logIn.click();
    await page.fill("#loginusername", randomEmail);
    await page.fill("#loginpassword", "password123");
    await page.getByRole("button", { name: "log in" }).click();
    
});

Then("debería ver el mensaje de bienvenida", async function () {
    // await page.waitForSelector("#welcome-message");
    await browser.close();
});
