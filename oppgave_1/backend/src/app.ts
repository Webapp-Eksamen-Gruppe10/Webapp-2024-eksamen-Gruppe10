import { Hono } from "hono";
import { cors } from "hono/cors";
import { endpointsV1 } from "./config/urls";

const app = new Hono();

app.use("/*", cors());

// ----- KURS -----
// GET - Hent liste over alle kurs
app.get(endpointsV1.courses, async (c) => {

})

// POST - Opprett et nytt kurs
app.post(endpointsV1.courses, async (c) => {
  
})

// GET - Hent detaljene til et spesifikt kurs
app.get(endpointsV1.specificCourse, async (c) => {

})

// PATCH - Oppdater deler av kurset
app.patch(endpointsV1.specificCourse, async (c) => {

})

// DELETE - Slett et kurs
app.delete(endpointsV1.specificCourse, async (c) => {
  
})

// ----- LESSON -----
// GET - Hent alle leksjoner i et bestemt kurs
app.get(endpointsV1.lessons, async (c) => {

})

// POST - Opprett en ny leksjon i et kurs.
app.post(endpointsV1.lessons, async (c) => {
  
})

// GET - Hent detaljer om en spesifikk leksjon.
app.get(endpointsV1.specificLesson, async (c) => {
  
})

// PATCH - Oppdater deler av leksjonen.
app.patch(endpointsV1.specificLesson, async (c) => {
  
})

// DELETE - Slett en leksjon.
app.delete(endpointsV1.specificLesson, async (c) => {
  
})

// ----- LESSON -----
// GET - Hent alle kommentarer på en leksjon.
app.get(endpointsV1.comments, async (c) => {

})

// POST - Legg til en kommentar til en leksjon.
app.post(endpointsV1.comments, async (c) => {
  
})

// GET - Hent en spesifikk kommentar.
app.get(endpointsV1.specificComment, async (c) => {
  
})

// PATCH - Oppdater deler av kommentaren.
app.patch(endpointsV1.specificComment, async (c) => {
  
})

// DELETE - Slett en kommentar.
app.delete(endpointsV1.specificComment, async (c) => {
  
})


app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

export default app;
