import {test, expect} from '@playwright/test'

test.only("Task",async({page})=>{
    //1. Navigate to "https://www.saucedemo.com"
    await page.goto("https://www.saucedemo.com/");
    //2. Verify the pageurl and pagetitle
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    await expect(page).toHaveTitle('Swag Labs')
    //3. Enter username, password and click on login button by using getByRole()
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button',{name:'login'}).click()
    //4. wait for products page
    await page.waitForURL('https://www.saucedemo.com/inventory.html')
    //5. Assert products text visible
    await expect(page.getByText("Products")).toBeVisible();
    //6. Select sorting dropdown ==> Price Low to High
    await page.locator('//select[@class="product_sort_container"]').selectOption("Price (low to high)")
    //7. Check first product name text
    await expect(page.locator('//div[text()="Sauce Labs Backpack"]')).toBeVisible()
    
    //8. Mouse hover add to cart button
    let addtocartbtn = page.locator('(//button[text()="Add to cart"])[1]')
    await addtocartbtn.hover()
    //9. click add to cart
    await addtocartbtn.click()
    //10.click second product add to cart
    await page.locator('//button[@id="add-to-cart-sauce-labs-bike-light"]').click()
    //11. assert the count of the cart
    await page.locator('//a[@class="shopping_cart_link"]').click()
    await expect(page.locator('//div[@class="cart_item"]')).toHaveCount(2)
    //12. click checkout
    await page.locator("//button[text()='Checkout']").click()

    //13. enter first name, last name, postal code
    await page.getByPlaceholder('First Name').fill('Sandhya')
    await page.getByPlaceholder('Last Name').fill('Pisal')
    await page.getByPlaceholder('Zip/Postal Code').fill('415507')
    //14. click continue
    await page.locator('//input[@id="continue"]').click()
    //15. Assert checkout text is visible
    await expect(page.getByText('Checkout: Overview')).toBeVisible()
    //16. Click on finish
    await page.locator('//button[@id="finish"]').click()
    //17. Assert the Thank you for your order
    await expect(page.getByText('Thank you for your order!')).toBeVisible()
    //18. click on the back home
    await page.locator('//button[@name="back-to-products"]').click()
    //19. verify the home page is visible.
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')




})