import {test, expect} from "@playwright/test";

test('Successful login', async ({ page }) => {
    await page.goto("");
    await page.locator('//input[@id="user-name"]').fill("standard_user");
    await page.locator('//input[@id="password"]').fill("secret_sauce");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//*[@data-test="title"]', { hasText: "Products"})).toBeVisible();
    await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
})

test('Auth without login', async ({ page }) => {
    await page.goto("");
    await page.locator('//input[@id="password"]').fill("secret_sauce");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//*[@data-test="error"]', { hasText: "Username is required"})).toBeVisible();
})

test('Auth without password', async ({ page }) => {
    await page.goto("");
    await page.locator('//input[@id="user-name"]').fill("standard_user");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//*[@data-test="error"]', { hasText: "Password is required"})).toBeVisible();
})

test('Auth with invalid creds', async ({ page }) => {
    await page.goto("");
    await page.locator('//input[@id="user-name"]').fill("standard_user-test");
    await page.locator('//input[@id="password"]').fill("secret_sauce-test");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//*[@data-test="error"]', { hasText: "Username and password do not match"})).toBeVisible();
})

test('Successful login with 2 users', async ({ page }) => {
    await page.goto("");
    await page.locator('//input[@id="user-name"]').fill("standard_user");
    await page.locator('//input[@id="password"]').fill("secret_sauce");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//*[@data-test="title"]', { hasText: "Products"})).toBeVisible();
    await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
    await page.locator('//button[@id="react-burger-menu-btn"]').click();
    await page.locator('//a[@id="logout_sidebar_link"]').click();
    await expect(page.locator('//div[@class="login_logo"]')).toBeVisible();
    await page.locator('//input[@id="user-name"]').fill("problem_user");
    await page.locator('//input[@id="password"]').fill("secret_sauce");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//*[@data-test="title"]', { hasText: "Products"})).toBeVisible();
    await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
})

test('Check that backpack image is shown', async ({ page }) => {
    await page.goto("");
    await page.locator('//input[@id="user-name"]').fill("standard_user");
    await page.locator('//input[@id="password"]').fill("secret_sauce");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//img[@data-test="inventory-item-sauce-labs-backpack-img"]')).toBeVisible();
})

test('Check that user can add backpack to the cart', async ({ page }) => {
    await page.goto("");
    await page.locator('//input[@id="user-name"]').fill("standard_user");
    await page.locator('//input[@id="password"]').fill("secret_sauce");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('//button[@data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('//button[@data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
})

test('Check that user can open shopping cart', async ({ page }) => {
    await page.goto("");
    await page.locator('//input[@id="user-name"]').fill("standard_user");
    await page.locator('//input[@id="password"]').fill("secret_sauce");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
    await page.locator('//a[@data-test="shopping-cart-link"]').click();
    await expect(page.locator('//button[@data-test="continue-shopping"]')).toBeVisible();
})

test('Check that user can proceed to checkout after adding item to cart', async ({ page }) => {
    await page.goto("");
    await page.locator('//input[@id="user-name"]').fill("standard_user");
    await page.locator('//input[@id="password"]').fill("secret_sauce");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
    await page.locator('//a[@data-test="shopping-cart-link"]').click();
    await expect(page.locator('//button[@data-test="checkout"]')).toBeVisible();
    await page.locator('//button[@data-test="checkout"]').click();
    await expect(page.locator('//*[@data-test="title"]', { hasText: "Checkout: Your Information"})).toBeVisible();
})

test('Check that user can remove backpack from the cart', async ({ page }) => {
    await page.goto("");
    await page.locator('//input[@id="user-name"]').fill("standard_user");
    await page.locator('//input[@id="password"]').fill("secret_sauce");
    await page.locator('//input[@id="login-button"]').click();
    await expect(page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('//button[@data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('//a[@data-test="shopping-cart-link"]')).toBeVisible();
    await page.locator('//a[@data-test="shopping-cart-link"]').click();
    await expect(page.locator('//button[@data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await page.locator('//button[@data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('//button[@data-test="remove-sauce-labs-backpack"]')).not.toBeVisible();
})