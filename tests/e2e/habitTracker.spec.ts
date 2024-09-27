import { test, expect } from '@playwright/test';

test('adding new habit to the list', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('button', { name: '+ New Habit' }).click();
  await page.getByPlaceholder('New Habit').fill('Run a mile');
  await page.getByPlaceholder('New Habit').press('Enter');
  await expect(page.getByRole('heading', { name: 'Run a mile' })).toBeVisible();
});
