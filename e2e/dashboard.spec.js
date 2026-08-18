import { test, expect } from '@playwright/test';

test.describe('Subreddit Vibe Check Dashboard', () => {
  test('loads the homepage and displays empty state', async ({ page }) => {
    await page.goto('/');
    
    // Check header
    await expect(page.getByText('Analyze the Vibe')).toBeVisible();
    
    // Check empty state
    await expect(page.getByText('No subreddit analyzed yet')).toBeVisible();
  });

  test('performs a search and displays results', async ({ page }) => {
    await page.goto('/');
    
    // Type into the search input
    const searchInput = page.getByPlaceholder('technology, reactjs, webdev');
    await searchInput.fill('reactjs');
    
    // Submit the form
    await page.getByRole('button', { name: 'Analyze' }).click();

    // Note: We skip checking for 'Fetching subreddit data...' here because 
    // local API routes often respond faster than Playwright can poll the DOM.
    
    // Wait for the results to load (checking for the Stats Grid or Vibe Meter)
    await expect(page.getByText('Overall Vibe')).toBeVisible({ timeout: 15000 });
    
    // Verify that the URL updated
    await expect(page).toHaveURL(/\/\?subreddit=reactjs/);
    
    // Ensure we rendered some posts
    await expect(page.getByText('Hot Posts')).toBeVisible();
    
    // Verify the filters are present
    await expect(page.getByRole('button', { name: 'Positive' })).toBeVisible();
  });
});
