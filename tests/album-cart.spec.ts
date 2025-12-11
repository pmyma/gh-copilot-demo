import { test, expect } from '@playwright/test';

test.describe('Album App Cart Functionality', () => {
  test('should add album to cart and display in cart dropdown', async ({ page }) => {
    // Step 1: Open the Album App
    console.log('Step 1: Opening the Album App...');
    await page.goto('/');
    
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
    
    // Verify the page is loaded correctly
    await expect(page).toHaveTitle(/Album Viewer/);
    console.log('✓ Step 1 completed: Album App opened successfully');

    // Wait for albums to load (check for loading state to disappear)
    await page.waitForSelector('.loading', { state: 'detached' });
    
    // Wait for album cards to be visible
    await page.waitForSelector('.album-card', { state: 'visible' });
    
    // Step 2: Click on the "Add to cart" on the first tile
    console.log('Step 2: Clicking "Add to cart" on the first album...');
    
    // Find the first album card and its "Add to cart" button
    const firstAlbumCard = page.locator('.album-card').first();
    await expect(firstAlbumCard).toBeVisible();
    
    const addToCartButton = firstAlbumCard.locator('button:has-text("Add to cart")').first();
    await expect(addToCartButton).toBeVisible();
    
    // Get the album title for verification later
    const albumTitle = await firstAlbumCard.locator('.album-title').textContent();
    console.log(`Album to add: "${albumTitle}"`);
    
    // Click the "Add to cart" button
    await addToCartButton.click();
    
    // Wait for the button state to change (showing it's in cart)
    await page.waitForTimeout(1000); // Give time for the cart state to update
    console.log('✓ Step 2 completed: Successfully clicked "Add to cart"');

    // Step 3: Click on the cart button on the top right to display the cart
    console.log('Step 3: Opening the cart dropdown...');
    
    // Find and click the cart icon
    const cartIcon = page.locator('.cart-icon, [role="button"]:has(svg)').first();
    await expect(cartIcon).toBeVisible();
    await cartIcon.click();
    
    // Wait for cart dropdown to appear
    await page.waitForSelector('.cart-dropdown', { state: 'visible' });
    console.log('✓ Step 3 completed: Cart dropdown opened');

    // Step 4: Check that the cart contains the added album
    console.log('Step 4: Verifying the cart contains the added album...');
    
    // Wait for cart items to be visible
    await page.waitForSelector('.cart-items', { state: 'visible' });
    
    // Check that the cart is not empty
    const emptyCart = page.locator('.empty-cart');
    await expect(emptyCart).not.toBeVisible();
    
    // Verify the album is in the cart
    const cartItems = page.locator('.cart-items .cart-item');
    await expect(cartItems).toHaveCount(1);
    
    // Check if the album title appears in the cart (if available in the cart item structure)
    if (albumTitle) {
      const cartItemTitle = page.locator('.cart-items').locator('text=' + albumTitle);
      await expect(cartItemTitle).toBeVisible();
    }
    
    // Verify cart count shows 1 item
    const totalItems = page.locator('.total-items');
    await expect(totalItems).toContainText('1');
    console.log('✓ Step 4 completed: Verified album is in the cart');

    // Step 5: Take a screenshot of the cart
    console.log('Step 5: Taking a screenshot of the cart...');
    
    // Ensure the cart dropdown is fully visible
    const cartDropdown = page.locator('.cart-dropdown');
    await expect(cartDropdown).toBeVisible();
    
    // Take a screenshot of the entire page showing the cart
    await page.screenshot({ 
      path: 'tests/screenshots/cart-with-album.png',
      fullPage: true 
    });
    console.log('✓ Step 5 completed: Screenshot saved as tests/screenshots/cart-with-album.png');

    console.log('🎉 All test steps completed successfully!');
  });
});