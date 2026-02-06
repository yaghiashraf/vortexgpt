
import { test, expect } from '@playwright/test';

test('analyze ticker flow', async ({ page }) => {
  await page.goto('/');

  // Check landing page
  await expect(page).toHaveTitle(/VortexGPT/);
  await expect(page.getByText('AI-Powered Alpha')).toBeVisible();

  // Search for a ticker
  const input = page.getByPlaceholder('Search ticker (e.g. AAPL)...');
  await input.fill('AAPL');
  await input.press('Enter');

  // Should navigate to /analyze/AAPL
  await expect(page).toHaveURL(/\/analyze\/AAPL/i);

  // Check analysis page content
  await expect(page.getByText('AI Signal', { exact: true })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('heading', { name: 'AAPL' })).toBeVisible();
});
