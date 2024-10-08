import { test, expect } from '@playwright/test';

const habitOne = 'Run a mile';
const habitTwo = 'Eat salad';
const homePage = 'http://127.0.0.1:5173';
const addingHabit = async (page: any, habit: string) => {
  await page.getByPlaceholder('New Habit').fill(habit);
  await page.getByPlaceholder('New Habit').press('Enter');
};

test('adding new habit to the list', async ({ page }) => {
  await page.goto(homePage);
  await page.getByRole('button', { name: '+ New Habit' }).click();
  await addingHabit(page, habitOne);
  await page.getByRole('button', { name: '+ New Habit' }).click();
  await addingHabit(page, habitTwo);
  await expect(page.getByRole('heading', { name: habitOne })).toBeVisible();
  await expect(page.getByRole('heading', { name: habitTwo })).toBeVisible();
});
test('completing the habit and undoing the completion', async ({ page }) => {
  await page.goto(homePage);
  await page.getByRole('button', { name: '+ New Habit' }).click();
  await addingHabit(page, habitOne);
  await page.getByLabel('Mark as completed').click();
  await expect(page.getByLabel('completion-status')).toHaveText('Completed');
  await page.getByLabel('Mark as not completed').click();
  await expect(page.getByLabel('completion-status')).toHaveText(
    'Not Completed'
  );
});
test('deleting the habit from the list', async ({ page }) => {
  await page.goto(homePage);
  await page.getByRole('button', { name: '+ New Habit' }).click();
  await addingHabit(page, habitOne);
  await page.getByRole('button', { name: '+ New Habit' }).click();
  await addingHabit(page, habitTwo);
  await page
    .getByLabel(`Actions for ${habitOne}`)
    .getByLabel('Delete habit')
    .click();
  await page.getByLabel('Confirm deletion').click();
  await expect(page.getByRole('heading', { name: habitOne })).toBeHidden();
  await expect(page.getByRole('heading', { name: habitTwo })).toBeVisible();
});
test('changing the name of the habit', async ({ page }) => {
  await page.goto(homePage);
  await page.getByRole('button', { name: '+ New Habit' }).click();
  await addingHabit(page, habitOne);
  await page.getByLabel('Edit habit name').click();
  await page.getByPlaceholder('New habit name').click();
  await page.getByPlaceholder('New habit name').fill(habitTwo);
  await page.getByLabel('Confirm new habit name').click();
  await expect(page.getByRole('heading', { name: habitTwo })).toBeVisible();
});
test('stopping the habit', async ({ page }) => {
  await page.goto(`${homePage}/day/2024-09-01`);
  await page.getByRole('button', { name: '+ New Habit' }).click();
  await addingHabit(page, habitOne);
  await expect(page.getByRole('heading', { name: habitOne })).toBeVisible();
  await page.getByLabel('Stop habit').click();
  await page.getByLabel('Confirm stopping habit').click();
  await page.goto(`${homePage}/day/2024-09-02`);
  await expect(page.getByRole('heading', { name: habitOne })).toBeHidden();
});
