import {
  test,
  expect,
  type Page,
  type Locator,
  type BrowserContext,
} from "@playwright/test";

let page: Page;
let context: BrowserContext;

// Hjelpefunksjoner
async function goToStepTwo(currentPage: Page) {
  // Fyller inn all required data i Course form
  await currentPage.getByTestId('form_title').fill('testTitle')
  await currentPage.getByTestId('form_slug').fill('testSlug')
  await currentPage.getByTestId('form_description').fill('testDescription')
  await currentPage.getByTestId('form_category').selectOption('code')

  // Finner 'Leksjoner' knapp og simulerer museklikk for å submit form.
  await page.getByTestId('step').filter({hasText: "Leksjoner"}).click();
}

async function addNewLection(currentPage: Page) {
  await currentPage.getByTestId('form_lesson_add').click();
}

async function fillLessonForm(currentPage: Page, submit: boolean) {
  await currentPage.getByTestId('form_lesson_title').fill('testTitle')
  await currentPage.getByTestId('form_lesson_slug').fill('testSlug')
  await currentPage.getByTestId('form_lesson_preAmble').fill('testPreAmble')
  await currentPage.getByTestId('form_lesson_text').fill('testText')
}

async function goToStepTwoAndCreateNewLesson(currentPage: Page, fill: boolean = false) {
  await goToStepTwo(currentPage)
  await addNewLection(currentPage)
  if (fill) {
    await fillLessonForm(currentPage)
  }
}

