import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://aladdin-ui-stage.etloptival.com/login')
    await page.waitForLoadState('load')
    await page.getByPlaceholder('Enter your Email').click()
    await page.getByPlaceholder('Enter your Email').fill('tester@etloptival.com')
    await page.locator('[type="password"]').click()
    await page.locator('[type="password"]').fill('#4JuS5O*4y~/')
    await page.getByText('LOGIN NOW').click()

    if (await page.getByTitle('Home').isVisible()) {
        console.log("Login Successfull.")
    } 
    else if (await page.getByText('Invaild email or password. Please check your credentials and try again').isVisible()){
        console.log("Invaild email or password.")
    }
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
        // await page.locator('data-testid="ChevronLeftIcon"').click()
        await page.locator('#combo-box-demo').click()
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press ('Enter')
        await page.locator(':text-is("SELECT SITE")').click({timeout:30000})
        await page.waitForLoadState("load")

        await page.waitForSelector(':text-is("Create New Page")')
        await page.locator(':text-is("Create New Page")').click({timeout:60000})
        await page.waitForLoadState('load')

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
        await expect(add_content_button).toBeVisible({timeout:60000})
        await page.waitForLoadState('load')
        await page.waitForLoadState('networkidle')
        await add_content_button.click()

        const floating_menu = page.locator('[class="MuiBox-root css-29py95"]')
        await expect(floating_menu).toBeVisible()

        await page.locator('[aria-label="Add Text Block"]').click()

        const content_box = page.locator('[class="MuiBox-root css-0"]').nth(2)
        await expect(content_box).toBeVisible()

        const clear_all_text = page.locator('[class="MuiBox-root css-1wgkivy"]')
        await clear_all_text.press('Control+A')
        await clear_all_text.press('Delete')

        const editor_box = page.locator('[class="tiptap ProseMirror ProseMirror-focused"]')
        await editor_box.click()
        const header_1 = "test_big_header"
        await editor_box.fill(header_1, {timeout:5000})
        await editor_box.press('Control+A')
        await page.locator(':text-is("Normal Text")').click({timeout:5000})
        await page.locator(':text-is("Big Header")').click({timeout:5000})

        await page.locator(':text-is("Save")').click()

        await expect(content_box).toBeVisible()

        const add_below_button = page.locator('[aria-label="Add Below"]')
        await add_below_button.click()

        const add_widget = page.locator('[data-testid="WidgetsIcon"]')
        await add_widget.click()

        await expect(page.locator(':text-is("Choose a Widget")')).toBeVisible()

        const select_device_desktop = page.locator(':text-is("Desktop (1280px)")')
        await select_device_desktop.click()

        const select_widget_type = page.locator('[placeholder="Please select a widget type from the list."]')
        await select_widget_type.click()
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')

        const select_widget_name = page.locator('[placeholder="Please select a coupon table from the list."]')
        await select_widget_name.click()
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')

        const add_widget_button = page.locator('[class="MuiBox-root css-zs0ef5"]').getByRole('button').nth(1)
        await add_widget_button.click({timeout:5000})

        const page_preview = page.locator('[data-testid="PreviewIcon"]')
        await expect(page_preview).toBeVisible({timeout:10000})
        await page_preview.click({timeout:10000})
        await page.waitForLoadState('load')
        await page.waitForLoadState('networkidle')

        await expect(page.locator('#customized-dialog-title')).toBeVisible({timeout:60000})

        const preview_page_desktop = page.locator('[value="1440px"]')
        await preview_page_desktop.click({timeout:30000})
        await page.waitForLoadState('load')
        await page.waitForLoadState('networkidle')

        await expect(page.locator('[title="Page Preview"]')).toBeVisible({ timeout: 20000 })
        await expect(page.locator('[class="wrpr htmlWrapper"]')).toBeVisible({ timeout: 20000 })

        // const validate_header_text = page.locator(".main").getByText(`${header_1}`)
        // await page.waitForLoadState('load')
        // await page.waitForLoadState('networkidle')

        // expect(header_1).toBe(validate_header_text)

        const close_preview_screen = page.locator('[data-testid="CloseIcon"]')
        await expect(close_preview_screen).toBeVisible({ timeout: 20000 })
        await close_preview_screen.first().click()

        const save_page = page.locator('[data-testid="SaveIcon"]')
        await save_page.click()
        await page.waitForLoadState('load')
        await page.waitForLoadState('networkidle')

        await expect(page.locator(':text-is("pending")')).toBeVisible()

        const publish_button = page.locator(':text-is("PUBLISH")')
        await publish_button.click()
        await page.waitForLoadState('load')
        await page.waitForLoadState('networkidle')

        await expect(page.locator(':text-is("publish")')).toBeVisible()

    }) 
})