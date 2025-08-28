import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://aladdin-ui-stage.etloptival.com/login')
})

test.describe('Login Functionality', () => {

    test('Load the login URL', async({page}) => {
        await page.getByText('welcome back').isVisible()
        await page.getByText('Login to your account').isVisible()
    })

    test('Test with valid credencials', async({page}) => {
        await page.getByPlaceholder('Enter your Email').click()
        await page.getByPlaceholder('Enter your Email').fill('tester@etloptival.com')
        await page.locator('[type="password"]').click()
        await page.locator('[type="password"]').fill('<1d!A3I:flD0')
        await page.getByText('LOGIN NOW').click()
        await page.waitForLoadState("networkidle")
    })

})