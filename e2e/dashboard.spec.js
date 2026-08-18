import { test, expect } from '@playwright/test';

test.describe('Subreddit Vibe Check Dashboard E2E', () => {
  test('loads the homepage and displays empty state with keyboard shortcut hint', async ({ page }) => {
    await page.goto('/');
    
    // Header brand and GitHub link
    await expect(page.getByRole('banner').getByText('The Subreddit Vibe Check')).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Source Code on GitHub' })).toBeVisible();
    
    // Main heading
    await expect(page.getByRole('heading', { name: 'Analyze the Vibe' })).toBeVisible();
    
    // Empty state container
    await expect(page.getByText('No Subreddit Analyzed Yet')).toBeVisible();
    
    // Developer Contact section in footer
    await expect(page.getByText('Contact Developer for Further Information About Project')).toBeVisible();
    await expect(page.getByText('Nallana Sasi Kumar')).toBeVisible();
    await expect(page.getByText('sasikumarnallana956@gmail.com')).toBeVisible();
  });

  test('executes subreddit search and renders vibe analytics and post list', async ({ page }) => {
    await page.goto('/');
    
    // Type into the search input
    const searchInput = page.getByPlaceholder('technology, reactjs, webdev');
    await searchInput.fill('reactjs');
    
    // Submit form
    await page.getByRole('button', { name: 'Run sentiment analysis' }).click();

    // Verify results render
    await expect(page.getByText('Overall Vibe')).toBeVisible({ timeout: 15000 });
    await expect(page).toHaveURL(/\/\?subreddit=reactjs/);
    
    // Verify Stats cards
    await expect(page.getByText('Total Posts')).toBeVisible();
    await expect(page.getByText('Avg Sentiment')).toBeVisible();
    
    // Verify Post list and filter tabs
    await expect(page.getByText('Hot Posts')).toBeVisible();
    
    // Click on 'Positive' filter tab
    const positiveTab = page.getByRole('tab', { name: /Positive/ });
    await expect(positiveTab).toBeVisible();
    await positiveTab.click();
    
    // Verify tab selection
    await expect(positiveTab).toHaveAttribute('aria-selected', 'true');
  });

  test('preserves state during browser Back and Forward navigation', async ({ page }) => {
    await page.goto('/?subreddit=technology');
    await expect(page.getByText('Overall Vibe')).toBeVisible({ timeout: 15000 });
    
    // Search for another subreddit
    const searchInput = page.getByPlaceholder('technology, reactjs, webdev');
    await searchInput.fill('webdev');
    await page.getByRole('button', { name: 'Run sentiment analysis' }).click();
    
    await expect(page).toHaveURL(/\/\?subreddit=webdev/);
    await expect(page.getByText('Overall Vibe')).toBeVisible();
    
    // Go Back in browser history
    await page.goBack();
    await expect(page).toHaveURL(/\/\?subreddit=technology/);
    await expect(page.getByText('Overall Vibe')).toBeVisible();
  });
});
