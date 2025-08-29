import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://aladdin-ui-stage.etloptival.com/login')
    await page.getByPlaceholder('Enter your Email').click()
    await page.getByPlaceholder('Enter your Email').fill('tester@etloptival.com')
    await page.locator('[type="password"]').click()
    await page.locator('[type="password"]').fill('<1d!A3I:flD0')
    await page.getByText('LOGIN NOW').click()
    
    await page.waitForLoadState('load')
    await page.waitForLoadState("networkidle")
})

test.describe('Page Builder',() => {

    test('Page Builder Dashboard', async({page}) => {
        await page.locator('[data-testid="WebAssetIcon"]').click()
        await page.locator(':text-is("Page Building")').click()
        await page.locator('#combo-box-demo').click()
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press ('Enter')
        await page.locator(':text-is("SELECT SITE")').click()
        await page.waitForLoadState("networkidle")

        const header = page.locator('.header2')
        await expect(header).toBeVisible()
        await expect(header).toHaveText('Pages')
    })

    test('Filter and Pagination Functionality', async({page}) => {
        await page.locator('[data-testid="WebAssetIcon"]').click()
        await page.locator(':text-is("Page Building")').click()
        await page.locator('#combo-box-demo').click()
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press ('Enter')
        await page.locator(':text-is("SELECT SITE")').click()
        await page.waitForLoadState("networkidle")


        const seachbox = page.locator('#combo-box-demo').nth(1)
        await expect(seachbox).toBeVisible({timeout:20000})
        await seachbox.click()
        await seachbox.fill('best-betting-sites')
        await page.keyboard.press("ArrowDown")
        await page.keyboard.press("ArrowDown")
        await page.keyboard.press("Enter")

        const group_filter = page.locator(':text-is("group")')
        await group_filter.click()
        const search_group_filter = page.locator('[class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedEnd css-s43tfo"]')
        await search_group_filter.click()
        await search_group_filter.fill('operations')
        await page.getByRole('checkbox', { name: 'Operations' }).click()

        const status_filter = page.locator(':text-is("status")')
        await status_filter.click()
        const search_status_filter = page.locator('[class="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputSizeSmall MuiInputBase-inputAdornedEnd css-s43tfo"]')
        await search_status_filter.click()
        await search_status_filter.fill('publish')
        await page.getByRole('checkbox', { name: 'Publish' }).click()

        const date_filter = page.locator(':text-is("date")')
        await date_filter.click()
        await page.locator(':text-is("Current Month")').click()

        const clear_filter = page.locator(':text-is("Clear Filter")')
        await clear_filter.click()

        await page.waitForLoadState("networkidle")

        await expect(seachbox).toHaveValue('')

        await group_filter.click()
        await expect(search_group_filter).toHaveValue('')

        await status_filter.click()
        await expect(search_status_filter).toHaveValue('')

        const first_page_name = await page.locator('[class="MuiBox-root css-0"]').first().innerText()

        await page.locator('[aria-label="Go to page 2"]').click()
        await page.locator('[aria-label="Go to page 3"]').click()
        await page.locator('[aria-label="Go to page 1"]').click()

        const validate_first_page_name = await page.locator('[class="MuiBox-root css-0"]').first().innerText()

        expect(first_page_name).toBe(validate_first_page_name) 
        
    })

    test("Create a new page", async({page}) => {

        await page.locator('[data-testid="WebAssetIcon"]').click()
        await page.locator(':text-is("Page Building")').click()
        await page.locator('#combo-box-demo').click()
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press ('Enter')
        await page.locator(':text-is("SELECT SITE")').click()
        await page.waitForLoadState("networkidle")

        await page.locator(':text-is("Create New Page")').click()
        await page.waitForLoadState('networkidle')

        const new_page_name = `test_${Date.now()}`

        await page.locator('#pageTitle').fill(new_page_name)
        await page.locator('#pageGroups').click()
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')

        await page.locator(':text-is("Create")').click()

        await page.waitForLoadState('load')
        await page.waitForLoadState('networkidle')

        expect(new_page_name).toBe(new_page_name)

        const add_content_button = page.locator(':text-is("ADD CONTENT")')
        await expect(add_content_button).toBeVisible({timeout:15000})
        await add_content_button.click()

        const floating_menu = page.locator('[class="MuiBox-root css-29py95"]')
        await expect(floating_menu).toBeVisible()

        await page.locator('[aria-label="Add Text Block"]').click()

        const content_box = page.locator('[class="MuiBox-root css-0"]')
        await expect(content_box).toBeVisible()

        const clear_all_text = page.locator(':text-is("Edit this text")')
        await clear_all_text.press('Control+A')
        await clear_all_text.press('Delete')

        const editor_box = page.locator('[class="MuiBox-root css-1o1jyss"]')
        await editor_box.click()
        const header_1 = "test_big_header"
        await editor_box.fill(header_1)
        await editor_box.press('Control+A')
        await page.locator('text-is("Normal Text")').click()
        await page.locator('text-is("Big Header")').click()

        await page.locator('text-is("Save")').click()
    })
})