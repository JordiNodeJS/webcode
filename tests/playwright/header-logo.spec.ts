import { expect, test } from "@playwright/test";

// To run locally:
// npx playwright test tests/playwright/header-logo.spec.ts --project=chromium
// Make sure the dev server is running on http://localhost:3000 before running the test.

test.describe("Header logo layout", () => {
  test("logo appears to the left of the text and vertically centered", async ({
    page
  }) => {
    await page.goto("http://localhost:3000/");

    const logoAnchor = await page.locator('a[href="/"]').first();
    const img = await logoAnchor.locator("img").first();
    const textSpan = await logoAnchor
      .locator('span:has-text("WebCode")')
      .first();

    const imgBox = await img.boundingBox();
    const textBox = await textSpan.boundingBox();

    expect(imgBox).toBeTruthy();
    expect(textBox).toBeTruthy();

    // Image should be left of text
    expect(imgBox!.x).toBeLessThan(textBox!.x);

    // Vertical centers should be within 6px
    const imgCenterY = imgBox!.y + imgBox!.height / 2;
    const textCenterY = textBox!.y + textBox!.height / 2;
    expect(Math.abs(imgCenterY - textCenterY)).toBeLessThanOrEqual(6);
  });
});
