import { test, expect } from "@playwright/test";

test.describe('PLP tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('')
        await page.locator('//input[@id="user-name"]').fill("standard_user");
        await page.locator('//input[@id="password"]').fill("secret_sauce");
        await page.locator('//input[@id="login-button"]').click();
        await expect(page.locator('//*[@data-test="title"]', { hasText: "Products" })).toBeVisible();
    })

    test('Check that backpack image is shown', async ({ page }) => {
        await expect(page.locator('//img[@data-test="inventory-item-sauce-labs-backpack-img"]')).toBeVisible();
    })

    test('Check that user can add backpack to the cart', async ({ page }) => {
        await expect(page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
        await page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('//button[@data-test="remove-sauce-labs-backpack"]')).toBeVisible();
        await page.locator('//button[@data-test="remove-sauce-labs-backpack"]').click();
        await expect(page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    })

    test('Check that user can open shopping cart', async ({ page }) => {
        await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
        await page.locator('//a[@data-test="shopping-cart-link"]').click();
        await expect(page.locator('//button[@data-test="continue-shopping"]')).toBeVisible();
    })

    test('Check that user can remove backpack from the cart', async ({ page }) => {
        await expect(page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
        await page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
        await page.locator('//a[@data-test="shopping-cart-link"]').click();
        await expect(page.locator('//button[@data-test="remove-sauce-labs-backpack"]')).toBeVisible();
        await page.locator('//button[@data-test="remove-sauce-labs-backpack"]').click();
        await expect(page.locator('//button[@data-test="remove-sauce-labs-backpack"]')).not.toBeVisible();
    })
})