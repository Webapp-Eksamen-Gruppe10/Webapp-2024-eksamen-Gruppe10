# Eksamen: Oppgave 1
## API-endepunkter (3 features)
### User-ressurs

| HTTP Metode | Endepunkt             | Beskrivelse                                   | Respons ved suksess                | Respons ved feil                      |
|-------------|------------------------|-----------------------------------------------|------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/users`        | Hent en liste over alle brukere.              | `200 OK`, JSON-liste av brukere    | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/users`        | Opprett en ny bruker.                         | `201 Created`, Ny bruker-JSON      | `400 Bad Request`, `500 Internal Server Error` |
| `GET`       | `/api/v1/users/{id}`   | Hent detaljene til en spesifikk bruker.       | `200 OK`, JSON av bruker           | `404 Not Found`, `500 Internal Server Error` |
| `PATCH`     | `/api/v1/users/{id}`   | Oppdater deler av brukerens informasjon.      | `200 OK`, Oppdatert bruker-JSON    | `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/users/{id}`   | Slett en bruker.                              | `204 No Content`                   | `404 Not Found`, `500 Internal Server Error` |

### Course-ressurs

| HTTP Metode | Endepunkt               | Beskrivelse                                   | Respons ved suksess                | Respons ved feil                      |
|-------------|--------------------------|-----------------------------------------------|------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/courses`        | Hent en liste over alle kurs.                 | `200 OK`, JSON-liste av kurs       | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/courses`        | Opprett et nytt kurs.                         | `201 Created`, Ny kurs-JSON        | `400 Bad Request`, `500 Internal Server Error` |
| `GET`       | `/api/v1/courses/{id}`   | Hent detaljene til et spesifikt kurs.         | `200 OK`, JSON av kurs             | `404 Not Found`, `500 Internal Server Error` |
| `PATCH`     | `/api/v1/courses/{id}`   | Oppdater deler av kurset.                     | `200 OK`, Oppdatert kurs-JSON      | `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/courses/{id}`   | Slett et kurs.                                | `204 No Content`                   | `404 Not Found`, `500 Internal Server Error` |

### Lesson-ressurs

| HTTP Metode | Endepunkt                                | Beskrivelse                                   | Respons ved suksess                | Respons ved feil                      |
|-------------|-----------------------------------------|-----------------------------------------------|------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/courses/{courseId}/lessons`    | Hent alle leksjoner i et bestemt kurs.        | `200 OK`, JSON-liste av leksjoner  | `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/courses/{courseId}/lessons`    | Opprett en ny leksjon i et kurs.              | `201 Created`, Ny leksjon-JSON     | `400 Bad Request`, `500 Internal Server Error` |
| `GET`       | `/api/v1/courses/{courseId}/lessons/{id}` | Hent detaljer om en spesifikk leksjon.     | `200 OK`, JSON av leksjon          | `404 Not Found`, `500 Internal Server Error` |
| `PATCH`     | `/api/v1/courses/{courseId}/lessons/{id}` | Oppdater deler av leksjonen.                | `200 OK`, Oppdatert leksjon-JSON   | `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/courses/{courseId}/lessons/{id}` | Slett en leksjon.                           | `204 No Content`                   | `404 Not Found`, `500 Internal Server Error` |

### Comment-ressurs

| HTTP Metode | Endepunkt                                                | Beskrivelse                                   | Respons ved suksess                | Respons ved feil                      |
|-------------|-----------------------------------------------------------|-----------------------------------------------|------------------------------------|---------------------------------------|
| `GET`       | `/api/v1/courses/{courseId}/lessons/{lessonId}/comments`  | Hent alle kommentarer pÃ¥ en leksjon.          | `200 OK`, JSON-liste av kommentarer| `404 Not Found`, `500 Internal Server Error` |
| `POST`      | `/api/v1/courses/{courseId}/lessons/{lessonId}/comments`  | Legg til en kommentar til en leksjon.         | `201 Created`, Ny kommentar-JSON   | `400 Bad Request`, `500 Internal Server Error` |
| `GET`       | `/api/v1/courses/{courseId}/lessons/{lessonId}/comments/{id}` | Hent en spesifikk kommentar.             | `200 OK`, JSON av kommentar        | `404 Not Found`, `500 Internal Server Error` |
| `PATCH`     | `/api/v1/courses/{courseId}/lessons/{lessonId}/comments/{id}` | Oppdater deler av kommentaren.           | `200 OK`, Oppdatert kommentar-JSON | `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`    | `/api/v1/courses/{courseId}/lessons/{lessonId}/comments/{id}` | Slett en kommentar.                       | `204 No Content`                   | `404 Not Found`, `500 Internal Server Error` |


## Hvilke sider skal benytte de ulike API-ene

### Login
For å lage en bruker: fetch( `/api/v1/users` ): METODE POST

### Home 
for å hente innlogget bruker: fetch(`/api/v1/users/:id`): METODE GET 
for å hente alle publiserte kurs: fetch(`/api/v1/courses`): METODE GET 

### CoursePage 
for å hente valgt kurs: fetch(`api/v1/courses/:id`): METODE GET 
for å hente alle leksjoner innenfor kurset: fetch(`pi/v1/courses/{courseId}/lessons`): METODE GET 

### LessonPage 
for å hente valgt lesson: fetch(`pi/v1/courses/{courseId}/lessons/{lessonId}`): METODE GET 
for å hente alle kommentarer for denne leksjonen 


