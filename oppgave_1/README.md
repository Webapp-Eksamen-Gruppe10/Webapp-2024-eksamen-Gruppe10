# Eksamen: Oppgave 1
## API-endepunkter

### Course-ressurs

| HTTP Metode | Endepunkt               | Beskrivelse                                   | Respons ved suksess                | Respons ved feil                      |
|-------------|--------------------------|-----------------------------------------------|------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/courses`        | Hent en liste over alle kurs.                 | `200 OK`, JSON-liste av kurs       | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/courses`        | Opprett et nytt kurs.                         | `201 Created`, Ny kurs-JSON        | `400 Bad Request`, `500 Internal Server Error`, `409 Not Unique` |
| `GET`       | `/api/v1/courses/{courseSlug}`   | Hent detaljene til et spesifikt kurs.         | `200 OK`, JSON av kurs             | `404 Not Found`, `500 Internal Server Error` |
| `PATCH`     | `/api/v1/courses`   | Oppdater deler av kurset.                     | `200 OK`, Oppdatert kurs-JSON      | `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/courses/{id}`   | Slett et kurs.                                | `200 OK`, courseId                   | `404 Not Found`, `500 Internal Server Error` |


### Comment-ressurs

| HTTP Metode | Endepunkt                                                | Beskrivelse                                   | Respons ved suksess                | Respons ved feil                      |
|-------------|-----------------------------------------------------------|-----------------------------------------------|------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/lessons/{lessonId}/comments`  | Hent alle kommentarer på en leksjon.          | `200 OK`, JSON-liste av kommentarer| `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/lessons/{lessonId}/comments`  | Legg til en kommentar til en leksjon.         | `201 Created`, Ny kommentar-JSON   | `400 Bad Request`, `500 Internal Server Error` 


## Hvilke sider skal benytte de ulike API-ene

### Home 
for å hente alle publiserte kurs: fetch(`/api/v1/courses`): METODE GET 

### CoursePage 
for å hente valgt kurs: fetch(`api/v1/courses/{courseSlug}`): METODE GET 
for å hente alle leksjoner innenfor kurset: fetch(`api/v1/courses/{courseSlug}`): METODE GET (Alle leksjoner ligger i et course objekt)

### LessonPage 
for å hente valgt lesson: fetch(`api/v1/courses/{courseSlug}`): METODE GET (Alle leksjoner ligger i et course objekt) 
for å hente ut alle kommentar for en leksjon: fetch(`/api/v1/courses/{courseId}/lessons/{lessonId}/comments`): METODE GET
for å legge til kommentar til en leksjon: fetch (`/api/v1/courses/{courseId}/lessons/{lessonId}/comments`): METODE POST


### CreateCoursePage
for å opprette en kurs med leksjoner: fetch( `/api/v1/courses`): METODE POST

### UpdateCoursePage
for å hente valgt kurs: fetch(`api/v1/courses/{courseSlug}`): METODE GET
for å oppdatere en kurs, samt oppdatere leksjoner: fetch (`/api/v1/courses`): METODE PATCH



# Eksamen: Oppgave 1.4 Tiptap dokumentasjon:

For å ivareta kravet om enkelt å kunne bytte tilbake til den eksisterende teksteditoren, er det laget en ny komponent kalt "Tiptap.tsx" (plassering: src/components/Tiptap.tsx).

Tiptap-komponenten inneholder all eksisterende logikk og funksjonalitet og brukes nå i "CourseForm.tsx" (plassering: features/courses/components/CourseForm.tsx). 
Den er designet for å se ut og oppføre seg identisk som den tidligere textarea-editoren og tilbyr derfor kun standard paragraph-formattering uten annen tilleggsfunksjonalitet.

Den gamle teksteditoren, textarea, som fortsatt ligger i CourseForm.tsx, er kommentert ut. 
Hvis det blir nødvendig å gå tilbake til den gamle editoren, kan dette gjøres ved å kommentere ut Tiptap-komponenten og fjerne kommentarene rundt textarea-editoren.

Ettersom textarea-editoren brukes to steder i CourseForm, må dette gjøres på begge stedene.

Dersom Tiptap-teksteditoren skal utvides med flere formateringsfunksjoner, vil det være hensiktsmessig å opprette en ny komponent, for eksempel kalt "Toolbar.tsx". 
Denne komponenten kan inneholde logikk og funksjonalitet for de ulike formateringene. Toolbar kan deretter integreres i Tiptap for å håndtere de nye funksjonene.







