import { test, expect } from "@playwright/test";

test.describe('Checkout tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('')
        await page.locator('//input[@id="user-name"]').fill("standard_user");
        await page.locator('//input[@id="password"]').fill("secret_sauce");
        await page.locator('//input[@id="login-button"]').click();
        await expect(page.locator('//*[@data-test="title"]', { hasText: "Products" })).toBeVisible();
    })
    test('Check that user can proceed to checkout after adding item to cart', async ({ page }) => {
        await expect(page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
        await page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
        await page.locator('//a[@data-test="shopping-cart-link"]').click();
        await expect(page.locator('//button[@data-test="checkout"]')).toBeVisible();
        await page.locator('//button[@data-test="checkout"]').click();
        await expect(page.locator('//*[@data-test="title"]', { hasText: "Checkout: Your Information" })).toBeVisible();
    })
})