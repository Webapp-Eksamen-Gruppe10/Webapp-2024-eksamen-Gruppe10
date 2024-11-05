import {
  test,
  expect,
  type Page,
  type Locator,
  type BrowserContext,
} from "@playwright/test";

let page: Page;
let context: BrowserContext;

test.describe("Oppgave 1 Create", () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("/");
  });
  test.describe("When showing create page", () => {
    test("Should have test-id steps", () => {});
    test("Should have test-id form_submit", () => {});
    test("Should have test-id title", () => {});
    test("Should have test-id form", () => {});
    test("Should have test-id course_step", () => {});
    test("Should have test-id form_title", () => {});
    test("Should have test-id form_slug", () => {});
    test("Should have test-id form_description", () => {});
    test("Should have test-id form_category", () => {});
  });
  test.describe("When stepping from first to second step", () => {
    test("Should show error if any required field are missing", async () => {});
    test("Should show error if title field is missing", async () => {});
    test("Should show error if slug field is missing", async () => {});
    test("Should show error if description field is missing", async () => {});
    test("Should show error if category field is missing", async () => {});
    test("Should not show error if all fields are provided", async () => {});
  });
  test.describe("When at step two", () => {
    test("Should have disabled submit btn", async () => {});
    test("Should have no errors", async () => {});
    test("Should have no success", async () => {});
    test("Should have test-id lessons", async () => {});
    test("Should have test-id form_lesson_add", async () => {});
    test("Should have test-id form_lesson_add", async () => {});
  });
  test.describe("When added new lesson", () => {
    test("Should have disabled submit btn", async () => {});
    test("Should have no errors", async () => {});
    test("Should have no success", async () => {});
    test("Should have test-id lessons", async () => {});
    test("Should have test-id form_lesson_add", async () => {});
    test("Should have test-id form_lesson_add_text", async () => {});
    test("Should have test-id form_lesson_title", async () => {});
    test("Should have test-id form_lesson_slug", async () => {});
    test("Should have test-id form_lesson_preAmble", async () => {});
    test("Should have test-id form_lesson_add_text", async () => {});
    test("Should have one lesson", async () => {});
  });
  test.describe("When creating multiple lessons", () => {
    test("Should have disabled submit btn if title is missing", async () => {});
    test("Should have disabled submit btn if preAmble is missing", async () => {});
    test("Should have disabled submit btn if slug is missing", async () => {});
    test("Should have disabled submit btn if text is missing", async () => {});
    test("Should have disabled submit btn if all fields are added on last lesson", async () => {});
    test("Should have enabled submit btn if all fields are added on all lesson", async () => {});
    test("Should disable publish button if new lesson is added", async () => {});
  });
  test.describe("When creating multiple lessons with multiple textboxes", () => {
    test("Should have enabled publish button if all text fields are valid", async () => {});
  });
  test.describe("When created new course", () => {
    test("Should have show success when submitted", async () => {});
    test("Should show preview of content when submitted", async () => {});
    test("Should get response 200 from server", async () => {});
    test("Should get correct data from server", async () => {});
  });
});
