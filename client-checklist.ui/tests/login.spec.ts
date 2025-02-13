import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const usernameInput = page.getByPlaceholder('Enter Username');
    await usernameInput.fill("client-admin");
    const passwordInput = page.getByPlaceholder('Enter Password');
    await passwordInput.fill("P@ssw0rd");

    const submitButton = page.getByRole('button');
    await submitButton.click();

    const adminHeader = page.getByTestId('admin-header');
    await expect(adminHeader).toHaveClass(/(^|\s)cc-header(\s|$)/);
});

