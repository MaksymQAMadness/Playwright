import { test, expect } from "@playwright/test";

test.describe('Login tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('')
    })

    test('Successful login', async ({ page }) => {
        await page.locator('//input[@id="user-name"]').fill("standard_user");
        await page.locator('//input[@id="password"]').fill("secret_sauce");
        await page.locator('//input[@id="login-button"]').click();
        await expect(page.locator('//*[@data-test="title"]', { hasText: "Products" })).toBeVisible();
        await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
    })

    test('Auth without login', async ({ page }) => {
        await page.locator('//input[@id="password"]').fill("secret_sauce");
        await page.locator('//input[@id="login-button"]').click();
        await expect(page.locator('//*[@data-test="error"]', { hasText: "Username is required" })).toBeVisible();
    })

    test('Auth without password', async ({ page }) => {
        await page.locator('//input[@id="user-name"]').fill("standard_user");
        await page.locator('//input[@id="login-button"]').click();
        await expect(page.locator('//*[@data-test="error"]', { hasText: "Password is required" })).toBeVisible();
    })

    test('Auth with invalid creds', async ({ page }) => {
        await page.locator('//input[@id="user-name"]').fill("standard_user-test");
        await page.locator('//input[@id="password"]').fill("secret_sauce-test");
        await page.locator('//input[@id="login-button"]').click();
        await expect(page.locator('//*[@data-test="error"]', { hasText: "Username and password do not match" })).toBeVisible();
    })

    test('Successful login with problem user', async ({ page }) => {
        await page.locator('//input[@id="user-name"]').fill("problem_user");
        await page.locator('//input[@id="password"]').fill("secret_sauce");
        await page.locator('//input[@id="login-button"]').click();
        await expect(page.locator('//*[@data-test="title"]', { hasText: "Products" })).toBeVisible();
        await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
    })

    test('Successful login with performance glitch user', async ({ page }) => {
        await page.locator('//input[@id="user-name"]').fill("performance_glitch_user");
        await page.locator('//input[@id="password"]').fill("secret_sauce");
        await page.locator('//input[@id="login-button"]').click();
        await expect(page.locator('//*[@data-test="title"]', { hasText: "Products" })).toBeVisible();
        await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
    })

})