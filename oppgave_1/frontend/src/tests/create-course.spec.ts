import {
  test,
  expect,
  type Page,
  type Locator,
  type BrowserContext,
} from "@playwright/test";

import { defineConfig, devices } from '@playwright/test';
import { stringify } from "querystring";

let page: Page;
let context: BrowserContext;

// Hjelpefunksjoner
async function goToStepTwo(currentPage: Page) {
  // Lager tilfeldig identifikator for å gjøre dataen unik
  const identifyer = Date.now()

  // Fyller inn all required data i Course form
  await currentPage.getByTestId('form_title').fill(`testTitle-${identifyer}`)
  await currentPage.getByTestId('form_slug').fill(`testSlug-${identifyer}`)
  await currentPage.getByTestId('form_description').fill(`testDescription-${identifyer}`)
  await currentPage.getByTestId('form_category').selectOption('code')

  // Finner 'Leksjoner' knapp og simulerer museklikk for å submit form.
  await page.getByTestId('step').filter({hasText: "Leksjoner"}).click();
}

async function createNewLesson(currentPage: Page) {
  await currentPage.getByTestId('form_lesson_add').click();
}

async function createNewTextbox(currentPage: Page) {
  await currentPage.getByTestId('form_lesson_add_text').click()
}

async function fillNewestTextbox(currentPage: Page) {
  // Lager tilfeldig identifikator for å gjøre dataen unik
  const identifyer = Date.now()
  // Finner nyeste tekstbox og fyller den
  const newestTextbox = currentPage.getByTestId('form_lesson_text').last()
  await newestTextbox.fill(`testTextBox-${identifyer}`)
}

async function fillLessonFormAll(currentPage: Page) {
  // Lager tilfeldig identifikator for å gjøre dataen unik
  const identifyer = Date.now()

  await currentPage.getByTestId('form_lesson_title').fill(`testTitle-${identifyer}`)
  await currentPage.getByTestId('form_lesson_slug').fill(`testSlug-${identifyer}`)
  await currentPage.getByTestId('form_lesson_preAmble').fill(`testPreAmble-${identifyer}`)
  await currentPage.getByTestId('form_lesson_text').fill(`testText-${identifyer}`)
}

async function fillLessonFormSpecific(currentPage: Page, title: boolean, slug: boolean, preAmble: boolean, text: boolean) {
  // Lager tilfeldig identifikator for å gjøre dataen unik
  const identifyer = Date.now()

  if (title) {
    await currentPage.getByTestId('form_lesson_title').fill(`testTitle-${identifyer}`)
  }
  if (slug) {
    await currentPage.getByTestId('form_lesson_slug').fill(`testSlug-${identifyer}`)
  }
  if (preAmble) {
    await currentPage.getByTestId('form_lesson_preAmble').fill(`testPreAmble-${identifyer}`)
  }
  if (text) {
    await currentPage.getByTestId('form_lesson_text').fill(`testText-${identifyer}`)
  }
}

async function goToStepTwoAndCreateNewLesson(currentPage: Page, fill: boolean = false) {
  await goToStepTwo(currentPage);
  await createNewLesson(currentPage);
  if (fill) {
    await fillLessonFormAll(currentPage)
  }
}

async function createNewLessonWithMultipleTextboxesFilled(currentPage: Page){
  // Lager en ny lesson, legger til flere tekstbokser og fyller alt inn.
  await createNewLesson(currentPage)
  await fillLessonFormAll(currentPage)
  await createNewTextbox(currentPage)
  await fillNewestTextbox(currentPage)
}