// Testing
test.describe("Oppgave 1 Create", () => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("/create");
  });
  test.describe("When showing create page", () => {
    test("Should have test-id steps", async () => {
      // Har brukt chatGPT for å forklare meg hvordan man best kan
      // bruke PlayWright. Fikk den til å generere denne testen for meg
      // slik at jeg har et eksempel å referere til for resten av testene.
      // lenke: https://chatgpt.com/share/673f0298-3d9c-8013-a7e7-1a7e325d3895

      // Finn elementet med data-testid="steps"
      const steps = page.locator('[data-testid="steps"]');
    
      // Verifiser at elementet finnes og er synlig
      await expect(steps).toBeVisible();
    
      // Valider at elementet inneholder flere steg
      const stepItems = steps.locator('[data-testid="step"]');
      const stepCount = await stepItems.count();
      expect(stepCount).toBeGreaterThan(0); // Forvent at det er minst ett steg
    
      // (Valgfritt) Logg antallet steg for debug-formål
      console.log(`Antall steg funnet: ${stepCount}`);
    
      // Sjekk tekstinnholdet for hvert steg (hvis du ønsker å verifisere spesifikke navn)
      for (let i = 0; i < stepCount; i++) {
        const stepText = await stepItems.nth(i).textContent();
        expect(stepText).toBeTruthy(); // Forvent at teksten ikke er tom
        console.log(`Steg ${i + 1}: ${stepText}`);
      }
    });

    test("Should have test-id form_submit", async () => {
      // Finner element med test-id form_submit
      const formSubmit = page.getByTestId('form_submit')
      // Verifiser at elementet finnes og er synlig
      await expect(formSubmit).toBeVisible();
    });

    test("Should have test-id title", async () => {
      // Finner element med test-id title
      const title = page.getByTestId('title')
      // Verifiser at elementet finnes og er synlig
      await expect(title).toBeVisible();
    });

    test("Should have test-id form", async () => {
      // Finner element med test-id form
      const form = page.getByTestId('form')
      // Verifiser at elementet finnes og er synlig
      await expect(form).toBeVisible();
    });

    test("Should have test-id course_step", async () => {
      // Finner element med test-id course_step
      const course_step = page.getByTestId('course_step')
      // Verifiser at elementet finnes og er synlig
      await expect(course_step).toBeVisible();
    });

    test("Should have test-id form_title", async () => {
      // Finner element med test-id form_title
      const formTitle = page.getByTestId('form_title')
      // Verifiser at elementet finnes og er synlig
      await expect(formTitle).toBeVisible();
    });

    test("Should have test-id form_slug", async () => {
      // Finner element med test-id form_slug
      const formSlug = page.getByTestId('form_slug')
      // Verifiser at elementet finnes og er synlig
      await expect(formSlug).toBeVisible();
    });

    test("Should have test-id form_description", async () => {
      // Finner element med test-id form_description
      const formDescription = page.getByTestId('form_description')
      // Verifiser at elementet finnes og er synlig
      await expect(formDescription).toBeVisible();
    });

    test("Should have test-id form_category", async () => {
      // Finner element med test-id form_category
      const formCategory = page.getByTestId('form_category')
      // Verifiser at elementet finnes og er synlig
      await expect(formCategory).toBeVisible();
    });

  });
  test.describe("When stepping from first to second step", () => {
    test("Should show error if any required field are missing", async () => {
      // Finner element med tekst: "Leksjoner" og 'trykker' på det
      // for å submit form.
      // Kilde: https://playwright.dev/docs/locators#locate-by-text
      // Kilde: https://playwright.dev/docs/locators#filter-by-text
      // Kilde: https://playwright.dev/docs/input#mouse-click
      await page.getByTestId('step').filter({hasText: "Leksjoner"}).click();
      // Verifiserer at error dukker opp da ingen tekst er fyllt inn
      const formError = page.getByTestId('form_error')
      await expect(formError).toBeVisible()
    });
    
    test("Should show error if title field is missing", async () => {
      // Fyller inn alle felt -unntatt- title
      await page.getByTestId('form_slug').fill('testSlug')
      await page.getByTestId('form_description').fill('testDescription')
      await page.getByTestId('form_category').selectOption('code')

      // Finner 'Leksjoner' knapp og simulerer museklikk for å submit form.
      await page.getByTestId('step').filter({hasText: "Leksjoner"}).click();
      // Verifiserer at error dukker opp når kun title ikke er fyllt inn
      const formError = page.getByTestId('form_error')
      await expect(formError).toBeVisible()
    });
    
    test("Should show error if slug field is missing", async () => {
      // Fyller inn alle felt -unntatt- slug
      await page.getByTestId('form_title').fill('testTitle')
      await page.getByTestId('form_description').fill('testDescription')
      await page.getByTestId('form_category').selectOption('code')

      // Finner 'Leksjoner' knapp og simulerer museklikk for å submit form.
      await page.getByTestId('step').filter({hasText: "Leksjoner"}).click();
      // Verifiserer at error dukker opp når kun slug ikke er fyllt inn
      const formError = page.getByTestId('form_error')
      await expect(formError).toBeVisible()
    });

    test("Should show error if description field is missing", async () => {
      // Fyller inn alle felt -unntatt- description
      await page.getByTestId('form_title').fill('testTitle')
      await page.getByTestId('form_slug').fill('testSlug')
      await page.getByTestId('form_category').selectOption('code')

      // Finner 'Leksjoner' knapp og simulerer museklikk for å submit form.
      await page.getByTestId('step').filter({hasText: "Leksjoner"}).click();
      // Verifiserer at error dukker opp når kun description ikke er fyllt inn
      const formError = page.getByTestId('form_error')
      await expect(formError).toBeVisible()
    });

    test("Should show error if category field is missing", async () => {
      // Fyller inn alle felt -unntatt- title
      await page.getByTestId('form_title').fill('testTitle')
      await page.getByTestId('form_slug').fill('testSlug')
      await page.getByTestId('form_description').fill('testDescription')

      // Finner 'Leksjoner' knapp og simulerer museklikk for å submit form.
      await page.getByTestId('step').filter({hasText: "Leksjoner"}).click();
      // Verifiserer at error dukker opp når kun category ikke er fyllt inn
      const formError = page.getByTestId('form_error')
      await expect(formError).toBeVisible()
    });

    test("Should not show error if all fields are provided", async () => {
      // Fyller inn alle felt
      await page.getByTestId('form_title').fill('testTitle')
      await page.getByTestId('form_slug').fill('testSlug')
      await page.getByTestId('form_description').fill('testDescription')
      await page.getByTestId('form_category').selectOption('code')

      // Finner 'Leksjoner' knapp og simulerer museklikk for å submit form.
      await page.getByTestId('step').filter({hasText: "Leksjoner"}).click();
      // Verifiserer at error ikke dukker opp når allt er fyllt inn
      const formError = page.getByTestId('form_error')
      await expect(formError).toBeHidden()
    });
  });

  test.describe("When at step two", () => {
    test("Should have disabled submit btn", async () => {
      // Går til steg 2
      await goToStepTwo(page)
      // Finner submit-knapp
      let submitBtn = page.getByTestId('form_submit')
      // Sjekker om submit knapp er disabled
      await expect(submitBtn).toBeDisabled()
    });

    test("Should have no errors", async () => {
      // Går til steg 2
      await goToStepTwo(page)
      // Prøver å finne error
      const formError = page.getByTestId('form_error')
      // Verifiserer at error ikke dukker opp når man kommer til steg 2
      await expect(formError).toBeHidden()
    });
    
    test("Should have no success", async () => {
      // Går til steg 2
      await goToStepTwo(page)
      // Prøver å finne success
      const formSuccess = page.getByTestId('form_success')
      // Verifiserer at success ikke dukker når man kommer til steg 2
      await expect(formSuccess).toBeHidden()
    });
    
    test("Should have test-id lessons", async () => {
      // Går til steg 2
      await goToStepTwo(page)
      // Ser etter test-id lessons
      const lessons = page.getByTestId('lessons')
      // Verifiserer at elementet eksisterer
      // NB: toBeVisible() fungerer ikke her da test-id lessons eksisterer,
      // men ikke er (eller skal være) synlig.
      await expect(lessons).toBeEmpty();
    });
    
    test("Should have test-id form_lesson_add", async () => {
      // Går til steg 2
      await goToStepTwo(page)
      // Ser etter test-id form_lesson_add
      const formLessonAdd = page.getByTestId('form_lesson_add')
      // Verifiserer at elementet eksisterer
      await expect(formLessonAdd).toBeVisible();
    });
  });
  test.describe("When added new lesson", () => {
    test("Should have disabled submit btn", async () => {
      // Går til steg 2 og lager ny lesson
      await goToStepTwoAndCreateNewLesson(page)
      // Ser etter submit btn
      let submitBtn = page.getByTestId('form_submit')
      // Sjekker om submit btn er disabled
      await expect(submitBtn).toBeDisabled()
    });
    
    test("Should have no errors", async () => {
      // Går til steg 2 og lager ny lesson
      await goToStepTwoAndCreateNewLesson(page)
      // Prøver å finne error
      const formError = page.getByTestId('form_error')
      // Verifiserer at error ikke dukker når man kommer til steg 2
      await expect(formError).toBeHidden()
    });
    
    test("Should have no success", async () => {
      // Går til steg 2 og lager ny lesson
      await goToStepTwoAndCreateNewLesson(page)
      // Prøver å finne error
      const formSuccess = page.getByTestId('form_success')
      // Verifiserer at error ikke dukker når man kommer til steg 2
      await expect(formSuccess).toBeHidden()
    });
    
    test("Should have test-id lessons", async () => {
      // Går til steg 2 og lager ny lesson
      await goToStepTwoAndCreateNewLesson(page)
      // Finner element med lessons
      const lessons = page.getByTestId('lessons')
      // Verifiserer at elementet eksisterer
      await expect(lessons).toBeVisible();
    });
    
    test("Should have test-id form_lesson_add", async () => {
      // Går til steg 2 og lager ny lesson
      await goToStepTwoAndCreateNewLesson(page)
      // Finner element med form_lesson_add
      const formLessonAdd = page.getByTestId('form_lesson_add')
      // Verifiserer at elementet eksisterer
      await expect(formLessonAdd).toBeVisible();
    });
    
    test("Should have test-id form_lesson_add_text", async () => {
      // Går til steg 2 og lager ny lesson
      await goToStepTwoAndCreateNewLesson(page)
      // Finner element med form_lesson_add_text
      const formLessonAddText = page.getByTestId('form_lesson_add_text')
      // Verifiserer at elementet eksisterer
      await expect(formLessonAddText).toBeVisible();
    });
    
    test("Should have test-id form_lesson_title", async () => {
      // Går til steg 2 og lager ny lesson
      await goToStepTwoAndCreateNewLesson(page)
      // Finner element med form_lesson_title
      const formLessonTitle = page.getByTestId('form_lesson_title')
      // Verifiserer at elementet eksisterer
      await expect(formLessonTitle).toBeVisible();
    });
    
    test("Should have test-id form_lesson_slug", async () => {
      // Går til steg 2 og lager ny lesson
      await goToStepTwoAndCreateNewLesson(page)
      // Finner element med form_lesson_slug
      const formLessonSlug = page.getByTestId('form_lesson_slug')
      // Verifiserer at elementet eksisterer
      await expect(formLessonSlug).toBeVisible();
    });
    
    test("Should have test-id form_lesson_preAmble", async () => {
      // Går til steg 2 og lager ny lesson
      await goToStepTwoAndCreateNewLesson(page)
      // Finner element med form_lesson_preAmble
      const formLessonPreAmble = page.getByTestId('form_lesson_preAmble')
      // Verifiserer at elementet eksisterer
      await expect(formLessonPreAmble).toBeVisible();
    });
    
    test("Should have one lesson", async () => {

    });
  });
  test.describe("When creating multiple lessons", () => {
    test("Should have disabled submit btn if title is missing", async () => {

    });
    
    test("Should have disabled submit btn if preAmble is missing", async () => {

    });
    
    test("Should have disabled submit btn if slug is missing", async () => {

    });
    
    test("Should have disabled submit btn if text is missing", async () => {

    });
    
    test("Should have disabled submit btn if all fields are added on last lesson", async () => {

    });
    
    test("Should have enabled submit btn if all fields are added on all lesson", async () => {

    });
    
    test("Should disable publish button if new lesson is added", async () => {

    });
  });
  test.describe("When creating multiple lessons with multiple textboxes", () => {
    test("Should have enabled publish button if all text fields are valid", async () => {

    });
  });
  test.describe("When created new course", () => {
    test("Should have show success when submitted", async () => {

    });
    
    test("Should show preview of content when submitted", async () => {

    });
    
    test("Should get response 200 from server", async () => {
      
    });
    
    test("Should get correct data from server", async () => {

    });
  });
});