// Testing
test.describe("Oppgave 1 Create", () => {
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("/create");
  });
  
  test.afterEach(async () => {
    await context.close();
    await page.close();
  });
  
  
  test.describe("When showing create page", () => {
    test("Should have test-id steps", async () => {
      // Har brukt chatGPT for å forklare meg hvordan man best kan
      // bruke PlayWright. Fikk den til å generere denne testen for meg
      // slik at jeg har et eksempel å referere til for resten av testene.
      // lenke: https://chatgpt.com/share/673f0298-3d9c-8013-a7e7-1a7e325d3895

      // Finn elementet med data-testid="steps"
      const steps = page.getByTestId('steps')    
      // Verifiser at elementet finnes og er synlig
      await expect(steps).toBeVisible();
    
      // Valider at elementet inneholder flere steg
      const stepItems = steps.getByTestId('step');
      const stepCount = await stepItems.count();
      expect(stepCount).toBeGreaterThan(0); // Forvent at det er minst ett steg
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
      // When added new lesson - should have 1 lesson
      // Går til steg 2 og lager ny lesson
      await goToStepTwoAndCreateNewLesson(page)
      // Ser etter en lesson
      const lessons = page.getByTestId("lessons")
      // Sjekker at det er én lesson i "lessons"
      expect(lessons).toHaveCount(1)
    });
  });
  test.describe("When creating multiple lessons", () => {
    test("Should have disabled submit btn if title is missing", async () => {
      // Går til steg 2 og lager ny lesson, fyller den inn
      await goToStepTwoAndCreateNewLesson(page, true)
      await createNewLesson(page)
      // Fyller ny lesson med alt untatt 'title'
      await fillLessonFormSpecific(page, false, true, true, true)
      // Ser etter submit btn
      let submitBtn = page.getByTestId('form_submit')
      // Sjekker om submit btn er disabled
      await expect(submitBtn).toBeDisabled()
    });
    
    test("Should have disabled submit btn if preAmble is missing", async () => {
        // Går til steg 2 og lager ny lesson, fyller den inn
        await goToStepTwoAndCreateNewLesson(page, true)
        await createNewLesson(page)
        // Fyller ny lesson med alt untatt 'preAmble'
        await fillLessonFormSpecific(page, true, true, false, true)
        // Ser etter submit btn
        let submitBtn = page.getByTestId('form_submit')
        // Sjekker om submit btn er disabled
        await expect(submitBtn).toBeDisabled()
    });
    
    test("Should have disabled submit btn if slug is missing", async () => {
      // Går til steg 2 og lager ny lesson, fyller den inn
      await goToStepTwoAndCreateNewLesson(page, true)
      await createNewLesson(page)
      // Fyller ny lesson med alt untatt 'slug'
      await fillLessonFormSpecific(page, true, false, true, true)
      // Ser etter submit btn
      let submitBtn = page.getByTestId('form_submit')
      // Sjekker om submit btn er disabled
      await expect(submitBtn).toBeDisabled()
    });
    
    test("Should have disabled submit btn if text is missing", async () => {
      // Går til steg 2 og lager ny lesson, fyller den inn
      await goToStepTwoAndCreateNewLesson(page, true)
      await createNewLesson(page)
      // Fyller ny lesson med alt untatt 'text'
      await fillLessonFormSpecific(page, true, true, true, false)
      // Ser etter submit btn
      let submitBtn = page.getByTestId('form_submit')
      // Sjekker om submit btn er disabled
      await expect(submitBtn).toBeDisabled()
    });
    
    test("Should have disabled submit btn if all fields are added on last lesson", async () => {
      // Går til steg 2, lager en lesson uten å fylle den inn.
      await goToStepTwoAndCreateNewLesson(page)
      // Lager en ny lesson igjen og fyller inn denne.
      await createNewLesson(page)
      await fillLessonFormAll(page)
      // Ser etter submit btn
      let submitBtn = page.getByTestId('form_submit')
      // Sjekker om submit btn er disabled
      await expect(submitBtn).toBeDisabled()
    });
    
    test("Should have enabled submit btn if all fields are added on all lesson", async () => {
        // Går til steg 2 og lager ny lesson, fyller den inn
        await goToStepTwoAndCreateNewLesson(page, true)
        await createNewLesson(page)
        // Lager lesson #2 og fyller den inn
        await fillLessonFormAll(page)
        await page.getByTestId('form_lesson_text').fill('testText')
        // Ser etter submit btn
        let submitBtn = page.getByTestId('form_submit')
        // Sjekker om submit btn er enabled
        await expect(submitBtn).toBeEnabled()
    });
    
    test("Should disable publish button if new lesson is added", async () => {
      // Går til steg 2 og lager ny lesson, fyller den inn
      await goToStepTwoAndCreateNewLesson(page, true)
      // Lager lesson #2 og fyller den inn
      await createNewLesson(page)
      await fillLessonFormAll(page)
      // Lager ny lesson igjen
      await createNewLesson(page)
      // Ser etter submit btn
      let submitBtn = page.getByTestId('form_submit')
      // Sjekker om submit btn er disabled
      await expect(submitBtn).toBeDisabled()
    });
  });
  test.describe("When creating multiple lessons with multiple textboxes", () => {
    test("Should have enabled publish button if all text fields are valid", async () => {
          // Går til steg 2 og lager ny lesson med en ekstra textbox hvor alt fylles inn
          await goToStepTwoAndCreateNewLesson(page, true)
          await createNewTextbox(page)
          await fillNewestTextbox(page)
          // Lager ny lesson med en ekstra tekstbox hvor alt fylles inn.
          await createNewLesson(page)
          await fillLessonFormAll(page)
          await createNewTextbox(page)
          await fillNewestTextbox(page)
          // Ser etter submit btn og sjekker om den er enabled
          let submitBtn = page.getByTestId('form_submit')
          await expect(submitBtn).toBeEnabled()
    });
  });
  test.describe("When created new course", () => {
    test("Should have show success when submitted", async () => {
      // Lager ferdig course og submitter
      await goToStepTwoAndCreateNewLesson(page, true)
      await page.getByTestId('form_submit').click()
      const successMsg = page.getByTestId('form_success')
      // Sjekker om success melding er visible
      expect(successMsg).toBeVisible()
    });

    test("Should show preview of content when submitted", async () => {
      // Lager ferdig course og submitter
      await goToStepTwoAndCreateNewLesson(page, true)
      await page.getByTestId('form_submit').click()

      // Sjekker om Review Section eksisterer
      const reviewSection = page.getByTestId('review')
      await expect(reviewSection).toBeVisible()

      // Sjekker om Kurs eksisterer
      const courseSection = page.getByTestId('review_course')
      await expect(courseSection).toBeVisible()

      // Sjekker om Kurs - Tittel vises
      const courseTitle = page.getByTestId('review_course_title')
      await expect(courseTitle).toBeVisible()

      // Sjekker om Kurs - Slug vises
      const courseSlug = page.getByTestId('review_course_slug')
      await expect(courseSlug).toBeVisible()

      // Sjekker om Kurs - Beskrivelse vises
      const courseDescription = page.getByTestId('review_course_description')
      await expect(courseDescription).toBeVisible()

      // Sjekker om Kurs - Kategori vises
      const courseCategory = page.getByTestId('review_course_category')
      await expect(courseCategory).toBeVisible()

      // Sjekker om Leksjoner eksisterer
      const lessonSection = page.getByTestId('review_lessons')
      await expect(lessonSection).toBeVisible()

      // Sjekker om Leksjoner - Tittel vises
      const lessonTitle = page.getByTestId('review_lesson_title')
      await expect(lessonTitle).toBeVisible()

      // Sjekker om Leksjoner - Slug vises
      const lessonSlug = page.getByTestId('review_lesson_slug')
      await expect(lessonSlug).toBeVisible()

      // Sjekker om Leksjoner - Ingress vises
      const lessonPreamble = page.getByTestId('review_lesson_preamble')
      await expect(lessonPreamble).toBeVisible()

      // Sjekker om Leksjoner - Tekster vises
      const lessonTexts = page.getByTestId('review_lesson_texts')
      await expect(lessonTexts).toBeVisible()
    });

    test("Should get response 201 from server", async () => {
      // Oppretter all data og sender inn
      await goToStepTwoAndCreateNewLesson(page, true);
      const submitBtn = page.getByTestId('form_submit');
      await submitBtn.click();

      // Ser etter POST respons fra /api/v1/courses
      const response = await page.waitForResponse((response) =>
        response.url().includes('/api/v1/courses') && response.request().method() === 'POST'
      );

      // Sjekker om responsen har statuskode 201 
      // (Endret fra 200 -> 201 
      // Fordi det virker mer etter '201 Created' 'When created new course')
      expect(response.status()).toBe(201);
    });

    test("Should get correct data from server", async () => {
      // Oppretter all data og sender inn
      await goToStepTwoAndCreateNewLesson(page, true);
      const submitBtn = page.getByTestId('form_submit');
      await submitBtn.click();

      // Ser etter GET respons fra /api/v1/courses
      const response = await page.waitForResponse((response) =>
        response.url().includes('/api/v1/courses') && response.request().method() === 'POST'
      );

      const responseAsJson = await response.json()

      // -- Validerer data vi får tilbake --
      // Sjekker at vi får 'success' og 'data'
      expect(responseAsJson).toHaveProperty('success', true);
      expect(responseAsJson).toHaveProperty('data');

      // Henter ut kun 'data' feltet
      const { data } = responseAsJson

      // Henter identifyeren fra course tittel og sjekker at den er funnet
      // Fikk chatGPT til å generere regEx logikken
      const courseIdentifyer = data.title.match(/-(\d+)$/)?.[1]
      expect(courseIdentifyer).toBeDefined()

      // Sjekker at kurs-data er korrekt
      expect(data.title).toBe(`testTitle-${courseIdentifyer}`);
      expect(data.slug).toBe(`testSlug-${courseIdentifyer}`);
      expect(data.description).toBe(`testDescription-${courseIdentifyer}`);
      expect(data.category).toBe('code');

      // Henter ut kun 'lesson' feltet
      const lesson = data.lessons[0];

      // Henter identifyeren fra lesson tittel og sjekker at den er funnet
      // Fikk chatGPT til å generere regEx logikken
      const lessonIdentifyer = lesson.title.match(/-(\d+)$/)?.[1]
      expect(lessonIdentifyer).toBeDefined()

      // Sjekker at lesson-data er korrekt
      expect(lesson.title).toBe(`testTitle-${lessonIdentifyer}`)
      expect(lesson.slug).toBe(`testSlug-${lessonIdentifyer}`)
      expect(lesson.preAmble).toBe(`testPreAmble-${lessonIdentifyer}`)
      expect(lesson.text[0].text).toBe(`<p>testText-${lessonIdentifyer}</p>`)
    });
  });
});